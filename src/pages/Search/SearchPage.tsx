import React from "react";
import styled from "@emotion/styled";
import BookResults from "./components/BookResults";
import UserResults from "./components/UserResults";
import {Title} from "../../utils/components/Title";
import {useStore} from "../../stores/RootStore";
import {CircularLoading} from "../../utils/components/CircularLoading";
import {NoResult} from "../../utils/components/NoResult";
import { observer } from "mobx-react";

const SearchPage = () => {

    const { searchStore }= useStore();

    const books = searchStore.getBooks();
    const users = searchStore.getUsers();

    if (books === undefined || users === undefined) {
        return (
            <Page>
                <CircularLoading />
            </Page>
        )
    }

    if (books.length === 0 && users.length === 0) {
        return (
            <Page>
                <NoResult />
            </Page>
        )
    }

    return (
        <Page>
            <Title text="Search Results" />
            {books.length > 0 && <BookResults books={books}/>}
            {users.length > 0 &&  <UserResults users={users}/>}
        </Page>
    )
}

export default observer(SearchPage);

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`
