import React from "react";
import styled from "@emotion/styled";
import {useStore} from "../../../../stores/RootStore";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import {observer} from "mobx-react";
import {getTime} from "../../../../utils/components/TimeString";
import dateConfig from "../../../../config/dateConfig";
import {
    faBook,
    faBookOpen,
    faCalendar,
    faFeather,
    faHourglassHalf,
    faStopwatch
} from "@fortawesome/free-solid-svg-icons";
import IconDetail from "../../../../utils/components/IconDetail";
import {theme} from "../../../../utils/style/themeConfig";
import { device } from "../../../../config/config";
import {chartBorderColors, chartColors} from "../../helpers/ChartSettings";

const Numbers = () => {

    const { metricsStore } = useStore();

    // Get numbers
    const numbers = metricsStore.getNumbers();

    if (numbers === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    return (
        <Container>
            <TopContainer>
                <IconDetail borderColor={chartBorderColors.green} color={chartColors.green} size="medium" title="Books Read" detail={`${numbers.booksRead.toString()} book${numbers.booksRead === 1 ? '' : 's'}`} icon={faBook}/>
                <IconDetail borderColor={chartBorderColors.green} color={chartColors.green} size="medium" title="Authors Read" detail={`${numbers.authorsReadCount.toString()} author${numbers.authorsReadCount === 1 ? '' : 's'}`} icon={faFeather}/>
            </TopContainer>
            <MiddleContainer>
                <IconDetail borderColor={chartBorderColors.pink} color={chartColors.pink} size="medium" title="Books Currently Read" detail={`${numbers.booksCurrRead.toString()} book${numbers.booksCurrRead === 1 ? '' : 's'}`} icon={faBookOpen}/>
                <IconDetail borderColor={chartBorderColors.pink} color={chartColors.pink} size="medium" title="Best Day (time)" detail={dateConfig(numbers.bestDay)} icon={faCalendar}/>
            </MiddleContainer>
            <BottomContainer>
                <IconDetail borderColor={chartBorderColors.blue} color={chartColors.blue} size="medium" title="Longest Session" detail={getTime(numbers.longestSession)} icon={faHourglassHalf}/>
                <IconDetail borderColor={chartBorderColors.blue} color={chartColors.blue} size="medium" title="Time/Session" detail={getTime(numbers.avgTimePerSession)} icon={faStopwatch}/>
            </BottomContainer>
        </Container>
    )
}

export default observer(Numbers);

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  background-color: ${theme.palette.info.light};
  align-items: center;
  justify-content: center;
  width: 30vw;
`

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${theme.palette.info.light};
  flex-wrap: wrap;

  @media only screen and ${device.tablet} {
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }
`

const MiddleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${theme.palette.info.light};
  flex-wrap: wrap;

  @media only screen and ${device.tablet} {
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }
`

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${theme.palette.info.light};
  flex-wrap: wrap;

  @media only screen and ${device.tablet} {
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }
`