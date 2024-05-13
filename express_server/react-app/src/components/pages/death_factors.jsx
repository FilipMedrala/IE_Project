import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import deathData from './data/death_factors.json';
import 'chart.js/auto';
import { LabelList } from 'recharts';

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const categories = [
      'Diet low in whole grains',
      'Diet low in fruits',
      'Diet low in vegetables',
      'Obesity',
      'Low physical activities'
    ];
    if (deathData && deathData.length > 0) { // Check if deathData is loaded and not empty
      const dataValues = categories.map(category => {
        const item = deathData.find(item => item.Year === 2019);
        return item ? (item[category] || 0) : 0;
      });

      setChartData({
        labels: categories, // Adjusted for vertical bars
        datasets: [{
          label: 'Death Count', // Added a label for the dataset
          data: dataValues,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
      });
    }
  }, []);

  const options = {
    indexAxis: 'y', // Changes the chart to horizontal (vertical bars)
    plugins: {
      title: {
        display: true,
        text: 'Deaths by risk factor in Australia (2019)',
        font: { // Increased title font size
          size: 24
        }
      },
      legend: {
        display: false, // Disable the legend
      }
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Number of Deaths'
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Death Risk Factors'
        }
      }
    }
  };

  if (!chartData) { // Check if chartData is not yet available
    return <div>Loading...</div>;
  }

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
