import {IntervalInterface} from "../helpers/interfaces";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStopwatch} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "@emotion/styled";

interface Props {
    time: IntervalInterface
}

// Format time interval
export const getTime = (time: IntervalInterface) => {
    if (!time) return '0h'

    const years = time.years ? `${time.years}years ` : '';
    const months = time.months ? `${time.months}months ` : '';
    const days = time.days ? `${time.days}days ` : '';
    const hours = time.hours ? `${time.hours}h ` : '';
    const minutes = time.minutes ? `${time.minutes}min ` : '';

    const timeString = `${years}${months}${days}${hours}${minutes}`;

    return timeString === '' ? '< 1min' : timeString;

}

/**
 * Component displaying a time interval
 * (the time it took to read a book)
 * @param props
 */
export const TimeString = (props: Props) => {

    const timeString = getTime(props.time);

    return (
        <TimeContainer>
            <IconContainer>
                <FontAwesomeIcon icon={faStopwatch}/>
            </IconContainer>
            {timeString}
        </TimeContainer>
    );
}

const TimeContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  color: ${props => props.theme.palette.info.main}
`

const IconContainer = styled.div`
`

