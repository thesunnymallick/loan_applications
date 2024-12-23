import React, { useEffect, useState } from 'react';
import { Button, Table, Tag } from 'antd';
import { FaRegBuilding, FaBusinessTime, FaIndustry } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined } from "@ant-design/icons";
import { getAllGovermentLoan } from '../../api/partner/govermentLoanApi';
import dayjs from 'dayjs';
const GovermentLoan = () => {
  const navigate=useNavigate();
  
  const [loanInfo, setLoanInfo]=useState([]);


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



  const handleNavigateUploadDocPage=(loanType, fileNo)=>{

    navigate(`/our-panels/govermentLoan/${loanType}/uploadDoc/${fileNo}`)
 }

  const columns = [
    {
      title: 'File No',
      dataIndex: 'file_no',
      key: 'file_no',
    },
    {
      title: 'Applicant Name',
      dataIndex: 'applicant_name',
      key: 'applicant_name',
    },
    {
      title: 'Email',
      dataIndex: 'applicant_email',
      key: 'applicant_email',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobile_number',
      key: 'mobile_number',
    },
    {
      title: 'Created Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text, record)=>{
        return(
          <span>{dayjs(record.created_at).format("YYYY-MM-DD")}</span>
        )
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const statusMapping = {
          fresh_lead: { label: "Fresh Lead", color: "#004085" },
          upload_documents: { label: "Upload Documents", color: "#085858" },
          banking_pendency: { label: "Banking Pendency", color: "#995700" },
          assign: { label: "Assign", color: "#005a00" },
          reject: { label: "Reject", color: "#8b0000" },
          login: { label: "Login", color: "#7b6400" },
          hold: { label: "Hold", color: "#4b0082" },
        };
        const status = statusMapping[text] || { label: text, color: "#595959" };

        return (
          <Tag
            style={{
              backgroundColor: status.color,
              color: "#fff",
              border: "none",
            }}
          >
            {status.label}
          </Tag>
        );
      },
    },

    {
      title: "",
      key: "actions",
      render: (record) => <Button 
       onClick={()=>handleNavigateUploadDocPage(record.loan, record.file_no)}
      type="link" icon={<EyeOutlined />} />,
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


  useEffect(()=>{

    const fetchGovermentLoan=async()=>{
      try {
        const {data,status}=await getAllGovermentLoan();
        if(status===200){
          setLoanInfo(data?.data?.data)
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchGovermentLoan();

  }, [])

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
       dataSource={loanInfo} 
       bordered  
   
       />
      </div>
    </div>
  );
};

export default GovermentLoan;
