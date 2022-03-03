// Colors the users can use to highlight
export const chartColors = {
    grey: 'rgba(201, 203, 207, 0.2)', //'#ddd',
    orange: 'rgba(255, 159, 64, 0.2)', //'#F4BD5C',
    pink: 'rgba(255, 99, 132, 0.2)', //'#E163B0',
    blue: 'rgba(54, 162, 235, 0.2)', //'#00E6FF',
    green: 'rgba(75, 192, 192, 0.2)', //'#00C9AB',
    purple: 'rgba(153, 102, 255, 0.2)', //'#C695FF',
    yellow: 'rgba(255, 205, 86, 0.2)',
}

export const chartBorderColors = {
    grey: 'rgba(201, 203, 207)',
    orange: 'rgba(255, 159, 64)',
    pink: 'rgba(255, 99, 132)',
    blue: 'rgba(54, 162, 235)',
    green: 'rgba(75, 192, 192)',
    purple: 'rgba(153, 102, 255)',
    yellow: 'rgba(255, 205, 86)',
}

export const getBarChartOptions = (dataValues:number[], type: string) => {
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
                max: Math.max(...dataValues) + 3
            }
        }
    }
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