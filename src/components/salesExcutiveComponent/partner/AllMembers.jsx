import React from "react";
import { Input, Table, Tag } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";

// Function to render the Email Verification Tag
const renderEmailVerificationTag = (emailVerified) => {
  return emailVerified === "Yes" ? (
    <Tag color="green">Email Verified</Tag>
  ) : (
    <Tag color="red">Email Not Verified</Tag>
  );
};

// Function to render the Account Status Tag
const renderAccountStatusTag = (accountStatus) => {
  switch (accountStatus) {
    case "Account Verified":
      return <Tag color="green">Active</Tag>;
    case "suspended":
      return <Tag color="orange">Suspended</Tag>;
    case "deactivated":
      return <Tag color="red">Deactivated</Tag>;
    default:
      return <Tag color="gray">Unknown Status</Tag>;
  }
};

const columns = [
  {
    title: "Account ID",
    dataIndex: "accountId",
    key: "accountId",
    width: 150, // Adjust width for each column as needed
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 200,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 250,
  },
  {
    title: "Is Email Verified",
    dataIndex: "isEmailVerified",
    key: "isEmailVerified",
    render: (text) => renderEmailVerificationTag(text),
    width: 150,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    width: 150,
  },
  {
    title: "Payment Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    width: 200,
  },
  {
    title: "Payment Txn Mode",
    dataIndex: "transactionMode",
    key: "transactionMode",
    width: 150,
  },
  {
    title: "Subscription",
    dataIndex: "subscription",
    key: "subscription",
    width: 200,
  },
  {
    title: "Created Date",
    dataIndex: "createdDate",
    key: "createdDate",
    width: 150,
  },
  {
    title: "Account Status",
    dataIndex: "accountStatus",
    key: "accountStatus",
    width: 200,
    render: (text) => renderAccountStatusTag(text),
  },
];

