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
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const Goals = () => {

    const navigate = useNavigate();

    const { metricsStore } = useStore();

    // Get goals
    const goals = metricsStore.getGoals();

    if(goals === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    const handleClick = () => {
        metricsStore.setSetGoals(goals.set);
        metricsStore.setGoalsDialogue(true);
        navigate('/track/goals');
    }

    // Create strings
    const yearlyGoalString = `${goals.done.yearly}/${goals.set.yearly} books`
    const monthlyGoalString = `${goals.done.monthly}/${goals.set.monthly} books`

    const dailySetMinutes = goals.set.dailyMinutes === 0 ? '' : `${goals.set.dailyMinutes}min`
    const dailyDoneMinutes = goals.done.dailyMinutes === 0 ? '' : `${goals.done.dailyMinutes}min`

    const dailyGoal = `${goals.done.dailyHours}h ${dailyDoneMinutes}/${goals.set.dailyHours}h ${dailySetMinutes}`

    return (
        <Container>
            <StyledButton onClick={handleClick}>Edit Goals</StyledButton>
            <GoalsContainer>
                <Goal goal={yearlyGoalString} value={goals.percentage.yearly} title="Yearly" color='#00C9AB'/>
                <Goal goal={monthlyGoalString} value={goals.percentage.monthly} title="Monthly" color='#00E6FF'/>
                <Goal goal={dailyGoal} value={goals.percentage.daily} title="Daily" color='#F4BD5C'/>
            </GoalsContainer>
        </Container>
    )
}

export default observer(Goals);

const Container = styled.div`
  background-color: ${theme.palette.info.light};
  padding: 10px;
  display: flex;
  flex-flow: column;
  gap: 20px;
  width: 50vw;
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