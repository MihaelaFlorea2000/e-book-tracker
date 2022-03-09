import React, {useState} from "react";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ByReadChart from "./ByReadChart";
import ByBooksChart from "./ByBooksChart";
import {border} from "../../../../utils/style/themeConfig";
import { device } from "../../../../config/config";
import {useMediaQuery} from "@mui/material";


const TagsCharts = () => {

    // Choose which chart to see
    const [chart, setChart] = useState<string>('read');

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
                <StyledToggleButton value="read">
                    By Reading Time
                </StyledToggleButton>
                <StyledToggleButton value="book">
                    By Number of Books Owned
                </StyledToggleButton>
            </ToggleButtonGroup>
            {chart === 'read' && <ByReadChart isTablet={isTablet} />}
            {chart === 'book' && <ByBooksChart isTablet={isTablet} />}
        </Container>
    )
}

export default observer(TagsCharts);

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

const StyledToggleButton = styled(ToggleButton)`
  font-size: 0.8rem;
`