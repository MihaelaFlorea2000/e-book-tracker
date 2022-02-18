import React from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import {CircularLoading} from "../../utils/components/CircularLoading";
import EditForm from "./components/EditForm";
import { useStore } from "../../stores/RootStore";

const EditPage = () => {

    // Get stores access
    const { bookStore, editStore } = useStore();

    // Get book
    const params = useParams();
    const bookId = Number(params.bookId);

    const book = bookStore.getBook(bookId);

    if (book === undefined || book.id === undefined) {
        return (
            <Page>
                <CircularLoading />
            </Page>
        )
    }

    // Update book metadata state
    editStore.setMetadata(book);

    return (
        <Page>
            <Title>Edit Book</Title>
            <EditForm bookId={book.id}/>
        </Page>
    )
}

export default EditPage;

const Page = styled.div`
    padding: 20px;
`

const Title = styled.h1`
`
