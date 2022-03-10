import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import {observer} from "mobx-react";
import User from "./User";
import {UserSearchInterface} from "../../../config/interfaces";
import { NavLink } from "react-router-dom";

interface Props {
    users: UserSearchInterface[]
}

const UserResults = (props: Props) => {

    let userNodes: ReactNode[] = [];

    props.users.forEach((elem, index) => {
        userNodes.push(
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                <NavLink to={`/profile/${elem.id}`}><User user={elem} /></NavLink>
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

export default observer(UserResults);

const Container = styled.div`
`

const Title = styled.h2`
`
