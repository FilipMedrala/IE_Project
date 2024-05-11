import React from 'react';
import { Bar } from 'react-chartjs-2';
import consumption from "./data/daily_consumption.json";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    ScatterController
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    ScatterController
);

const DailyConsumption = () => {
    const foodGroups = consumption.map(item => item.Food_group);
    const dataYears = ['2018-19', '2019-20', '2020-21', '2021-22', '2022-23'];

    const yearColors = {
        '2018-19': '#003f5c',
        '2019-20': '#58508d',
        '2020-21': '#bc5090',
        '2021-22': '#ff6361',
        '2022-23': '#ffa600'
    };

    const barDatasets = dataYears.map(year => ({
        type: 'bar',
        label: year,
        data: consumption.map(item => item[year.trim()]),
        backgroundColor: yearColors[year]
    }));

    const recommendedServesDataset = {
        type: 'scatter',
        label: 'Recommended serves',
        data: consumption.map((item, index) => ({
            x: index,
            y: item.Recommended_serves
        })),
        borderColor: 'blue',
        backgroundColor: 'blue',
        pointRadius: 5,
        showLine: false,
        tooltip: {
            callbacks: {
                label: function(context) {
                    return 'Recommended: ' + context.raw.y;
                }
            }
        }
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Daily Consumption of Food Groups Over Years',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.dataset.label + ": " + tooltipItem.raw;
                    }
                }
            },
        },
        scales: {
            x: {
                labels: foodGroups
            },
            y: {
                beginAtZero: true,
                suggestedMax: 6
            }
        }
    };

    const chartData = {
        labels: foodGroups,
        datasets: [...barDatasets, recommendedServesDataset]
    };

    return <Bar options={options} data={chartData} />;
};

export default DailyConsumption;
