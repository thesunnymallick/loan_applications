import React, { useEffect, useState } from "react";
import { Card, Table, Input, Tag, Space, Button } from "antd";
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
import { getAllOrders, taxtaionCount } from "../../api/partner/taxationpanel";
import dayjs from "dayjs";

const TaxationPanel = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [allOrders, setAllOrders] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [taxCount, setTaxCount]=useState(0);
  const navigate = useNavigate();

  // Fetch all orders
  const fetchAllOrder = async (params = {}) => {
    try {
      const { data, status } = await getAllOrders(params);
      if (status === 200) {
        setAllOrders(data?.data?.data || []);
        setTotalItems(data?.data?.total || 0); // Set total items
      }
    } catch (error) {}
  };

  // fetch all taxations
  useEffect(() => {
    fetchAllOrder({
      page: currentPage,
      pageSize,
      search: searchText,
      ...filteredInfo,
    });
  }, [currentPage, pageSize, searchText, filteredInfo]);


  useEffect(()=>{

    const taxtationCount=async()=>{
      try {
        const {data, status}=await taxtaionCount()
        if(status===200){
          setTaxCount(data?.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    taxtationCount();

  },[])

  // Handle table changes (pagination, filters)
  const handleTableChange = (pagination, filters) => {
    setCurrentPage(pagination.current); // Update current page
    setPageSize(pagination.pageSize); // Update page size
    setFilteredInfo(filters); // Update filters
  };

  // Handle search
  const handleSearch = () => {
    // Reset to the first page when searching
    setCurrentPage(1);
    fetchAllOrder({
      page: 1,
      pageSize,
      search: searchText,
      ...filteredInfo,
    });
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1, 
    },

    {
      title: "File No",
      dataIndex: "file_no",
      key: "file_no",
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
      onFilter: (value, record) => record.file_no.includes(value),
    },


    {
      title: "Applicant Name",
      dataIndex: "applicant",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-1">
            <span>{record?.taxation?.first_name}</span>
            <span>{record?.taxation?.middle_name}</span>
            <span>{record?.taxation?.last_name}</span>
          </div>
        );
      },
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-1">
            <span>{record?.service?.Services}</span>
          </div>
        );
      },
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
      render: (text, record) => {
        return <span>{dayjs(record?.created_at).format("YYYY-MM-DD")}</span>;
      },
    },
   

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Fresh Lead", value: "fresh_lead" },
        { text: "Upload Documents", value: "upload_documents" },
        { text: "Banking Pendency", value: "banking_pendency" },
        { text: "Assign", value: "assign" },
        { text: "Reject", value: "reject" },
        { text: "Login", value: "login" },
        { text: "Hold", value: "hold" },
        { text: "Disbursed", value: "disbursed" },
        { text: "Docs Pending", value: "docs_pending" },
        { text: "Docs Pendancy", value: "docs_pendancy" },
        { text: "Approved", value: "approved" },
        { text: "Rejected", value: "rejected" },
        { text: "Dispatched", value: "dispatched" },
        { text: "Completed", value: "completed" },
        { text: "Soft Approval", value: "soft_approval" },
        { text: "Commission Due", value: "commission_due" },
        { text: "Partner Hold", value: "partner_hold" },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.taxation.status.includes(value),
      render: (text, record) => {
        const statusMapping = {
          fresh_lead: { label: "Fresh Lead", color: "#004085" },
          upload_documents: { label: "Upload Documents", color: "#085858" },
          banking_pendency: { label: "Banking Pendency", color: "#995700" },
          assign: { label: "Assign", color: "#005a00" },
          reject: { label: "Reject", color: "#8b0000" },
          login: { label: "Login", color: "#7b6400" },
          hold: { label: "Hold", color: "#4b0082" },
          disbursed: { label: "Disbursed", color: "#2e8b57" },
          docs_pending: { label: "Docs Pending", color: "#1e90ff" },
          docs_pendancy: { label: "Docs Pendancy", color: "#1c7430" },
          approved: { label: "Approved", color: "#32cd32" },
          rejected: { label: "Rejected", color: "#dc143c" },
          dispatched: { label: "Dispatched", color: "#ffa500" },
          completed: { label: "Completed", color: "#20b2aa" },
          soft_approval: { label: "Soft Approval", color: "#4682b4" },
          commission_due: { label: "Commission Due", color: "#daa520" },
          partner_hold: { label: "Partner Hold", color: "#8a2be2" },
        };
        const status = statusMapping[record.taxation.status] || { label: record.taxation.status, color: "#595959" };
    
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
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space
          className="cursor-pointer"
          onClick={() =>
            navigate(`/our-panels/taxation-panel/upload-doc/${record.file_no}`)
          }
        >
          <EyeOutlined />
        </Space>
      ),
    },
  ];






  return (
    <div className="bg-gray-50 p-8">
      {/* Action Buttons Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Place Order Card */}
        <Card
          onClick={() => navigate("/our-panels/taxation-panel/place-order")}
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
          onClick={() => navigate("/our-panels/taxation-panel/add-client")}
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
          <h3 className="text-xl font-semibold mb-1 text-white">Orders  ({taxCount?.place_order_count})</h3>
          <p className="text-white opacity-90 flex items-center justify-center gap-2">
            View <span className="text-white">➔</span>
          </p>
        </Card>

        {/* Clients Card */}
        <Card
          onClick={() => navigate(`/our-panels/taxation-panel/all-client`)}
          hoverable
          className="rounded-lg shadow-lg text-center border-none cursor-pointer"
          bodyStyle={{
            padding: "24px",
            background: "linear-gradient(135deg, #11998E, #38EF7D)", // Premium teal gradient
          }}
        >
          <TeamOutlined className="text-white text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-1 text-white">
            Clients ({taxCount?.clients_count})
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
            Services ({taxCount?.services_count})
          </h3>
          <p className="text-white opacity-90 flex items-center justify-center gap-2">
            View <span className="text-white">➔</span>
          </p>
        </Card>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mt-10">
        <div>
          <div className="flex justify-end mb-6">
            <Input
              size="large"
              placeholder="Search by keyword..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
              prefix={<SearchOutlined style={{ color: "#888" }} />}
              style={{
                borderRadius: "8px",
                padding: "8px 12px",
                width: "100%",
                maxWidth: "400px",
              }}
            />
          </div>
          <Table
            bordered
            columns={columns}
            dataSource={allOrders}
            rowKey="fileNo"
            scroll={{ x: "max-content" }}
            pagination={{
              current: currentPage,
              pageSize,
              total: totalItems,
              onChange: (page) => setCurrentPage(page),
            }}
            onChange={handleTableChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TaxationPanel;
