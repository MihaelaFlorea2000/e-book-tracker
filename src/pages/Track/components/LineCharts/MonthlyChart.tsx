import React from "react";
import styled from "@emotion/styled";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {theme} from "../../../../utils/style/themeConfig";
import {useStore} from "../../../../stores/RootStore";
import {observer} from "mobx-react";
import {useNavigate} from "react-router-dom";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import {chartColors} from "../../helpers/ChartSettings";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MonthlyChart = () => {

    const navigate = useNavigate();

    const { metricsStore } = useStore();

    // Get data
    const monthlyProgress = metricsStore.getMonthlyProgress();

    if(monthlyProgress === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }


    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            datalabels: {
                align: 'end',
                offset: '10',
                clip: false,
                formatter: (val: number) => (`${val}h`),
                labels: {
                    value: {
                        color: 'black',
                        font: {
                            size: '14'
                        }
                    }
                }
            },
        },
        scales: {
            y: {
                display: false,
                min: 0
            },
        },
    };

    const { labels, dataValues } = monthlyProgress;

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: dataValues,
                borderColor: chartColors.green,
                backgroundColor: chartColors.green,
            }
        ],
    };

    return (
        <Container>
            <ChartTitle>Monthly reading time</ChartTitle>
            <Line
                // @ts-ignore
                options={options}
                data={data}
                plugins={[ChartDataLabels]}
            />
        </Container>
    )
}

export default observer(MonthlyChart);

const Container = styled.div`
  background-color: ${theme.palette.info.light};
  padding: 10px;
  display: flex;
  flex-flow: column;
  gap: 20px;
`

const ChartTitle = styled.div`
  color: ${theme.palette.info.main};
  padding: 2px;
`