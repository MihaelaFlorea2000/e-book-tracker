import React, { useState } from "react";
import {NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from "@hookform/error-message";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { theme } from "../../utils/style/themeConfig";
import axiosConfig from "../../config/axiosConfig";

// Data submitted in the form
interface FormState {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    errorMessage: string
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
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup.string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password')], 'Passwords must match')
});

const RegisterPage = () => {

    // For rerouting to Login Page
    let navigate = useNavigate();

    // Handling form submission
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<FormState>({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data : FormState) => {
        if (!!errors) {
            try {
                const res = await axiosConfig().post( "/pg/users/register", data);
                if (res.data.status) {
                    navigate('/login?fromRegister');
                } else {
                    setError('errorMessage', {
                        type: 'manual',
                        message: res.data.message
                    })
                }
            } catch (err:any) {
                setError('errorMessage', {
                    type: 'manual',
                    message: err.response.data.message
                });
            }
        }
    }

    // Show/Hide Passwords
    const [showPassword1, togglePassword1] = useState<boolean>(false);
    const [showPassword2, togglePassword2] = useState<boolean>(false);

    const handleClickShowPassword1 = () => {
        togglePassword1(!showPassword1);
    };

    const handleClickShowPassword2 = () => {
        togglePassword2(!showPassword2);
    };

    return (
        <Page>
            <StyledContainer maxWidth="sm">
                <StyledBox>
                    <TitleContainer>
                        <Title>Register</Title>
                        <Subtitle>Create a new account</Subtitle>
                    </TitleContainer>
                    <FormContainer onSubmit={handleSubmit(onSubmit)}>
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
                                type={showPassword1 ? 'text' : 'password'}
                                error={!!errors.password}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword1}
                                            edge="end"
                                        >
                                            {showPassword1 ? <VisibilityOff /> : <Visibility />}
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
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                            <OutlinedInput
                                {...register('confirmPassword')}
                                id="confirmPassword"
                                type={showPassword2 ? 'text' : 'password'}
                                error={!!errors.confirmPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword2}
                                            edge="end"
                                        >
                                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                            />
                            {!!errors.confirmPassword && (
                                <FormHelperText error id="confirmPassword-error">
                                    {errors.confirmPassword.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <ErrorMessage errors={errors} name="errorMessage" render={({ message }) =>
                            <Alert severity="error">{message}</Alert>
                        } />
                        <LinkContainer>Already have an account? <NavLink to={"/login"}><LinkSpan>Log in </LinkSpan></NavLink></LinkContainer>
                        <ButtonContainer>
                            <Button type="submit" variant="contained" size="large" onClick={() => clearErrors()}>Submit</Button>
                        </ButtonContainer>
                    </FormContainer>

                </StyledBox>
            </StyledContainer>
        </Page>
    )
}

export default RegisterPage;

const Page = styled.div`
  background-color: ${theme.palette.primary.light};
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
  color: ${theme.palette.info.main};
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
  color: ${theme.palette.info.main};
  font-size: 0.9rem;
`

const LinkSpan = styled.span`
  color: ${theme.palette.primary.main};
  font-family: 'PoppinsSemiBold', sans-serif;
  text-decoration: none;
  transition: color 0.5s;
  
  :hover {
    color: ${theme.palette.secondary.main};
  }
`