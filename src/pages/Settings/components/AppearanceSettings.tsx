import React, {useState} from "react";
import styled from "@emotion/styled";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import DownArrow from "./DownArrow";
import AccordionDetails from "@mui/material/AccordionDetails";
import SettingIcon from "./SettingIcon";
import {faPalette} from "@fortawesome/free-solid-svg-icons";
import {useStore} from "../../../stores/RootStore";
import {SettingsInterface, UserInterface} from "../../../config/interfaces";
import axiosConfig from "../../../config/axiosConfig";
import {observer} from "mobx-react";
import Switch from "@mui/material/Switch";

interface Props {
    user: UserInterface,
    settings: SettingsInterface
}

const AppearanceSettings = (props: Props) => {

    const { settingsStore } = useStore();

    const handleDarkTheme = async (e:React.ChangeEvent<HTMLInputElement>) => {
        settingsStore.setDarkTheme(e.target.checked);
        try {
            const newTheme = {
                darkTheme: e.target.checked
            }

            const res = await axiosConfig().put('/pg/users/settings/theme', newTheme)
            console.log(res);
            settingsStore.requestSettings();
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<DownArrow />}
            >
                <TitleContainer>
                    <SettingIcon icon={faPalette} />
                    <Title>Appearance</Title>
                </TitleContainer>
            </AccordionSummary>
            <AccordionDetails>
                <Theme>
                    <SettingText>Dark Theme</SettingText>
                    {props.settings.darkTheme
                        ? <Switch defaultChecked onChange={handleDarkTheme}/>
                        : <Switch onChange={handleDarkTheme}/>
                    }

                </Theme>
            </AccordionDetails>
        </Accordion>
    )
}

export default observer(AppearanceSettings);

const Title = styled.h2`
  padding: 0;
  margin: 0;
`

const TitleContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const Theme = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const SettingText = styled.div`
`
