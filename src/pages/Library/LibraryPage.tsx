import styled from "@emotion/styled";
import React, { ReactNode } from "react";
import BooksStore from "../../stores/BooksStore";
import CircularProgress from "@mui/material/CircularProgress";
import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import Book from "./components/Book";
import Grid from "@mui/material/Grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../utils/style/themeConfig";


const LibraryPage = () => {

    const books = BooksStore.getBooks();

    if (books === undefined) {
        return (
            <LoadingContainer>
                <CircularProgress color="primary" size={50} thickness={8}/>
            </LoadingContainer>
        )
    }

    let bookNodes: ReactNode[] = [];

    books.forEach((elem, index) => {
        bookNodes.push(
            <Grid item xs={6} sm={4} md={3} lg={2}>
                <NavLink to={`/book/${elem.id}`}>
                    <Book key={index} book={elem} />
                </NavLink>
            </Grid>
        )
    })

    return (
        <Page>
            <PageHeader>
                <Title>Library</Title>
                <NavLink to={'/upload'}><IconContainer><FontAwesomeIcon icon={faPlus}/></IconContainer></NavLink>
            </PageHeader>
            <Grid container spacing={3}>
                {bookNodes}
            </Grid>
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
`

const Title = styled.h1`
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

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`