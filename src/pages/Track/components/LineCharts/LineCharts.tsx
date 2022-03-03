import React, {useState} from "react";
import styled from "@emotion/styled";
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import {theme} from "../../../../utils/style/themeConfig";
import {observer} from "mobx-react";
import Button from "@mui/material/Button";
import WeeklyChart from "./WeeklyChart";
import YearlyChart from "./YearlyChart";
import MonthlyChart from "./MonthlyChart";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import TotalChart from "./TotalChart";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const LineCharts = () => {

    const [chart, setChart] = useState<string>('week');

    const handleChange = (event:React.MouseEvent<HTMLElement, MouseEvent>, newChart:string) => {
        setChart(newChart);
    };

    return (
        <Container>
            <ToggleButtonGroup
                value={chart}
                exclusive
                onChange={handleChange}
            >
                <ToggleButton value="week">
                    Week
                </ToggleButton>
                <ToggleButton value="month">
                    Month
                </ToggleButton>
                <ToggleButton value="year">
                    Year
                </ToggleButton>
                <ToggleButton value="total">
                    Total
                </ToggleButton>
            </ToggleButtonGroup>
            {chart === 'week' && <WeeklyChart />}
            {chart === 'month' && <MonthlyChart />}
            {chart === 'year' && <YearlyChart />}
            {chart === 'total' && <TotalChart />}
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