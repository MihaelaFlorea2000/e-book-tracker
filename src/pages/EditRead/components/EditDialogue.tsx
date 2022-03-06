import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import { StyledTextField } from "../../../utils/style/styledComponents";
import { theme } from "../../../utils/style/themeConfig";
import { device } from "../../../config/config";
import { useStore } from "../../../stores/RootStore";
import axiosConfig from "../../../config/axiosConfig";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

/**
 * The code for preserving dialog state
 * (usePrevious and useEffect hooks) was adapted from
 * https://stackoverflow.com/questions/58209791/set-initial-state-for-material-ui-dialog
 */
const usePrevious = (value: boolean) => {
    const ref = useRef<boolean>();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

interface Props {
    readId: number,
}

const EditDialog = (props:Props) => {

    // Get stores
    const { editReadStore } = useStore();

    // Dialog open state
    const isOpen = editReadStore.isEditDialogue();
    const wasOpen = usePrevious(isOpen);

    // Edit session form state
    const [date, setDate] = useState<string>('');
    const [hours, setHours] = useState<number | undefined>(0);
    const [minutes, setMinutes] = useState<number | undefined>(0);


    useEffect(() => {
        // Edit dialog goes from closed to open
        if (isOpen && !wasOpen) {
            setDate(editReadStore.getSessionStartDate());
            setHours(editReadStore.getSessionTime().hours);
            setMinutes(editReadStore.getSessionTime().minutes);
        }
    }, [isOpen, wasOpen]);


    // On CLOSE button
    const handleClose = () => {
        editReadStore.setEditDialog(false);
    };

    // On SAVE button
    const handleSave = async () => {

        const newSession = {
            startDate: date,
            time: {
                hours: hours ? hours : 0,
                minutes: minutes ? minutes : 0
            }
        }

        const sessionId = editReadStore.getSessionId();

        if (sessionId) {
            try {
                const res = await axiosConfig().put(`/pg/sessions/${props.readId}/${sessionId}`, newSession);
                console.log(res);
                editReadStore.requestSessions(props.readId);
            } catch (err) {
                console.log(err);
            }

            editReadStore.setEditDialog(false);
        }
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth={'md'}>
            <Title>Edit Session</Title>
            <FormContainer>
                <Container>
                    <FieldContainer>
                        <Subtitle>Date</Subtitle>
                        <StyledTextField
                            id="date"
                            placeholder="Date"
                            variant="outlined"
                            fullWidth
                            type="date"
                            value={date}
                            onChange={(e) => {setDate(e.target.value)}}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <Subtitle>Time</Subtitle>
                        <TimesContainer>
                            <FieldContainer>
                                <Label>Hours</Label>
                                <StyledTextField
                                    id="hours"
                                    placeholder="Hours"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    value={hours}
                                    onChange={(e) => {setHours(e.target.value as unknown as number)}}
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <Label>Minutes</Label>
                                <StyledTextField
                                    id="minutes"
                                    placeholder="Minutes"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    value={minutes}
                                    onChange={(e) => {setMinutes(e.target.value as unknown as number)}}
                                />
                            </FieldContainer>
                        </TimesContainer>
                    </FieldContainer>
                </Container>
                <StyledDialogActions>
                    <Button
                        type="button"
                        onClick={handleSave}
                        variant="contained"
                        startIcon={<FontAwesomeIcon className="fa-fw" icon={faCheckCircle}/>}
                    >
                        Save
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        onClick={handleClose}
                        startIcon={<FontAwesomeIcon className="fa-fw" icon={faTimesCircle}/>}
                    >
                        Cancel
                    </Button>
                </StyledDialogActions>
            </FormContainer>
        </Dialog>
    )
}

export default observer(EditDialog);

const Title = styled(DialogTitle)`
  font-family: 'PoppinsSemiBold', sans-serif;
`

const Subtitle = styled.div`
  padding-left: 2px;
  font-family: 'PoppinsSemiBold', sans-serif;
  color: ${theme.palette.primary.main};
`

const Label = styled.div`
  padding-left: 2px;
  font-size: 0.9rem;
  font-family: 'PoppinsSemiBold', sans-serif;
  color: ${theme.palette.info.main};
`

const FormContainer = styled.form`
  
  @media only screen and ${device.mobileL} {
    flex-flow: column;
    display: flex;
    align-items: center;
    justify-items: center;
  }
`

const FieldContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 5px;
`

const Container = styled(DialogContent)`
  display: flex;
  flex-flow: column;
  gap: 30px;
`

const TimesContainer = styled.div`
  display: flex;
  gap: 10px;

  @media only screen and ${device.mobileL} {
    flex-flow: column;
  }
`

const StyledDialogActions = styled(DialogActions)`
  button {
    width: 120px;
  }

  @media only screen and ${device.tablet} {
    button {
      width: 100px;
    }
  }
`