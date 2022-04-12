import React from "react";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {
    faEdit,
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SessionInterface} from "../../../utils/helpers/interfaces";
import {DeleteIconContainer, EditIconContainer } from "../../../utils/style/styledComponents";
import {TimeString} from "../../../utils/components/TimeString";
import formatDate from "../../../utils/helpers/formatDate";
import { device } from "../../../utils/helpers/constants";
import axiosConfig from "../../../utils/helpers/axiosConfig";
import {useStore} from "../../../stores/RootStore";
import {
    SessionDateContainer,
    SessionTimeContainer,
    SessionButtonsContainer
} from "../../../utils/style/readFormStyle";

interface Props {
    session: SessionInterface,
    readId: number
}

/**
 * Component displaying a Session of the Read being edited
 * @param props
 * @constructor
 */
const Session = (props: Props) => {

    const { editReadStore } = useStore();

    // Delete session
    const handleDelete = async () => {
        try {
            const res = await axiosConfig().delete(`/sessions/${props.readId}/${props.session.id}`);
            console.log(res);
            editReadStore.requestSessions(props.readId);
        } catch (err) {
            console.log(err);
        }
    }

    // Edit session
    const handleEdit = async () => {
        editReadStore.setEditDialog(true);
        editReadStore.setErrorMessage('');
        editReadStore.setCurrentSession(props.session);
    }

    return (
        <Container>
            <SessionDateContainer>
                {formatDate(props.session.startDate)}
            </SessionDateContainer>
            <SessionTimeContainer>
                <TimeString time={props.session.time}/>
            </SessionTimeContainer>
            <SessionButtonsContainer>
                <EditIconContainer onClick={handleEdit}>
                    <FontAwesomeIcon icon={faEdit}/>
                </EditIconContainer>
                <DeleteIconContainer onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTimes}/>
                </DeleteIconContainer>
            </SessionButtonsContainer>
        </Container>
    )
}

export default observer(Session);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-top: 3px solid ${props => props.theme.palette.primary.light};

  @media only screen and ${device.mobileL} {
    padding: 5px;
    font-size: 0.9rem;
  }
`