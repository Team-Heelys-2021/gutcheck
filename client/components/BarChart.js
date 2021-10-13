import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ entries = [] }) => {
  const {labels, counts } = entries
    .sort((a,b) => new Date(a.date) - new Date(b.date))
    .reduce((acc, cur) => {
      acc.labels.push(cur.date)
      acc.counts.push(cur.count)
      return acc
    }, {labels: [], counts: []})

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: counts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Weekly Progress',
      },
    },
  };

  return  (<>
      <div className="header">
        <h1 className="title">Weekly Progress Dashboard</h1>
      </div>
      <Bar data={data} options={options} />
    </>)
};

export default BarChart;
