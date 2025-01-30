import React, { useEffect, useState } from "react";
import {
  AiOutlineFile,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineDollar,
} from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { BsListCheck } from "react-icons/bs";
import { Button, Input, Space, Table, Tag } from "antd";
import { IoAddOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import {
  getAllInsurance,
  getInsuranceCount,
} from "../../api/partner/InsuranceApi";
import { FaArrowLeft } from "react-icons/fa";
import ErrorHandler from "../../utils/ErrorHandler";
import Loader from "../../components/Loader";

const InsurancePanel = () => {
  const [allInsurance, setAllInsurance] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [insuranceCount, setInsuranceCount] = useState("");
  const [pageLoading, setPageLoading]=useState(false);

  const navigate = useNavigate();

  const fetchAllInsurance = async (params = {}) => {
    try {
       setLoading(true);
      const { data, status } = await getAllInsurance(params);
      if (status === 200) {
        setAllInsurance(data?.data?.data);
        setTotalItems(data?.data?.total || 0); // Set total items
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      ErrorHandler.handleError(error);
    }
  };

  useEffect(() => {
    fetchAllInsurance({
      page: currentPage,
      pageSize,
      search: searchText,
      ...filteredInfo,
    });
  }, [currentPage, pageSize, searchText, filteredInfo]); // Dependency array updated

  // Handle table changes (pagination, filters)
  const handleTableChange = (pagination, filters) => {
    setCurrentPage(pagination.current); // Update current page
    setPageSize(pagination.pageSize); // Update page size
    setFilteredInfo(filters); // Update filters
  };

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1);
    fetchAllInsurance({
      page: 1,
      pageSize,
      search: searchText,
      ...filteredInfo,
    });
  };

  useEffect(() => {
    const fetchInsuranceCount = async () => {
      try {
        setPageLoading(true)
        const { data, status } = await getInsuranceCount();
        if (status === 200) {
          setInsuranceCount(data);
          setPageLoading(false);
        }
      } catch (error) {
        setPageLoading(false);
        ErrorHandler.handleError(error);
      }
    };

    fetchInsuranceCount();
  }, []);

  // Columns definition
  const columns = [
    {
      title: "Sl. No",
      key: "serialNumber",
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
      title: "Name",
      key: "name",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-1">
            <span>{record?.first_name}</span>
            <span>{record?.middle_name}</span>
            <span>{record?.last_name}</span>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_number",
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
      onFilter: (value, record) => record.status.includes(value),
      render: (text) => {
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
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space
          className="cursor-pointer"
          onClick={() =>
            navigate(`/our-panels/insurance/upload-doc/${record.file_no}`)
          }
        >
          <EyeOutlined />
        </Space>
      ),
    },
  ];



  const cards = [
    {
      title: "Docs Pending",
      count: insuranceCount?.docs_pending,
      icon: <AiOutlineFile />,
      gradient: "from-pink-400 to-pink-600",
    },
    {
      title: "Docs Uploaded",
      count: insuranceCount?.upload_documents,
      icon: <FiUpload />,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: "Docs Pendancy",
      count: insuranceCount?.docs_pendancy,
      icon: <BsListCheck />,
      gradient: "from-green-400 to-green-600",
    },
    {
      title: "Logged In",
      count: insuranceCount?.login,
      icon: <AiOutlineCheckCircle />,
      gradient: "from-purple-400 to-purple-600",
    },
    {
      title: "Approved",
      count: insuranceCount?.approved,
      icon: <AiOutlineCheckCircle />,
      gradient: "from-orange-400 to-orange-600",
    },
    {
      title: "Rejected",
      count: insuranceCount?.rejected,
      icon: <AiOutlineCloseCircle />,
      gradient: "from-red-400 to-red-600",
    },
    {
      title: "Banker Pendancy",
      count: insuranceCount?.banking_pendency,
      icon: <AiOutlineDollar />,
      gradient: "from-teal-400 to-teal-600",
    },
    {
      title: "Completed",
      count: insuranceCount?.completed,
      icon: <AiOutlineCheckCircle />,
      gradient: "from-yellow-400 to-yellow-600",
    },
  ];

  return (
   <>
    {
      pageLoading!==true ?(<div className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-2">
            <Link to="/our-panels">
              <FaArrowLeft className="text-lg md:text-xl text-zinc-800 font-semibold" />
            </Link>
            <span className="text-lg md:text-2xl text-zinc-800 font-semibold">
              Insurance
            </span>
          </div>
  
          {/* Right Section */}
          <button
            onClick={() => navigate(`/our-panels/insurancePanel/insurance/apply`)}
            className="
              w-full sm:w-[10%]
              h-10
              bg-green-700
              text-white rounded-lg shadow-sm 
              flex 
              justify-center 
              items-center 
              mt-4 sm:mt-0"
          >
            <span className="text-xl">
              <IoAddOutline />
            </span>
            <span>Apply</span>
          </button>
        </div>
  
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
          <div className="flex flex-col md:flex-row justify-between items-center py-4 px-2 gap-3">
            <h1 className="text-zinc-700 font-semibold text-2xl w-full sm:w-auto">
              All Applied Insurance
            </h1>
  
            <div className="flex justify-end mb-4">
              <Input
                size="large"
                placeholder="Search by File No"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onPressEnter={handleSearch}
                style={{ width: "100%", maxWidth: 250 }}
              />
            </div>
          </div>
  
          <Table
            bordered
            columns={columns}
            dataSource={allInsurance}
            scroll={{ x: "max-content" }}
            loading={loading}
            pagination={{
              current: currentPage,
              pageSize,
              total: totalItems,
              onChange: (page) => setCurrentPage(page),
            }}
            onChange={handleTableChange}
            rowKey="key"
          />
        </div>
      </div>) : (<Loader/>)
    }
   </>
  );
};

export default InsurancePanel;
