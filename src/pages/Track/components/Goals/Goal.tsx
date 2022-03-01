import React from "react";
import styled from "@emotion/styled";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import {theme} from "../../../../utils/style/themeConfig";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {observer} from "mobx-react";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

interface Props {
    value: number,
    title: string,
    color: string
}

const Goal = (props: Props) => {

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

    const labels = ['Books Read, Total Books'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Books Read',
                data: [props.value, 1 - props.value],
                backgroundColor: [props.color, '#ddd'],
                cutout: '65%'
            }
        ],
    };


    return (
        <Container>
            <ChartTitle>{props.title}</ChartTitle>
            <ChartContainer>
                <Doughnut
                    // @ts-ignore
                    options={options}
                    data={data}
                />
                <Value>{props.value*100}%</Value>
            </ChartContainer>
        </Container>
    )
}

export default observer(Goal);

const Container = styled.div`
  background-color: ${theme.palette.info.light};
  padding: 10px;
  text-align: center;
`

const ChartContainer = styled.div`
  background-color: ${theme.palette.info.light};
  padding: 10px;
  width: 13vw;
  position: relative;
`


const ChartTitle = styled.div`
  color: ${theme.palette.info.main};
  padding: 2px;
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