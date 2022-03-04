import React from "react";
import styled from "@emotion/styled";
import {observer} from "mobx-react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
} from 'chart.js';
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {useStore} from "../../../../stores/RootStore";
import {theme} from "../../../../utils/style/themeConfig";
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
const YearlyChart = () => {

    const { metricsStore } = useStore();

    // Get data
    const yearlyProgress = metricsStore.getYearlyProgress();

    if(yearlyProgress === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    // Chart labels and data values
    const { labels, dataValues } = yearlyProgress;

    const data = {
        labels,
        datasets: [
            {
                label: 'Reading time per month',
                data: dataValues,
                borderColor: chartBorderColors.pink,
                backgroundColor: chartBorderColors.pink,
            }
        ],
    };

    return (
        <Container>
            <ChartTitle>Yearly reading time</ChartTitle>
            <Line
                // @ts-ignore
                options={getLineChartOptions(dataValues)}
                data={data}
                plugins={[ChartDataLabels]}
            />
        </Container>
    )
}

export default observer(YearlyChart);

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