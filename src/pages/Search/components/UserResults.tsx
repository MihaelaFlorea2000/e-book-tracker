import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import {useStore} from "../../../stores/RootStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import { NavLink } from "react-router-dom";
import Book from "../../../utils/components/Book";
import Grid from "@mui/material/Grid";
import {observer} from "mobx-react";
import User from "./User";

const BookResults = () => {

    const { searchStore }= useStore();

    const users = searchStore.getUsers();

    if (users === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }


    let userNodes: ReactNode[] = [];

    users.forEach((elem, index) => {
        userNodes.push(
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                <User user={elem} />
            </Grid>
        )
    })


    return (
        <Container>
            <Title>Users</Title>
            <Grid container spacing={3}>
                {userNodes}
            </Grid>
        </Container>
    )
}

export default observer(BookResults);

const Container = styled.div`
`

const Title = styled.h2`
`
