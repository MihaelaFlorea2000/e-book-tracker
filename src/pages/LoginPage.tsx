import styled from "@emotion/styled";
import React from "react";

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