import React from "react";
import styled from "@emotion/styled";
import BookResults from "./components/BookResults";
import UserResults from "./components/UserResults";

const SearchPage = () => {

    return (
        <Page>
            <Title>Search Results</Title>
            <BookResults />
            <UserResults />
        </Page>
    )
}

export default SearchPage;

const Page = styled.div`
    padding: 20px;
`

const Title = styled.h1`
`
