import React from 'react';
import { Bar } from 'react-chartjs-2';

const HorizontalBarChart = ({ entries }) => {
  const [color, setColor] = React.useState('rgba(255, 99, 132, 1)');

  React.useEffect(() => {
    switch (true) {
      case entries.length >= 7:
        setColor('rgba(75, 192, 192, 1)');
        break;
      case entries.length >= 3:
        setColor('rgba(255, 206, 86, 1)');
        break;
      case entries.length < 3:
        setColor('rgba(255, 99, 132, 1)');
        break;
      default:
        setColor('rgba(255, 99, 132, 1)');
    }
  }, [entries]);

  const data = {
    labels: [new Date().toLocaleString('en-US')],
    datasets: [
      {
        label: '',
        data: [entries.length],
        backgroundColor: [color],
        borderColor: [color],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        suggestedMin: 0,
        suggestedMax: 10,
        grid: {
          display: false,
        },
      },
    },
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
        display: false,
      },
      title: {
        display: true,
        text: '',
      },
    },
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h3 className="title">My Progress</h3>
      </div>
      <Bar data={data} options={options} />
    </>
  );
};

export default HorizontalBarChart;
