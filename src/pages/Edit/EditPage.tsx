import React from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import {CircularLoading} from "../../utils/components/CircularLoading";
import EditForm from "./components/EditForm";
import { useStore } from "../../stores/RootStore";
import { Title } from "../../utils/components/Title";

/**
 * Page for editing a book's metadata
 * @constructor
 */
const EditPage = () => {

    // Get stores access
    const { bookStore, editStore } = useStore();

    // Get book
    const params = useParams();
    const bookId = Number(params.bookId);

    const book = bookStore.getBook(bookId);

    // Loading
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
            <Title text="Edit Book" />
            <EditForm bookId={book.id}/>
        </Page>
    )
}

export default EditPage;

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`
