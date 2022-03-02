import {IntervalInterface} from "../../config/interfaces";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStopwatch} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "@emotion/styled";
import {theme} from "../style/themeConfig";

interface Props {
    time: IntervalInterface
}

export const getTime = (time: IntervalInterface) => {
    if (!time) return '0h'

    const years = time.years ? `${time.years}years ` : '';
    const months = time.months ? `${time.months}months ` : '';
    const days = time.days ? `${time.days}days ` : '';
    const hours = time.hours ? `${time.hours}h ` : '';
    const minutes = time.minutes ? `${time.minutes}min ` : '';

    return `${years}${months}${days}${hours}${minutes}`

}

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
  color: ${theme.palette.info.main}
`

const IconContainer = styled.div`
`

