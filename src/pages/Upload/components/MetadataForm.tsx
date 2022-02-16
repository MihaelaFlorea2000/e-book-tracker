import React, {ChangeEvent, useState} from "react";
import {UserInterface} from "../../../config/interfaces";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import TagsInput from "../../../utils/components/TagsInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileImage, faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import * as yup from "yup";
import axiosConfig from "../../../config/axiosConfig";
import {observer} from "mobx-react";
import {toJS} from "mobx";
import Alert from "@mui/material/Alert";
import UploadStore from "../../../stores/UploadStore";
import {ErrorMessage} from "@hookform/error-message";
import LoadingButton from "@mui/lab/LoadingButton";
import {useNavigate} from "react-router-dom";
import { StyledTextField } from "../../../utils/style/styledComponents";
import BooksStore from "../../../stores/BooksStore";
import {BookRating} from "../../../utils/components/BookRating";
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
    SubmitButtons
} from "../../../utils/style/metadataFormStyle";

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

    const navigate = useNavigate();

    // Metadata form state
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isCancelling, setIsCancelling] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(true);

    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormInterface>({
        resolver: yupResolver(metadataSchema),
        mode: 'onChange',
        defaultValues: {
            title: UploadStore.getTitle(),
            series: UploadStore.getSeries(),
            description: UploadStore.getDescription(),
            publisher: UploadStore.getPublisher(),
            pubDate: UploadStore.getPubDate(),
            language: UploadStore.getLanguage()
        }
    });

    // Rating, Tags and Authors state
    const [rating, setRating] = useState<number>(0);

    const getTags = (inputTags:string[]):void => {
        UploadStore.setTags(inputTags);
    }

    const getAuthors = (inputAuthors:string[]):void => {
        UploadStore.setAuthors(inputAuthors);
    }

    // Save button event
    const onSubmit = async (data: FormInterface) => {
        setIsSubmitting(true);
        try {
            // Create request payload with book metadata
            const book = {
                userId: props.user.id,
                title: data.title,
                authors: toJS(UploadStore.getAuthors()),
                description: data.description,
                tags: toJS(UploadStore.getTags()),
                publisher: data.publisher,
                pubDate: data.pubDate !== '' ? data.pubDate : null,
                language: data.language,
                rating: rating,
                fileName: UploadStore.getFileName(),
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
            const uploadFilesRes = await UploadStore.uploadFiles(bookId);
            if (uploadFilesRes.data.status) {
                BooksStore.requestBooks();
                navigate('/library?fromUpload');
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
            UploadStore.setCoverImageUrl(url);
            UploadStore.setCoverImage(files[0]);
        }
    }

    // Cancel button event
    const handleCancel = () => {
        setIsCancelling(true);
        navigate('/library');
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
                                <Image image={UploadStore.getCoverImageUrl()}/>
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
                            list={UploadStore.getAuthors()}
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
                            list={UploadStore.getTags()}
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
                            color="success"
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
                            color="error"
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

