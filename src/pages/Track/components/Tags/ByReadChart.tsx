import React from "react";
import styled from "@emotion/styled";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    BarElement
} from 'chart.js';
import {theme} from "../../../../utils/style/themeConfig";
import {useStore} from "../../../../stores/RootStore";
import {observer} from "mobx-react";
import {Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import {chartBorderColors, chartColors, getBarChartOptions} from "../../helpers/ChartSettings";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ByReadChart = () => {

    const { metricsStore } = useStore();

    // Get data
    const topTags = metricsStore.getTopTagsByRead();

    if(topTags === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    const { labels, dataValues } = topTags;

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
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

    return (
        <Container>
            <ChartTitle>Top Tags</ChartTitle>
            <Bar
                // @ts-ignore
                options={getBarChartOptions(dataValues, 'read')}
                data={data}
                plugins={[ChartDataLabels]}
                height="100px"
            />
        </Container>
    )
}

export default observer(ByReadChart);

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