import React from "react";
import styled from "@emotion/styled";
import {UserSearchInterface} from "../../../config/interfaces";
import {ProfileImage} from "../../../utils/components/ProfileImage";
import {theme} from "../../../utils/style/themeConfig";

interface Props {
    user: UserSearchInterface;
}

const User = (props: Props) => {

    return (
        <Container>
            <ProfileImage size="large" image={props.user.profileImage} />
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
