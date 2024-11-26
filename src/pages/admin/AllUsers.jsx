import React, { useEffect, useState } from "react";
import { getAllMembers } from "../../api/salesExecutive/partnerApi";
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
import { BsThreeDots } from "react-icons/bs";
import dayjs from "dayjs";
import { RxCross2 } from "react-icons/rx";
import userImage from "../../assets/userCricle.jpg";
import {
  changedPartnerAccountStatus,
  checkPartnerPassword,
} from "../../api/admin/users";
import Docverified from "../../components/adminCom/Docverified";
import { Link, useNavigate } from "react-router-dom";

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

const AllUsers = () => {
  // Navigate User
  const navigate = useNavigate();

  const [allMembers, setAllMembers] = useState([]);
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const [accountStatus, setAccountStatus] = useState("");
  const [isCheckpassword, setIsCheckpassword] = useState(false);
  const [isAccountStatus, setIsAccountStatus] = useState(false);
  const [isDocVerify, setIsDocVerify] = useState(false);
  const [yourPassword, setYourPassword] = useState("click check button");
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading]=useState(false);

  // fetch all memebers
  const fetchAllMembers = async () => {
    try {
      setLoading(true);
      const { data, status } = await getAllMembers();
      if (status === 200) {
        setLoading(false);
        console.log(data);
        setAllMembers(data?.partners);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllMembers();
  }, []);

  // Changed Account Status
  const handelChangeAccountStatus = async (userInfo) => {
    try {
      setBtnLoading(false);
      const { status } = await changedPartnerAccountStatus(userInfo.uuid, {
        status: accountStatus,
      });
      if (status === 200) {
        // Success notification
        notification.success({
          message: "Account Status Updated",
          description: `The account status for ${userInfo.name} has been successfully updated.`,
        });
        fetchAllMembers();
        setBtnLoading(false);
        setIsAccountStatus(false);
        setAccountStatus("");
        setUserProfileInfo(null);
      } else {
        // Error notification in case the status code is not 200
        setBtnLoading(false);
        notification.error({
          message: "Failed to Update Account Status",
          description: `There was an issue updating the account status for ${userInfo.name}. Please try again.`,
        });
      }
    } catch (error) {
      // Error notification if the API call fails
      setBtnLoading(false);
      notification.error({
        message: "API Error",
        description: `An error occurred while updating the account status. Please try again later.`,
      });
    }
  };

  // Check password for partner
  const handleCheckPassword = async (userInfo) => {
    try {
      setBtnLoading(true);
      const { data, status } = await checkPartnerPassword(userInfo.uuid);

      if (status === 200) {
        setBtnLoading(false);
        setYourPassword(data.password);
        notification.success({
          message: "Success",
          description: "Password check successful!",
        });
      } else {
        setBtnLoading(false);
        notification.error({
          message: "Error",
          description: "Password check failed.",
        });
      }
    } catch (error) {
      setBtnLoading(false);
      notification.error({
        message: "Error",
        description: "An error occurred while checking the password.",
      });
    }
  };

  // handle account Status Modal Open
  const handleChangeAccountStatusModalOpen = (record) => {
    setIsAccountStatus(true);
    setUserProfileInfo(record);
    setAccountStatus(record.status);
  };

  // handle account status Modal Close
  const handleChangeAccountStatusModalClose = () => {
    setIsAccountStatus(false);
    setAccountStatus("");
    setUserProfileInfo(null);
  };

  // handle check password modal Open
  const handleCheckPasswordModalOpen = (record) => {
    setIsCheckpassword(true);
    setUserProfileInfo(record);
  };

  // handle check password modal Close
  const handleCheckPasswordModalClose = () => {
    setIsCheckpassword(false);
    setUserProfileInfo(null);
    setYourPassword("Click Check button");
  };

  // handle doc verified modal open
  const handleDocverifiedModalOpen = (record) => {
    setUserProfileInfo(record);
    setIsDocVerify(true);
  };

  // handle check password modal Close
  const handleDocverifiedModalClose = () => {
    setUserProfileInfo(null);
    setIsDocVerify(false);
  };

  // All Columns Name
  const columns = [
    {
      title: "Account ID",
      dataIndex: "uuid",
      key: "uuid",
      width: 150,
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
      render: (text, record) =>
        renderEmailVerificationTag(record.is_email_verified),
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
      title: "Action",
      key: "Action",
      width: 150,
      render: (text, record) => {
        const items = [
          {
            key: "editUser",
            label: (
              <span onClick={() => navigate(`/admin/user/edit/${record.uuid}`)}>
                Edit User
              </span>
            ),
          },
          {
            key: "checkpassword",
            label: (
              <span onClick={() => handleCheckPasswordModalOpen(record)}>
                Check Password
              </span>
            ),
          },
          {
            key: "changeAcountstatus",
            label: (
              <span onClick={() => handleChangeAccountStatusModalOpen(record)}>
                Change Account Status
              </span>
            ),
          },
          {
            key: "userinfo",
            label: "User Info",
          },
          {
            key: "docVerify",
            label: (
              <span onClick={() => handleDocverifiedModalOpen(record)}>
                Document Verify
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
  ];






  return (
    <div className="p-6">
      <div className="p-4 bg-white rounded-md shadow-sm">
        <div className="flex justify-between">
          <h2 className="text-zinc-700 font-semibold text-xl">
            Users Overview
          </h2>

          <Link 
           to={`/admin/interestUsers`}
            className="w-[20%] h-10
            bg-green-700 text-white 
            rounded-md shadow-sm 
            flex justify-center items-center">
            View Interest Users
           </Link>
        </div>

        <div className="mt-3">
          <Table
            bordered
            columns={columns}
            dataSource={allMembers}
            size="small"
            scroll={{ x: "max-content" }}
            loading={loading}
          />
        </div>
      </div>

      {/* Account Status */}

      <Modal
        open={isAccountStatus}
        onCancel={handleChangeAccountStatusModalClose}
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
            Change Account Status
          </h1>
          <span
            onClick={handleChangeAccountStatusModalClose}
            className="text-zinc-600 hover:text-zinc-800 font-semibold text-2xl cursor-pointer"
          >
            <RxCross2 />
          </span>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center gap-1">
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
          </div>

          <div className="mt-4 px-6 w-full py-4 flex flex-col gap-1">
            <label htmlFor="" className="text-zinc-700 font-semibold">
              Select Status
            </label>
            <Select
              size="large"
              style={{ width: "100%" }}
              value={accountStatus}
              onChange={(value) => setAccountStatus(value)}
              placeholder={"Select Account Status"}
            >
              <Select.Option value={"verified"}>Verified</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
            </Select>
          </div>

          <div className="mt-4 px-6 flex flex-col gap-4 pb-4">
            <Button
              loading={btnLoading}
              onClick={() => handelChangeAccountStatus(userProfileInfo)}
              disabled={accountStatus !== "" ? false : true}
              className="w-full h-10 rounded-3xl bg-green-700 text-white"
            >
              Save
            </Button>
            <button
              onClick={handleChangeAccountStatusModalClose}
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

      {/* Check Password */}
      <Modal
        open={isCheckpassword}
        onCancel={handleChangeAccountStatusModalClose}
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
            Check Password
          </h1>
          <span
            onClick={handleCheckPasswordModalClose}
            className="text-zinc-600 hover:text-zinc-800 font-semibold text-2xl cursor-pointer"
          >
            <RxCross2 />
          </span>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center gap-1">
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
          </div>

          <div className="p-6">
            <Input.Password
              size="large"
              value={yourPassword}
              placeholder="Your password"
              visibilityToggle={true} // Ensure visibility toggle is enabled
            />
          </div>

          <div className="mt-4 px-6 flex flex-col gap-4 pb-4">
            <Button
              loading={btnLoading}
              onClick={() => handleCheckPassword(userProfileInfo)}
              className="w-full h-10 rounded-3xl bg-green-700 text-white"
            >
              Check
            </Button>
            <button
              onClick={handleCheckPasswordModalClose}
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

      <Modal
        open={isDocVerify}
        onCancel={handleDocverifiedModalClose}
        title={null}
        width={700}
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
        <div className="flex 
         justify-between 
         items-center py-2 px-4 border-b-[1px] border-b-zinc-300">
          <h1 className="text-zinc-700 font-semibold text-xl">
            Documents Verified
          </h1>
          <span
            onClick={handleDocverifiedModalClose}
            className="text-zinc-600 hover:text-zinc-800 font-semibold text-2xl cursor-pointer"
          >
            <RxCross2 />
          </span>
        </div>

        <Docverified 
        userProfileInfo={userProfileInfo} 
        setUserProfileInfo={setUserProfileInfo}
        fetchAllMembers={fetchAllMembers} 
        setIsDocVerify={setIsDocVerify} />
      </Modal>
    </div>
  );
};

export default AllUsers;
