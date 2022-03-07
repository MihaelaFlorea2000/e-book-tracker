import React, {useState} from "react";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {border, theme} from "../../../../utils/style/themeConfig";
import WeeklyChart from "./WeeklyChart";
import YearlyChart from "./YearlyChart";
import MonthlyChart from "./MonthlyChart";
import TotalChart from "./TotalChart";
import {useMediaQuery} from "@mui/material";
import {device} from "../../../../config/config";

const LineCharts = () => {

    // Choose which chart to see
    const [chart, setChart] = useState<string>('week');

    const handleChange = (event:React.MouseEvent<HTMLElement, MouseEvent>, newChart:string) => {
        setChart(newChart);
    };

    const isTablet = useMediaQuery(device.tablet);

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
            {chart === 'week' && <WeeklyChart isTablet={isTablet}/>}
            {chart === 'month' && <MonthlyChart isTablet={isTablet}/>}
            {chart === 'year' && <YearlyChart isTablet={isTablet}/>}
            {chart === 'total' && <TotalChart isTablet={isTablet}/>}
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
  border-radius: ${border.borderRadius};
`