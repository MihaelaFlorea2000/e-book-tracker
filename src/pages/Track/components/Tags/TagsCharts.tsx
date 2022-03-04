import React, {useState} from "react";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import ByReadChart from "./ByReadChart";
import ByBooksChart from "./ByBooksChart";
import {theme} from "../../../../utils/style/themeConfig";


const TagsCharts = () => {

    // Choose which chart to see
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
                <StyledToggleButton value="read">
                    By Reading Time
                </StyledToggleButton>
                <StyledToggleButton value="book">
                    By Number of Books Owned
                </StyledToggleButton>
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
  width: 50vw;
`

const StyledToggleButton = styled(ToggleButton)`
  font-size: 0.8rem;
`