import React from 'react';
import { Button, Table, Tag } from 'antd';
import { FaRegBuilding, FaBusinessTime, FaIndustry } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const GovermentLoan = () => {
  const navigate=useNavigate();
  const loans = [
    {
      type: 'Small Size Business',
      title: 'MUDRA Loan',
      count: 2,
      loanRange: '₹ 50.00K - 10.00L',
      icon: <FaRegBuilding />,
      gradient: 'from-green-400 to-teal-500',
      link:"/our-panels/govermentLoan/MUDRALoan"
    },
    {
      type: 'Large Size Business',
      title: 'MSME Loan',
      count: 0,
      loanRange: '₹ 10.01L - 25.00CR',
      icon: <FaBusinessTime />,
      gradient: 'from-blue-500 to-cyan-600',
      link:"/our-panels/govermentLoan/MSMELoan"
    },
    {
      type: 'Industry Business',
      title: 'PMEGP Loan',
      count: 0,
      tradingRange: '₹ 20.00L',
      manufacturingRange: '₹ 50.00L',
      icon: <FaIndustry />,
      gradient: 'from-purple-500 to-pink-500',
       link:"/our-panels/govermentLoan/PMEGPLoan"
    },
    {
      type: 'Small Size Business',
      title: 'OD-CC',
      count: 0,
      loanRange: '₹ 50.00K - 10.00L',
      icon: <FaRegBuilding />,
      gradient: 'from-orange-400 to-red-500',
      link:"/our-panels/govermentLoan/ODCC"
    },
  ];

  const columns = [
    {
      title: 'File No',
      dataIndex: 'fileNo',
      key: 'fileNo',
    },
    {
      title: 'Applicant Name',
      dataIndex: 'applicantName',
      key: 'applicantName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'REJECTED' ? 'red' : 'green'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      fileNo: 'LDGV-1045',
      applicantName: 'JADAV HOLDER',
      email: 'rahitmondal053@gmail.com',
      mobileNumber: '9091963351',
      createdDate: '5 Jun 2024',
      status: 'REJECTED',
    },
    {
      key: '2',
      fileNo: 'LDGV-1043',
      applicantName: 'MASOOD ALAM RANA',
      email: 'MASOOD@GMAIL.COM',
      mobileNumber: '7003425263',
      createdDate: '16 May 2024',
      status: 'REJECTED',
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Government Loan Schemes
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {loans.map((loan, index) => (
          <div
            key={index}
            className={`relative bg-gradient-to-r ${loan.gradient} rounded-lg shadow-lg overflow-hidden`}
          >
            {/* Card Content */}
            <div className="p-8 text-white">
              {/* Icon Section */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-5xl">{loan.icon}</div>
                <div>
                  <p className="text-lg text-gray-200">{loan.type}</p>
                  <h3 className="text-2xl font-bold">
                    {loan.title}{' '}
                    <span className="text-gray-300">({loan.count})</span>
                  </h3>
                </div>
              </div>

              {/* Loan Details */}
              <div>
                {loan.loanRange && (
                  <p className="text-lg mb-4">
                    Loan Range: <span className="font-semibold">{loan.loanRange}</span>
                  </p>
                )}
                {loan.tradingRange && loan.manufacturingRange && (
                  <div className="text-lg">
                    <p>Trading: {loan.tradingRange}</p>
                    <p>Manufacturing: {loan.manufacturingRange}</p>
                  </div>
                )}
              </div>

              {/* Footer Section */}
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={()=>navigate(loan.link)}
                  className="bg-white text-gray-800 border-none px-6 py-2 rounded-lg text-lg hover:text-white hover:bg-gray-800"
                >
                  Apply Now
                </button>
                <BsArrowRight className="text-2xl text-gray-300" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='bg-white rounded-lg shadow-md  p-4 mt-10'>

        <div className='flex justify-between items-center py-4'>
            <h1 className='text-zinc-700 text-xl font-semibold'>All Goverments Loans</h1>
        </div>
       <Table 
       columns={columns} 
       dataSource={data} 
       bordered  
   
       />
      </div>
    </div>
  );
};

export default GovermentLoan;
