import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import Book from "../../../utils/components/Book/Book";
import Grid from "@mui/material/Grid";
import {observer} from "mobx-react";
import {SimpleBookInterface} from "../../../config/interfaces";

interface Props {
    books: SimpleBookInterface[],
}

const BookResults = (props: Props) => {

    let bookNodes: ReactNode[] = [];

    props.books.forEach((elem, index) => {
        bookNodes.push(
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                <Book read={true} book={elem} width="157px" fromAPI={false}/>
            </Grid>
        )
    })


    return (
        <Container>
            <Title>From Your Library</Title>
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
