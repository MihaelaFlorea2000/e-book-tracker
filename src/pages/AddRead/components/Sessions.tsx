import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {theme } from "../../../utils/style/themeConfig";
import {useStore} from "../../../stores/RootStore";
import Session from "./Session";
import { StyledTextField } from "../../../utils/style/styledComponents";
import {AddButton} from "../../../utils/components/AddButton";
import {FrontSessionInterface} from "../../../config/interfaces";
import {
    Subtitle,
    Label,
    SessionsFieldContainer,
    SessionsButtonContainer,
    SessionsContainer,
    AddContainer
} from "../../../utils/style/readFormStyle";


const Sessions = () => {

    // Get stores
    const { addReadStore } = useStore();

    // Get readId
    const params = useParams();
    const readId = Number(params.readId);

    // Session form state
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);


    const sessions = addReadStore.getSessions();

    // Add session
    const handleAdd = () => {

        addReadStore.setErrorMessage('');

        // Check start and end date were chosen
        const startDate = addReadStore.getStartDate();
        const endDate = addReadStore.getEndDate();

        if (startDate === '' || endDate === '') {
            addReadStore.setErrorMessage('You must choose a start - end date interval first')
            return
        }

        // Check session has some time
        if (hours === 0 && minutes === 0 ) {
            addReadStore.setErrorMessage('Session time required')
            return
        }

        // Check date is btw start and end
        const startDateTime = new Date(startDate).getTime();
        const endDateTime = new Date(endDate).getTime();
        const dateTime = new Date(date).getTime();

        if (startDateTime > dateTime || dateTime > endDateTime) {
            addReadStore.setErrorMessage('A session must be between start and end dates')
            return
        }

        // Add new session
        const newSession:FrontSessionInterface = {
            id: (sessions.length + 1).toString(),
            startDate: date,
            hours: hours,
            minutes: minutes
        }

        const newSessions = sessions;
        newSessions.push(newSession);
        addReadStore.setSessions(newSessions);

        setDate(new Date().toLocaleDateString());
        setHours(0);
        setMinutes(0);
    }

    // Delete Session
    const handleDelete = (id:string | undefined) => {
        let filtered = sessions.filter(session => {
            return session.id !== id
        });
        addReadStore.setSessions(filtered);
    }

    return (
        <Container>
            <Subtitle>Sessions</Subtitle>
            <SessionsContainer>
                {sessions.map((ses, index) => (
                    <Session
                        key={index}
                        session={ses}
                        readId={readId}
                        handleDelete={handleDelete}
                    />
                ))}
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
                        onChange={(e) => {setDate(e.target.value)}}
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
                        onChange={(e) => {setHours(e.target.value as unknown as number)}}
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
                        onChange={(e) => {setMinutes(e.target.value as unknown as number)}}
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
   border-top: 3px solid ${theme.palette.primary.light};
   border-bottom: 3px solid ${theme.palette.primary.light};
`