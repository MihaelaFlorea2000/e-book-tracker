// Chart transparent colors
import {useMediaQuery} from "@mui/material";
import {device} from "../../../config/config";

export const chartColors = {
    grey: 'rgba(201, 203, 207, 0.2)',
    orange: 'rgba(255, 159, 64, 0.2)',
    pink: 'rgba(255, 99, 132, 0.2)',
    blue: 'rgba(54, 162, 235, 0.2)',
    green: 'rgba(75, 192, 192, 0.2)',
    purple: 'rgba(153, 102, 255, 0.2)',
    yellow: 'rgba(255, 205, 86, 0.2)',
}

// Chart opaque / border colors
export const chartBorderColors = {
    grey: 'rgba(201, 203, 207)',
    orange: 'rgba(255, 159, 64)',
    pink: 'rgba(255, 99, 132)',
    blue: 'rgba(54, 162, 235)',
    green: 'rgba(75, 192, 192)',
    purple: 'rgba(153, 102, 255)',
    yellow: 'rgba(255, 205, 86)',
}

/**
 * Some code for chart settings is taken from
 * the react-chartjs-2 documentation
 * https://react-chartjs-2.js.org/examples/horizontal-bar-chart
 *
 * The datalabel setting is taken from the chartjs-plugin-datalabels
 * documentation
 * https://chartjs-plugin-datalabels.netlify.app/guide/#table-of-contents
 */
export const getBarChartOptions = (dataValues:number[], type: string, offsetValue: number) => {
    return {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
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
                anchor: 'end',
                align: 'end',
                offset: '10',
                clip: false,
                formatter: (val: number) => {
                    const bookString = val === 1 ? ' book' : ' books'
                    return `${val}${type === 'read' ? 'h' : bookString}`
                },
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
            x: {
                display: false,
                min: 0,
                max: Math.max(...dataValues) + offsetValue
            }
        }
    }
}

/**
 * Some code for chart settings is taken from
 * the react-chartjs-2 documentation
 * https://react-chartjs-2.js.org/examples/line-chart
 *
 * The datalabel setting is taken from the chartjs-plugin-datalabels
 * documentation
 * https://chartjs-plugin-datalabels.netlify.app/guide/#table-of-contents
 */
export const getLineChartOptions = (dataValues:number[]) => {
    return {
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
                min: 0,
                max: Math.max(...dataValues) + 1
            },
        }
    }
}