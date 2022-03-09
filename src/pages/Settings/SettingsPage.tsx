import React from "react";
import styled from "@emotion/styled";
import AccountSettings from "./components/AccountSettings";
import {CircularLoading} from "../../utils/components/CircularLoading";
import {useStore} from "../../stores/RootStore";
import {observer} from "mobx-react";
import AppearanceSettings from "./components/AppearanceSettings";
import {Title} from "../../utils/components/Title";

const SettingsPage = () => {

    const { userStore, settingsStore } = useStore();

    const user = userStore.getCurrentUser();
    const settings = settingsStore.getSettings();

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
            <AccountSettings user={user}/>
            <AppearanceSettings user={user} settings={settings}/>
        </Page>
    )
}

export default observer(SettingsPage);

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`

