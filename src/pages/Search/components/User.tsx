import React from "react";
import styled from "@emotion/styled";
import {UserSearchInterface} from "../../../config/interfaces";

interface Props {
    user: UserSearchInterface;
}

const User = (props: Props) => {

    return (
        <Container>
            {props.user.firstName}
        </Container>
    )
}

export default User;

const Container = styled.div`
`
