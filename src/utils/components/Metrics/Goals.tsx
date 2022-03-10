import React from "react";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {border} from "../../style/themeConfig";
import {CircularLoading} from "../CircularLoading";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import { device } from "../../../config/config";
import ProfileStore from "../../../stores/ProfileStore";
import Goal from "./Goal";
import {chartBorderColors, chartColors} from "../../../pages/Track/helpers/ChartSettings";
import MetricsStore from "../../../stores/MetricsStore";

interface Props {
    store: ProfileStore | MetricsStore,
}

const Goals = (props: Props) => {

    const navigate = useNavigate();

    // Get goals
    const goals = props.store.getGoals();

    if(goals === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    const handleClick = () => {
        if (props.store instanceof MetricsStore) {
            props.store.setSetGoals(goals.set);
            props.store.setGoalsDialogue(true);
            navigate('/track/goals');
        }
    }

    // Create strings
    const yearlyGoalString = `${goals.done.yearly}/${goals.set.yearly} books`
    const monthlyGoalString = `${goals.done.monthly}/${goals.set.monthly} books`

    const dailySetMinutes = goals.set.dailyMinutes === 0 ? '' : `${goals.set.dailyMinutes}min`
    const dailyDoneMinutes = goals.done.dailyMinutes === 0 ? '' : `${goals.done.dailyMinutes}min`

    const dailyGoal = `${goals.done.dailyHours}h ${dailyDoneMinutes}/${goals.set.dailyHours}h ${dailySetMinutes}`

    return (
        <Container>
            {props.store instanceof MetricsStore && <StyledButton onClick={handleClick}>Edit Goals</StyledButton>}
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

const StyledButton = styled(Button)`
  align-self: end;
`