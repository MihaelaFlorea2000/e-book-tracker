import React from "react";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IntervalInterface, FrontSessionInterface} from "../../../utils/helpers/interfaces";
import {DeleteIconContainer } from "../../../utils/style/styledComponents";
import {TimeString} from "../../../utils/components/TimeString";
import formatDate from "../../../utils/helpers/formatDate";
import { device } from "../../../utils/helpers/constants";
import {
    SessionDateContainer,
    SessionTimeContainer,
    SessionButtonsContainer
} from "../../../utils/style/readFormStyle";

interface Props {
    session: FrontSessionInterface,
    readId: number,
    handleDelete: any,
}

/**
 * Component for displaying an individual session
 * in the Add Read form
 * @param props
 * @constructor
 */
const Session = (props: Props) => {

    // Session duration
    const time:IntervalInterface = {
        hours: props.session.hours,
        minutes: props.session.minutes
    }

    // Delete session
    const handleDelete = (e:any) => {
        e.preventDefault();
        props.handleDelete(e.currentTarget.id);
    }

    return (
        <Container>
            <SessionDateContainer>
                {formatDate(props.session.startDate)}
            </SessionDateContainer>
            <SessionTimeContainer>
                <TimeString time={time}/>
            </SessionTimeContainer>
            <SessionButtonsContainer>
                <DeleteIconContainer id={props.session.id} onClick={handleDelete}>
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