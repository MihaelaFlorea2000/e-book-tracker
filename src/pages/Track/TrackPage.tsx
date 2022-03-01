import React from "react";
import styled from "@emotion/styled";
import Numbers from "./components/Numbers/Numbers";
import { Bar } from "react-chartjs-2";

const TrackPage = () => {

    // const options = {
    //
    // }
    //
    // const data = {
    //
    // }

    return (
        <Page>
            <Title>Track Page</Title>
            <Numbers />
            {/*<Bar*/}
            {/*    options={options}*/}
            {/*    data={data}*/}
            {/*/>*/}
        </Page>
    )
}

export default TrackPage;

const Page = styled.div`
  padding: 20px;
`
const Title = styled.h1`
`