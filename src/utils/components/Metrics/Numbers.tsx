import React from "react";
import styled from "@emotion/styled";
import {CircularLoading} from "../CircularLoading";
import {observer} from "mobx-react";
import {getTime} from "../TimeString";
import formatDate from "../../helpers/formatDate";
import {
    faBook,
    faBookOpen,
    faCalendar,
    faFeather,
    faHourglassHalf,
    faStopwatch
} from "@fortawesome/free-solid-svg-icons";
import IconDetail from "../IconDetail";
import {border} from "../../style/themeConfig";
import { device } from "../../helpers/constants";
import {chartBorderColors, chartColors} from "../../../pages/Track/helpers/ChartSettings";
import MetricsStore from "../../../stores/MetricsStore";
import ProfileStore from "../../../stores/ProfileStore";

interface Props {
    store: MetricsStore | ProfileStore,
    size: string
}

/**
 * Number metrics used on Track and Profile pages
 * @param props
 * @constructor
 */
const Numbers = (props: Props) => {

    // Get numbers
    const numbers = props.store.getNumbers();

    if (numbers === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    return (
        <Container>
            <IconDetailContainer>
                <IconDetail borderColor={chartBorderColors.green} color={chartColors.green} size={props.size} title="Books Read" detail={`${numbers.booksRead.toString()} book${numbers.booksRead === 1 ? '' : 's'}`} icon={faBook}/>
                <IconDetail borderColor={chartBorderColors.green} color={chartColors.green} size={props.size} title="Authors Read" detail={`${numbers.authorsReadCount.toString()} author${numbers.authorsReadCount === 1 ? '' : 's'}`} icon={faFeather}/>
            </IconDetailContainer>
            <IconDetailContainer>
                <IconDetail borderColor={chartBorderColors.pink} color={chartColors.pink} size={props.size} title="Currently Reading" detail={`${numbers.booksCurrRead.toString()} book${numbers.booksCurrRead === 1 ? '' : 's'}`} icon={faBookOpen}/>
                <IconDetail borderColor={chartBorderColors.pink} color={chartColors.pink} size={props.size} title="Best Day (time)" detail={formatDate(numbers.bestDay)} icon={faCalendar}/>
            </IconDetailContainer>
            <IconDetailContainer>
                <IconDetail borderColor={chartBorderColors.blue} color={chartColors.blue} size={props.size} title="Longest Session" detail={getTime(numbers.longestSession)} icon={faHourglassHalf}/>
                <IconDetail borderColor={chartBorderColors.blue} color={chartColors.blue} size={props.size} title="Time/Session" detail={getTime(numbers.avgTimePerSession)} icon={faStopwatch}/>
            </IconDetailContainer>
        </Container>
    )
}

export default observer(Numbers);

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: ${props => props.theme.palette.info.light};
  align-items: center;
  justify-content: center;
  border-radius: ${border.borderRadius};

  @media only screen and ${device.tablet} {
    align-items: center;
    justify-content: center;
  }
`

const IconDetailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${props => props.theme.palette.info.light};
`