import React, {useState} from "react";
import styled from "@emotion/styled";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import DownArrow from "./DownArrow";
import AccordionDetails from "@mui/material/AccordionDetails";
import SettingIcon from "./SettingIcon";
import {faCheckCircle, faPen, faTimesCircle, faUser} from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import FormHelperText from "@mui/material/FormHelperText";
import {ErrorMessage} from "@hookform/error-message";
import Alert from "@mui/material/Alert";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {useStore} from "../../../stores/RootStore";
import {UserInterface} from "../../../config/interfaces";
import {
    ButtonContainer,
    SubmitButtons
} from "../../../utils/style/metadataFormStyle";
import LoadingButton from "@mui/lab/LoadingButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axiosConfig from "../../../config/axiosConfig";
import {observer} from "mobx-react";
import { device } from "../../../config/config";

// Data submitted in the form
interface FormState {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    profileImage: FileList,
    errorMessage: string
}

interface Props {
    user: UserInterface
}


// Form validation schema
const registerSchema = yup.object({
    firstName: yup.string()
        .required('First Name is required')
        .trim(),
    lastName: yup.string()
        .required('Last Name is required')
        .trim(),
    email: yup.string()
        .required('Email is required')
        .email('Incorrect email format')
        .trim(),
    password: yup.string()
        .nullable()
        .min(8, 'Password must be at least 8 characters')
        .transform((value) => !!value ? value : null)
});

const AccountSettings = (props: Props) => {

    const navigate = useNavigate();

    const { userStore, settingsStore } = useStore();

    // Handling form submission
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<FormState>({
        resolver: yupResolver(registerSchema),
        mode: 'onChange',
        defaultValues: {
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            email: props.user.email,
        }
    });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isCancelling, setIsCancelling] = useState<boolean>(false);

    // Show/Hide Passwords
    const [showPassword, togglePassword] = useState<boolean>(false);

    const handleClickShowPassword = () => {
        togglePassword(!showPassword);
    };

    const handleCancel = () => {
        setIsSubmitting(false);
        navigate('/library');
    };

    const onSubmit = async (data:FormState) => {
        setIsSubmitting(true);
        if(!!errors) {
            try {
                // Update details
                const res = await axiosConfig().put('/pg/users/profile/edit', data)

                if (!res.data.status) {
                    setIsSubmitting(false);
                    setError('errorMessage', {
                        type: 'manual',
                        message: res.data.message
                    })
                    return
                }

                // Upload profile image
                const uploadProfileRes = await settingsStore.uploadProfileImage();
                if (!uploadProfileRes.data.status) {
                    setIsSubmitting(false);
                    setError('errorMessage', {
                        type: 'manual',
                        message: uploadProfileRes.data.message
                    })
                }

                userStore.requestCurrentUser();
                navigate('/settings?fromUpdate');
                setIsSubmitting(false);
            } catch (err:any) {
                setIsSubmitting(false);
                setError('errorMessage', {
                    type: 'manual',
                    message: err.response.data.message
                })
            }
        }
    }

    // Change cover image
    const uploadImage = (files:FileList | null) => {
        if (files !== null) {
            let url = URL.createObjectURL(files[0]);
            settingsStore.setProfileImageUrl(url);
            settingsStore.setProfileImage(files[0]);
        }
    }

    return (
        <Accordion defaultExpanded={settingsStore.getExpandAccount()}>
            <AccordionSummary
                expandIcon={<DownArrow />}
            >
                <TitleContainer>
                    <SettingIcon icon={faUser} />
                    <Title>Account</Title>
                </TitleContainer>
            </AccordionSummary>
            <AccordionDetails>
                <DetailsContainer>
                    <ImageContainer>
                        <Image image={settingsStore.getProfileImageUrl()}/>
                        <ChangeImage>
                            <ButtonContainer>
                               <EditIcon>
                                   <label htmlFor="file">
                                       <FontAwesomeIcon icon={faPen} />
                                   </label>
                                   <input
                                       id="file"
                                       type="file"
                                       accept="image/*"
                                       {...register('profileImage', {
                                           onChange: (Event) => {uploadImage(Event.target.files)}
                                       })}
                                       hidden
                                   />
                               </EditIcon>
                            </ButtonContainer>
                        </ChangeImage>
                    </ImageContainer>
                    <FormContainer onSubmit={handleSubmit(onSubmit)}>
                        <FieldContainer>
                            <TextField
                                {...register('firstName')}
                                id="firstName"
                                label="First Name"
                                variant="outlined"
                                error={!!errors.firstName}
                                helperText={errors.firstName ? errors.firstName.message : ''}
                            />
                            <TextField
                                {...register('lastName')}
                                id="lastName"
                                label="Last Name"
                                variant="outlined"
                                error={!!errors.lastName}
                                helperText={errors.lastName ? errors.lastName.message : ''}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <TextField
                                {...register('email')}
                                id="email"
                                label="Email"
                                variant="outlined"
                                type="email"
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                            />
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    {...register('password')}
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    error={!!errors.password}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                                {!!errors.password && (
                                    <FormHelperText error id="password-error">
                                        {errors.password.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </FieldContainer>
                        <ErrorMessage errors={errors} name="errorMessage" render={({ message }) =>
                            <Alert severity="error">{message}</Alert>
                        } />
                        <SubmitButtons>
                            {isSubmitting
                                ? <LoadingButton loading variant="outlined" size="large" >Submit</LoadingButton>
                                : <Button
                                    type="submit"
                                    variant="contained"
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
                                    onClick={handleCancel}
                                    startIcon={<FontAwesomeIcon className="fa-fw" icon={faTimesCircle}/>}
                                >
                                    Cancel
                                </Button>
                            }
                        </SubmitButtons>
                    </FormContainer>
                </DetailsContainer>
            </AccordionDetails>
        </Accordion>
    )
}

export default observer(AccountSettings);

const Title = styled.h2`
  padding: 0;
  margin: 0;
`

const TitleContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
const FormContainer = styled.form`
  display: flex;
  flex-flow: column;
  gap: 30px;
  margin: 20px 0;
  align-items: center;
  width: 80%;
`

const FieldContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  align-items: start;
  justify-content: center;
  
  .MuiFormControl-root {
    width: 100%;
  }

  @media only screen and ${device.tablet} {
    flex-flow: column;
    gap: 20px;
    align-items: center;
  }
`

const DetailsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-flow: column;
  align-items: center;
  width: 100%;
`

const EditIcon = styled.div`
    background-color: ${props => props.theme.palette.primary.light};
    border: 2px solid ${props => props.theme.palette.info.light};
    width: 25px;
    height: 25px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    cursor: pointer;

    :hover {
        svg {
            color: ${props => props.theme.palette.secondary.main};
        }
    }

    svg {
      cursor: pointer;
      color: ${props => props.theme.palette.primary.main}
    }
  
    input[type="file"] {
        display: none;
    }
`

const ImageContainer = styled.div`
  background-color: red;
  min-width: 100px;
  min-height: 100px;
  position: relative;
  border-radius: 100%;
  
  :hover div:nth-of-type(2) {
    background-color: rgba(255,255,255,0.5);
  }
`

const Image = styled.div<{image: string}>`
  min-width: 100px;
  min-height: 100px;
  position: relative;
  background-image: url(${props => props.image});
  background-size: cover;
  border-radius: 100%;
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