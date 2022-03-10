import React from "react";
import styled from "@emotion/styled";
import ProfileStore from "../../../stores/ProfileStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import { observer } from "mobx-react";
import {ProfileImage} from "../../../utils/components/ProfileImage";

interface Props {
    store: ProfileStore
}

const ProfileDetails = (props: Props) => {

    const profileStore = props.store;

    const user = profileStore.getUser();

    if (user === undefined) {
        return (
            <CircularLoading />
        )
    }

    return (
        <ProfileContainer>
            <ProfileImage size="large" image={user.profileImage}/>
            <NameContainer>
                <Name>{user.firstName} {user.lastName}</Name>
                <Email>{user.email}</Email>
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


