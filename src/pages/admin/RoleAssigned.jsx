import { Avatar, Dropdown, Menu, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { GoPlus } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { getAllRoles } from '../../api/admin/roleAssign';
import userCricle from "../../assets/userCricle.jpg"

const RoleAssigned = () => {

    const [allRoles, setAllRoles]=useState([]);
    const  [loading, setLoading]=useState(false);
      
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'User',
          key: 'user',
          render :(text, record)=>(
            <div className='flex items-center gap-2'>
              <Avatar size={64} src={<img src={userCricle} alt="avatar" />} />
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
            title: 'Action',
            key: 'action',
            render: (text, record) => {
              const menu = (
                <Menu>
                  <Menu.Item key="check-password" 
                  //onClick={() => handleCheckPassword(record)}
                  >
                    Check Password
                  </Menu.Item>
                  <Menu.Item key="view-details" 
                 // onClick={() => handleViewDetails(record)}
                  >
                    View User Details
                  </Menu.Item>
                </Menu>
              );
              return (
                <Dropdown overlay={menu}>
                 <BsThreeDots className='text-xl text-zinc-600 hover:text-zinc-800 cursor-pointer'/>
                </Dropdown>
              );
            },
        },
     ];

   

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
    </div>
  )
}

export default RoleAssigned