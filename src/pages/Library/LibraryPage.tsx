import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Book from "./components/Book";
import { theme } from "../../utils/style/themeConfig";
import { CircularLoading } from "../../utils/components/CircularLoading";
import { useStore } from "../../stores/RootStore";


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
                <NavLink to={'/upload/1'}><IconContainer><FontAwesomeIcon icon={faPlus}/></IconContainer></NavLink>
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

const IconContainer = styled.div`
  border-radius: 100%;
  border: 3px solid ${theme.palette.primary.main};
  background-color: ${theme.palette.primary.main};
  color: white;
  padding: 12px;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.5s, background-color 0.5s;
  
  :hover {
    background-color: ${theme.palette.primary.light};
    color: ${theme.palette.primary.main};
  }
`