const dataSource = [
  {
    key: "1",
    accountId: "LW-241009422",
    name: "KANIKA FINANCE",
    email: "kanikafinance18@gmail.com",
    isEmailVerified: "Yes",
    phone: "9071379131",
    transactionId: "428316506915",
    transactionMode: "UPI",
    subscription: "DSA DELIGHT PRO",
    createdDate: "9 Oct 2024",
    accountStatus: "Account Verified",
  },
  {
    key: "2",
    accountId: "LW-241003410",
    name: "HEMANT KUMARI RATHORE",
    email: "rathorehement8@gmail.com",
    isEmailVerified: "Yes",
    phone: "9653743555",
    transactionId: "427701582202",
    transactionMode: "UPI",
    subscription: "DSA DELIGHT PRO",
    createdDate: "3 Oct 2024",
    accountStatus: "Account Verified",
  },
  {
    key: "3",
    accountId: "LW-241001408",
    name: "VIJAY VERMA",
    email: "vv176571@gmail.com",
    isEmailVerified: "Yes",
    phone: "9399591544",
    transactionId: "427571256854",
    transactionMode: "UPI",
    subscription: "DSA DELIGHT PRO",
    createdDate: "1 Oct 2024",
    accountStatus: "Account Verified",
  },
  {
    key: "4",
    accountId: "LW-240930406",
    name: "kumari shashikiran",
    email: "shashi89481@gmail.com",
    isEmailVerified: "Yes",
    phone: "7007195512",
    transactionId: "P3QADGZqY2o4Wl",
    transactionMode: "UPI",
    subscription: "DSA DELIGHT PRO",
    createdDate: "30 Sep 2024",
    accountStatus: "Account Verified",
  },
  {
    key: "5",
    accountId: "LW-240930404",
    name: "NAVNEET KUMAR",
    email: "navneetyadav852201@gmail.com",
    isEmailVerified: "Yes",
    phone: "8405913788",
    transactionId: "",
    transactionMode: "UPI",
    subscription: "DSA DELIGHT PRO",
    createdDate: "29 Sep 2024",
    accountStatus: "Account Verified",
  },
  {
    key: "6",
    accountId: "LW-240923394",
    name: "PRAVIND GUPTA",
    email: "gupta1170sa@gmail.com",
    isEmailVerified: "Yes",
    phone: "9431099784",
    transactionId: "463361879292",
    transactionMode: "UPI",
    subscription: "DSA LITE",
    createdDate: "22 Sep 2024",
    accountStatus: "Account Verified",
  },
  {
    key: "7",
    accountId: "LW-240918388",
    name: "Vexhon Consultants",
    email: "vexhonconsultants@gmail.com",
    isEmailVerified: "Yes",
    phone: "9776671566",
    transactionId: "426287466911",
    transactionMode: "UPI",
    subscription: "DSA DELIGHT PRO",
    createdDate: "18 Sep 2024",
    accountStatus: "Account Verified",
  },
  {
    key: "8",
    accountId: "LW-240912384",
    name: "Smart Financial services",
    email: "smartfinancialservice.contai@gmail.com",
    isEmailVerified: "Yes",
    phone: "7548962209",
    transactionId: "425646861501",
    transactionMode: "UPI",
    subscription: "DSA DELIGHT PRO",
    createdDate: "12 Sep 2024",
    accountStatus: "Account Verified",
  },
  {
    key: "9",
    accountId: "LW-240909381",
    name: "MD SAD",
    email: "mdsadofficial2020@gmail.com",
    isEmailVerified: "Yes",
    phone: "8514025022",
    transactionId: "425336898148",
    transactionMode: "UPI",
    subscription: "DSA LITE",
    createdDate: "8 Sep 2024",
    accountStatus: "Account Verified",
  },
  {
    key: "10",
    accountId: "LW-240905374",
    name: "RAMESH PRASAD AHIRWAR",
    email: "rameshahirwar9581@gmail.com",
    isEmailVerified: "Yes",
    phone: "9685967543",
    transactionId: "753066208363",
    transactionMode: "UPI",
    subscription: "DSA LITE",
    createdDate: "4 Sep 2024",
    accountStatus: "Account Verified",
  },
  {
    key: "11",
    accountId: "LW-240826364",
    name: "MAMILATA SAHOO",
    email: "eversarat@gmail.com",
    isEmailVerified: "Yes",
    phone: "7656070335",
    transactionId: "opZUDmiep03ANO",
    transactionMode: "Card",
    subscription: "DSA DELIGHT PRO",
    createdDate: "26 Aug 2024",
    accountStatus: "Account Verified",
  },
];

const AllMembers = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-zinc-700 font-semibold text-xl">Member Overview</h2>

        <div >
          {/* Search Bar */}
          <Input
            placeholder="Search Member..."
            // value={searchText}
            // onChange={(e) => handleSearch(e.target.value)}
            prefix={<IoSearchOutline/>} // Add search icon
            style={{
              // marginBottom: ,
              width: 300,
              borderRadius: "8px",
              padding: "10px 15px",
            }}
            allowClear
          />
        </div>
      </div>
      <div className="px-4 mt-3 flex items-center gap-2">
      <div className="flex items-center gap-1 text-lg  border-r-2 border-r-zinc-400 px-2 py-1">
           <span className="text-blue-800 font-semibold"><FaUsers/></span>
           <span className="text-blue-800 font-semibold">55</span>
           <span className="text-zinc-400 font-semibold">Total Partner</span>
       </div>
       <div className="flex items-center gap-1 text-lg border-r-2 border-r-zinc-400 px-2 py-1">
           <span className="text-green-800 font-semibold text-lg"><FaUserCheck/></span>
           <span className="text-green-800 font-semibold">50</span>
           <span className="text-zinc-400 font-semibold">Active Partner</span>
       </div>
      </div>
      <div className="mt-3">
        <Table
          bordered
          columns={columns}
          dataSource={dataSource}
          size="small"
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default AllMembers;
