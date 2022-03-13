import React, { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Book from "../../utils/components/Book/Book";
import { CircularLoading } from "../../utils/components/CircularLoading";
import { useStore } from "../../stores/RootStore";
import {AddButton} from "../../utils/components/Buttons/AddButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSortAlphaDown} from "@fortawesome/free-solid-svg-icons";
import {useTheme} from "@mui/material";
import { Title } from "../../utils/components/Title";


const LibraryPage = () => {

    // Get BooksStore
    const { booksStore } = useStore();

    const theme = useTheme();

    // Is the user coming after registration?
    let url = new URL(window.location.href);
    let fromUpload = url.searchParams.get('fromUpload');
    let fromDelete = url.searchParams.get('fromDelete');

    const books = booksStore.getBooks();

    const [isSortOn, setSortOn] = useState<boolean>(false);

    if (books === undefined) {
        return (
            <CircularLoading />
        )
    }

    let bookNodes: ReactNode[] = [];

    books.forEach((elem, index) => {
        bookNodes.push(
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                <Book read={true} book={elem} width="157px" fromAPI={false}/>
            </Grid>
        )
    })

    const handleSort = () => {
        const newSort = !isSortOn;
        setSortOn(newSort);

        if (newSort) {
            booksStore.sortBooks();
        } else {
            booksStore.requestBooks();
        }

    }

    return (
        <Page>
            <PageHeader>
                <Title text="Library" />
                <ButtonsContainer>
                    <SortButton color={isSortOn ? theme.palette.secondary.main : theme.palette.primary.main} onClick={handleSort}><FontAwesomeIcon icon={faSortAlphaDown} /></SortButton>
                    <NavLink to={'/upload/1'}><AddButton size="large"/></NavLink>
                </ButtonsContainer>
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
  color: ${props => props.theme.palette.secondary.dark}
`

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const SortButton = styled.div<{color: string}>`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  padding: 30px;
  cursor: pointer;
  transition: color 0.5s;
  color: ${props =>  props.color};
  
  :hover {
    color: ${props => props.theme.palette.secondary.main};
  }
`

