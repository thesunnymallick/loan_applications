import React, { useEffect, useState } from 'react';
import { Button, Input, Table, Tag } from 'antd';
import { FaRegBuilding, FaBusinessTime, FaIndustry } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { getAllGovermentLoan } from '../../api/partner/govermentLoanApi';
import dayjs from 'dayjs';
import { getGovermentLoanCount } from '../../api/partner/loanApi';
const GovermentLoan = () => {
  const navigate=useNavigate();
  
  const [searchText, setSearchText] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [loanInfo, setLoanInfo]=useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const [pageSize, setPageSize] = useState(10); 
  const [totalItems, setTotalItems] = useState(0); 
  const [loanCount, setLoanCount]=useState("")


 



  const handleNavigateUploadDocPage=(loanType, fileNo)=>{

    navigate(`/our-panels/govermentLoan/${loanType}/uploadDoc/${fileNo}`)
 }

  

  const fetchGovermentLoan=async(params = {})=>{
    try {
       setLoading(true);
      const {data,status}=await getAllGovermentLoan(params);
      if(status===200){
        setLoading(false);
        setLoanInfo(data?.data?.data);
        setTotalItems(data?.data?.total || 0); // Set total items
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchGovermentLoan({
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
    fetchGovermentLoan({
      page: 1,
      pageSize,
      search: searchText,
      ...filteredInfo,
    });
  };


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
      title: "Loan Type",
      dataIndex: "loan",
      key: "loan",
      render: (text) => {
        const loanTypeMapping = {
          "OD-CC": { label: "OD-CC", color: "#004085" },
          "PMEGP": { label: "PMEGP", color: "#28a745" },
          "MSME": { label: "MSME", color: "#ffc107" },
          "MUDRA": { label: "MUDRA", color: "#dc3545" },
        };
    
        const loanType = loanTypeMapping[text] || { label: text, color: "#595959" };
    
        return (
          <Tag
            style={{
              backgroundColor: loanType.color,
              color: "#fff",
              border: "none",
            }}
          >
            {loanType.label}
          </Tag>
        );
      },
    },
    
  

    {
      title: 'Applicant Name',
      dataIndex: 'applicant_name',
      key: 'applicant_name',
    },
    {
      title: 'Email',
      dataIndex: 'applicant_email',
      key: 'applicant_email',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobile_number',
      key: 'mobile_number',
    },
    {
      title: 'Created Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text, record)=>{
        return(
          <span>{dayjs(record.created_at).format("YYYY-MM-DD")}</span>
        )
      }
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
      title: "",
      key: "actions",
      render: (record) => <Button 
       onClick={()=>handleNavigateUploadDocPage(record.loan, record.file_no)}
      type="link" icon={<EyeOutlined />} />,
    },
  
  ];


  useEffect(()=>{

    const fetchGovermentLoanCount=async()=>{
        try {
          const {data, status}=await getGovermentLoanCount();

          if(status===200){
            setLoanCount(data?.data);
          }
        } catch (error) {
          console.log(error);
        }
    }

    fetchGovermentLoanCount();

  },[])

  const loans = [
    {
      type: 'Small Size Business',
      title: 'MUDRA Loan',
      count: loanCount?.MUDRA,
      loanRange: '₹ 50.00K - 10.00L',
      icon: <FaRegBuilding />,
      gradient: 'from-green-400 to-teal-500',
      link:"/our-panels/govermentLoan/MUDRALoan"
    },
    {
      type: 'Large Size Business',
      title: 'MSME Loan',
      count: loanCount?.MSME,
      loanRange: '₹ 10.01L - 25.00CR',
      icon: <FaBusinessTime />,
      gradient: 'from-blue-500 to-cyan-600',
      link:"/our-panels/govermentLoan/MSMELoan"
    },
    {
      type: 'Industry Business',
      title: 'PMEGP Loan',
      count: loanCount?.PMEGP,
      tradingRange: '₹ 20.00L',
      manufacturingRange: '₹ 50.00L',
      icon: <FaIndustry />,
      gradient: 'from-purple-500 to-pink-500',
       link:"/our-panels/govermentLoan/PMEGPLoan"
    },
    {
      type: 'Small Size Business',
      title: 'OD-CC',
      count: loanCount?.ODCC,
      loanRange: '₹ 50.00K - 10.00L',
      icon: <FaRegBuilding />,
      gradient: 'from-orange-400 to-red-500',
      link:"/our-panels/govermentLoan/ODCC"
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Government Loan Schemes
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {loans.map((loan, index) => (
          <div
            key={index}
            className={`relative bg-gradient-to-r ${loan.gradient} rounded-lg shadow-lg overflow-hidden`}
          >
            {/* Card Content */}
            <div className="p-8 text-white">
              {/* Icon Section */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-5xl">{loan.icon}</div>
                <div>
                  <p className="text-lg text-gray-200">{loan.type}</p>
                  <h3 className="text-2xl font-bold">
                    {loan.title}{' '}
                    <span className="text-gray-300">({loan.count})</span>
                  </h3>
                </div>
              </div>

              {/* Loan Details */}
              <div>
                {loan.loanRange && (
                  <p className="text-lg mb-4">
                    Loan Range: <span className="font-semibold">{loan.loanRange}</span>
                  </p>
                )}
                {loan.tradingRange && loan.manufacturingRange && (
                  <div className="text-lg">
                    <p>Trading: {loan.tradingRange}</p>
                    <p>Manufacturing: {loan.manufacturingRange}</p>
                  </div>
                )}
              </div>

              {/* Footer Section */}
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={()=>navigate(loan.link)}
                  className="bg-white text-gray-800 border-none px-6 py-2 rounded-lg text-lg hover:text-white hover:bg-gray-800"
                >
                  Apply Now
                </button>
                <BsArrowRight className="text-2xl text-gray-300" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='bg-white rounded-lg shadow-md  p-4 mt-10'>

        <div className='flex flex-col sm:flex-row justify-between py-4 gap-3'>
            <h1 className='text-zinc-700 text-xl font-semibold'>All Goverments Loans</h1>

        <div className="flex justify-end mb-4">
        <Input
           size='large'
          placeholder="Search by File No"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={handleSearch}
          style={{ width: "100%", maxWidth: 250 }}
        />
      </div>
        </div>
       <Table 
       columns={columns} 
       dataSource={loanInfo} 
       bordered  
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

export default GovermentLoan;
