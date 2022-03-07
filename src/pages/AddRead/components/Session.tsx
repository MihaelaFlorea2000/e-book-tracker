import React from "react";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {theme } from "../../../utils/style/themeConfig";
import {
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IntervalInterface, FrontSessionInterface} from "../../../config/interfaces";
import {DeleteIconContainer } from "../../../utils/style/styledComponents";
import {TimeString} from "../../../utils/components/TimeString";
import formatDateLong from "../../../config/formatDateLong";
import { device } from "../../../config/config";
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

const Session = (props: Props) => {

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
                {formatDateLong(props.session.startDate)}
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
  border-top: 3px solid ${theme.palette.primary.light};

  @media only screen and ${device.mobileL} {
    padding: 5px;
    font-size: 0.9rem;
  }
`