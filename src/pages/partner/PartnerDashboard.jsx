import React, { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaUserCheck,
  FaUserClock,
  FaRegCheckCircle,
} from "react-icons/fa";
import { getDashboardInfo } from "../../api/partner/dashboardApi";
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2'; // Added Doughnut chart import
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";
import DashboardShimmerUi from "../../components/shimmerUi/DashboardShimmerUi";

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

const PartnerDashboard = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading]=useState(false);

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
         setLoading(true);
        const { data, status } = await getDashboardInfo();
        if (status === 200) {
          setLoading(false);
          setInfo(data);

        }
      } catch (error) {
         setLoading(false);
        console.error(error);
      }
    };
    fetchDashboardInfo();
  }, []);



  const loanAnalysisData = info?.data?.loan;
  const taxationAnalysisData = info?.data?.tax;

  const loanAnalysisCards = [
    {
      label: "Total Files",
      value: loanAnalysisData?.total_files,
      gradient: "from-blue-500 to-blue-700",
      icon: <FaFileAlt className="text-white text-4xl" />,
    },
    {
      label: "Fresh Leads",
      value: loanAnalysisData?.fresh_lead,
      gradient: "from-green-500 to-green-700",
      icon: <FaUserClock className="text-white text-4xl" />,
    },
    {
      label: "Pending Documents",
      value: loanAnalysisData?.pending_documents,
      gradient: "from-yellow-500 to-yellow-700",
      icon: <FaUserCheck className="text-white text-4xl" />,
    },
    {
      label: "Uploaded Documents",
      value: loanAnalysisData?.uploaded_documents,
      gradient: "from-purple-500 to-purple-700",
      icon: <FaRegCheckCircle className="text-white text-4xl" />,
    },
    {
      label: "Banker Pendency",
      value: loanAnalysisData?.banker_pendency,
      gradient: "from-red-500 to-red-700",
      icon: <FaFileAlt className="text-white text-4xl" />,
    },
    {
      label: "Rejected",
      value: loanAnalysisData?.rejected,
      gradient: "from-gray-500 to-gray-700",
      icon: <FaFileAlt className="text-white text-4xl" />,
    },
  ];

  const taxationAnalysisCards = [
    {
      label: "Total Files",
      value: taxationAnalysisData?.total_files,
      gradient: "from-teal-500 to-teal-700",
      icon: <FaFileAlt className="text-white text-4xl" />,
    },
    {
      label: "Hold",
      value: taxationAnalysisData?.hold,
      gradient: "from-pink-500 to-pink-700",
      icon: <FaUserClock className="text-white text-4xl" />,
    },
    {
      label: "Reject",
      value: taxationAnalysisData?.reject,
      gradient: "from-orange-500 to-orange-700",
      icon: <FaUserCheck className="text-white text-4xl" />,
    },
    {
      label: "Approve",
      value: taxationAnalysisData?.approve,
      gradient: "from-indigo-500 to-indigo-700",
      icon: <FaRegCheckCircle className="text-white text-4xl" />,
    },
    {
      label: "Complete",
      value: taxationAnalysisData?.complete,
      gradient: "from-red-500 to-red-700",
      icon: <FaFileAlt className="text-white text-4xl" />,
    },
  ];

  // Chart Data for Line Chart
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Loan Data',
        data: [loanAnalysisData?.total_files, loanAnalysisData?.fresh_lead, loanAnalysisData?.pending_documents, loanAnalysisData?.uploaded_documents],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Bar Chart Data
  const barChartData = {
    labels: ['Loan Data', 'Taxation Data'],
    datasets: [
      {
        label: 'Loan Analysis',
        data: [
          loanAnalysisData?.total_files,
          loanAnalysisData?.fresh_lead,
          loanAnalysisData?.pending_documents,
          loanAnalysisData?.uploaded_documents
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Taxation Analysis',
        data: [
          taxationAnalysisData?.total_files,
          taxationAnalysisData?.hold,
          taxationAnalysisData?.reject,
          taxationAnalysisData?.approve
        ],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart Data
  const pieChartData = {
    labels: ['Approved', 'Pending', 'Rejected', 'In Progress'],
    datasets: [
      {
        label: 'Loan Status',
        data: [
          loanAnalysisData?.uploaded_documents,
          loanAnalysisData?.pending_documents,
          loanAnalysisData?.rejected,
          loanAnalysisData?.fresh_lead
        ],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0'],
      },
    ],
  };

  // Doughnut Chart Data
  const doughnutChartData = {
    labels: ['Tax Files', 'Hold Files', 'Reject Files', 'Completed Files'],
    datasets: [
      {
        label: 'Taxation Status',
        data: [
          taxationAnalysisData?.total_files,
          taxationAnalysisData?.hold,
          taxationAnalysisData?.reject,
          taxationAnalysisData?.complete
        ],
        backgroundColor: ['#FF9F40', '#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <> 
    {
      loading !==true ? (
      <div className="p-6 font-poppins text-gray-800">
     
        <div className="flex justify-center flex-col items-center text-center my-8">
           <h1 className="text-4xl font-extrabold text-zinc-900">
             Powerful Panels for a Smarter Future
           </h1>
           <p className="text-lg text-zinc-600 mt-2">
             Explore the various services we offer in different domains.
           </p>
         </div>
   
         {/* Loan Analysis Section */}
         <div className="p-2 mb-4">
           <h2 className="text-xl font-semibold text-gray-700 mb-4">
             Loan Analysis
           </h2>
           <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
             {loanAnalysisCards?.map(({ label, value, gradient, icon }, index) => (
               <div
                 key={index}
                 className={`bg-gradient-to-r ${gradient} text-white flex flex-col items-center p-6 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300`}
               >
                 {icon}
                 <span className="text-lg font-semibold mt-3">{value}</span>
                 <span className="text-sm">{label}</span>
               </div>
             ))}
           </div>
         </div>
   
         {/* Taxation Analysis Section */}
         <div className="p-2 mb-6">
           <h2 className="text-xl font-semibold text-gray-700 mb-4">
             Taxation Analysis
           </h2>
           <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
             {taxationAnalysisCards?.map(
               ({ label, value, gradient, icon }, index) => (
                 <div
                   key={index}
                   className={`bg-gradient-to-r ${gradient} text-white flex flex-col items-center p-6 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300`}
                 >
                   {icon}
                   <span className="text-lg font-semibold mt-3">{value}</span>
                   <span className="text-sm">{label}</span>
                 </div>
               )
             )}
           </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {/* Line Chart */}
         <div className="p-2 mb-8">
           <h2 className="text-xl font-semibold text-gray-700 mb-4">Loan vs Taxation Data</h2>
           <div className="w-full h-80">
             <Line data={chartData} />
           </div>
         </div>
   
        {/* Pie Chart */}
         <div className="p-2 mb-8 ">
           <h2 className="text-xl font-semibold text-gray-700 mb-4">Loan Status (Pie Chart)</h2>
           <div className="w-full h-80 flex justify-center">
             <Pie data={pieChartData} options={{ responsive: true }} />
           </div>
         </div>
   
         {/* Bar Chart */}
         <div className="p-2 mb-8">
           <h2 className="text-xl font-semibold text-gray-700 mb-4">Loan vs Taxation Analysis (Bar Chart)</h2>
           <div className="w-full h-80 f">
             <Bar data={barChartData} options={{ responsive: true }} />
           </div>
         </div>
   
    
        
   
         {/* Doughnut Chart */}
         <div className="p-2 mb-8">
           <h2 className="text-xl font-semibold text-gray-700 mb-4">Taxation Status (Doughnut Chart)</h2>
           <div className="w-full h-80 flex justify-center">
             <Doughnut data={doughnutChartData} options={{ responsive: true }} />
           </div>
         </div>
         </div>
     
        
   
       
       </div>) : (<DashboardShimmerUi/>)
    }
    </>
  );
};

export default PartnerDashboard;
