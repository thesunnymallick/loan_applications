import React, { useEffect, useState } from 'react'
import SettingCard from '../../components/adminCom/SettingCard'
import { addLoanStatus, getLoanSatus, getLoanStatus } from '../../api/admin/adminSettingApi'
import { GoPlus } from "react-icons/go";
import { Button, Input, Modal, notification, Table } from 'antd';
import { RxCross2 } from 'react-icons/rx';

const LoanStatusSetting = () => {

   const [isAdd, setIsAdd]=useState(false);
   const [name, setName]=useState(null);
   const [loading, setLoading]=useState(false);
   const [allStatus, setAllStatus]=useState([])

  const fetchLoanStatus=async()=>{
    try {
      const {data, status}=await getLoanStatus();
      if(status===200){
        setAllStatus(data?.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchLoanStatus();
  },[])


 



  const handelLoanStatusAdd = async () => {
    try {
      setLoading(true);
      const payload = {
        name: name,
      };
  
      const { data, status } = await addLoanStatus(payload);
  
      if (status === 200) {
         setLoading(false);
        // Success notification
        notification.success({
          message: 'Success',
          description: 'Loan status added successfully!',
        });
        console.log(data);
        setIsAdd(false);
        setName(null);
        fetchLoanStatus();
      }
    } catch (error) {
      setLoading(false);
      // Error notification
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'Failed to add loan status. Please try again.',
      });
      console.error(error);
    }
  };
  

  const closeIsAddModal=()=>{
     setIsAdd(false);
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 150,
  
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
  
    },

    {
      title: "Key",
      dataIndex: "key",
      key: "key",
      width: 150,
  
    },
  
  ];



  

  return (
    <div className='flex  gap-4 p-6'>
      <SettingCard/>
      <div className='bg-white rounded-lg shadow-sm p-4 w-[80%]'>
        <div className='flex justify-between py-4 items-center px-2'>
         <h1 className='text-zinc-800 font-semibold text-2xl'>Add Status</h1>

          <button 
           onClick={()=>setIsAdd(true)}
           className='w-[20%] h-10 bg-green-700 text-white rounded-lg flex justify-center items-center gap-1 text-lg'>
            <span className='text-xl'><GoPlus/></span>
            <span>Add</span>
          </button>
        </div>
        <Table
         columns={columns}
         dataSource={allStatus}
         bordered
         />

      </div>

      <Modal
        open={isAdd}
        onCancel={closeIsAddModal}
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
            Change Loan Status
          </h1>
          <span
            onClick={closeIsAddModal}
            className="text-zinc-600 hover:text-zinc-800 font-semibold text-2xl cursor-pointer"
          >
            <RxCross2/>
          </span>
        </div>

        <div className="p-6">
          <div className="mt-4 px-6 w-full py-4 flex flex-col gap-1">
            <label htmlFor="" className="text-zinc-700 font-semibold">
              Enter Status Name
            </label>
             <Input 
              value={name}
              onChange={(e)=>setName(e.target.value)}
              size='large'
              placeholder='Enter Loan Status'
             />
          </div>

          <div className="mt-4 px-6 flex flex-col gap-4 pb-4">
            <Button
               onClick={handelLoanStatusAdd}
               loading={loading}
               disabled={name !== "" ? false : true}
               className="w-full h-10 rounded-3xl bg-green-700 text-white"
            >
              Save
            </Button>
            <button
              onClick={closeIsAddModal}
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
    </div>
  )
}

export default LoanStatusSetting