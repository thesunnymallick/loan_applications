import React, { useEffect, useState } from "react";
import {
  AiOutlineFile,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineDollar,
} from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { BsListCheck } from "react-icons/bs";
import { Space, Table, Tag } from "antd";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getAllCreditCards } from "../../api/partner/creditcardApi";
import { EyeOutlined } from "@ant-design/icons";

const InsurancePanel= () => {

  const [allCreditCards, setAllCreditCards]=useState([]);
  const navigate=useNavigate();


  const cards = [
    {
      title: "Docs Pending",
      count: 2,
      icon: <AiOutlineFile />,
      gradient: "from-pink-400 to-pink-600",
    },
    {
      title: "Docs Uploaded",
      count: 0,
      icon: <FiUpload />,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: "Docs Pendancy",
      count: 0,
      icon: <BsListCheck />,
      gradient: "from-green-400 to-green-600",
    },
    {
      title: "Logged In",
      count: 0,
      icon: <AiOutlineCheckCircle />,
      gradient: "from-purple-400 to-purple-600",
    },
    {
      title: "Approved",
      count: 0,
      icon: <AiOutlineCheckCircle />,
      gradient: "from-orange-400 to-orange-600",
    },
    {
      title: "Rejected",
      count: 0,
      icon: <AiOutlineCloseCircle />,
      gradient: "from-red-400 to-red-600",
    },
    {
      title: "Banker Pendancy",
      count: 0,
      icon: <AiOutlineDollar />,
      gradient: "from-teal-400 to-teal-600",
    },
    {
      title: "Completed",
      count: 1,
      icon: <AiOutlineCheckCircle />,
      gradient: "from-yellow-400 to-yellow-600",
    },
  ];



  // Columns definition
  const columns = [
    {
      title: "File No",
      dataIndex: "file_no",
      key: "file_no",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Approved" ? "green" : "volcano"}>{status}</Tag>
      ),
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space
         className="cursor-pointer"
         onClick={()=>navigate(`/our-panels/creditCard-panel/upload-doc/${record.file_no}`)}
        >
          <EyeOutlined />
        </Space>
      ),
    },
  ];


  useEffect(()=>{
    const fetchAllCreditCard=async()=>{
      try {
        const {data,status}=await getAllCreditCards();
        if(status===200){
        setAllCreditCards(data?.data)
        }

      } catch (error) {
        console.log(error)
      }
    }


    fetchAllCreditCard();
  },[])






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
            All Applied Insurance
          </h1>

          <button
           onClick={()=>navigate(`/our-panels/insurancePanel/insurance/apply`)}
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
          dataSource={allCreditCards}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default InsurancePanel;
