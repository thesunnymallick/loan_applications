import { Button, Input, Table, Tag } from "antd";
import React, { useState } from "react";
import {
  FaMoneyBillWave,
  FaHandshake,
  FaHome,
  FaCar,
  FaBuilding,
} from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
const LoanPanels = () => {

  const navigate=useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});

  const data = [
    // Business Loan example
    {
      key: 1,
      fileNo: "10002635",
      loanMode: "New",
      type: { name: "Business Loan", amount: "Rs. 500000" },
      applicantName: "MASOOD RANA",
      email: "najmulmolla1476@gmail.com",
      phone: "8926024830",
      createdDate: "15 Nov 2024",
      status: "FRESH LEAD",
    },
  
    // Personal Loan example
    {
      key: 2,
      fileNo: "10002636",
      loanMode: "New",
      type: { name: "Personal Loan", amount: "Rs. 200000" },
      applicantName: "RAHUL SINGH",
      email: "rahulsingh123@gmail.com",
      phone: "9876543210",
      createdDate: "12 Nov 2024",
      status: "DOCUMENT PENDING",
    },
    {
      key: 3,
      fileNo: "10002637",
      loanMode: "Top-up",
      type: { name: "Personal Loan", amount: "Rs. 300000" },
      applicantName: "PRIYA SHARMA",
      email: "priyasharma456@gmail.com",
      phone: "9087654321",
      createdDate: "10 Nov 2024",
      status: "APPROVED",
    },
  
    // Home Loan example
    {
      key: 4,
      fileNo: "10002638",
      loanMode: "New",
      type: { name: "Home Loan", amount: "Rs. 2500000" },
      applicantName: "AMIT GUPTA",
      email: "amitgupta678@gmail.com",
      phone: "9123456789",
      createdDate: "05 Nov 2024",
      status: "UNDER REVIEW",
    },

  ];
  
 
  

  const handleChange = (pagination, filters) => {
    setFilteredInfo(filters);
  };


  const handleNavigateUploadDocPage=(loanType, fileNo)=>{
     if(loanType==="Business Loan"){
      navigate(`/our-panels/loan-panels/businessLoan/upload-doc/${fileNo}`)
     }
     else if(loanType==="Personal Loan"){
      navigate(`/our-panels/loan-panels/personalLoan/upload-doc/${fileNo}`)
     }
     else if(loanType==="Home Loan"){
      navigate(`/our-panels/loan-panels/homeLoan/upload-doc/${fileNo}`)
     }
  }

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "File No",
      dataIndex: "fileNo",
      key: "fileNo",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search File No"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: "100%" }}
          >
            Search
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.fileNo.includes(value),
    },
    {
      title: "Loan Mode",
      dataIndex: "loanMode",
      key: "loanMode",
      filters: [
        { text: "New", value: "New" },
        { text: "Existing", value: "Existing" },
      ],
      filteredValue: filteredInfo.loanMode || null,
      onFilter: (value, record) => record.loanMode.includes(value),
      render: (text) => (
        <Tag color={text === "New" ? "red" : "green"}>{text}</Tag>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color="gold">
          {type.name} - {type.amount}
        </Tag>
      ),
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "applicantName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "FRESH LEAD", value: "FRESH LEAD" },
        { text: "IN PROCESS", value: "IN PROCESS" },
        { text: "CLOSED", value: "CLOSED" },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value),
      render: (text) => (
        <Tag color={text === "FRESH LEAD" ? "blue" : "green"}>{text}</Tag>
      ),
    },
    {
      title: "",
      key: "actions",
      render: (record) => <Button 
       onClick={()=>handleNavigateUploadDocPage(record.type.name, record.fileNo)}
      type="link" icon={<EyeOutlined />} />,
    },
  ];

  const loans = [
    {
      id: 1,
      name: "Personal Loan",
      count: 0,
      icon: <FaMoneyBillWave />,
      bgColor: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
      link:"/our-panels/loan-panels/pl"
    },
    {
      id: 2,
      name: "Business Loan",
      count: 1,
      icon: <FaHandshake />,
      bgColor: "bg-gradient-to-r from-teal-400 to-green-500",
      link:"/our-panels/loan-panels/bl"
    },
    {
      id: 3,
      name: "Home Loan",
      count: 0,
      icon: <FaHome />,
      bgColor: "bg-gradient-to-r from-orange-400 via-red-400 to-pink-400",
      link:"/our-panels/loan-panels/hl"
    },
    {
      id: 4,
      name: "Loan Against Property",
      count: 0,
      icon: <FaBuilding />,
      bgColor: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500",
      link:"/our-panels/loan-panels/lap"
    },
    {
      id: 5,
      name: "Car Loan",
      count: 0,
      icon: <FaCar />,
      bgColor: "bg-gradient-to-r from-cyan-500 to-blue-500",
      link:"/our-panels/loan-panels/cl"
    },
    {
      id: 6,
      name: "Old Car Loan",
      count: 0,
      icon: <FaCar />,
      bgColor: "bg-gradient-to-r from-gray-500 via-gray-700 to-black",
     link:"/our-panels/loan-panels/ocl"
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 pb-4">
        <Link to={"/our-panels"} className="">
          <FaArrowLeft className="text-xl text-zinc-800 font-semibold" />
        </Link>
        <span className="text-2xl text-zinc-800 font-semibold">
          Loan Panels
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {loans.map((loan) => (
          <div
           onClick={()=>navigate(loan.link)}
            key={loan.id}
            className={`flex items-center justify-between h-24 rounded-lg text-white px-4 shadow-lg cursor-pointer ${loan.bgColor}`}
          >
            <div className="text-4xl">{loan.icon}</div>
            <div className="text-right">
              <h3 className="text-sm font-medium">{loan.name}</h3>
              <p className="text-2xl font-bold">{loan.count}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between py-4">
          <h2 className="text-zinc-700 font-semibold">All Loan application</h2>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          onChange={handleChange}
          pagination={{ pageSize: 5 }}
          bordered
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default LoanPanels;
