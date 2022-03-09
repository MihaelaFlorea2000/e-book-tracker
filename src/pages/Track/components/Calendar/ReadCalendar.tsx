import React from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import Calendar, {CalendarTileProperties} from 'react-calendar';
import {chartBorderColors, chartColors} from "../../helpers/ChartSettings";
import {useStore} from "../../../../stores/RootStore";
import {border} from "../../../../utils/style/themeConfig";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import { device } from "../../../../config/config";
import {formatDateISO} from "../../../../config/formatDateLong";

/**
 * The following tutorial helped with adding
 * and styling the ReadCalendar component
 * https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/
 */
const ReadCalendar = () => {

    // Get stores
    const { metricsStore } = useStore();

    // Get dates to highlight
    const calendarDays = metricsStore.getCalendarDays();

    if(calendarDays === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    // Highlight dates
    const today = new Date();

    const highlightDate = ({date, view}:CalendarTileProperties) => {
        if (calendarDays.find(item =>  item === formatDateISO(date))) {
            return 'highlight'
        }

        return ''
    }

    return (
        <Container>
            <Calendar
                value={today}
                tileClassName={highlightDate}
            />
        </Container>
    )
}

export default observer(ReadCalendar);

const Container = styled.div`
  background-color: ${props => props.theme.palette.info.light};
  padding: 10px;
  display: flex;
  flex-flow: column;
  gap: 20px;
  width: 30vw;
  border-radius: ${border.borderRadius};

  @media only screen and ${device.tablet} {
    width: 90vw;
    align-items: center;
    justify-content: center;
  }

  .react-calendar {
    width: auto;
    max-width: 100%;
    height: 100%;
    border: 0;
    line-height: 1.125em;
    background-color: ${props => props.theme.palette.info.light};
    color: ${props => props.theme.palette.secondary.dark}
  }

  .react-calendar button:enabled:hover {
    cursor: default;
  }
  
  .react-calendar__navigation button {
    color: ${chartBorderColors.blue};
    font-size: 1rem;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
      background-color: ${chartColors.grey};
  }
  .react-calendar__navigation button[disabled] {
      background-color: ${chartBorderColors.grey};
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-size: 0.8rem;
  }

   abbr[title] {
     text-decoration: none;
   }

  .react-calendar__month-view__weekdays__weekday {
    padding: 10px;
  }
  
  .react-calendar__month-view__days__day {
    color: inherit;
  }

  .react-calendar__viewContainer {
    height: 86%;
  }
  
  .react-calendar__year-view, .react-calendar__year-view__months,
  .react-calendar__decade-view, .react-calendar__decade-view__years,
  .react-calendar__century-view, .react-calendar__century-view__decades{
    height: 100%;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 0;
    @media only screen and ${device.tablet} {
      padding: 20px 0;
    }
  }

  .react-calendar__month-view {
    height: 100%;
  }
  
  .react-calendar__month-view > div {
    height: 100%;
  }

  .react-calendar__month-view > div > div {
    height: 100%;
  }

  .react-calendar__month-view__days {
    height: 90%;
  }
  
  .react-calendar__tile:disabled {
    background-color: ${chartColors.grey};
    color: ${chartBorderColors.grey}
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: inherit;
  }
  
  .react-calendar__tile--now {
    background: transparent;
    font-weight: bold;
    text-decoration: underline;
    color: ${chartBorderColors.pink} !important;
  }
  
  .highlight {
    background-color: ${chartColors.green};
    color: ${chartBorderColors.green};
  }
  
  .highlight:enabled:hover {
    background-color: ${chartColors.green};
  }
  
  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${props => props.theme.palette.info.main};
  }
`