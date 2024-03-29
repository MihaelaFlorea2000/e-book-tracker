import React from "react";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from 'chart.js';
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {useStore} from "../../../../stores/RootStore";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import {chartBorderColors, getLineChartOptions} from "../../helpers/ChartSettings";

/**
 * Some code for chart settings is taken from
 * the react-chartjs-2 documentation
 * https://react-chartjs-2.js.org/examples/line-chart
 */
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
);

interface Props {
    isTablet: boolean
}

/**
 * Chart with reading time over the past month
 * @param props
 * @constructor
 */
const MonthlyChart = (props: Props) => {

    // Get stores
    const { metricsStore, settingsStore } = useStore();

    // Get data
    const monthlyProgress = metricsStore.getMonthlyProgress();

    if(monthlyProgress === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    // Chart labels and data values
    const { labels, dataValues } = monthlyProgress;

    const data = {
        labels,
        datasets: [
            {
                label: 'Reading hours per day',
                data: dataValues,
                borderColor: chartBorderColors.green,
                backgroundColor: chartBorderColors.green,
            }
        ],
    };

    return (
        <Container>
            <ChartTitle>Monthly reading time</ChartTitle>
            <Line
                // @ts-ignore
                options={getLineChartOptions(dataValues, props.isTablet, settingsStore.isDarkThemeOn())}
                data={data}
                plugins={[ChartDataLabels]}
            />
        </Container>
    )
}

export default observer(MonthlyChart);

const Container = styled.div`
  background-color: ${props => props.theme.palette.info.light};
  padding: 10px;
  display: flex;
  flex-flow: column;
  gap: 20px;
`

const ChartTitle = styled.div`
  color: ${props => props.theme.palette.info.main};
  padding: 2px;
`