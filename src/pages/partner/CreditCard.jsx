import React, { useEffect, useState } from "react";
import {
  AiOutlineFile,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineCar,
} from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { BsListCheck } from "react-icons/bs";
import { Space, Table, Tag } from "antd";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getAllCreditCards } from "../../api/partner/creditcardApi";
import { EyeOutlined } from "@ant-design/icons";

const CreditCard = () => {


  const [allCreditCards, setAllCreditCards]=useState([]);
  const navigate=useNavigate();
  const [loading, setLoading]=useState(false);

  // Initial
  const initialValues = {
    first_name: "",
     middle_name: "",
     last_name: "",
     email: "",
     phone_number: "",
     pan_number: "",
     aadhar_number: "",
     residence_address: "",
     residence_city: "",
     residence_pincode: "",
     residence_state: "",
     insurance_type: "",
     bike_or_car_number: ""
  };

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
        setAllCreditCards(data?.data?.data)
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
          dataSource={allCreditCards}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default CreditCard;
