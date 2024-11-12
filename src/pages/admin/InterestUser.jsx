import React, { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { getAllInterestUsers,  } from '../../api/admin/users';
import dayjs from 'dayjs';
import { Table } from 'antd';
import { getAllRoles } from '../../api/admin/roleAssign';

const InterestUser = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [salesExecutives, setSalesExecutives] = useState([]);

    useEffect(() => {
        const fetchInterestUsers = async () => {
            try {
                // Fetch both interest users and sales executives
                const [usersResponse, executivesResponse] = await Promise.all([
                    getAllInterestUsers(),
                    getAllRoles()
                ]);

                if (usersResponse.status === 200 && executivesResponse.status === 200) {
                    const users = usersResponse.data.interests;

                    // Filter sales executives by role
                    const executives = executivesResponse.data.data.filter(
                        executive => executive.role === 'Sales Executive'
                    );

                    // Assign a random sales executive to each user
                    const usersWithExecutives = users.map(user => ({
                        ...user,
                        salesExecutive: executives[Math.floor(Math.random() * executives.length)],
                    }));

                    setAllUsers(usersWithExecutives);
                    setSalesExecutives(executives);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchInterestUsers();
    }, []);

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
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: 'Sales Executive',
            dataIndex: 'salesExecutive',
            key: 'salesExecutive',
            render: (salesExecutive) => (
                <div className="flex items-center gap-2">
                    <img
                        src={salesExecutive.userPhoto}
                        alt={salesExecutive.name}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                        <p className="font-medium">{salesExecutive.name}</p>
                        <p className="text-xs text-gray-500">{salesExecutive.phone_no}</p>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className='p-6'>
            <div className='bg-white rounded-md shadow-sm p-4'>
                <div className="flex items-center gap-2">
                    <Link
                        to={`/admin/users`}
                        className="cursor-pointer text-2xl text-zinc-700 font-semibold"
                    >
                        <IoMdArrowRoundBack />
                    </Link>
                    <h1 className="text-zinc-700 font-semibold text-xl">Register Users</h1>
                </div>

                <div className='mt-3'>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={allUsers}
                        rowKey="id"
                    />
                </div>
            </div>
        </div>
    );
};

export default InterestUser;
