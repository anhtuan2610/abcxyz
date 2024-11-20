import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CountVulStatusDetailsChart: React.FC = () => {
  const data = {
    labels: ["Done", "In Progress", "Not Assigned", "Fail"],
    datasets: [
      {
        label: "Task Status",
        data: [10, 5, 20, 6],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
            family: "Arial, sans-serif",
          },
          color: "#333",
        },
      },
      title: {
        display: true,
        text: 'Project Task Status Distribution',
        font: {
          size: 16,
        },
        color: '#333',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
          },
          color: "#555",
        },
        grid: {
          color: "#e0e0e0",
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
          color: "#555",
        },
        grid: {
          color: "#e0e0e0",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CountVulStatusDetailsChart;
