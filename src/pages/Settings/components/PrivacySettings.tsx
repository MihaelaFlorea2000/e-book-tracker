import React, {useState} from "react";
import styled from "@emotion/styled";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import DownArrow from "./DownArrow";
import AccordionDetails from "@mui/material/AccordionDetails";
import SettingIcon from "./SettingIcon";
import {faCheckCircle, faLock, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {useStore} from "../../../stores/RootStore";
import {SettingsInterface, UserInterface} from "../../../utils/helpers/interfaces";
import {observer} from "mobx-react";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoadingButton from "@mui/lab/LoadingButton";
import {SubmitButtons} from "../../../utils/style/metadataFormStyle";
import {useNavigate} from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import axiosConfig from "../../../utils/helpers/axiosConfig";
import { device } from "../../../utils/helpers/constants";


interface Props {
    user: UserInterface,
    settings: SettingsInterface
}

/**
 * Privacy Settings section of the Settings page
 * @param props
 * @constructor
 */
const PrivacySettings = (props: Props) => {

    const navigate = useNavigate();

    // Get stores
    const { settingsStore } = useStore();

    // Local state
    const [notifications, setNotifications] = useState<boolean>(props.settings.notifications);
    const [profileVisibility, setProfileVisibility] = useState<string>(props.settings.profileVisibility);
    const [goals, setGoals] = useState<boolean>(props.settings.showGoals);
    const [numbers, setNumbers] = useState<boolean>(props.settings.showNumbers);
    const [books, setBooks] = useState<boolean>(props.settings.showBooks);


    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isCancelling, setIsCancelling] = useState<boolean>(false);

    // Update local state
    const handleNotifications = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNotifications(e.target.checked);
    }

    const handleGoals = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGoals(event.target.checked);
    };

    const handleNumbers = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumbers(event.target.checked);
    };

    const handleBooks = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBooks(event.target.checked);
    };

    const handleProfile = (event: SelectChangeEvent) => {
        setProfileVisibility(event.target.value as string);
    };

    // Update state permanently
    const handleSubmit = async () => {
        setIsSubmitting(true);

        const newSettings = {
            notifications: notifications,
            profileVisibility: profileVisibility,
            showGoals: goals,
            showBooks: books,
            showNumbers: numbers
        }

        try {
            const res = await axiosConfig().put('/users/settings/privacy', newSettings)
            console.log(res);
            setIsSubmitting(false);
            settingsStore.requestSettings();
            navigate('/settings?fromUpdate');
        } catch (err) {
            console.log(err);
            setIsSubmitting(false);
        }
    }

    const handleCancel = () => {
        setIsSubmitting(false);
        settingsStore.requestSettings();
        navigate('/library');
    }

    return (
        <Accordion defaultExpanded={settingsStore.getExpandAppearance()}>
            <AccordionSummary
                expandIcon={<DownArrow />}
            >
                <TitleContainer>
                    <SettingIcon icon={faLock} />
                    <Title>Privacy</Title>
                </TitleContainer>
            </AccordionSummary>
            <StyledAccordionDetails>
                <DetailsContainer>
                    <LeftContainer>
                        <Notifications>
                            <SettingText>Notifications</SettingText>
                            <Switch
                                checked={notifications}
                                onChange={handleNotifications}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Notifications>
                        <Profile>
                            <SettingText>Who can see your profile?</SettingText>
                            <SelectContainer>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="profile-select-label"
                                        id="profile-select"
                                        value={profileVisibility}
                                        onChange={handleProfile}
                                    >
                                        <MenuItem value={'all'}>Everyone</MenuItem>
                                        <MenuItem value={'friends'}>Friends Only</MenuItem>
                                        <MenuItem value={'none'}>No one</MenuItem>
                                    </Select>
                                </FormControl>
                            </SelectContainer>
                        </Profile>
                    </LeftContainer>
                    <Show>
                        <SettingText>What do you want to show on your profile page?</SettingText>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={handleGoals}
                                        checked={goals}
                                    />
                                }
                                label="Goals"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={handleNumbers}
                                        checked={numbers}
                                    />
                                }
                                label="Number metrics"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={handleBooks}
                                        checked={books}
                                    />
                                }
                                label="Books read"
                            />
                        </FormGroup>
                    </Show>
                </DetailsContainer>
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

export default observer(PrivacySettings);

const Title = styled.h2`
  padding: 0;
  margin: 0;
`

const TitleContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-flow: column;
  gap: 40px;
`

const DetailsContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-around;

  @media only screen and ${device.tablet} {
    flex-flow: column;
  }
`

const LeftContainer = styled.div`
  width: 30vw;
  display: flex;
  flex-flow: column;
  gap: 20px;

  @media only screen and ${device.tablet} {
    width: 80vw;
  }
`

const Notifications = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const Profile = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  justify-content: center;
`

const SettingText = styled.div`
`

const StyledSubmitButtons = styled(SubmitButtons)`
  align-self: center;
`

const SelectContainer = styled.div`
    width: 80%;
`

const Show = styled.div`
`