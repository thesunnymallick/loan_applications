import { Button, Input, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
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
import { getAllLoansPartner, getLoanCount } from "../../api/partner/loanApi";
import dayjs from "dayjs";
const LoanPanels = () => {

  const navigate=useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [allLons, setAllLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Separate state for current page
  const [pageSize, setPageSize] = useState(10); // Separate state for page size
  const [totalItems, setTotalItems] = useState(0); // Separate state for total items
  const [loanCount, setLoanCount]=useState("")


    // Fetch loans data from API
    const fetchLoans = async (params = {}) => {
      setLoading(true);
      try {
        const { status, data } = await getAllLoansPartner(params);
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
  
    useEffect(() => {
      fetchLoans({
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
    // Reset to the first page when searching
    setCurrentPage(1);
    fetchLoans({
      page: 1,
      pageSize,
      search: searchText,
      ...filteredInfo,
    });
  };


 

  
 
  




  const handleNavigateUploadDocPage=(loanType, fileNo)=>{
     if(loanType==="business_loan"){
      navigate(`/our-panels/loan-panels/businessLoan/upload-doc/${fileNo}`)
     }
     else if(loanType==="personal_loan"){
      navigate(`/our-panels/loan-panels/personalLoan/upload-doc/${fileNo}`)
     }
     else if(loanType==="home_loan"){
      navigate(`/our-panels/loan-panels/homeLoan/upload-doc/${fileNo}`)
     }
     else if( loanType==="loan_against_property"){
      navigate(`/our-panels/loan-panels/loanAgainstProperty/upload-doc/${fileNo}`)
     }
     else if( loanType==="car_loan"){
      navigate(`/our-panels/loan-panels/carLoan/upload-doc/${fileNo}`)
     }
     else if( loanType==="old_car_loan"){
      navigate(`/our-panels/loan-panels/oldCarLoan/upload-doc/${fileNo}`)
     }
  }


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
    title: "",
    key: "actions",
    render: (record) => <Button 
     onClick={()=>handleNavigateUploadDocPage(record.loan_type, record.file_no)}
    type="link" icon={<EyeOutlined />} />,
  },

   
  ];
  



   

    useEffect(()=>{
       const fetchLoanCount=async()=>{
        try {
           const {data, status}=await getLoanCount();
           if(status===200){
            setLoanCount(data?.data);
           }
        } catch (error) {
          console.log(error)
        }
       }

       fetchLoanCount();
    },[])



    const loans = [
      {
        id: 1,
        name: "Personal Loan",
        count: loanCount?.personal_loan,
        icon: <FaMoneyBillWave />,
        bgColor: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
        link:"/our-panels/loan-panels/pl"
      },
      {
        id: 2,
        name: "Business Loan",
        count: loanCount?.business_loan,
        icon: <FaHandshake />,
        bgColor: "bg-gradient-to-r from-teal-400 to-green-500",
        link:"/our-panels/loan-panels/bl"
      },
      {
        id: 3,
        name: "Home Loan",
        count: loanCount?.home_loan,
        icon: <FaHome />,
        bgColor: "bg-gradient-to-r from-orange-400 via-red-400 to-pink-400",
        link:"/our-panels/loan-panels/hl"
      },
      {
        id: 4,
        name: "Loan Against Property",
        count: loanCount?.loan_against_property,
        icon: <FaBuilding />,
        bgColor: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500",
        link:"/our-panels/loan-panels/lap"
      },
      {
        id: 5,
        name: "Car Loan",
        count: loanCount?.car_loan,
        icon: <FaCar />,
        bgColor: "bg-gradient-to-r from-cyan-500 to-blue-500",
        link:"/our-panels/loan-panels/cl"
      },
      {
        id: 6,
        name: "Old Car Loan",
        count: loanCount?.old_car_loan,
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
    </div>
  );
};

export default LoanPanels;
