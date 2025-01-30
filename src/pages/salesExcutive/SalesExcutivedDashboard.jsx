import React, { useEffect, useState } from "react";
import { MdGroups } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { Line, Bar, Doughnut, Scatter } from "react-chartjs-2";
import { salesExDashboard } from "../../api/salesExecutive/dasboardApi";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import ErrorHandler from "../../utils/ErrorHandler";

// Registering the necessary components for different charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const SalesExcutivedDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data, status } = await salesExDashboard();
        if (status === 200) {
          setDashboardData(data?.data);
        }
      } catch (error) {
        ErrorHandler.handleError(error);
      }
    };

    fetchDashboardData();
  }, []);

  const cardItems = [
    {
      title: "Total Partner",
      value: dashboardData.total_partners || 0,
      icon: <MdGroups />,
      bgColor: "bg-blue-50",
      iconBgColor: "bg-blue-700",
    },
    {
      title: "Active Partner",
      value: dashboardData.active_partners || 0,
      icon: <FaUserCheck />,
      bgColor: "bg-green-50",
      iconBgColor: "bg-green-700",
    },
    {
      title: "Deactive Partner",
      value: dashboardData.inactive_partners || 0,
      icon: <FaUserMinus />,
      bgColor: "bg-red-50",
      iconBgColor: "bg-red-700",
    },
    {
      title: "Total Revenues",
      value: dashboardData.total_earnings?.toFixed(2) || 0,
      icon: <FaRupeeSign />,
      bgColor: "bg-yellow-50",
      iconBgColor: "bg-yellow-700",
    },
  ];

  const barChartData = {
    labels: ['Total Earnings', 'Target'],
    datasets: [
      {
        label: 'Earnings vs Target',
        data: [dashboardData.total_earnings || 0, dashboardData.target || 0],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Line chart data
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue Over Time',
        data: [10000, 20000, 15000, 30000, 25000, 40000], // Example data
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Scatter chart data
  const scatterChartData = {
    datasets: [
      {
        label: 'Partner Performance',
        data: [
          { x: 5, y: 10000 },
          { x: 10, y: 20000 },
          { x: 15, y: 25000 },
          { x: 20, y: 35000 },
          { x: 25, y: 40000 },
        ], // Example data (x = Partner ID, y = Earnings)
        backgroundColor: 'rgba(153, 102, 255, 1)',
      },
    ],
  };

  const scatterChartOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  // Pie Chart data
  const pieChartData = {
    labels: ['Active Partners', 'Inactive Partners'],
    datasets: [
      {
        data: [dashboardData.active_partners || 0, dashboardData.inactive_partners || 0],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 md:px-6 py-4">
      <h1 className="text-zinc-800 text-2xl font-semibold">Dashboard</h1>

      {/* Show card items */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardItems.map((item, index) => (
          <div key={index} className={`p-4 ${item.bgColor} rounded-lg shadow-lg`}>
            <div className="flex justify-between">
              <div className={`w-10 h-10 rounded-lg ${item.iconBgColor} text-white flex justify-center items-center shadow-sm text-lg`}>
                {item.icon}
              </div>
              <span className="text-xl text-zinc-500">
                <MdArrowOutward />
              </span>
            </div>
            <div className="mt-3">
              <h2 className="text-zinc-700 text-xl">{item.title}</h2>
              <span className="text-zinc-900 text-xl font-semibold">{item.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Grid - Side by Side */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="flex justify-center items-center">
          <div style={{ width: '100%', height: '300px' }}>
            <h2 className="text-zinc-700 text-xl mb-4">Earnings vs Target</h2>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

        {/* Line Chart */}
        <div className="flex justify-center items-center">
          <div style={{ width: '100%', height: '300px' }}>
            <h2 className="text-zinc-700 text-xl mb-4">Revenue Over Time</h2>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Scatter Chart */}
        <div className="flex justify-center items-center">
          <div style={{ width: '100%', height: '300px' }}>
            <h2 className="text-zinc-700 text-xl mb-4">Partner Performance</h2>
            <Scatter data={scatterChartData} options={scatterChartOptions} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="flex justify-center items-center">
          <div style={{ width: '100%', height: '300px' }}>
            <h2 className="text-zinc-700 text-xl mb-4">Active vs Inactive Partners</h2>
            <Doughnut data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesExcutivedDashboard;
