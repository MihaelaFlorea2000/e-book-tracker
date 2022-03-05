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
import { device } from "../../../config/config";

const Sessions = () => {

    // Get stores
    const { addReadStore } = useStore();

    // Get readId
    const params = useParams();
    const readId = Number(params.readId);

    // Session form state
    const [date, setDate] = useState<string>(new Date().toLocaleDateString());
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);

    const sessions = addReadStore.getSessions();

    // Add session
    const handleAdd = () => {
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
                <FieldContainer>
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
                </FieldContainer>
                <FieldContainer>
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
                </FieldContainer>
                <FieldContainer>
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
                </FieldContainer>
                <ButtonContainer>
                    <AddButton size="medium" onClick={handleAdd}/>
                </ButtonContainer>
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

const AddContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: end;
  justify-content: space-between;

  @media only screen and ${device.tablet} {
    width: 80vw;
    flex-flow: column;
    align-items: center;
  }
`

const FieldContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 5px;
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

const ButtonContainer = styled.div`
  margin-bottom: 10px;
`

const SessionsContainer = styled.div`
  display: flex;
  flex-flow: column;
  border-bottom: 3px solid ${theme.palette.primary.light};
`