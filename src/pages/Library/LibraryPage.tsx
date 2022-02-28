import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Book from "./components/Book";
import { CircularLoading } from "../../utils/components/CircularLoading";
import { useStore } from "../../stores/RootStore";
import {AddButton} from "../../utils/components/AddButton";


const LibraryPage = () => {

    // Get BooksStore
    const { booksStore } = useStore();

    // Is the user coming after registration?
    let url = new URL(window.location.href);
    let fromUpload = url.searchParams.get('fromUpload');
    let fromDelete = url.searchParams.get('fromDelete');

    const books = booksStore.getBooks();

    if (books === undefined) {
        return (
            <CircularLoading />
        )
    }

    let bookNodes: ReactNode[] = [];

    books.forEach((elem, index) => {
        bookNodes.push(
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                <Book book={elem} />
            </Grid>
        )
    })

    return (
        <Page>
            <PageHeader>
                <Title>Library</Title>
                <NavLink to={'/upload/1'}><AddButton size="large"/></NavLink>
            </PageHeader>
            <Container>
                {fromUpload !== null && <Alert severity="success">Successful upload</Alert> }
                {fromDelete !== null && <Alert severity="success">Book successfully deleted</Alert> }
                <Grid container spacing={3}>
                    {bookNodes}
                </Grid>
            </Container>
        </Page>
    )
}

export default observer(LibraryPage);

const Page = styled.div`
  padding: 20px;
`

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

const Title = styled.h1`
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
`


