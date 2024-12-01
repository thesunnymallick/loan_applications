import React from "react";
import {
  AiOutlineFile,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineCar,
} from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { BsListCheck } from "react-icons/bs";
import { Table, Tag } from "antd";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const CreditCard = () => {

    const navigate=useNavigate();
  const cards = [
    {
      title: "Docs Pending",
      count: 2,
      icon: <AiOutlineFile />,
      gradient: "from-green-500 to-emerald-700",
    },
    {
      title: "Docs Uploaded",
      count: 0,
      icon: <FiUpload />,
      gradient: "from-gray-400 to-gray-600",
    },
    {
      title: "Docs Pendancy",
      count: 0,
      icon: <BsListCheck />,
      gradient: "from-teal-400 to-teal-600",
    },
    {
      title: "Logged In",
      count: 0,
      icon: <AiOutlineCheckCircle />,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      title: "Approved",
      count: 0,
      icon: <AiOutlineCheckCircle />,
      gradient: "from-purple-500 to-indigo-700",
    },
    {
      title: "Rejected",
      count: 0,
      icon: <AiOutlineCloseCircle />,
      gradient: "from-red-500 to-rose-700",
    },
    {
      title: "Dispatched",
      count: 0,
      icon: <AiOutlineCar />,
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      title: "Completed",
      count: 1,
      icon: <AiOutlineCheckCircle />,
      gradient: "from-lime-500 to-green-700",
    },
  ];

  const data = [
    {
      key: "1",
      slNo: 1,
      fileNo: "12345",
      applicantName: "John Doe",
      email: "john.doe@example.com",
      createdDate: "2024-12-01",
      bankDetails: {
        appliedBank: "ABC Bank",
        loginId: "abc123",
        creditLimit: "$50,000",
        appliedOn: "2024-11-20",
        bankStatus: "Processing",
      },
      status: "Approved",
    },
    {
      key: "2",
      slNo: 2,
      fileNo: "54321",
      applicantName: "Jane Smith",
      email: "jane.smith@example.com",
      createdDate: "2024-12-01",
      bankDetails: {
        appliedBank: "XYZ Bank",
        loginId: "xyz789",
        creditLimit: "$30,000",
        appliedOn: "2024-11-15",
        bankStatus: "Rejected",
      },
      status: "Rejected",
    },
  ];

  // Columns definition
  const columns = [
    {
      title: "SlNo",
      dataIndex: "slNo",
      key: "slNo",
    },
    {
      title: "FileNo",
      dataIndex: "fileNo",
      key: "fileNo",
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
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Applied at Bank",
      children: [
        {
          title: "Applied Bank",
          dataIndex: ["bankDetails", "appliedBank"],
          key: "appliedBank",
        },
        {
          title: "Login Id",
          dataIndex: ["bankDetails", "loginId"],
          key: "loginId",
        },
        {
          title: "Credit Limit",
          dataIndex: ["bankDetails", "creditLimit"],
          key: "creditLimit",
        },
        {
          title: "Applied On",
          dataIndex: ["bankDetails", "appliedOn"],
          key: "appliedOn",
        },
        {
          title: "Applied Bank Status",
          dataIndex: ["bankDetails", "bankStatus"],
          key: "bankStatus",
        },
      ],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Approved" ? "green" : "volcano"}>{status}</Tag>
      ),
    },
  ];






  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg text-white bg-gradient-to-r ${card.gradient} flex flex-col items-center`}
          >
            <div className="text-3xl mb-2">{card.icon}</div>
            <h2 className="text-xl font-bold">{card.title}</h2>
            <p className="text-2xl font-semibold mt-2">({card.count})</p>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center py-4 px-2">
          <h1 className="text-zinc-700 font-semibold text-2xl">
            All Applied Credit Card
          </h1>

          <button
           onClick={()=>navigate(`/our-panels/creditCard-panel/creditcard-apply`)}
           className="
            w-[10%]
            h-10
            bg-green-700
            text-white rounded-lg shadow-sm 
            flex 
            justify-center 
            items-center"
          >
            <span className="text-xl">
              <IoAddOutline />
            </span>
            <span>Apply</span>
          </button>

        </div>

        <Table
          bordered
          columns={columns}
          dataSource={data}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default CreditCard;
