import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {ErrorMessage} from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileImage,
    faCheckCircle,
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { UserInterface } from "../../../config/interfaces";
import axiosConfig from "../../../config/axiosConfig";
import TagsInput from "../../../utils/components/TagsInput";
import { StyledTextField } from "../../../utils/style/styledComponents";
import { BookRating } from "../../../utils/components/Book/BookRating";
import {
    FormContainer,
    Container,
    FieldsContainer,
    LeftFieldsContainer,
    CoverContainer,
    ImageContainer,
    Image,
    ChangeImage,
    ButtonContainer,
    RatingContainer,
    RatingText,
    RightFieldsContainer,
    PublicationDetails,
    SubmitButtons,
    ClearRating
} from "../../../utils/style/metadataFormStyle";
import { useStore } from "../../../stores/RootStore";

interface Props {
    user: UserInterface;
    type: "upload" | "edit"
}

interface FormInterface {
    title: string,
    series: string,
    description: string,
    publisher: string,
    pubDate: string,
    language: string,
    coverImage: FileList,
    errorMessage: string
}

// Upload form validation schema step 2
// Validate metadata
const metadataSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    series: yup.string(),
    description: yup.string(),
    publisher: yup.string(),
    pubDate: yup.string(),
    language: yup.string()
});

const MetadataForm = (props:Props) => {

    // Get stores access
    const { booksStore, uploadStore, metricsStore} = useStore();

    const navigate = useNavigate();

    // Metadata form state
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isCancelling, setIsCancelling] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(true);

    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormInterface>({
        resolver: yupResolver(metadataSchema),
        mode: 'onChange',
        defaultValues: {
            title: uploadStore.getTitle(),
            series: uploadStore.getSeries(),
            description: uploadStore.getDescription(),
            publisher: uploadStore.getPublisher(),
            pubDate: uploadStore.getPubDate(),
            language: uploadStore.getLanguage()
        }
    });

    // Rating, Tags and Authors state
    const [rating, setRating] = useState<number>(0);

    const getTags = (inputTags:string[]):void => {
        uploadStore.setTags(inputTags);
    }

    const getAuthors = (inputAuthors:string[]):void => {
        uploadStore.setAuthors(inputAuthors);
    }

    // Save button event
    const onSubmit = async (data: FormInterface) => {
        setIsSubmitting(true);
        try {
            // Create request payload with book metadata
            const book = {
                userId: props.user.id,
                title: data.title,
                authors: toJS(uploadStore.getAuthors()),
                description: data.description,
                tags: toJS(uploadStore.getTags()),
                publisher: data.publisher,
                pubDate: data.pubDate !== '' ? data.pubDate : null,
                language: data.language,
                rating: rating,
                fileName: uploadStore.getFileName(),
                series: data.series,
            }

            // Upload metadata
            const uploadMetadataRes = await axiosConfig().post( "/pg/books", book);
            let bookId;
            if (uploadMetadataRes.data.id) {
                bookId = uploadMetadataRes.data.id;
            } else {
                setIsSubmitting(false);
                setError('errorMessage', {
                    type: 'manual',
                    message: uploadMetadataRes.data.message
                })
            }

            // Upload epub file and cover
            const uploadFilesRes = await uploadStore.uploadFiles(bookId);
            if (uploadFilesRes.data.status) {
                booksStore.requestBooks();
                metricsStore.requestPercent();
                metricsStore.requestTopTagsByBooks();
                navigate('/?fromUpload');
            } else {
                setIsSubmitting(false);
                setError('errorMessage', {
                    type: 'manual',
                    message: uploadMetadataRes.data.message
                })
            }
        } catch (err:any) {
            setSuccess(false);
            setIsSubmitting(false);
            setError('errorMessage', {
                type: 'manual',
                message: err.response.data.message
            });
        }
    }

    // Prevent form submission on enter
    const checkKeyDown = (event:React.KeyboardEvent<HTMLFormElement>) => {
        if (event.code === 'Enter') event.preventDefault();
    };

    // Change cover image
    const uploadImage = (files:FileList | null) => {
        if (files !== null) {
            let url = URL.createObjectURL(files[0]);
            uploadStore.setCoverImageUrl(url);
            uploadStore.setCoverImage(files[0]);
        }
    }

    // Cancel button event
    const handleCancel = () => {
        setIsCancelling(true);
        navigate('/');
    }

    return (
        <Container>
            {success && <Alert severity="success">File OK. You can see and edit the book information below.</Alert>}
            <ErrorMessage errors={errors} name="errorMessage" render={({ message }) =>
                <Alert severity="error">{message}</Alert>
            } />
            <FormContainer
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={(event) => checkKeyDown(event)}
            >
                <FieldsContainer>
                    <LeftFieldsContainer>
                        <CoverContainer>
                            <ImageContainer>
                                <Image image={uploadStore.getCoverImageUrl()}/>
                                <ChangeImage>
                                    <ButtonContainer>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            startIcon={<FontAwesomeIcon icon={faFileImage}/>}
                                        >
                                            Change Cover
                                            <input
                                                id="file"
                                                type="file"
                                                accept="image/*"
                                                {...register('coverImage', {
                                                    onChange: (Event) => {uploadImage(Event.target.files)}
                                                })}
                                                hidden
                                            />
                                        </Button>
                                    </ButtonContainer>
                                </ChangeImage>
                            </ImageContainer>
                        </CoverContainer>
                        <RatingContainer>
                            <RatingText>Rating</RatingText>
                            <BookRating
                                value={rating}
                                size="large"
                                readOnly={false}
                                onChange={(event:ChangeEvent, newRating:number | null) => {
                                    setRating(newRating !== null ? newRating : 0);
                                }}
                            />
                            <ClearRating onClick={() => {setRating(0)}}>Clear Rating</ClearRating>
                        </RatingContainer>
                    </LeftFieldsContainer>
                    <RightFieldsContainer>
                        <StyledTextField
                            id="title"
                            placeholder="Title"
                            {...register('title')}
                            variant="outlined"
                            type="text"
                            error={!!errors.title}
                        />
                        <TagsInput
                            id="authors"
                            placeholder="Add Author"
                            getTags={getAuthors}
                            list={uploadStore.getAuthors()}
                        />
                        <StyledTextField
                            id="series"
                            placeholder="Series"
                            {...register('series')}
                            variant="outlined"
                            type="text"
                            error={!!errors.series}
                        />
                        <StyledTextField
                            id="description"
                            placeholder="Description"
                            variant="outlined"
                            {...register('description')}
                            error={!!errors.description}
                            type="text"
                            multiline
                            rows={5}
                        />
                        <PublicationDetails>
                            <StyledTextField
                                id="publisher"
                                placeholder="Publisher"
                                variant="outlined"
                                {...register('publisher')}
                                error={!!errors.publisher}
                                fullWidth
                                type="text"
                            />
                            <StyledTextField
                                id="pubDate"
                                placeholder="Publication Date"
                                variant="outlined"
                                {...register('pubDate')}
                                error={!!errors.pubDate}
                                fullWidth
                                type="date"
                            />
                            <StyledTextField
                                id="language"
                                placeholder="Language"
                                {...register('language')}
                                error={!!errors.language}
                                variant="outlined"
                                type="text"
                            />
                        </PublicationDetails>
                        <TagsInput
                            id="tags"
                            getTags={getTags}
                            placeholder="Add Tag"
                            list={uploadStore.getTags()}
                        />
                    </RightFieldsContainer>
                </FieldsContainer>
                <SubmitButtons>
                    {isSubmitting
                        ? <LoadingButton loading variant="outlined" size="large" >Submit</LoadingButton>
                        : <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            startIcon={<FontAwesomeIcon className="fa-fw" icon={faCheckCircle}/>}
                        >
                            Save
                        </Button>
                    }
                    {isCancelling
                        ? <LoadingButton loading variant="outlined" size="large" >Submit</LoadingButton>
                        : <Button
                            type="button"
                            variant="contained"
                            size="large"
                            onClick={handleCancel}
                            startIcon={<FontAwesomeIcon className="fa-fw" icon={faTimesCircle}/>}
                        >
                            Cancel
                        </Button>
                    }
                </SubmitButtons>
            </FormContainer>
        </Container>
    )
}

export default observer(MetadataForm);

