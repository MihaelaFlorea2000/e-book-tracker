import React from "react";
import styled from "@emotion/styled";
import BookResults from "./components/BookResults";
import UserResults from "./components/UserResults";
import {Title} from "../../utils/components/Title";

const SearchPage = () => {

    return (
        <Page>
            <Title text="Search Results" />
            <BookResults />
            <UserResults />
        </Page>
    )
}

export default SearchPage;

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`
