import React from "react";
import styled from "@emotion/styled";

const FriendsPage = () => {

    return (
        <Page>
            Friends Page
        </Page>
    )
}

export default FriendsPage;

const Page = styled.div`
    padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`
