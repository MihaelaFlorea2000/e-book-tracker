import React from "react";
import styled from "@emotion/styled";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
} from 'chart.js';
import {theme} from "../../../../utils/style/themeConfig";
import {useStore} from "../../../../stores/RootStore";
import {observer} from "mobx-react";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import {chartBorderColors, getLineChartOptions} from "../../helpers/ChartSettings";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

/**
 * Some code for chart settings is taken from
 * the react-chartjs-2 documentation
 * https://react-chartjs-2.js.org/examples/line-chart
 */
const WeeklyChart = () => {

    const { metricsStore } = useStore();

    // Get data
    const weeklyProgress = metricsStore.getWeeklyProgress();

    if(weeklyProgress === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    // Chart labels and data values
    const { labels, dataValues } = weeklyProgress;

    const data = {
        labels,
        datasets: [
            {
                label: 'Reading hours per day',
                data: dataValues,
                borderColor: chartBorderColors.blue,
                backgroundColor: chartBorderColors.blue,
            }
        ],
    };

    return (
        <Container>
            <ChartTitle>Weekly reading time</ChartTitle>
            <Line
                // @ts-ignore
                options={getLineChartOptions(dataValues)}
                data={data}
                plugins={[ChartDataLabels]}
            />
        </Container>
    )
}

export default observer(WeeklyChart);

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