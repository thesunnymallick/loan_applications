import { Dropdown, Menu, Table } from 'antd';
import React from 'react'
import { GoPlus } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { Link } from 'react-router-dom';

const RoleAssigned = () => {

    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Phone Number',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'Account Number',
          dataIndex: 'accountNumber',
          key: 'accountNumber',
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

      const dataSource = [
        {
          key: '1',
          id: 'SE001',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          accountNumber: '12345678901234',
        },
        {
          key: '2',
          id: 'SE002',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+0987654321',
          accountNumber: '56789012345678',
        },
      ];
      
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
          <Table columns={columns} dataSource={dataSource} />
          </div>

     </div>
    </div>
  )
}

export default RoleAssigned