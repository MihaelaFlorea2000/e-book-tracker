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
import dateConfig from "../../../config/dateConfig";
import { device } from "../../../config/config";


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
            <DateContainer>
                {dateConfig(props.session.startDate)}
            </DateContainer>
            <TimeContainer>
                <TimeString time={time}/>
            </TimeContainer>
            <ButtonsContainer>
                <DeleteIconContainer id={props.session.id} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTimes}/>
                </DeleteIconContainer>
            </ButtonsContainer>
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

const DateContainer = styled.div`
`

const TimeContainer = styled.div`
  width: 10vw;

  @media only screen and ${device.tablet} {
    width: 25vw;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`