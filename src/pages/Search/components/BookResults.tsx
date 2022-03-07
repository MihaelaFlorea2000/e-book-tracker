import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import {useStore} from "../../../stores/RootStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import { NavLink } from "react-router-dom";
import Book from "../../../utils/components/Book";
import Grid from "@mui/material/Grid";
import {observer} from "mobx-react";

const BookResults = () => {

    const { searchStore }= useStore();

    const books = searchStore.getBooks();

    if (books === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
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
        <Container>
            <Title>Books</Title>
            <Grid container spacing={3}>
                {bookNodes}
            </Grid>
        </Container>
    )
}

export default observer(BookResults);

const Container = styled.div`
`

const Title = styled.h2`
`
