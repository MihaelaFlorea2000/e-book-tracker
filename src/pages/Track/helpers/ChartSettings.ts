// Colors the users can use to highlight
export const chartColors = {
    grey: '#ddd',
    orange: '#F4BD5C',
    pink: '#E163B0',
    blue: '#00E6FF',
    green: '#00C9AB'
}

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