import React, { useState } from "react";
import { Card, Button, Table, Modal } from "antd";
import { AiOutlinePlusCircle } from "react-icons/ai"; // PlusCircle icon
import { AiOutlineArrowUp } from "react-icons/ai";  // ArrowUp icon
import { RxCross2 } from "react-icons/rx";
import WithdrawlRequest from "./WithdrawlRequest";

const Wallet = () => {


  const [isWithdrawl, setIsWithdrawl]=useState(false);
  
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
    <div className="shadow-sm rounded-lg border-t-4 border-yellow-500 transition-shadow duration-300 p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Main Wallet</h2>
        <p className="text-lg text-gray-600">₹ 89,641</p>
      </div>
      <div className="space-x-4 flex justify-between">
        <Button 
          type="primary" 
          icon={<AiOutlinePlusCircle />} 
          className="rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Add Money
        </Button>
        <Button 
          onClick={() => setIsWithdrawl(true)}
          type="danger" 
          icon={<AiOutlineArrowUp />} 
          className="rounded-lg bg-red-600 hover:bg-red-700 text-white transition-color"
        >
          Withdraw Request
        </Button>
      </div>
      <Table
        dataSource={mainWalletData}
        columns={columns}
        pagination={false}
        rowClassName="hover:bg-gray-100 transition-colors"
        className="text-sm mt-4"
        scroll={{ x: "max-content" }}
        bordered
      />
    </div>

    {/* Earning Wallet */}
    <div className="shadow-sm rounded-lg border-t-4 border-green-500 transition-shadow duration-300 p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Earning Wallet</h2>
        <p className="text-lg text-gray-600">₹ 37,100</p>
      </div>
      <div className="space-x-4 flex justify-between">
        <Button 
          type="primary" 
          icon={<AiOutlinePlusCircle />} 
          className="rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Add Money
        </Button>
        <Button 
          onClick={() => setIsWithdrawl(true)}
          type="danger" 
          icon={<AiOutlineArrowUp />} 
          className="rounded-lg bg-red-600 hover:bg-red-700 text-white transition-color"
        >
          Withdraw Request
        </Button>
      </div>
      <Table
        dataSource={earningWalletData}
        columns={columns}
        pagination={false}
        rowClassName="hover:bg-gray-100 transition-colors"
        className="text-sm mt-4"
        scroll={{ x: "max-content" }}
        bordered
      />
    </div>
  </div>

  <Modal
    open={isWithdrawl}
    onCancel={() => setIsWithdrawl(false)}
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
        Withdrawal Request
      </h1>
      <span
        onClick={() => setIsWithdrawl(false)}
        className="text-zinc-600 hover:text-zinc-800 font-semibold text-2xl cursor-pointer"
      >
        <RxCross2 />
      </span>
    </div>
    <WithdrawlRequest setIsWithdrawl={setIsWithdrawl} />
  </Modal>
</div>

  );
};

export default Wallet;
