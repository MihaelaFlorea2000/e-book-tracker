import React, {ReactNode, useState} from "react";
import styled from "@emotion/styled";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import DownArrow from "./DownArrow";
import AccordionDetails from "@mui/material/AccordionDetails";
import SettingIcon from "./SettingIcon";
import {faCheckCircle, faMinus, faPalette, faPlus, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {useStore} from "../../../stores/RootStore";
import {SettingsInterface, UserInterface} from "../../../config/interfaces";
import axiosConfig from "../../../config/axiosConfig";
import {observer} from "mobx-react";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoadingButton from "@mui/lab/LoadingButton";
import {SubmitButtons} from "../../../utils/style/metadataFormStyle";
import {useNavigate} from "react-router-dom";
import {device} from "../../../config/config";
import {pageColors} from "../../Read/helpers/ReaderColors";


interface Props {
    user: UserInterface,
    settings: SettingsInterface
}

const AppearanceSettings = (props: Props) => {

    const navigate = useNavigate();

    const { settingsStore } = useStore();

    const [fontSize, setFontSize] = useState<number>(props.settings.fontSize);
    const [readerTheme, setReaderTheme] = useState<string>(props.settings.readerTheme);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isCancelling, setIsCancelling] = useState<boolean>(false);


    const changeSize = (newSize:number) => {
        setFontSize(newSize)
    }

    const handleDarkTheme = (e:React.ChangeEvent<HTMLInputElement>) => {
        settingsStore.setDarkTheme(e.target.checked);
    }

    const handleSubmit = async() => {
        setIsSubmitting(true);
        try {
            const newSettings = {
                darkTheme: settingsStore.isDarkThemeOn(),
                fontSize: fontSize,
                readerTheme: readerTheme
            }

            const res = await axiosConfig().put('/pg/users/settings/appearance', newSettings)
            console.log(res);
            setIsSubmitting(false);
            settingsStore.requestSettings();
            navigate('/settings?fromUpdate');
        } catch (err) {
            console.log(err);
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setIsSubmitting(false);
        settingsStore.requestSettings();
        navigate('/library');
    };

    return (
        <Accordion defaultExpanded={settingsStore.getExpandAppearance()}>
            <AccordionSummary
                expandIcon={<DownArrow />}
            >
                <TitleContainer>
                    <SettingIcon icon={faPalette} />
                    <Title>Appearance</Title>
                </TitleContainer>
            </AccordionSummary>
            <StyledAccordionDetails>
                <Theme>
                    <SettingText>Dark Theme</SettingText>
                    <Switch
                        checked={settingsStore.isDarkThemeOn()}
                        onChange={handleDarkTheme}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Theme>
                <Font>
                    <FontSizeText>Reader Font Size: </FontSizeText>
                    <SettingsContainer>
                        <Button onClick={() => changeSize(Math.max(80, fontSize - 10))}>
                            <FontAwesomeIcon className="fa-fw" icon={faMinus}/>
                        </Button>
                        <span>{fontSize}%</span>
                        <Button onClick={() => changeSize(Math.min(200, fontSize + 10))}>
                            <FontAwesomeIcon className="fa-fw" icon={faPlus}/>
                        </Button>
                    </SettingsContainer>
                </Font>
                <ReaderTheme>
                    <SettingText>Reader Theme:</SettingText>
                    <Choice>{readerTheme.charAt(0).toUpperCase() + readerTheme.slice(1)}</Choice>
                </ReaderTheme>
                <ColorsContainer>
                    <ColorContainer onClick={() => {setReaderTheme('light')}}>
                        <Color color={pageColors.light.optionColor}/>
                        <ColorLabel>Light</ColorLabel>
                    </ColorContainer>
                    <ColorContainer onClick={() => {setReaderTheme('dark')}}>
                        <Color color={pageColors.dark.optionColor}/>
                        <ColorLabel>Dark</ColorLabel>
                    </ColorContainer>
                    <ColorContainer onClick={() => {setReaderTheme('sepia')}}>
                        <Color color={pageColors.sepia.optionColor}/>
                        <ColorLabel>Sepia</ColorLabel>
                    </ColorContainer>
                </ColorsContainer>
                <StyledSubmitButtons>
                    {isSubmitting
                        ? <LoadingButton loading variant="outlined" size="large" >Submit</LoadingButton>
                        : <Button
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit}
                            startIcon={<FontAwesomeIcon className="fa-fw" icon={faCheckCircle}/>}
                        >
                            Save
                        </Button>
                    }
                    {isCancelling
                        ? <LoadingButton loading variant="outlined" size="large" >Submit</LoadingButton>
                        : <Button
                            type="button"
                            variant="contained"
                            onClick={handleCancel}
                            startIcon={<FontAwesomeIcon className="fa-fw" icon={faTimesCircle}/>}
                        >
                            Cancel
                        </Button>
                    }
                </StyledSubmitButtons>
            </StyledAccordionDetails>
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

const Font = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media only screen and ${device.tablet} {
    flex-flow: column;
  }
`

const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-flow: column;
  gap: 20px;

  @media only screen and ${device.tablet} {
    align-items: center;
  }
`

const SettingsContainer = styled.div`
`

const FontSizeText = styled.span`
`
const StyledSubmitButtons = styled(SubmitButtons)`
  align-self: center;
`

const ReaderTheme = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const Choice = styled.div`
`

const ColorsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const ColorContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :hover :nth-of-type(1){
    border: 1px solid ${props => props.theme.palette.secondary.dark};
  }

  :hover :nth-of-type(2){
    color: ${props => props.theme.palette.secondary.dark};
  }
`

const Color = styled.div<{color: string}>`
  border-radius: 100%;
  background-color: ${props => props.color};
  width: 40px;
  height: 40px;
  border: 1px solid ${props => props.theme.palette.info.main};
  transition: border 0.5s;

  @media only screen and ${device.mobileL} {
    width: 30px;
    height: 30px;
  }
`

const ColorLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.palette.info.main};
  transition: color 0.5s;
  
  @media only screen and ${device.mobileL} {
    font-size: 0.8rem;
  }
`