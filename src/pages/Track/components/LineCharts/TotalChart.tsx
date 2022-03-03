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
import {chartColors, getLineChartOptions} from "../../helpers/ChartSettings";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TotalChart = () => {

    const navigate = useNavigate();

    const { metricsStore } = useStore();

    // Get data
    const totalProgress = metricsStore.getTotalProgress();

    if(totalProgress === undefined) {
        return (
            <Container>
                <CircularLoading />
            </Container>
        )
    }

    const { labels, dataValues } = totalProgress;

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: dataValues,
                borderColor: chartColors.pink,
                backgroundColor: chartColors.pink,
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

export default observer(TotalChart);

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