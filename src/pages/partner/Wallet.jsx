import React, { useEffect, useState } from "react";
import { Card, Button, Table, Modal } from "antd";
import { AiOutlinePlusCircle, AiOutlineArrowUp } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import WithdrawlRequest from "./WithdrawlRequest";
import { getAllTransaction, getWalletBalance } from "../../api/partner/walletApi";
import { useDispatch, useSelector } from "react-redux";
import { updateWalletBalance } from "../../features/authSlice";
import ErrorHandler from "../../utils/ErrorHandler";

const Wallet = () => {
  const {  wallet_balance } = useSelector(
    (state) => state.auth
  );
  const [isWithdrawl, setIsWithdrawl] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();

  // Fetch transaction records with pagination
  const fetchTransactions = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const { data, status } = await getAllTransaction(page, pageSize);
      if (status === 200) {

        console.log(data.data)
        setTransactions(
          data.data.data.map((record) => ({
            key: record.id,
            date: new Date(record.created_at).toLocaleDateString(),
            balance: `₹ ${record.wallet_balance}`,
            credit: record.type === "credit" ? `+ ₹${record.amount}` : "",
            debit: record.type === "debit" ? `- ₹${record.amount}` : "",
            totalBalance: `₹ ${record.wallet_balance}`,
            description: record.description,
          }))
        );
        setPagination((prev) => ({
          ...prev,
          current: data.current_page,
          total: data.total,
        }));
      }
    } catch (error) {
      ErrorHandler.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleTableChange = (pagination) => {
    fetchTransactions(pagination.current, pagination.pageSize);
  };

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


  useEffect(()=>{

    const fetchWalletBalance=async()=>{
     try {
      const {data, status}=await getWalletBalance();
      if(status===200){
       dispatch(updateWalletBalance({wallet_balance: data?.wallet_balance}))
      }
     } catch (error) {
      ErrorHandler.handleError(error);
     }
    }

    fetchWalletBalance()

  },[dispatch])

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Page Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-semibold text-gray-800">Wallet Overview</h1>
        <p className="text-lg text-gray-600">Manage your main and earning wallets with ease.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Main Wallet */}
        <div className="shadow-sm rounded-lg border-t-4 border-yellow-500 transition-shadow duration-300 p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Main Wallet</h2>
            <p className="text-lg text-gray-600">₹ {wallet_balance}</p>
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
            dataSource={transactions}
            columns={columns}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
            }}
            onChange={handleTableChange}
            loading={loading}
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
