import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import Book from "../../../utils/components/Book/Book";
import Grid from "@mui/material/Grid";
import {observer} from "mobx-react";
import ProfileStore from "../../../stores/ProfileStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";

interface Props {
    store: ProfileStore
}

const UserBooks = (props: Props) => {

    const books = props.store.getBooks();

    if (books === undefined) {
        return (
            <CircularLoading />
        )
    }

    let bookNodes: ReactNode[] = [];

    books.forEach((elem, index) => {
        bookNodes.push(
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                <Book read={false} book={elem} width="147px" fromAPI={false}/>
            </Grid>
        )
    })


    return (
        <Container>
            <Title>Latest Books</Title>
            <Grid container spacing={3}>
                {bookNodes}
            </Grid>
        </Container>
    )
}

export default observer(UserBooks);

const Container = styled.div`
`

const Title = styled.h2`
`
