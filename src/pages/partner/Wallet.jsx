import React from "react";
import { Card, Button, Table } from "antd";
import { AiOutlinePlusCircle } from "react-icons/ai"; // PlusCircle icon
import { AiOutlineArrowUp } from "react-icons/ai";  // ArrowUp icon

const Wallet = () => {
  const mainWalletData = [
    {
      key: "1",
      date: "04-10-2024",
      balance: "89,851",
      credit: "+ 0",
      debit: "- 210",
      totalBalance: "89,641",
      description: "Debited for id #TX-10222",
    },
    {
      key: "1",
      date: "04-10-2024",
      balance: "89,851",
      credit: "+ 0",
      debit: "- 210",
      totalBalance: "89,641",
      description: "Debited for id #TX-10222",
    },
    {
      key: "1",
      date: "04-10-2024",
      balance: "89,851",
      credit: "+ 0",
      debit: "- 210",
      totalBalance: "89,641",
      description: "Debited for id #TX-10222",
    },  {
      key: "1",
      date: "04-10-2024",
      balance: "89,851",
      credit: "+ 0",
      debit: "- 210",
      totalBalance: "89,641",
      description: "Debited for id #TX-10222",
    },
    // Add more rows as needed
  ];

  const earningWalletData = [
    {
      key: "1",
      date: "18-02-2024",
      balance: "35,100",
      credit: "+ 2,000",
      debit: "0",
      totalBalance: "37,100",
      description: "Micro loan",
    },
    {
      key: "1",
      date: "18-02-2024",
      balance: "35,100",
      credit: "+ 2,000",
      debit: "0",
      totalBalance: "37,100",
      description: "Micro loan",
    },
    {
      key: "1",
      date: "18-02-2024",
      balance: "35,100",
      credit: "+ 2,000",
      debit: "0",
      totalBalance: "37,100",
      description: "Micro loan",
    },
    // Add more rows as needed
  ];

  const columns = [
    {
      title: "Transaction On",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
      render: (credit) => <span className="text-green-500 font-semibold">{credit}</span>,
    },
    {
      title: "Debit",
      dataIndex: "debit",
      key: "debit",
      render: (debit) => <span className="text-red-500 font-semibold">{debit}</span>,
    },
    {
      title: "Total Balance",
      dataIndex: "totalBalance",
      key: "totalBalance",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Page Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-semibold text-gray-800">Wallet Overview</h1>
        <p className="text-lg text-gray-600">Manage your main and earning wallets with ease.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Main Wallet */}
        <Card
          title="Main Wallet ( ₹ 89,641 )"
          className="shadow-sm rounded-lg border-t-4 border-yellow-500 transition-shadow duration-300"
          extra={
            <div className="space-x-4">
              <Button type="primary" icon={<AiOutlinePlusCircle />} className="rounded-lg hover:bg-yellow-600 transition-colors">
                Add Money
              </Button>
              <Button type="danger" icon={<AiOutlineArrowUp />} className="rounded-lg hover:bg-red-600 hover:text-white transition-colors">
                Withdraw Request
              </Button>
            </div>
          }
        >
          <Table
            dataSource={mainWalletData}
            columns={columns}
            pagination={false}
            rowClassName="hover:bg-gray-100 transition-colors"
            className="text-sm"
            scroll={{ x: "max-content" }}
          />
        </Card>

        {/* Earning Wallet */}
        <Card
          title="Earning Wallet ( ₹ 37,100 )"
          className="shadow-sm rounded-lg border-t-4 border-green-500  transition-shadow duration-300"
          extra={
            <div className="space-x-4">
              <Button type="primary" icon={<AiOutlinePlusCircle />} className="rounded-lg hover:bg-green-600 transition-colors">
                Add Money
              </Button>
              <Button type="danger" icon={<AiOutlineArrowUp />} className="rounded-lg  hover:bg-red-600 hover:text-white transition-colors">
                Withdraw Request
              </Button>
            </div>
          }
        >
          <Table
            dataSource={earningWalletData}
            columns={columns}
            pagination={false}
            rowClassName="hover:bg-gray-100 transition-colors"
            className="text-sm"
            scroll={{ x: "max-content" }}
          />
        </Card>
      </div>
    </div>
  );
};

export default Wallet;
