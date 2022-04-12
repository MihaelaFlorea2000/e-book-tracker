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
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import {chartBorderColors, getLineChartOptions} from "../../helpers/ChartSettings";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

interface Props {
    isTablet: boolean
}
/**
 * Chart with reading time in total
 *
 * Some code for chart settings is taken from
 * the react-chartjs-2 documentation
 * https://react-chartjs-2.js.org/examples/line-chart
 */
const TotalChart = (props: Props) => {

    // Get stores
    const { metricsStore, settingsStore } = useStore();

    // Get data
    const totalProgress = metricsStore.getTotalProgress();

    if(totalProgress === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    // Chart labels and data values
    const { labels, dataValues } = totalProgress;

    const data = {
        labels,
        datasets: [
            {
                label: 'Reading Hours per year',
                data: dataValues,
                borderColor: chartBorderColors.orange,
                backgroundColor: chartBorderColors.orange,
            }
        ],
    };

    return (
        <Container>
            <ChartTitle>Yearly reading time</ChartTitle>
            <Line
                // @ts-ignore
                options={getLineChartOptions(dataValues, props.isTablet, settingsStore.isDarkThemeOn())}
                data={data}
                plugins={[ChartDataLabels]}
            />
        </Container>
    )
}

export default observer(TotalChart);

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