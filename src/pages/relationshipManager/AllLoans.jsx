import React, { useEffect, useState } from "react";
import { getAllLoans, loanStatusUpdate } from "../../api/rm/loanApi";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  Modal,
  notification,
  Select,
  Table,
  Tag,
} from "antd";
import dayjs from "dayjs";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { getLoanStatus } from "../../api/admin/adminSettingApi";

const AllLoans = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [allLons, setAllLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Separate state for current page
  const [pageSize, setPageSize] = useState(10); // Separate state for page size
  const [totalItems, setTotalItems] = useState(0); // Separate state for total items
  const [isLoanStatus, setIsLoanStatus] = useState(false);
  const [allLoanStatus, setAllLoanStatus] = useState();
  const [fileNo, setFileNo] = useState(null);
  const [loanStatus, setLoanStatus] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);


  // Fetch loans data from API
  const fetchLoans = async (params = {}) => {
    setLoading(true);
    try {
      const { status, data } = await getAllLoans(params);
      if (status === 200) {
        setAllLoans(data?.data?.data || []);
        setTotalItems(data?.data?.total || 0); // Set total items
      }
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  // Dependency array updated
  useEffect(() => {
    fetchLoans({
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
    fetchLoans({
      page: 1,
      pageSize,
      search: searchText,
      ...filteredInfo,
    });
  };



   //loan status modal open
  const loanStatusModalOpen = () => {
    setIsLoanStatus(true);
  };

  
  //loan status modal close
  const loanStatusModalClose = () => {
    setIsLoanStatus(false);
    setFileNo(null);
    setLoanStatus(null);
  };

  // All Columns
  const columns = [
    {
      title: "Sl. No",
      key: "serialNumber",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1, // Calculate serial number
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
      title: "Loan Mode",
      dataIndex: "loan_mode",
      key: "loan_mode",
      filters: [
        { text: "New", value: "new" },
        { text: "Top Up", value: "top up" },
        { text: "BT", value: "bt" },
        { text: "Card to Card", value: "Card To Card" },
      ],
      filteredValue: filteredInfo.loanMode || null,
      onFilter: (value, record) => record.loan_mode.includes(value),
      render: (text) => (
        <Tag className="capitalize" color={text === "new" ? "red" : "green"}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text, record) => {
        const loanTypeMapping = {
          personal_loan: { label: "Personal Loan", color: "#004085" },
          business_loan: { label: "Business Loan", color: "#005a00" },
          home_loan: { label: "Home Loan", color: "#7b6400" },
          loan_against_property: {
            label: "Loan Against Property",
            color: "#4b0082",
          },
          car_loan: { label: "Car Loan", color: "#085858" },
          old_car_loan: { label: "Old Car Loan", color: "#8b0000" },
        };
        const loanType = loanTypeMapping[record.loan_type] || {
          label: text,
          color: "#595959",
        };

        return (
          <Tag
            style={{
              backgroundColor: loanType.color,
              color: "#fff",
              border: "none",
            }}
          >
            {loanType.label} - {record?.loan_amount}
          </Tag>
        );
      },
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "applicantName",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-1">
            <span>{record.first_name}</span>
            <span>{record.middle_name}</span>
            <span>{record.last_name}</span>
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
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text, record) => {
        return <span>{dayjs(record.created_at).format("DD/MM/YYYY")}</span>;
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
      title: "Action",
      key: "Action",
      width: 150,
      render: (text, record) => {
        const items = [
          {
            key: "documentsView",
            label: (
              <span
                onClick={() => {
                  navigate(`/rm/loaninfo/${record.file_no}`, {
                    state: { loanInfo: record },
                  });
                }}
              >
                Documents View
              </span>
            ),
          },
          {
            key: "changeLoanStatus",
            label: (
              <span
                onClick={() => {
                  setFileNo(record.file_no);
                  loanStatusModalOpen();
                }}
              >
                Change Loan Status
              </span>
            ),
          },
        ];
        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <BsThreeDots className="text-xl text-zinc-600 cursor-pointer" />
          </Dropdown>
        );
      },
    },

    {
      title: "Partner Details",
      children: [
        {
          title: "ID",
          dataIndex: ["partner", "uuid"], // Access nested field
          key: "partnerUuid",
        },
        {
          title: "Email",
          dataIndex: ["partner", "email"], // Access nested field
          key: "partnerEmail",
        },
        {
          title: "Mobile Number",
          dataIndex: ["partner", "mobile_number"], // Access nested field
          key: "partnerMobile",
        },
        {
          title: "Name",
          dataIndex: ["partner", "name"], // Access nested field
          key: "partnerName",
        },
      ],
    },
  ];

  const handelLonaStatusUpadate = async () => {
    try {
      setBtnLoading(true);

      const { status } = await loanStatusUpdate(fileNo, {status:loanStatus});

      if (status === 200) {
        // Success notification
        notification.success({
          message: "Success",
          description: "Loan status updated successfully!",
        });

        setBtnLoading(false);
        setIsLoanStatus(false);
        setLoanStatus(null);
        setFileNo(null);
        fetchLoans(); // Refresh the loans list
      }
    } catch (error) {
      setBtnLoading(false);

      // Error notification
      notification.error({
        message: "Error",
        description:
          error.response?.data?.message ||
          "Failed to update loan status. Please try again.",
      });

      console.error(error);
    }
  };


  // Fecth loan Status
  useEffect(() => {
    const fetchLoanStatus = async () => {
      try {
        const { data, status } = await getLoanStatus();
        if (status === 200) {
          setAllLoanStatus(data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLoanStatus();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-zinc-800 font-semibold text-2xl">All Loans</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm mt-4 p-4">
        <div className="flex justify-end mb-4">
          <Input
            placeholder="Search by File No"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            style={{ width: 250 }}
          />
        </div>
        <Table
          className="mt-4"
          bordered
          columns={columns}
          dataSource={allLons}
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize,
            total: totalItems,
            onChange: (page) => setCurrentPage(page),
          }}
          onChange={handleTableChange}
          rowKey="key"
          scroll={{ x: "max-content" }}
        />
      </div>
      <Modal
        open={isLoanStatus}
        onCancel={loanStatusModalClose}
        title={null}
        width={400}
        centered
        footer={null}
        closable={false}
        maskClosable={false}
        modalRender={(modal) => {
          return React.cloneElement(modal, {
            style: {
              ...modal.props.style,
              ...{ borderRadius: 10, padding: 0 },
            },
          });
        }}
      >
        <div className="flex justify-between items-center py-2 px-4 border-b-[1px] border-b-zinc-300">
          <h1 className="text-zinc-700 font-semibold text-xl">
            Change Loan Status
          </h1>
          <span
            onClick={loanStatusModalClose}
            className="text-zinc-600 hover:text-zinc-800 font-semibold text-2xl cursor-pointer"
          >
            <RxCross2 />
          </span>
        </div>

        <div className="p-6">
          {/* <div className="flex flex-col items-center gap-1">
            <div className="w-24 h-24 rounded-full border-[2px] border-green-700 overflow-hidden">
              <img
                className="w-full  object-cover"
                src={userImage}
                alt="ProfileImage"
              />
            </div>
            <h2 className="text-zinc-700 text-xl">{userProfileInfo?.name}</h2>
            <span className="text-zinc-600 text-sm -mt-2">
              {userProfileInfo?.email}
            </span>
          </div> */}

          <div className="mt-4 px-6 w-full py-4 flex flex-col gap-1">
            <label htmlFor="" className="text-zinc-700 font-semibold">
              Select Status
            </label>
            <Select
              size="large"
              style={{ width: "100%" }}
              value={loanStatus}
              onChange={(value) => setLoanStatus(value)}
              placeholder={"Select Account Status"}
            >
              {allLoanStatus?.map((status) => {
                return (
                  <Select.Option key={status.key} value={status.key}>
                    {status.name}
                  </Select.Option>
                );
              })}

              <Select.Option value="pending">Pending</Select.Option>
            </Select>
          </div>

          <div className="mt-4 px-6 flex flex-col gap-4 pb-4">
            <Button
              loading={btnLoading}
              onClick={() => handelLonaStatusUpadate()}
              disabled={loanStatus !== null ? false : true}
              className="w-full h-10 rounded-3xl bg-green-700 text-white"
            >
              Save
            </Button>
            <button
              onClick={loanStatusModalClose}
              className="w-full h-10
              rounded-3xl border-[1px]
              border-green-700
              text-green-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllLoans;
