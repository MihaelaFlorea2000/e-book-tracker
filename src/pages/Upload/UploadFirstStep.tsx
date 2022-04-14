import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { observer } from "mobx-react";
import ePub from "epubjs";
import axios from "axios";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {border } from "../../utils/style/themeConfig";
import { device } from "../../utils/helpers/constants";
import { useStore } from "../../stores/RootStore";
import { formatDateStringISO } from "../../utils/helpers/formatDate";
import {Title} from "../../utils/components/Title";
import {toJS} from "mobx";

interface UploadFormInterface {
    files: FileList,
    errorMessage: string
}

// Upload form validation schema for step 1
// Validate file has the correct format and size
const uploadSchema = yup.object().shape({
    files: yup
        .mixed()
        .test('required', 'File is required', (value) => {
            return value.length > 0
        })
        .test('fileFormat', 'File must be epub format', (value) => {
            if (!value.length) return false;
            return value[0] && ['application/epub+zip'].includes(value[0].type);
        })
        .test('fileSize', 'File size must be below 16MB', (value) => {
            if (!value.length) return false;
            const sizeKB = value[0].size / 1000;
            const sizeMB = sizeKB / 1024;
            return value[0] && sizeMB <= 16;
        })
});

/**
 * Page for uploading an epub file
 * @constructor
 */
const UploadFirstStep = () => {

    const navigate = useNavigate();

    // Get stores access
    const { uploadStore } = useStore();

    // Upload form state
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [filePreview, setFilePreview] = useState<string>("");

    const { register, handleSubmit, formState: { errors }, setError, clearErrors  } = useForm<UploadFormInterface>({
        resolver: yupResolver(uploadSchema),
    });

    // Reset metadata when page loads
    useEffect(() => {
        uploadStore.resetMetadata();
    });

    // Get epub metadata
    const getMetadata = async (file: File) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            const contents = reader.result;
            if (contents !== null) {
                const Book = ePub(contents);
                const bookMetadata = await Book.loaded.metadata;
                const coverUrlRes = await Book.coverUrl();
                const coverUrl = coverUrlRes === null ? '' : coverUrlRes;
                const publicationDate = formatDateStringISO(bookMetadata.pubdate.trim());

                uploadStore.setTitle(bookMetadata.title);
                uploadStore.addAuthor(bookMetadata.creator);
                uploadStore.setDescription(bookMetadata.description);
                uploadStore.setCoverImageUrl(coverUrl);
                uploadStore.setPublisher(bookMetadata.publisher);
                uploadStore.setPubDate(publicationDate);
                uploadStore.setLanguage(bookMetadata.language);
                uploadStore.setFileName(file.name);
                uploadStore.setFile(file);

                axios.get(coverUrl, { responseType: 'blob' })
                    .then(res => {
                        const coverImage = new File([res.data], 'coverImage');
                        uploadStore.setCoverImage(coverImage);
                        uploadStore.setMetadataStatus(true);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            return false;
        };

        await reader.readAsArrayBuffer(file);
    }

    const onSubmit = async (data : UploadFormInterface) => {
        if (!!errors) {
            setIsSubmitting(true);
            try {
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

    // Update file name preview
    const updatePreview = (files : FileList) => {
        if (!!errors) {
            setFilePreview(files[0].name);
        }
    }

    return (
        <Page>
            <Title text="Upload Book" />
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
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`

const UploadContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 30px;
  background-color: ${props => props.theme.palette.info.light};
  padding: 30px;
  border-radius: ${border.borderRadius};
`

const UploadForm = styled.form`
`

const UploadButton = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media only screen and ${device.tablet} {
    flex-flow: column;
    align-items: center;
  }
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

  @media only screen and ${device.tablet} {
    flex-flow: column;
    align-items: center;
  }
`

const SubmitButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const FilePreview = styled.div`
  @media only screen and ${device.tablet} {
    text-align: center;
  }
`
