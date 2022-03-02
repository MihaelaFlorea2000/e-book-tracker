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
                <IconDetail size="medium" title="Books Read" detail={`${numbers.booksRead.toString()} books`} icon={faBook}/>
                <IconDetail size="medium" title="Authors Read" detail={`${numbers.authorsReadCount.toString()} authors`} icon={faFeather}/>
            </TopContainer>
            <MiddleContainer>
                <IconDetail size="medium" title="Books Currently Read" detail={`${numbers.booksCurrRead.toString()} books`} icon={faBookOpen}/>
                <IconDetail size="medium" title="Best Day (time)" detail={dateConfig(numbers.bestDay)} icon={faCalendar}/>
            </MiddleContainer>
            <BottomContainer>
                <IconDetail size="medium" title="Longest Session" detail={getTime(numbers.longestSession)} icon={faHourglassHalf}/>
                <IconDetail size="medium" title="Time/Session" detail={getTime(numbers.avgTimePerSession)} icon={faStopwatch}/>
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