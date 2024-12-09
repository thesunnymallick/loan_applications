import React, { useState } from "react";
import { Card, Table, Input, Tag, Space } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  CalendarOutlined,
  TeamOutlined,
  ProfileOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const TaxationPanel = () => {
  const [searchText, setSearchText] = useState("");
   const navigate=useNavigate();
  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

const columns = [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
    render: (_, __, index) => index + 1,
  },
  {
    title: "File No",
    dataIndex: "fileNo",
    key: "fileNo",
  },
  {
    title: "Applicant Name",
    dataIndex: "applicant",
    key: "applicant",
 
  },
  {
    title: "Service",
    dataIndex: "service",
    key: "service",
  },
  {
    title: "Total Days/Remain Days",
    dataIndex: "days",
    key: "days",
  },
  {
    title: "Executive",
    dataIndex: "executive",
    key: "executive",
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
      { text: "CANCELED", value: "CANCELED" },
      { text: "COMPLETED", value: "COMPLETED" },
    ],
    onFilter: (value, record) => record.status === value,
    render: (status) => {
      let color;
      switch (status) {
        case "FRESH LEAD":
          color = "yellow";
          break;
        case "CANCELED":
          color = "red";
          break;
        case "COMPLETED":
          color = "green";
          break;
        default:
          color = "gray";
      }
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, record) => (
      <Space 
       className="cursor-pointer"
       onClick={()=>navigate(`/our-panels/taxation-panel/upload-doc/${record.fileNo}`)}
      >
        <EyeOutlined />
      </Space>
    ),
  },
];



  const data = [
    {
      fileNo: "TX-10222",
      applicant: "dipak mandal 8420330590 dipak@lgmail.com",
      service: "ITR-1 (Upto ₹ 10 Lacs)",
      days: "NA",
      executive: "DIPAK MANDAL 9091963351 dipakmandal@lenderway.in",
      createdDate: "5 Oct 2024",
      status: "FRESH LEAD",
    },
    {
      fileNo: "TX-10208",
      applicant: "dipak mandal 8420330590 dipak@lgmail.com",
      service: "ITR-1 (Upto ₹ 10 Lacs)",
      days: "NA",
      executive: "DIPAK MANDAL 9091963351 dipakmandal@lenderway.in",
      createdDate: "29 Aug 2024",
      status: "CANCELED",
    },
    {
      fileNo: "TX-10206",
      applicant: "MAJID Khan 7982454995 mauukhan@gmail.com",
      service: "Back ITR",
      days: "-101",
      executive: "ATHAR HUSSIN 9891533543 athar0343@gmail.com",
      createdDate: "21 Aug 2024",
      status: "COMPLETED",
    },
    {
      fileNo: "TX-10189",
      applicant: "AMIT KAYAL 9123929502 avijitavijit00057@gmail.com",
      service: "ITR-3 (Turnover Upto ₹ 20 Lacs)",
      days: "-122",
      executive: "ATHAR HUSSIN 9891533543 athar0343@gmail.com",
      createdDate: "31 Jul 2024",
      status: "COMPLETED",
    },
    {
      fileNo: "TX-10188",
      applicant: "AMIT KAYAL 9123929502 avijitavijit00057@gmail.com",
      service: "ITR-3 (Turnover Upto ₹ 1 Crore)",
      days: "NA",
      executive: "DIPAK MANDAL 9091963351 dipakmandal@lenderway.in",
      createdDate: "31 Jul 2024",
      status: "CANCELED",
    },
  ];

  const filteredData = data.filter(
    (item) =>
      item.fileNo.toLowerCase().includes(searchText) ||
      item.applicant.toLowerCase().includes(searchText) ||
      item.service.toLowerCase().includes(searchText) ||
      item.executive.toLowerCase().includes(searchText) ||
      item.createdDate.toLowerCase().includes(searchText) ||
      item.status.toLowerCase().includes(searchText)
  );


  

  return (
    <div className="bg-gray-50 p-8">
      {/* Action Buttons Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Place Order Card */}
        <Card
         onClick={()=>navigate('/our-panels/taxation-panel/place-order')}
          hoverable
          className="rounded-lg shadow-lg text-center border-none cursor-pointe"
          bodyStyle={{
            padding: "24px",
            background: "linear-gradient(135deg, #FFB75E, #ED8F03)", // Premium gold gradient
          }}
        >
          <AppstoreOutlined className="text-white text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-1 text-white">Place Order</h3>
          <p className="text-white opacity-90">Add new order here</p>
        </Card>

        {/* Add Client Card */}
        <Card
          onClick={()=>navigate('/our-panels/taxation-panel/add-client')}
          hoverable
          className="rounded-lg shadow-lg text-center border-none cursor-pointe"
          bodyStyle={{
            padding: "24px",
            background: "linear-gradient(135deg, #00C9FF, #92FE9D)", // Premium aqua to green gradient
          }}
        >
          <UserOutlined className="text-white text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-1 text-white">Add Client</h3>
          <p className="text-white opacity-90">Create new client here</p>
        </Card>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Orders Card */}
        <Card
          hoverable
          className="rounded-lg shadow-lg text-center border-none cursor-pointe"
          bodyStyle={{
            padding: "24px",
            background: "linear-gradient(135deg, #FF512F, #DD2476)", // Premium fiery red to pink
          }}
        >
          <CalendarOutlined className="text-white text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-1 text-white">Orders (34)</h3>
          <p className="text-white opacity-90 flex items-center justify-center gap-2">
            View <span className="text-white">➔</span>
          </p>
        </Card>

        {/* Clients Card */}
        <Card
         onClick={()=>navigate(`/our-panels/taxation-panel/all-client`)}
          hoverable
          className="rounded-lg shadow-lg text-center border-none cursor-pointer"
          bodyStyle={{
            padding: "24px",
            background: "linear-gradient(135deg, #11998E, #38EF7D)", // Premium teal gradient
          }}
        >
          <TeamOutlined className="text-white text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-1 text-white">
            Clients (15)
          </h3>
          <p className="text-white opacity-90 flex items-center justify-center gap-2">
            View <span className="text-white">➔</span>
          </p>
        </Card>

        {/* Services Card */}
        <Card
          hoverable
          className="rounded-lg shadow-lg text-center border-none"
          bodyStyle={{
            padding: "24px",
            background: "linear-gradient(135deg, #373B44, #4286F4)", // Premium charcoal to blue
          }}
        >
          <ProfileOutlined className="text-white text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-1 text-white">
            Services (260)
          </h3>
          <p className="text-white opacity-90 flex items-center justify-center gap-2">
            View <span className="text-white">➔</span>
          </p>
        </Card>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mt-10">
        <div>
        <div 
       className="flex justify-end mb-6"
        
        >
      <Input
         size="large"
        placeholder="Search by keyword..."
        onChange={handleSearch}
        prefix={<SearchOutlined style={{ color: "#888" }} />}
        style={{
          borderRadius: "8px",
          padding: "8px 12px",
          width: "100%",
          maxWidth: "400px",
        }}
      />
    </div>
          <Table bordered columns={columns} dataSource={filteredData} rowKey="fileNo"   scroll={{ x: "max-content" }} />
        </div>
      </div>
    </div>
  );
};

export default TaxationPanel;
