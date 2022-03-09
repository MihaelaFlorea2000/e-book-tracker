import React from "react";
import styled from "@emotion/styled";
import AccountSettings from "./components/AccountSettings";
import {CircularLoading} from "../../utils/components/CircularLoading";
import {useStore} from "../../stores/RootStore";
import {observer} from "mobx-react";
import AppearanceSettings from "./components/AppearanceSettings";
import {Title} from "../../utils/components/Title";
import PrivacySettings from "./components/PrivacySettings";
import Alert from "@mui/material/Alert";

const SettingsPage = () => {

    const { userStore, settingsStore } = useStore();

    const user = userStore.getCurrentUser();
    const settings = settingsStore.getSettings();

    // Is the user coming after update?
    let url = new URL(window.location.href);
    let fromUpdate = url.searchParams.get('fromUpdate');


    if (user === undefined || settings === undefined) {
        return (
            <Page>
                <Title text="Settings" />
                <CircularLoading />
            </Page>
        )
    }

    settingsStore.setProfileImageUrl(user.profileImage);

    return (
        <Page>
            <Title text="Settings" />
            {fromUpdate !== null && <Alert severity="success">Successful update</Alert> }
            <AccountSettings user={user}/>
            <AppearanceSettings user={user} settings={settings}/>
            <PrivacySettings user={user} settings={settings} />
        </Page>
    )
}

export default observer(SettingsPage);

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`

