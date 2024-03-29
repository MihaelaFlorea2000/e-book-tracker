import React from "react";
import styled from "@emotion/styled";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement
} from 'chart.js';
import {useStore} from "../../../../stores/RootStore";
import {observer} from "mobx-react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import {chartBorderColors, chartColors, getBarChartOptions} from "../../helpers/ChartSettings";

/**
 * Chart with top 5 tags by reading time
 *
 * Some code for chart settings is taken from
 * the react-chartjs-2 documentation
 * https://react-chartjs-2.js.org/examples/horizontal-bar-chart
 */
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
);

interface Props {
    isTablet: boolean
}

const ByReadChart = (props: Props) => {

    const { metricsStore, settingsStore } = useStore();

    // Get data
    const topTags = metricsStore.getTopTagsByRead();


    if(topTags === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    // Chart labels and data values
    const { labels, dataValues } = topTags;

    const data = {
        labels,
        datasets: [
            {
                label: 'Reading time per tag',
                data: dataValues,
                borderColor: [
                    chartBorderColors.blue,
                    chartBorderColors.green,
                    chartBorderColors.orange,
                    chartBorderColors.pink,
                    chartBorderColors.purple
                ],
                backgroundColor: [
                    chartColors.blue,
                    chartColors.green,
                    chartColors.orange,
                    chartColors.pink,
                    chartColors.purple
                ],
                borderRadius: 10
            }
        ],
    };

    const offsetValue = props.isTablet ? 10 : 3

    return (
        <Container>
            <ChartTitle>Top Tags</ChartTitle>
            <Bar
                // @ts-ignore
                options={getBarChartOptions(dataValues, 'read', offsetValue, props.isTablet, settingsStore.isDarkThemeOn())}
                data={data}
                plugins={[ChartDataLabels]}
                height={props.isTablet ? "250px" : "150px"}
            />
        </Container>
    )
}

export default observer(ByReadChart);

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