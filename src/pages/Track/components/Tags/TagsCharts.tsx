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
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import ByReadChart from "./ByReadChart";
import ByBooksChart from "./ByBooksChart";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const TagsCharts = () => {

    const [chart, setChart] = useState<string>('read');

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
                <ToggleButton value="read">
                    By Reading Time
                </ToggleButton>
                <ToggleButton value="book">
                    By Number of Books Owned
                </ToggleButton>
            </ToggleButtonGroup>
            {chart === 'read' && <ByReadChart />}
            {chart === 'book' && <ByBooksChart />}
        </Container>
    )
}

export default observer(TagsCharts);

const Container = styled.div`
  background-color: ${theme.palette.info.light};
  padding: 10px;
  display: flex;
  flex-flow: column;
  gap: 20px;
  width: 97%;
`