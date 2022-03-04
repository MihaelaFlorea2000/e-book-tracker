import React from "react";
import styled from "@emotion/styled";
import {observer} from "mobx-react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {useStore} from "../../../../stores/RootStore";
import {border, theme} from "../../../../utils/style/themeConfig";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import {chartBorderColors, chartColors} from "../../helpers/ChartSettings";
import {useMediaQuery} from "@mui/material";
import {device} from "../../../../config/config";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
);

/**
 * Some code for chart settings is taken from
 * the react-chartjs-2 documentation
 * https://react-chartjs-2.js.org/examples/stacked-bar-chart
 */
const PercentageBar = () => {

    const { metricsStore } = useStore();

    // Get percent
    const percent = metricsStore.getPercent();

    const isTablet = useMediaQuery(device.tablet);

    if(percent === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    // Chart options
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
                offset: '10',
                formatter: (val: number) => (`${val*100}%`),
                labels: {
                    value: {
                        color: 'black',
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

    // Chart Labels and data values
    const labels = ['Books Read'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Books Read',
                data: [percent.value],
                backgroundColor: chartColors.blue,
                borderColor: chartBorderColors.blue,
                borderRadius: 10

            },
            {
                label: 'Total Books',
                data: [1],
                backgroundColor: chartColors.grey,
                datalabels: {
                    display: false
                },
                borderRadius: 10
            }
        ],
    };

    return (
        <Container>
            <ChartTitle>You have read {percent.booksRead} of out {percent.totalBooks} books</ChartTitle>
            <Bar
                // @ts-ignore
                options={options}
                data={data}
                plugins={[ChartDataLabels]}
                height={isTablet ? "50px" : "19px"}
            />
        </Container>
    )
}

export default observer(PercentageBar);

const Container = styled.div`
  background-color: ${theme.palette.info.light};
  padding: 10px;
  width: 97%;
  border-radius: ${border.borderRadius};

  @media only screen and ${device.tablet} {
    width: 90vw;
    align-items: center;
    justify-content: center;
  }
`

const ChartTitle = styled.div`
  color: ${theme.palette.info.main};
  padding: 2px;
`