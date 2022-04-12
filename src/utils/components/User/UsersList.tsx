import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import {observer} from "mobx-react";
import User from "./User";
import {SimpleUserInterface} from "../../helpers/interfaces";
import { NavLink } from "react-router-dom";

interface Props {
    users: SimpleUserInterface[],
    showTitle: boolean
}

/**
 * List of user profile images used for friends
 * and search results
 * @param props
 * @constructor
 */
const UsersList = (props: Props) => {

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
            {props.showTitle && <Title>Users</Title>}
            <Grid container spacing={3}>
                {userNodes}
            </Grid>
        </Container>
    )
}

export default observer(UsersList);

const Container = styled.div`
`

const Title = styled.h2`
`
