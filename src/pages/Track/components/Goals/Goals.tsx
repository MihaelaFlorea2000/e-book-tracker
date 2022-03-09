import React from "react";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {useStore} from "../../../../stores/RootStore";
import {border} from "../../../../utils/style/themeConfig";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {chartBorderColors, chartColors} from "../../helpers/ChartSettings";
import Goal from "./Goal";
import { device } from "../../../../config/config";

const Goals = () => {

    const navigate = useNavigate();

    // Get stores
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
                <Goal borderColor={chartBorderColors.green} goal={yearlyGoalString} value={goals.percentage.yearly} title="Yearly" color={chartColors.green}/>
                <Goal borderColor={chartBorderColors.pink} goal={monthlyGoalString} value={goals.percentage.monthly} title="Monthly" color={chartColors.pink}/>
                <Goal borderColor={chartBorderColors.blue} goal={dailyGoal} value={goals.percentage.daily} title="Daily" color={chartColors.blue}/>
            </GoalsContainer>
        </Container>
    )
}

export default observer(Goals);

const Container = styled.div`
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

const StyledButton = styled(Button)`
  align-self: end;
`

const GoalsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  @media only screen and ${device.tablet} {
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
`