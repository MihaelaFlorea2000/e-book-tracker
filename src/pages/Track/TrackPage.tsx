import React from "react";
import styled from "@emotion/styled";
import Numbers from "../../utils/components/Metrics/Numbers";
import PercentageBar from "./components/Percentge/PercentageBar";
import LineCharts from "./components/LineCharts/LineCharts";
import TagsCharts from "./components/Tags/TagsCharts";
import ReadCalendar from "./components/Calendar/ReadCalendar";
import { device } from "../../utils/helpers/constants";
import {Title} from "../../utils/components/Title";
import Goals from "../../utils/components/Metrics/Goals";
import {useStore} from "../../stores/RootStore";
import {border} from "../../utils/style/themeConfig";

/**
 * Page with all reading metrics
 * @constructor
 */
const TrackPage = () => {

    const { metricsStore } = useStore();

    return (
        <Page>
            <Title text="Track" />
            <MetricsContainer>
                <PercentageBar />
                <GoalsContainer>
                    <Goals store={metricsStore} />
                </GoalsContainer>
                <NumbersContainer>
                    <Numbers size="medium" store={metricsStore}/>
                </NumbersContainer>
                <ReadCalendar />
                <TagsCharts />
                <LineCharts />
            </MetricsContainer>
        </Page>
    )
}

export default TrackPage;

const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`

const MetricsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media only screen and ${device.tablet} {
    flex-flow: column;
    align-items: center;
  }
`

const GoalsContainer = styled.div`
  background-color: ${props => props.theme.palette.info.light};
  padding: 10px;
  display: flex;
  flex-flow: column;
  gap: 20px;
  width: 50vw;
  border-radius: ${border.borderRadius};

  @media only screen and ${device.tablet} {
    width: 90vw;
    align-items: center;
    justify-content: center;
  }
`

const NumbersContainer = styled.div`
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