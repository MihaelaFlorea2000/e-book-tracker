import React from "react";
import styled from "@emotion/styled";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {theme} from "../../../../utils/style/themeConfig";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {useStore} from "../../../../stores/RootStore";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import {observer} from "mobx-react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const PercentageBar = () => {

    const { metricsStore } = useStore();

    // Get percent
    const percent = metricsStore.getPercent();

    if(percent === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    const options = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                align: 'end',
                formatter: (val: number) => (`${val*100}%`),
                labels: {
                    value: {
                        color: 'white',
                        font: {
                            size: '20'
                        }
                    }
                }
            },
            tooltip: {
                enabled: false
            }
        },
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                stacked: false,
                display: false
            },
            y: {
                stacked: true,
                display: false
            },
        },
    };

    const labels = ['Books Read'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Books Read',
                data: [percent.value],
                backgroundColor: '#00C9AB',
            },
            {
                label: 'Total Books',
                data: [1],
                backgroundColor: '#ddd',
                datalabels: {
                    display: false
                }
            }
        ],
    };

    return (
        <Container>
            <ChartTitle>Percentage of Books Read</ChartTitle>
            <Bar
                // @ts-ignore
                options={options}
                data={data}
                plugins={[ChartDataLabels]}
                height="19px"
            />
        </Container>
    )
}

export default observer(PercentageBar);

const Container = styled.div`
  background-color: ${theme.palette.info.light};
  padding: 10px;
  width: 97%;
`

const ChartTitle = styled.div`
  color: ${theme.palette.info.main};
  padding: 2px;
`