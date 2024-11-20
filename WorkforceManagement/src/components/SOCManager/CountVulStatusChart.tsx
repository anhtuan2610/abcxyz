import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface StatusData {
  statusId: number;
  statusName: string;
  count: number;
}

const sampleData: StatusData[] = [
  { statusId: 5, statusName: 'Completed', count: 15 },
  { statusId: 8, statusName: 'Assigned', count: 7 },
  { statusId: 10, statusName: 'NEW VUL IMPORT', count: 20 },
];

const CountVulStatusChart: React.FC = () => {
  const chartData = {
    labels: sampleData.map((item) => item.statusName),
    datasets: [
      {
        data: sampleData.map((item) => item.count),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Status Distribution</h2>
      <PolarArea data={chartData} />
    </div>
  );
};

export default CountVulStatusChart;