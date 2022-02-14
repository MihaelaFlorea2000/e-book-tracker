import styled from "@emotion/styled";
import React from "react";
import {useParams} from "react-router-dom";
import BookStore from "../../stores/BookStore";
import {CircularLoading} from "../../utils/components/CircularLoading";
import EditStore from "../../stores/EditStore";
import EditForm from "./components/EditForm";
import {toJS} from "mobx";

const EditPage = () => {

    const params = useParams();
    const bookId = Number(params.bookId);

    const book = BookStore.getBook(bookId);

    if (book === undefined || book.id === undefined) {
        return (
            <Page>
                <CircularLoading />
            </Page>
        )
    }

    EditStore.setMetadata(book);
    console.log(toJS(book));


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
