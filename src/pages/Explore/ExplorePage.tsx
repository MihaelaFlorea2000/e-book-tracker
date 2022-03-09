import React from "react";
import styled from "@emotion/styled";

const ExplorePage = () => {

    return (
        <Page>
            Explore Page
        </Page>
    )
}

export default ExplorePage;

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`
