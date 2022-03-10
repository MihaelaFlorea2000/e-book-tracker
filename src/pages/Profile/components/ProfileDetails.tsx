import React from "react";
import styled from "@emotion/styled";
import ProfileStore from "../../../stores/ProfileStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import { observer } from "mobx-react";
import {ProfileImage} from "../../../utils/components/ProfileImage";
import {UserInterface} from "../../../config/interfaces";

interface Props {
    user: UserInterface
}

const ProfileDetails = (props: Props) => {
    return (
        <ProfileContainer>
            <ProfileImage size="large" image={props.user.profileImage}/>
            <NameContainer>
                <Name>{props.user.firstName} {props.user.lastName}</Name>
                <Email>{props.user.email}</Email>
            </NameContainer>
        </ProfileContainer>
    )
}

export default observer(ProfileDetails);


const ProfileContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 30px;
  border-bottom: 4px solid ${props => props.theme.palette.primary.light}
`
const NameContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;
`

const Name = styled.h1`
  margin: 0;
  padding: 0;
`
const Email = styled.div`
  color: ${props => props.theme.palette.info.main}
`


