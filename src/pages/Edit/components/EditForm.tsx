import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileImage,
    faCheckCircle,
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import TagsInput from "../../../utils/components/TagsInput";
import axiosConfig from "../../../config/axiosConfig";
import { StyledTextField } from "../../../utils/style/styledComponents";
import { BookRating } from "../../../utils/components/BookRating";
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
import { useStore } from "../../../stores/RootStore";

interface Props {
    bookId: number;
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

// Edit form validation schema
const metadataSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    series: yup.string(),
    description: yup.string(),
    publisher: yup.string(),
    pubDate: yup.string(),
    language: yup.string()
});

const EditForm = (props:Props) => {

    const navigate = useNavigate();

    //Get stores access
    const { bookStore, editStore, booksStore } = useStore();

    // Edit form state
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isCancelling, setIsCancelling] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormInterface>({
        resolver: yupResolver(metadataSchema),
        mode: 'onChange',
        defaultValues: {
            title: editStore.getTitle(),
            series: editStore.getSeries(),
            description: editStore.getDescription(),
            publisher: editStore.getPublisher(),
            pubDate: editStore.getPubDate(),
            language: editStore.getLanguage()
        }
    });

    // Rating, Authors and Tags state
    const [rating, setRating] = useState<number>(editStore.getRating());

    const getTags = (inputTags:string[]):void => {
        editStore.setTags(inputTags);
    }

    const getAuthors = (inputAuthors:string[]):void => {
        editStore.setAuthors(inputAuthors);
    }

    // Save button event
    const onSubmit = async (data: FormInterface) => {
        setIsSubmitting(true);
        try {
            // Create book metadata
            const book = {
                title: data.title,
                authors: toJS(editStore.getAuthors()),
                description: data.description,
                tags: toJS(editStore.getTags()),
                publisher: data.publisher,
                pubDate: data.pubDate !== '' ? data.pubDate : null,
                language: data.language,
                rating: rating,
                series: data.series,
            }

            // Update metadata
            const editMetadataRes = await axiosConfig().put( `/pg/books/${props.bookId}/edit`, book);

            if (!editMetadataRes.data.status) {
                setIsSubmitting(false);
                setError('errorMessage', {
                    type: 'manual',
                    message: editMetadataRes.data.message
                })
            } else {
                // Update cover image
                const editFilesRes = await editStore.uploadCoverImage(props.bookId);
                if (editFilesRes.data.status) {
                    bookStore.requestBook(props.bookId);
                    booksStore.requestBooks();
                    navigate(`/book/${props.bookId}?fromEdit`);
                } else {
                    setIsSubmitting(false);
                    setError('errorMessage', {
                        type: 'manual',
                        message: editMetadataRes.data.message
                    })
                }
            }

        } catch (err:any) {
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

    // Update cover image
    const uploadImage = (files:FileList | null) => {
        if (files !== null) {
            let url = URL.createObjectURL(files[0]);
            editStore.setCoverImageUrl(url);
            editStore.setCoverImage(files[0]);
        }
    }

    // Cancel button event
    const handleCancel = () => {
        setIsCancelling(true);
        navigate(`/book/${props.bookId}`);
    }

    return (
        <Container>
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
                                <Image image={editStore.getCoverImageUrl()}/>
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
                            list={editStore.getAuthors()}
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
                            list={editStore.getTags()}
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

export default observer(EditForm);

