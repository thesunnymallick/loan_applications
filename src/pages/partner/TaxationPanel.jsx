import React, { useEffect, useState } from "react";
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
import { getAllOrders } from "../../api/partner/taxationpanel";
import dayjs from "dayjs";

const TaxationPanel = () => {
  const [searchText, setSearchText] = useState("");
  const [allOrders, setAllOrders]=useState();
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
    dataIndex: "file_no",
    key: "file_no",
  },
  {
    title: "Applicant Name",
    dataIndex: "applicant",
    render: (text, record)=>{
      return (
        <div className="flex items-center gap-1">
          <span>{record?.taxation?.first_name}</span>
          <span>{record?.taxation?.middle_name}</span>
          <span>{record?.taxation?.last_name}</span>
        </div>)
    }

 
  },
  {
    title: "Service",
    dataIndex: "service",
    key: "service",
    render:(text, record)=>{
      return(
        <div className="flex items-center gap-1">
           <span>{record?.service?.Services}</span>
        </div>
      )
    }
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
    render: (text, record)=>{
    return (
      <span>{dayjs(record?.created_at).format("YYYY-MM-DD")}</span>
    )
    }
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
    onFilter: (value, record) => record?.taxation?.status === value,
    render: (text, record) => {
      let color;
      switch (record?.taxation?.status) {
        case "fresh_lead":
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
      return <Tag color={color}>{record?.taxation?.status}</Tag>;
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, record) => (
      <Space 
       className="cursor-pointer"
       onClick={()=>navigate(`/our-panels/taxation-panel/upload-doc/${record.file_no}`)}
      >
        <EyeOutlined />
      </Space>
    ),
  },
];







    useEffect(()=>{

      const fetchAllOrder=async()=>{
         try {
          const {data, status}=await getAllOrders();
          if(status===200){
            setAllOrders(data?.data)
          }
         } catch (error) {
          
         }
      }

      fetchAllOrder();

    },[])

  

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
          <Table bordered columns={columns} dataSource={allOrders} rowKey="fileNo"   scroll={{ x: "max-content" }} />
        </div>
      </div>
    </div>
  );
};

export default TaxationPanel;
