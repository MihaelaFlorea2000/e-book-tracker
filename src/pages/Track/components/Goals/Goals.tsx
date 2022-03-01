import React from "react";
import styled from "@emotion/styled";
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import {theme} from "../../../../utils/style/themeConfig";
import {useStore} from "../../../../stores/RootStore";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import {observer} from "mobx-react";
import Goal from "./Goal";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const Goals = () => {

    const { metricsStore } = useStore();

    // Get percent

    // if(percent === undefined) {
    //     return (
    //         <Container>
    //             <CircularLoading />
    //         </Container>
    //     )
    // }

    return (
        <Container>
            <Goal value={0.5} title="Yearly" color='#00C9AB'/>
            <Goal value={0.6} title="Monthly" color='#00E6FF'/>
            <Goal value={0.9} title="Daily" color='#F4BD5C'/>
        </Container>
    )
}

export default observer(Goals);

const Container = styled.div`
  background-color: ${theme.palette.info.light};
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 50vw;
`