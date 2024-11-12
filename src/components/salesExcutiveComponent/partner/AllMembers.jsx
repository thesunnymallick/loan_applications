import React, { useEffect, useState } from "react";
import { Input, Table, Tag, Button, Modal, notification } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { getAllMembers, partnerSendOTP } from "../../../api/salesExecutive/partnerApi";
import { RxCross2 } from "react-icons/rx";
import EmailVerify from "./EmailVerify";
import dayjs from "dayjs";

// Function to render the Email Verification Tag
const renderEmailVerificationTag = (emailVerified) => {
  return emailVerified === 1 ? (
    <Tag color="green">Email Verified</Tag>
  ) : (
    <Tag color="red">Email Not Verified</Tag>
  );
};

// Function to render the Account Status Tag
const renderAccountStatusTag = (accountStatus) => {
  switch (accountStatus) {
    case "verified":
      return <Tag color="green">Verified</Tag>;
    case "pending":
      return <Tag color="orange">Pending</Tag>;
    case "deactivated":
      return <Tag color="red">Deactivated</Tag>;
    default:
      return <Tag color="gray">Unknown Status</Tag>;
  }
};


 
         







const AllMembers = () => {

  const [allMembers, setAllMembers]=useState([]);
  const [email, setEmail]=useState("");
  const [isOpen, setIsOpen]=useState(false);
  const [loading, setLoading]=useState(false);

  // fetch all memebers
  useEffect(() => {
    const fetchAllMembers = async () => {
      try {
        const {data,status} = await getAllMembers();
        if (status === 200) {
          console.log(data);
          setAllMembers(data?.partners);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllMembers();
  }, []);


  // handel Send otp
  const handelSendOtp = async (email) => {
    try {
        const {status } = await partnerSendOTP({ email: email });
        // Assuming a successful response returns a status code of 200
        if (status === 200 ||201) {
            notification.success({
                message: 'Success',
                description: 'OTP has been sent successfully.',
            });
        } else {
            notification.error({
                message: 'Error',
                description: 'Failed to send OTP. Please try again.',
            });
        }
    } catch (error) {
        notification.error({
            message: 'Error',
            description: error.message || 'An unexpected error occurred.',
        });
    }
};

  // handel Email Verify Modal
  const handelEmailVerifyModal=(record)=>{
    setIsOpen(true)
    handelSendOtp(record.email)
    setEmail(record.email);

  }

  const handelCloseEmailVerifyModal=()=>{
    setIsOpen(false)
    setEmail(null)
  }


  const columns = [
    {
      title: "Account ID",
      dataIndex: "uuid",
      key: "uuid",
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
      key: "is_email_verified",
      render: (text, record) => renderEmailVerificationTag(record.is_email_verified),
      width: 150,
    },
    {
      title: "Phone",
      dataIndex: "mobile_number",
      key: "mobile_number",
      width: 150,
    },
    {
      title: "Payment Transaction ID",
      dataIndex: "payment_txn_id",
      key: "payment_txn_id",
      width: 200,
    },
    {
      title: "Payment Txn Mode",
      dataIndex: "payment_mode",
      key: "payment_mode",
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
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
      render: (created_at) => dayjs(created_at).format("YYYY-MM-DD"), // Adjust format as needed
    },
    {
      title: "Account Status",
      dataIndex: "status",
      key: "status",
      width: 200,
      render: (text) => renderAccountStatusTag(text),
    },
    {
      title:"Verify Email",
      dataIndex:"",
      key:"",
      width:150,
      render:(text, record)=>{
        return(
          <Button 
           disabled={record.is_email_verified===1 ? true :false}
           onClick={()=>handelEmailVerifyModal(record)}
           className="w-full 
           h-8 bg-green-700 text-white rounded-3xl flex justify-center items-center
           ">Email Verify</Button>
        )
      }
    }
  ];

  


  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-zinc-700 font-semibold text-xl">Member Overview</h2>

        <div>
          {/* Search Bar */}
          <Input
            placeholder="Search Member..."
            // value={searchText}
            // onChange={(e) => handleSearch(e.target.value)}
            prefix={<IoSearchOutline />} // Add search icon
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
          <span className="text-blue-800 font-semibold">
            <FaUsers />
          </span>
          <span className="text-blue-800 font-semibold">55</span>
          <span className="text-zinc-400 font-semibold">Total Partner</span>
        </div>
        <div className="flex items-center gap-1 text-lg border-r-2 border-r-zinc-400 px-2 py-1">
          <span className="text-green-800 font-semibold text-lg">
            <FaUserCheck />
          </span>
          <span className="text-green-800 font-semibold">50</span>
          <span className="text-zinc-400 font-semibold">Active Partner</span>
        </div>
      </div>
      <div className="mt-3">
        <Table
          bordered
          columns={columns}
          dataSource={allMembers}
          size="small"
          scroll={{ x: "max-content" }}
        />
      </div>

      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title={null}
        width={400}
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
        <div className="flex justify-between 
         items-center py-2 px-4 border-b-[1px] border-b-zinc-300">
          <h1 className="text-zinc-700 font-semibold text-xl">
          Email Verification
          </h1>
          <span
            onClick={handelCloseEmailVerifyModal}
            className="text-zinc-600 hover:text-zinc-800 font-semibold text-2xl cursor-pointer"
          >
            <RxCross2/>
          </span>
        </div>

        <EmailVerify email={email} setIsOpen={setIsOpen}/>
      
      </Modal>
    </div>
  );
};

export default AllMembers;
