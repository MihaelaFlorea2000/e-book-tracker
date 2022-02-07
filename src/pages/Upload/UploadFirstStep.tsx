import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import {faFileUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import ePub from "epubjs";
import Alert from "@mui/material/Alert";
import {ErrorMessage} from "@hookform/error-message";
import {border, theme } from "../../utils/style/themeConfig";
import UploadStore from "../../stores/UploadStore";
import { observer } from "mobx-react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

interface UploadFormInterface {
    files: FileList,
    errorMessage: string
}

// Upload form validation schema
const uploadSchema = yup.object().shape({
    files: yup.mixed()
        .nullable()
        .required('A file is required')
        .test('fileFormat', 'File must be epub format', (value) => {
            return value[0] && ['application/epub+zip'].includes(value[0].type);
        })
        .test('fileSize', 'File size must be below 16MB', (value) => {
            const sizeKB = value[0].size / 1000;
            const sizeMB = sizeKB / 1024;
            return value[0] && sizeMB <= 16;
        })
});

const UploadFirstStep = () => {

    // Upload form
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [filePreview, setFilePreview] = useState<string>("");

    const { register, handleSubmit, formState: { errors }, setError, clearErrors  } = useForm<UploadFormInterface>({
        resolver: yupResolver(uploadSchema),
    });

    const getMetadata = async (file: File) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            const contents = reader.result;
            if (contents !== null) {
                const Book = ePub(contents);
                const bookMetadata = await Book.loaded.metadata;
                const coverUrlRes = await Book.coverUrl();
                const coverUrl = coverUrlRes === null ? '' : coverUrlRes

                UploadStore.setTitle(bookMetadata.title);
                UploadStore.addAuthor(bookMetadata.creator);
                UploadStore.setDescription(bookMetadata.description);
                UploadStore.setCoverImageUrl(coverUrl);
                UploadStore.setPublisher(bookMetadata.publisher);
                UploadStore.setPubDate(new Date(bookMetadata.pubdate).toISOString().split('T')[0]);
                UploadStore.setLanguage(bookMetadata.language);
                UploadStore.setFileName(file.name);
                UploadStore.setFile(file);

                axios.get(coverUrl, { responseType: 'blob' })
                    .then(res => {
                        const coverImage = new File([res.data], 'coverImage');
                        UploadStore.setCoverImage(coverImage);
                        UploadStore.setMetadataStatus(true);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            return false;
        };

        await reader.readAsArrayBuffer(file);
    }

    useEffect(() => {
        UploadStore.resetMetadata();
    });

    let navigate = useNavigate();

    const onSubmit = async (data : UploadFormInterface) => {
        if (!!errors) {
            setIsSubmitting(true);
            try {
                console.log(data.files[0]);
                await getMetadata(data.files[0]);
                setIsSubmitting(false);
                navigate('/upload/2');
            } catch (err:any) {
                setIsSubmitting(false);
                console.log(err);
                setError('errorMessage', {
                    type: 'manual',
                    message: err.response.data.message
                });
            }
        }
    }

    const updatePreview = (files : FileList) => {
        if (!!errors) {
            setFilePreview(files[0].name);
        }
    }

    return (
        <Page>
            <Title>Upload Page</Title>
            <UploadForm onSubmit={handleSubmit(onSubmit)}>
                <UploadContainer>
                    <TextInfo>
                        Choose a digital book (.EPub format) to upload
                    </TextInfo>
                    <ButtonContainer>
                        <UploadButton>
                            <Button variant="contained" component="label" startIcon={<FontAwesomeIcon icon={faFileUpload}/>}>
                                Upload file
                                <input
                                    id="file"
                                    type="file"
                                    {...register('files', {
                                        onChange: (Event) => {updatePreview(Event.target.files)}
                                    })}
                                    accept="application/epub+zip"
                                    hidden
                                />
                            </Button>
                            <FilePreview>{filePreview}</FilePreview>
                        </UploadButton>
                        <SubmitButton>
                            {isSubmitting
                                ? <LoadingButton loading variant="outlined" >Generate</LoadingButton>
                                : <Button type="submit" variant="contained" onClick={() => clearErrors()}>Continue</Button>
                            }
                        </SubmitButton>
                    </ButtonContainer>
                    <InfoContainer>
                        <ErrorMessage errors={errors} name="errorMessage" render={({ message }) =>
                            <Alert severity="error">{message}</Alert>
                        } />
                        {!!errors.files && (
                            <Alert severity="error">{errors.files.message}</Alert>
                        )}
                    </InfoContainer>
                </UploadContainer>
            </UploadForm>
        </Page>
    )
}

export default observer(UploadFirstStep);


const Page = styled.div`
    padding: 20px
`

const Title = styled.h1`
`

const UploadContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 30px;
  background-color: ${theme.palette.info.light};
  padding: 30px;
  border-radius: ${border.borderRadius};
`

const UploadForm = styled.form`

`

const UploadButton = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const InfoContainer = styled.div`
  
`

const TextInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: start;
  justify-content: space-between;
`

const SubmitButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const FilePreview = styled.div`
`
