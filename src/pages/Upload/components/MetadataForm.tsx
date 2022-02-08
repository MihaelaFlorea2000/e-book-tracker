import styled from "@emotion/styled";
import React, {useState} from "react";
import {UserInterface} from "../../../config/interfaces";
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {border, theme} from "../../../utils/style/themeConfig";
import Rating from "@mui/material/Rating";
import TagsInput from "./TagsInput";
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
import { device } from "../../../config/config";
import { StyledTextField } from "../../../utils/style/styledComponents";

interface Props {
    user: UserInterface;
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

// Upload form validation schema
const metadataSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    series: yup.string(),
    description: yup.string().max(300),
    publisher: yup.string(),
    pubDate: yup.string(),
    language: yup.string()
});

const MetadataForm = (props:Props) => {

    const { register, handleSubmit, formState: { errors }, setError, clearErrors, setValue  } = useForm<FormInterface>({
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

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isCancelling, setIsCancelling] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(true);


    const [rating, setRating] = useState<number>(0);
    const [tags, setTags] = useState<string[]>(UploadStore.getTags());
    const [authors, setAuthors] = useState<string[]>(UploadStore.getAuthors());


    const getTags = (inputTags:string[]):void => {
        UploadStore.setTags(inputTags);
    }

    const getAuthors = (inputAuthors:string[]):void => {
        UploadStore.setAuthors(inputAuthors);
    }

    const onSubmit = (data: FormInterface) => {
        setIsSubmitting(true);
        try {
            const book = {
                userId: props.user.id,
                title: data.title,
                authors: toJS(UploadStore.getAuthors()),
                description: data.description,
                tags: toJS(UploadStore.getTags()),
                publisher: data.publisher,
                pubDate: data.pubDate,
                language: data.language,
                rating: rating,
                fileName: UploadStore.getFileName(),
                series: data.series,
            }
            console.log(book);
            console.log(UploadStore.getCoverImage());
            console.log(UploadStore.getFile());
        } catch (err:any) {
            setSuccess(false);
            setIsSubmitting(false);
            setError('errorMessage', {
                type: 'manual',
                message: err.response.data.message
            });
        }
    }

    const checkKeyDown = (event:React.KeyboardEvent<HTMLFormElement>) => {
        if (event.code === 'Enter') event.preventDefault();
    };

    const uploadImage = (files:FileList | null) => {
        if (files !== null) {
            let url = URL.createObjectURL(files[0]);
            UploadStore.setCoverImageUrl(url);
            UploadStore.setCoverImage(files[0]);
        }
    }

    const navigate = useNavigate();

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
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                onChange={(event, newRating) => {
                                    setRating(newRating !== null ? newRating : 0);
                                }}
                                size="large"
                            />
                        </RatingContainer>
                    </LeftFieldsContainer>
                    <RightFieldsContainer>
                        <StyledTextField
                            id="title"
                            label="Title"
                            {...register('title')}
                            variant="outlined"
                            type="text"
                            error={!!errors.title}
                        />
                        <TagsInput
                            id="authors"
                            label="Authors"
                            placeholder="Add Author"
                            getTags={getAuthors}
                            list={UploadStore.getAuthors()}
                        />
                        <StyledTextField
                            id="series"
                            label="Series"
                            {...register('series')}
                            variant="outlined"
                            type="text"
                            error={!!errors.series}
                        />
                        <StyledTextField
                            id="description"
                            label="Description"
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
                                label="Publisher"
                                variant="outlined"
                                {...register('publisher')}
                                error={!!errors.publisher}
                                fullWidth
                                type="text"
                            />
                            <StyledTextField
                                id="pubDate"
                                variant="outlined"
                                {...register('pubDate')}
                                error={!!errors.pubDate}
                                fullWidth
                                type="date"
                            />
                            <StyledTextField
                                id="language"
                                label="Language"
                                {...register('language')}
                                error={!!errors.language}
                                variant="outlined"
                                type="text"
                            />
                        </PublicationDetails>
                        <TagsInput
                            id="tags"
                            label="Tags"
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

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 25px;
`

const FormContainer = styled.form`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`

const FieldsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 25px;
  
  @media only screen and ${device.tablet} {
    flex-flow: column;
    align-items: center;
  }
`

const LeftFieldsContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;

  @media only screen and ${device.tablet} {
    width: 85vw;
  }
`

const CoverContainer = styled.div`
  background-color: ${theme.palette.info.light};;
  border-radius: ${border.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 21.5vw;
  height: calc(21.5vw * 1.6);

  @media only screen and ${device.tablet} {
    width: 85vw;
    height: calc(85vw * 1.6);
  }
`

const ImageContainer = styled.div`
  width: 90%;
  height: 90%;
  position: relative;
  
  :hover div:nth-of-type(2) {
    background-color: rgba(255,255,255,0.5);
  }
`

const Image = styled.div<{image: string | undefined}>`
  background-image: url(${props => props.image});
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const ChangeImage = styled.div`
  background-color: rgba(255,255,255,0);
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.5s;
  cursor: pointer;
  
  :hover div {
    opacity: 1;
  }
`
const ButtonContainer = styled.div`
  opacity: 0;
  transition: opacity 0.5s;
`

const RatingContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;
  background-color: ${theme.palette.info.light};;
  padding: 10px;
  border-radius: ${border.borderRadius};
  
`

const RatingText = styled.div`
  margin-left: 4px;
`

const RightFieldsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-flow: column;
  width: 100%;

  @media only screen and ${device.tablet} {
    width: 85vw;
  }
`

const PublicationDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, calc(35% - 10px)) 30%;
  grid-column-gap: 10px;

  @media only screen and ${device.tablet} {
    display: flex;
    flex-flow: column;
    gap: 20px;
  }
`

const SubmitButtons = styled.div`
  display: flex;
  gap: 50px;
  
  button {
    width: 150px;
  }

  @media only screen and ${device.tablet} {
    width: 90%;
    gap: 30px;
  }
`

