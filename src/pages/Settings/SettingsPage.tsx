import React from "react";
import styled from "@emotion/styled";
import AccountSettings from "./components/AccountSettings";
import {CircularLoading} from "../../utils/components/CircularLoading";
import {useStore} from "../../stores/RootStore";
import {observer} from "mobx-react";
import Alert from "@mui/material/Alert";

const SettingsPage = () => {

    const { userStore, settingsStore } = useStore();

    const user = userStore.getCurrentUser();

    if (user === undefined) {
        return (
            <Page>
                <Title>Settings Page</Title>
                <CircularLoading />
            </Page>
        )
    }

    settingsStore.setProfileImageUrl(user.profileImage);

    return (
        <Page>
            <Title>Settings Page</Title>
            <AccountSettings user={user}/>
        </Page>
    )
}

export default observer(SettingsPage);

const Page = styled.div`
    padding: 20px;
`

const Title = styled.h1`
`
