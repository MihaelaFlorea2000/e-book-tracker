import React from "react";
import styled from "@emotion/styled";
import {CircularLoading} from "../CircularLoading";
import {observer} from "mobx-react";
import {getTime} from "../TimeString";
import formatDateLong from "../../../config/formatDateLong";
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
import { device } from "../../../config/config";
import {chartBorderColors, chartColors} from "../../../pages/Track/helpers/ChartSettings";
import MetricsStore from "../../../stores/MetricsStore";
import ProfileStore from "../../../stores/ProfileStore";

interface Props {
    store: MetricsStore | ProfileStore
}

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
                <IconDetail borderColor={chartBorderColors.green} color={chartColors.green} size="medium" title="Books Read" detail={`${numbers.booksRead.toString()} book${numbers.booksRead === 1 ? '' : 's'}`} icon={faBook}/>
                <IconDetail borderColor={chartBorderColors.green} color={chartColors.green} size="medium" title="Authors Read" detail={`${numbers.authorsReadCount.toString()} author${numbers.authorsReadCount === 1 ? '' : 's'}`} icon={faFeather}/>
            </IconDetailContainer>
            <IconDetailContainer>
                <IconDetail borderColor={chartBorderColors.pink} color={chartColors.pink} size="medium" title="Currently Reading" detail={`${numbers.booksCurrRead.toString()} book${numbers.booksCurrRead === 1 ? '' : 's'}`} icon={faBookOpen}/>
                <IconDetail borderColor={chartBorderColors.pink} color={chartColors.pink} size="medium" title="Best Day (time)" detail={formatDateLong(numbers.bestDay)} icon={faCalendar}/>
            </IconDetailContainer>
            <IconDetailContainer>
                <IconDetail borderColor={chartBorderColors.blue} color={chartColors.blue} size="medium" title="Longest Session" detail={getTime(numbers.longestSession)} icon={faHourglassHalf}/>
                <IconDetail borderColor={chartBorderColors.blue} color={chartColors.blue} size="medium" title="Time/Session" detail={getTime(numbers.avgTimePerSession)} icon={faStopwatch}/>
            </IconDetailContainer>
        </Container>
    )
}

export default observer(Numbers);

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  background-color: ${props => props.theme.palette.info.light};
  align-items: center;
  justify-content: center;
  width: 30vw;
  border-radius: ${border.borderRadius};

  @media only screen and ${device.tablet} {
    width: 90vw;
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