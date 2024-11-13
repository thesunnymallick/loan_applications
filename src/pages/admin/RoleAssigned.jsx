import { Avatar, Button, Dropdown, Input, Menu, Modal, notification, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { GoPlus } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { checkPasswordRole, getAllRoles } from '../../api/admin/roleAssign';
import userImage from "../../assets/userCricle.jpg"
import { RxCross2 } from 'react-icons/rx';
import RolesUserInfo from './RolesUserInfo';
const RoleAssigned = () => {

    const [allRoles, setAllRoles]=useState([]);
    const [loading, setLoading]=useState(false);
    const [isCheckpassword, setIsCheckpassword]=useState(false);
    const [userProfileInfo, setUserProfileInfo]=useState(null);
    const [btnLoading, setBtnLoading]=useState(false);
    const [yourPassword, setYourPassword]=useState("click check button");
    const [isUserInfo, setIsUserInfo]=useState(false);
  

    // Navigate
    const navigate=useNavigate();

    const handleCheckPassword = async (userInfo) => {
      try {
        setBtnLoading(true);
        const { data, status } = await checkPasswordRole(userInfo.uuid);
  
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



    // handle check password modal Open
    const handleCheckPasswordModalOpen=(record)=>{
          setIsCheckpassword(true);
          setUserProfileInfo(record)
     }
  
       // handle check password modal Close
    const handleCheckPasswordModalClose=()=>{
         setIsCheckpassword(false);
         setUserProfileInfo(null)
         setYourPassword("Click Check button");
    }



       // handle User info modal Open
  const handleUserInfoModalOpen=(record)=>{
         setIsUserInfo(true)
        setUserProfileInfo(record)
   }

     // handle User info  modal Close
  const handleUserInfoModalClose=()=>{
        setIsUserInfo(false);
       setUserProfileInfo(null)
  }


   // All Columns Name   
    const columns = [
        {
          title: 'ID',
          dataIndex: 'uuid',
          key: 'uuid',
        },
        {
          title: 'User',
          key: 'user',
          render :(text, record)=>(
            <div className='flex items-center gap-2'>
              <Avatar size={64} src={<img src={record.userPhoto} alt="avatar" />} />
              <div className='flex flex-col'>
                <h2 className='text-zinc-700 text-lg'>{record.name}</h2>
                <span className='text-zinc-600 text-sm'>{record.email}</span>
              </div>
            </div>
          )
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Phone Number',
          dataIndex: 'phone_no',
          key: 'phone_no',
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          render: (role) => {
              let color = 'default';
              let style = {
                  padding: '4px 10px',
                  fontSize: '14px',
                  borderRadius: '15px',
                  fontWeight: '500',
              };
  
              // Customize color and additional styles for specific roles
              if (role === 'Sales Executive') {
                  color = 'blue';
                  style = { ...style, backgroundColor: '#E6F7FF', color: '#1890FF' };
              } else if (role === 'RM') {
                  color = 'green';
                  style = { ...style, backgroundColor: '#F6FFED', color: '#52C41A' };
              }
  
              return <Tag color={color} style={style}>{role}</Tag>;
          },
      },
      {
        title: 'Bank Details',
        key: 'bankDetails',
        children: [
          {
            title: 'Bank Name',
            dataIndex: 'bank_account_name',
            key: 'bank_account_name',
          },
          {
            title: 'Account Number',
            dataIndex: 'bank_account_no',
            key: 'bank_account_no',
          },
          {
            title: 'IFSC Code',
            dataIndex: 'ifsc_code',
            key: 'ifsc_code',
          },
        ],
      },

      {
        title: "Action",
        key: "Action",
        width: 150,
        render: (text, record) => {
          const items = [
            {
              key: "CheckPassword",
              label: (
                <span
                onClick={()=>handleCheckPasswordModalOpen(record)}
                 //onClick={() => handleChangeAccountStatusModalOpen(record)}
                 >
                  Check Password
                </span>
              ),
            },
            {
              key: "userinfo",
              label: (
                <span
                onClick={()=>handleUserInfoModalOpen(record)}
                >
                User Info
                </span>
              )
            },
            {
              key:"Edit",
              label: <span
              onClick={()=>navigate(`/admin/edit-role/${record.uuid}`)}
              >
               Edit
              </span>
            }
         
          ];
      
          return (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <BsThreeDots className="text-xl text-zinc-600 cursor-pointer" />
            </Dropdown>
          );
        },
      }
     ];

   

   // Fecth All Roles
    useEffect(()=>{
      const fetchAllRoles=async()=>{
       try {
        setLoading(true);
        const {data, status}=await getAllRoles();
        if(status===200){
          setLoading(false);
          setAllRoles(data?.data);
        }
       } catch (error) {
        setLoading(false);
        console.log(error);
       }
      }

      fetchAllRoles();
    },[])



      
  return (
    <div 
     className='p-8'
    >
     <div className='bg-white rounded-lg shadow-sm p-6'>
          
          <div className='flex justify-between'>
            <div className='flex items-center gap-2'>
              <h1 className='text-zinc-800 font-semibold text-xl'>Sales Excutive/RM Overview</h1>
            </div>

            <Link
            to={"/admin/create-role"}
             className='w-[20%] h-10 bg-green-700 text-white rounded-lg shadow-sm flex justify-center items-center '>
              <span className='text-2xl'><GoPlus/></span>
              <span>Add New</span>
            </Link>
          </div>
          
          <div className='mt-4'>
          <Table loading={loading} bordered columns={columns} dataSource={allRoles}  scroll={{ x: "max-content" }} />
          </div>

     </div>

         {/* Check Password */}
       <Modal
       open={isCheckpassword}
       onCancel={handleCheckPasswordModalClose}
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
            <RxCross2/>
          </span>
       </div>


       <div className='p-6'>
           <div className='flex flex-col items-center gap-1'>
             <div className='w-24 h-24 rounded-full border-[2px] border-green-700 overflow-hidden'>
              <img className='w-full  object-cover' src={userImage} alt="ProfileImage" />
             </div>
              <h2 className='text-zinc-700 text-xl'>{userProfileInfo?.name}</h2>
              <span className='text-zinc-600 text-sm -mt-2'>{userProfileInfo?.email}</span>
           </div>

           <div className='p-6'>
           <Input.Password 
           size='large' 
           value={yourPassword}
           placeholder="Your password" 
           visibilityToggle={true} // Ensure visibility toggle is enabled
          />
           </div>

           

           <div className='mt-4 px-6 flex flex-col gap-4 pb-4'>
             <Button
              loading={btnLoading}
             onClick={()=>handleCheckPassword(userProfileInfo)}
              className='w-full h-10 rounded-3xl bg-green-700 text-white'>Check</Button>
             <button
              onClick={handleCheckPasswordModalClose}
              className='w-full h-10
              rounded-3xl border-[1px]
              border-green-700
              text-green-700' >Cancel</button>
           </div>
        </div>

      </Modal>

      <Modal
        open={isUserInfo}
        onCancel={handleUserInfoModalClose}
        title={null}
        width={600}
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
              Sales Excutive /RM Details
          </h1>
          <span
            onClick={handleUserInfoModalClose}
            className="text-zinc-600 hover:text-zinc-800 font-semibold text-2xl cursor-pointer"
          >
            <RxCross2/>
          </span>
        </div>
        <RolesUserInfo userProfileInfo={userProfileInfo}/>

      </Modal>
    </div>
  )
}

export default RoleAssigned