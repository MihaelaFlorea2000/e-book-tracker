import React, {ReactNode, useState} from "react";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {useStore} from "../../../stores/RootStore";
import Session from "./Session";
import { StyledTextField } from "../../../utils/style/styledComponents";
import {AddButton} from "../../../utils/components/AddButton";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import axiosConfig from "../../../config/axiosConfig";
import {
    Subtitle,
    Label,
    SessionsFieldContainer,
    SessionsButtonContainer,
    SessionsContainer,
    AddContainer
} from "../../../utils/style/readFormStyle";
import {isBetween} from "../../../utils/helpers/dateChecks";

const Sessions = () => {

    // Get stores
    const { editReadStore } = useStore();

    // Get readId
    const params = useParams();
    const readId = Number(params.readId);

    // Add session form state
    const [date, setDate] = useState<string>('');
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);

    // Get session
    const sessions = editReadStore.getSessions(readId);

    if (sessions === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    let sessionNodes: ReactNode[] = [];

    sessions.forEach((elem, index) => {
        sessionNodes.push(
            <Session
                key={index}
                session={elem}
                readId={readId}
            />
        )
    })


    // Add session
    const handleAdd = async () => {

        editReadStore.setErrorMessage('');

        // Check start and end date were chosen
        const startDate = editReadStore.getStartDate();
        const endDate = editReadStore.getEndDate();

        if (startDate === '' || endDate === '') {
            editReadStore.setErrorMessage('You must choose a start - end date interval first')
            return
        }


        const noHours = hours.toString() === '0' || !hours;
        const noMinutes = minutes.toString() === '0' || !minutes;

        // Check session has some time
        if (noMinutes && noHours) {
            editReadStore.setErrorMessage('Session time required')
            return
        }

        // Check date is btw start and end
        if (!isBetween(date, startDate, endDate)) {
            editReadStore.setErrorMessage('A session must be between start and end dates')
            return
        }

        const newSession = {
            startDate: date,
            time: {
                hours: hours,
                minutes: minutes
            }
        }

        try {
            const res = await axiosConfig().post(`/pg/sessions/${readId}`, newSession);
            console.log(res);
            editReadStore.requestSessions(readId);

            setDate(new Date().toLocaleDateString());
            setHours(0);
            setMinutes(0);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <Subtitle>Sessions</Subtitle>
            <SessionsContainer>
                {sessionNodes}
            </SessionsContainer>
            <Subtitle>Add Session</Subtitle>
            <AddContainer>
                <SessionsFieldContainer>
                    <Label>Date</Label>
                    <StyledTextField
                        id="date"
                        placeholder="Date"
                        variant="outlined"
                        fullWidth
                        value={date}
                        type="date"
                        onChange={(e:any) => {setDate(e.target.value)}}
                    />
                </SessionsFieldContainer>
                <SessionsFieldContainer>
                    <Label>Hours</Label>
                    <StyledTextField
                        id="hours"
                        placeholder="Hours"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={hours}
                        onChange={(e:any) => {setHours(e.target.value as unknown as number)}}
                    />
                </SessionsFieldContainer>
                <SessionsFieldContainer>
                    <Label>Min</Label>
                    <StyledTextField
                        id="minutes"
                        placeholder="Min"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={minutes}
                        onChange={(e:any) => {setMinutes(e.target.value as unknown as number)}}
                    />
                </SessionsFieldContainer>
                <SessionsButtonContainer>
                    <AddButton size="medium" onClick={handleAdd}/>
                </SessionsButtonContainer>
            </AddContainer>
        </Container>
    )
}

export default observer(Sessions);

const Container = styled.div`
   display: flex;
   flex-flow: column;
   gap: 15px;
   margin: 20px 0;
   padding: 20px 0;
   border-top: 3px solid ${props => props.theme.palette.primary.light};
   border-bottom: 3px solid ${props => props.theme.palette.primary.light};
`
