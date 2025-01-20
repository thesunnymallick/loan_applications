import React, { useEffect, useState } from "react";
import {
  AiOutlineFile,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineCar,
} from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { BsListCheck } from "react-icons/bs";
import { Button, Input, Space, Table, Tag } from "antd";
import { IoAddOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { getAllCreditCards, getcreditCardCount } from "../../api/partner/creditcardApi";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa";
import { render } from "@testing-library/react";
import dayjs from "dayjs";

const CreditCard = () => {
  const [allCreditCards, setAllCreditCards] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1); 
  const [pageSize, setPageSize] = useState(10); 
  const [totalItems, setTotalItems] = useState(0); 
  const [cardCount, setCardCount]=useState("")



 



   // fetch all credit Card
  const fetchAllCreditCard = async (params = {}) => {
    try {
      const { data, status } = await getAllCreditCards(params);
      if (status === 200) {
        setAllCreditCards(data?.data?.data);
        setTotalItems(data?.data?.total || 0); 
      }
    } catch (error) {
      console.log(error);
    }
  };


  // Fetch all Credit Card
  useEffect(() => {
    fetchAllCreditCard({
      page: currentPage,
      pageSize,
      search: searchText,
      ...filteredInfo,
    });
  }, [currentPage, pageSize, searchText, filteredInfo]); 



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
    fetchAllCreditCard({
      page: 1,
      pageSize,
      search: searchText,
      ...filteredInfo,
    });
  };



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
            dataIndex: "applied_bank",
            key: "applied_bank",
            render: (bank) => bank || "Not Available",
          },
          {
            title: "Login Id",
            dataIndex: "login_id",
            key: "login_id",
            render: (loginId) => loginId || "Not Assigned",
          },
          {
            title: "Credit Limit",
            dataIndex: "credit_limit",
            key: "creditLimit",
            render: (creditLimit) => {
              return <span>₹{creditLimit || "0.00"}</span>;
            },
          },
          {
            title: "Applied On",
            dataIndex: "applied_on",
            key: "appliedOn",
            render: (appliedOn) => {
              return (
                <span>
                  {appliedOn
                    ? dayjs(appliedOn).format("MM/DD/YYYY")
                    : "Date Not Provided"}
                </span>
              );
            },
          },
          {
            title: "Applied Bank Status",
            dataIndex: "applied_bank_status",
            key: "bankStatus",
            render: (status) => {
              if (!status) {
                return <Tag color="default">Not Assigned Bank</Tag>;
              }
      
              let color = "default";
              switch (status.toLowerCase()) {
                case "pending":
                  color = "orange";
                  break;
                case "approve":
                  color = "green";
                  break;
                case "reject":
                  color = "red";
                  break;
                default:
                  color = "default";
              }
              return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
          },
        ],
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
              navigate(
                `/our-panels/creditCard-panel/upload-doc/${record.file_no}`
              )
            }
          >
            <EyeOutlined />
          </Space>
        ),
      },
    ];
  


    useEffect(()=>{

      const fetchCreditCardCount=async()=>{
        try {
          const {data, status}=await getcreditCardCount();
          if(status===200){
            setCardCount(data?.data)
          }
        } catch (error) {
          console.log(error);
        }
      }

      fetchCreditCardCount();

    },[])




    const cards = [
      {
        title: "Docs Pending",
        count: cardCount.docs_pending,
        icon: <AiOutlineFile />,
        gradient: "from-green-500 to-emerald-700",
      },
      {
        title: "Docs Uploaded",
        count: cardCount.upload_documents,

        icon: <FiUpload />,
        gradient: "from-gray-400 to-gray-600",
      },
      {
        title: "Docs Pendancy",
        count: cardCount.docs_pendancy,
        icon: <BsListCheck />,
        gradient: "from-teal-400 to-teal-600",
      },
      {
        title: "Logged In",
        count: cardCount.login,
        icon: <AiOutlineCheckCircle />,
        gradient: "from-blue-500 to-blue-700",
      },
      {
        title: "Approved",
        count: cardCount.approved,
        icon: <AiOutlineCheckCircle />,
        gradient: "from-purple-500 to-indigo-700",
      },
      {
        title: "Rejected",
        count: cardCount.rejected,
        icon: <AiOutlineCloseCircle />,
        gradient: "from-red-500 to-rose-700",
      },
      {
        title: "Dispatched",
        count: cardCount.dispatched,
        icon: <AiOutlineCar />,
        gradient: "from-yellow-500 to-orange-600",
      },
      {
        title: "Completed",
        count: cardCount.completed,
        icon: <AiOutlineCheckCircle />,
        gradient: "from-lime-500 to-green-700",
      },
    ];



    return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <Link to="/our-panels">
            <FaArrowLeft className="text-lg md:text-xl text-zinc-800 font-semibold" />
          </Link>
          <span className="text-lg md:text-2xl text-zinc-800 font-semibold">
            Credit Card
          </span>
        </div>

        {/* Right Section */}
        <button
          onClick={() =>
            navigate(`/our-panels/creditCard-panel/creditcard-apply`)
          }
          className="
          w-full md:w-auto
          h-10
          bg-green-700
          text-white 
          rounded-lg 
          shadow-sm 
          flex 
          justify-center 
          items-center 
          gap-2 
          px-4
        "
        >
          <span className="text-lg md:text-xl">
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
          <h1 className="text-zinc-700 font-semibold text-xl md:text-2xl text-center md:text-left">
            All Applied Credit Card
          </h1>
        </div>

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

        <Table
          bordered
          columns={columns}
          dataSource={allCreditCards}
          scroll={{ x: "max-content" }}
          loading={loading}
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
    );
};

export default CreditCard;
