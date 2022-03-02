import React from "react";
import styled from "@emotion/styled";
import Numbers from "./components/Numbers/Numbers";
import PercentageBar from "./components/Percentge/PercentageBar";
import Goals from "./components/Goals/Goals";
import LineCharts from "./components/LineCharts/LineCharts";

const TrackPage = () => {

    return (
        <Page>
            <PageTitle>Track Page</PageTitle>
            <MetricsContainer>
                <PercentageBar />
                <Goals />
                <Numbers />
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
`