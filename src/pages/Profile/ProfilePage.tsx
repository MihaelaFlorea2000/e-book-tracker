import React from "react";
import styled from "@emotion/styled";
import {useParams} from "react-router-dom";
import ProfileStore from "../../stores/ProfileStore";
import {observer} from "mobx-react";
import Profile from "./components/Profile";

const ProfilePage = () => {

    let params = useParams();
    let userId = Number(params.userId);

    const profileStore = new ProfileStore(userId);

    return (
        <Page>
            <Profile store={profileStore} />
        </Page>
    )
}

export default observer(ProfilePage);

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`