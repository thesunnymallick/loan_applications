import { Card, Col, Input, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { getAllClient } from "../../api/partner/loanApi";
import { getAllServices } from "../../api/admin/adminSettingApi";
const { Option } = Select;
const PlaceOrder = () => {

  const [allClient, setAllClient]=useState([]);
  const [allServices, setAllServices]=useState([]);
  
  const servicesData = [
    {
      key: "1",
      service: "Back ITR",
      price: "423.73",
      igst: "76.27",
      total: "500.00",
    },
    {
      key: "2",
      service: "Government Fees",
      price: "1000.00",
      igst: "0",
      total: "1000.00",
    },
  ];
  const columns = [
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Price (₹)",
      dataIndex: "price",
      key: "price",
      align: "right",
    },
    {
      title: "IGST (₹)",
      dataIndex: "igst",
      key: "igst",
      align: "right",
    },
    {
      title: "Total (₹)",
      dataIndex: "total",
      key: "total",
      align: "right",
    },
  ];

   useEffect(()=>{
    const fetchAllClient=async()=>{
      try {
        const {data, status}=await getAllClient();
        if(status===200){
         setAllClient(data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    }


    const fetchAllServices=async()=>{
      try {
        const {data, status}=await getAllServices();
        if(status===200){
         setAllServices(data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    }



    // Fetch all Client
    fetchAllClient();
    fetchAllServices();

   }, [])


  return (
    <div className="p-6">
      <div className="flex items-center gap-2">
        <Link 
         to={"/our-panels/taxation-panel"}
        className="text-zinc-700 font-semibold text-2xl">
          <IoMdArrowRoundBack />
        </Link>
        <h1 className="text-zinc-700 font-semibold text-xl">
          Create New Order
        </h1>
      </div>

      <div className="flex  gap-4 mt-4">
        <Card className="bg-white rounded-lg shadow-sm">
          <Row gutter={[24, 24]} className="mb-6">
            <Col span={24}>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Select Customer
                </label>
                <Select
                  className="w-full"
                  placeholder="Select a customer"
                  defaultValue="Dipak Mandal - 84220330590"
                >
                  {
                    allClient.map((item)=>{
                      return(
                        <Option key={item.file_no} value={item.file_no}>
                          <div className="flex items-center ">
                            <div className="flex items-center gap-1 text-sm">
                            <span>{item.first_name}</span>
                            <span>{item.middle_name}</span>
                            <span>{item.last_name}</span>
                            <span>-</span>
                            <span>{item?.phone}</span>
                            </div>
                          </div>
                        
                        </Option>
                      )
                    })
                  }
                  <Option value="1">Dipak Mandal - 84220330590</Option>
                </Select>
              </div>
            </Col>

            <Col span={24}>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Select Service
                </label>
                <Select
                  className="w-full"
                  placeholder="Select a service"
                  defaultValue="Back ITR - Rs. 500/-"
                >
                  <Option value="1">Back ITR - Rs. 500/-</Option>
                  <Option value="2">Challan - Rs. 1000/-</Option>
                </Select>
              </div>
            </Col>

            <Col span={24}>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Additional Charges / Notes
                </label>
                <Input placeholder="Enter any additional notes or charges" />
              </div>
            </Col>
          </Row>
        </Card>

        <Card
          title={
            <span className="flex items-center">
              {/* <UserOutlined className="text-blue-600 mr-2" /> */}
              <span className="font-semibold text-lg">Customer Details</span>
            </span>
          }
          bordered={false}
          className="bg-white rounded-lg shadow-md p-4 w-full max-w-sm mx-auto"
        >
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Name:</span>
              <span className="text-sm text-gray-600">Dipak Mandal</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Email:</span>
              <span className="text-sm text-gray-600">dipak@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Phone:</span>
              <span className="text-sm text-gray-600">84220330590</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">ID:</span>
              <span className="text-sm text-gray-600">dymp1250g</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Address:</span>
              <span className="text-sm text-gray-600">abcd Kolkata 700152</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-4 bg-white rounded-lg shadow-sm p-6">
        <Table
          bordered
          dataSource={servicesData}
          columns={columns}
          pagination={false}
          summary={(pageData) => {
            let total = 0;
            pageData.forEach(({ total: rowTotal }) => {
              total += parseFloat(rowTotal);
            });
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={3}>
                  <span className="font-semibold">Grand Total</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell align="right">
                  <span className="font-semibold text-blue-600">
                    ₹{total.toFixed(2)}
                  </span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
      </div>
    </div>
  );
};

export default PlaceOrder;
