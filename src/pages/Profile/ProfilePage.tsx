import React from "react";
import styled from "@emotion/styled";

const ProfilePage = () => {

    return (
        <Page>
            Profile Page
        </Page>
    )
}

export default ProfilePage;

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`
