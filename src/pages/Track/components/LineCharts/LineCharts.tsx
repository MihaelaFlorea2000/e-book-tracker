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
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import WeeklyChart from "./WeeklyChart";
import YearlyChart from "./YearlyChart";
import MonthlyChart from "./MonthlyChart";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const LineCharts = () => {

    const navigate = useNavigate();

    const { metricsStore } = useStore();

    // Get goals
    // const goals = metricsStore.getGoals();
    //
    // if(goals === undefined) {
    //     return (
    //         <Container>
    //             <CircularLoading />
    //         </Container>
    //     )
    // }
    //
    // const handleClick = () => {
    //     metricsStore.setSetGoals(goals.set);
    //     metricsStore.setGoalsDialogue(true);
    //     navigate('/track/goals');
    // }

    return (
        <Container>
            <WeeklyChart />
            <MonthlyChart />
            <YearlyChart />
        </Container>
    )
}

export default observer(LineCharts);

const Container = styled.div`
  background-color: ${theme.palette.info.light};
  padding: 10px;
  display: flex;
  flex-flow: column;
  gap: 20px;
  width: 97%;
`

const GoalsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`

const StyledButton = styled(Button)`
  align-self: end;
`