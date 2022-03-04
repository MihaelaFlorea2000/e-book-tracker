import React from "react";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement
} from 'chart.js';
import {theme} from "../../../../utils/style/themeConfig";
import {chartColors} from "../../helpers/ChartSettings";
import { device } from "../../../../config/config";

/**
 * Some code for chart settings is taken from
 * the react-chartjs-2 documentation
 * https://react-chartjs-2.js.org/examples/doughnut-chart
 */
ChartJS.register(
    ArcElement
);

interface Props {
    value: number,
    goal: string
    title: string,
    color: string,
    borderColor: string
}

const Goal = (props: Props) => {

    // Chart options
    const options = {
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        responsive: true,
        maintainAspectRatio: true
    };

    // Chart labels
    const labels = ['Books Read, Total Books'];

    // Grey area of the Doughnut Chart
    const remaining = props.value < 1 ? 1 - props.value : 0;

    // Chart data
    const data = {
        labels,
        datasets: [
            {
                label: 'Books Read',
                data: [props.value, remaining],
                backgroundColor: [props.color, chartColors.grey],
                borderColor: [props.borderColor, chartColors.grey],
                cutout: '65%',
                borderRadius:[5,0]
            }
        ],
    };

    // Format percentage value
    const rounded = Math.round(props.value * 100 * 100) / 100;

    return (
        <Container>
            <ChartTitle>{props.title}</ChartTitle>
            <ChartContainer>
                <Doughnut
                    // @ts-ignore
                    options={options}
                    data={data}
                />
                <Value>{rounded}%</Value>
            </ChartContainer>
            <GoalValue>{props.goal}</GoalValue>
        </Container>
    )
}

export default observer(Goal);

const Container = styled.div`
  background-color: ${theme.palette.info.light};
  padding: 10px;
  text-align: center;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`
const ChartTitle = styled.div`
  color: ${theme.palette.info.main};
  padding: 2px;
  font-size: 1.1rem;
`

const ChartContainer = styled.div`
  background-color: ${theme.palette.info.light};
  padding: 10px;
  width: 13vw;
  position: relative;
  

  @media only screen and ${device.tablet} {
    width: 30vw;
  }
`

const Value = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.3rem;
  margin: 0;
  padding: 0;
`

const GoalValue = styled.div`
  padding: 2px;
`


