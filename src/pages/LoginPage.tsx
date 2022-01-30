import React from "react";
import styled from "styled-components";

const LoginPage = () => {
    return (
        <Page>
            <Container>
                <TitleContainer>
                    <Title>Login</Title>
                    <Subtitle>Enter your credentials below</Subtitle>
                </TitleContainer>
                <FormContainer>

                </FormContainer>
            </Container>
        </Page>
    )
}

export default LoginPage;

const Page = styled.div`
`

const Container = styled.div`
`
const TitleContainer = styled.div`
`
const Title = styled.div`
`
const Subtitle = styled.div`
`

const FormContainer = styled.form`
`