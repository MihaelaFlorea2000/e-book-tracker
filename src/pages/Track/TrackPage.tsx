import React from "react";
import styled from "@emotion/styled";
import Numbers from "./components/Numbers/Numbers";
import PercentageBar from "./components/Percentge/PercentageBar";
import Goals from "./components/Goals/Goals";
import LineCharts from "./components/LineCharts/LineCharts";
import TagsCharts from "./components/Tags/TagsCharts";
import ReadCalendar from "./components/Calendar/ReadCalendar";
import { device } from "../../config/config";

const TrackPage = () => {

    return (
        <Page>
            <PageTitle>Track Page</PageTitle>
            <MetricsContainer>
                <PercentageBar />
                <Goals />
                <Numbers />
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
`

const PageTitle = styled.h1`
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