import React from "react";
import styled from "@emotion/styled";
import {useParams} from "react-router-dom";
import Profile from "./components/Profile";
import ProfileStore from "../../stores/ProfileStore";
import {observer} from "mobx-react";

const ProfilePage = () => {

    let params = useParams();
    let userId = Number(params.userId);

    return (
        <Page>
            <Profile store={new ProfileStore(userId)}/>
        </Page>
    )
}

export default observer(ProfilePage);

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`
