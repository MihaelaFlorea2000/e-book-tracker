import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import Book from "../../../utils/components/Book/Book";
import Grid from "@mui/material/Grid";
import {observer} from "mobx-react";
import {SimpleBookInterface} from "../../../utils/helpers/interfaces";

interface Props {
    books: SimpleBookInterface[],
    title: string
}

/**
 * List of books recommended
 * @param props
 * @constructor
 */
const BooksList = (props: Props) => {

    let bookNodes: ReactNode[] = [];

    props.books.forEach((elem, index) => {
        bookNodes.push(
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                <Book read={false} book={elem} width="157px" fromAPI={true}/>
            </Grid>
        )
    })


    return (
        <Container>
            <Title>{props.title}</Title>
            <Grid container spacing={3}>
                {bookNodes}
            </Grid>
        </Container>
    )
}

export default observer(BooksList);

const Container = styled.div`
`

const Title = styled.h2`
`
