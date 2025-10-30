import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CACCLTVChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'CAC',
        type: 'bar',
        data: data.cacData,
        backgroundColor: '#e91e63',
        borderColor: '#e91e63',
        borderWidth: 1,
        yAxisID: 'y',
        borderRadius: 4,
      },
      {
        label: 'CLTV',
        type: 'line',
        data: data.cltvData,
        backgroundColor: 'rgba(3, 169, 244, 0.1)',
        borderColor: '#03a9f4',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        yAxisID: 'y1',
        pointBackgroundColor: '#03a9f4',
        pointBorderColor: '#03a9f4',
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#e91e63',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            if (context.datasetIndex === 0) {
              return `CAC: $${context.parsed.y.toFixed(2)}`;
            } else {
              return `CLTV: $${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'CAC ($)',
          color: '#666',
          font: {
            size: 12,
            weight: '600'
          }
        },
        min: 0,
        max: 25,
        ticks: {
          stepSize: 5,
          color: '#666',
          font: {
            size: 11
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'CLTV ($)',
          color: '#666',
          font: {
            size: 12,
            weight: '600'
          }
        },
        min: 2000,
        max: 2800,
        ticks: {
          stepSize: 100,
          color: '#666',
          font: {
            size: 11
          },
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#666',
          font: {
            size: 11
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      bar: {
        borderRadius: 4
      }
    }
  };

  return (
    <div style={{ height: '300px', position: 'relative' }}>
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
};

export default CACCLTVChart;
