import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {NavLink } from "react-router-dom";
import * as yup from "yup";
import styled from "@emotion/styled";
import { yupResolver } from '@hookform/resolvers/yup';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Alert from "@mui/material/Alert";
import {Visibility, VisibilityOff } from "@mui/icons-material";
import axiosConfig from "../../config/axiosConfig";
import { observer } from "mobx-react";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginStore from "../../stores/LoginStore";
import { useStore } from "../../stores/RootStore";

// Data submitted in the form
interface FormInterface {
    email: string,
    password: string,
    errorMessage: string
}

// Form validation schema
const loginSchema = yup.object({
    email: yup.string()
        .required('Email is required')
        .email('Incorrect email format')
        .trim(),
    password: yup.string()
        .required('Password is required')
});

const LoginPage = () => {

    // Get stores access
    const { userStore, booksStore, metricsStore, settingsStore } = useStore();

    // Handling form submission
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, setError, clearErrors  } = useForm<FormInterface>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data : FormInterface) => {
        if (!!errors) {
            setIsSubmitting(true);
            try {
                const res = await axiosConfig().post( "/pg/users/login", data);
                if (res.data.status) {
                    LoginStore.login(res.data.token);
                    userStore.requestCurrentUser();
                    settingsStore.requestSettings();
                    booksStore.requestBooks();
                    metricsStore.trackRefresh();
                } else {
                    setIsSubmitting(false);
                    setError('errorMessage', {
                        type: 'manual',
                        message: res.data.message
                    })
                }
            } catch (err:any) {
                setIsSubmitting(false);
                setError('errorMessage', {
                    type: 'manual',
                    message: err.response.data.message
                });
            }
        }
    }

    // Show/Hide Passwords
    const [showPassword, togglePassword] = useState<boolean>(false);

    const handleClickShowPassword = () => {
        togglePassword(!showPassword);
    };

    // Is the user coming after registration?
    let url = new URL(window.location.href);
    let fromRegister = url.searchParams.get('fromRegister');
    console.log(fromRegister);

    return (
        <Page>
            <StyledContainer maxWidth="sm">
                <StyledBox>
                    <TitleContainer>
                        <Title>Login</Title>
                        <Subtitle>Enter your information below</Subtitle>
                    </TitleContainer>
                    {fromRegister !== null && <Alert severity="success">Successful registration</Alert> }
                    <FormContainer onSubmit={handleSubmit(onSubmit)}>
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
                        <ErrorMessage errors={errors} name="errorMessage" render={({ message }) =>
                            <Alert severity="error">{message}</Alert>
                        } />
                        <LinkContainer>Don't have an account? <NavLink to={"/register"}><LinkSpan>Register for free </LinkSpan></NavLink></LinkContainer>
                        <ButtonContainer>
                            {isSubmitting
                                ? <LoadingButton loading variant="outlined" size="large" >Submit</LoadingButton>
                                : <Button type="submit" variant="contained" size="large" onClick={() => clearErrors()}>Submit</Button>
                            }
                        </ButtonContainer>
                    </FormContainer>

                </StyledBox>
            </StyledContainer>
        </Page>
    )
}

export default observer(LoginPage);

const Page = styled.div`
  background-color: ${props => props.theme.palette.primary.light};
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100vh;
  width: 100vw;
`

const StyledContainer = styled(Container)(() => ({
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
}));

const StyledBox = styled(Box)(() => ({
    display: 'flex',
    flexFlow: 'column',
    padding: '100px 50px'
}));

const TitleContainer = styled.div`
`

const Title = styled.h1`
  margin: 5px 0;
`

const Subtitle = styled.div`
  color: ${props => props.theme.palette.info.main};
  font-size: 0.8rem;
  font-weight: normal;
  margin: 5px 0;
`

const FormContainer = styled.form`
  display: flex;
  flex-flow: column;
  gap: 1rem;
  margin: 20px 0;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
const LinkContainer = styled.div`
  color: ${props => props.theme.palette.info.main};
  font-size: 0.9rem;
`

const LinkSpan = styled.span`
  color: ${props => props.theme.palette.primary.main};
  font-family: 'PoppinsSemiBold', sans-serif;
  text-decoration: none;
  transition: color 0.5s;
  
  :hover {
    color: ${props => props.theme.palette.secondary.main};
  }
`