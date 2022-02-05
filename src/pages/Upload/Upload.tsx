import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {faFileUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import ePub from "epubjs";
import Alert from "@mui/material/Alert";
import {ErrorMessage} from "@hookform/error-message";
import { MetadataInterface } from "../../config/interfaces";
import UserStore from "../../stores/UserStore";
import MetadataForm from "./components/MetadataForm";
import {border, theme } from "../../utils/style/themeConfig";
import TextField from "@mui/material/TextField";

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

const UploadPage = () => {

    // Upload form
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [metadata, setMetadata] = useState<MetadataInterface | undefined>(undefined);
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
                const coverUrl = await Book.coverUrl();

                const metadataObject : MetadataInterface = {
                    title: bookMetadata.title,
                    authors: [bookMetadata.creator],
                    description: bookMetadata.description,
                    coverImage: coverUrl === null ? '' : coverUrl,
                    tags: [],
                    publisher: bookMetadata.publisher,
                    pubDate: new Date(bookMetadata.pubdate).toISOString().split('T')[0],
                    language: bookMetadata.language,
                    rating: 0,
                    fileName: file.name,
                    series: ''
                }

                console.log(metadataObject);
                setMetadata(metadataObject);
            }
        };

        await reader.readAsArrayBuffer(file);
    }

    const onSubmit = async (data : UploadFormInterface) => {
        if (!!errors) {
            setIsSubmitting(true);
            try {
                console.log(data.files[0]);
                await getMetadata(data.files[0]);
                setIsSubmitting(false);
                setSuccess(true);
            } catch (err:any) {
                setIsSubmitting(false);
                setSuccess(false);
                console.log(err);
                setError('errorMessage', {
                    type: 'manual',
                    message: err.response.data.message
                });
            }
        }
    }

    const updatePreview = (files : FileList) => {
        setSuccess(false)
        if (!!errors) {
            setFilePreview(files[0].name);
        }
    }

    return (
        <Page>
            <Title>Upload book</Title>
            <UploadForm onSubmit={handleSubmit(onSubmit)}>
                <UploadContainer>
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
                        {success && (
                            <Alert severity="success">File OK. You can see and edit the book information below.</Alert>
                        )}
                    </InfoContainer>
                </UploadContainer>
            </UploadForm>
            <MetadataForm metadata={metadata}/>
        </Page>
    )
}

export default UploadPage;

const Page = styled.div`
  padding: 20px;
`

const Title = styled.h1`
`

const UploadContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 25px;
  background-color: ${theme.palette.info.light};
  padding: 50px 30px 30px 30px;
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
