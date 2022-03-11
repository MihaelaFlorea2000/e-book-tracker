import React from "react";
import styled from "@emotion/styled";
import {SimpleUserInterface} from "../../../config/interfaces";
import {ProfileImage} from "../ProfileImage";

interface Props {
    user: SimpleUserInterface;
}

const User = (props: Props) => {

    return (
        <Container>
            <ProfileImage size="medium" image={props.user.profileImage} />
            <Name>{props.user.firstName} {props.user.lastName}</Name>
        </Container>
    )
}

export default User;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`

const Name = styled.div`
  font-size: 0.9rem;
`
