import React from "react";
import styled from "@emotion/styled";
import Numbers from "../../utils/components/Metrics/Numbers";
import PercentageBar from "./components/Percentge/PercentageBar";
import LineCharts from "./components/LineCharts/LineCharts";
import TagsCharts from "./components/Tags/TagsCharts";
import ReadCalendar from "./components/Calendar/ReadCalendar";
import { device } from "../../config/config";
import {Title} from "../../utils/components/Title";
import Goals from "../../utils/components/Metrics/Goals";
import {useStore} from "../../stores/RootStore";

const TrackPage = () => {

    const { metricsStore } = useStore();

    return (
        <Page>
            <Title text="Track" />
            <MetricsContainer>
                <PercentageBar />
                <Goals store={metricsStore} />
                <Numbers store={metricsStore}/>
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