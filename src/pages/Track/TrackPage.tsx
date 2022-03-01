import React from "react";
import styled from "@emotion/styled";
import Numbers from "./components/Numbers/Numbers";
import PercentageBar from "./components/Percentge/PercentageBar";

const TrackPage = () => {

    return (
        <Page>
            <PageTitle>Track Page</PageTitle>
            <PercentageBar />
            <Numbers />
        </Page>
    )
}

export default TrackPage;

const Page = styled.div`
  padding: 20px;
`
const PageTitle = styled.h1`
`