import { Button, Card, Col, Input, notification, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { getAllClient } from "../../api/partner/loanApi";
import { getAllServices } from "../../api/admin/adminSettingApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addPlaceOrder } from "../../api/partner/taxationpanel";
import ErrorHandler from "../../utils/ErrorHandler";
const { Option } = Select;

const validationSchema = Yup.object().shape({
  file_no: Yup.string()
    .required("Customer selection is required")
    .notOneOf(["Select Customer", ""], "Please select a valid customer"),
  service_id: Yup.string()
    .required("Service selection is required")
    .notOneOf(["Select Service", ""], "Please select a valid service"),
  total_cost: Yup.number()
    .nullable()
    .typeError("Total cost must be a number")
    .min(0, "Total cost must be a positive number"),
});

const PlaceOrder = () => {



  // Initial values for the form fields
  const initialValues = {
    file_no: "",
    service_id: "",
    total_cost: "",
  };

  const [allClient, setAllClient] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [challan, setChallan]=useState(0);
  const [selectCustomer, setSelectCustomer]=useState(null);
  const [selectService, setSelectService]=useState([]);
  const [loading, setLoading]=useState(false);

  const navigate=useNavigate();



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

  useEffect(() => {
    const fetchAllClient = async () => {
      try {
        const { data, status } = await getAllClient();
        if (status === 200) {
          setAllClient(data?.data);
        }
      } catch (error) {
        ErrorHandler.handleError(error);
      }
    };

    const fetchAllServices = async () => {
      try {
        const { data, status } = await getAllServices();
        if (status === 200) {
          setAllServices(data?.data);
        }
      } catch (error) {
        ErrorHandler.handleError(error);
      }
    };

    // Fetch all Client
    fetchAllClient();
    fetchAllServices();
  }, []);

  
  // Handle Place Order
  const handlePlaceOrder = async (values) => {
    try {
      setLoading(true);
      const { status } = await addPlaceOrder(values);
      if (status === 200 || 201) {
        setLoading(false);
        notification.success({
          message: "Order Placed",
          description: "Your order has been placed successfully.",
          duration: 3, // Optional: Auto close after 3 seconds
        });
        navigate(`/our-panels/taxation-panel`)
      }
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Order Failed",
        description: error.message || "Something went wrong while placing the order.",
        duration: 3, // Optional: Auto close after 3 seconds
      });
      console.log(error);
    }
  };
  

  // Formik setup for handling form state and validation
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handlePlaceOrder(values);
    },
  });

  // Destructure Formik's properties for easier use
  const { values, errors, touched, handleBlur, handleSubmit, setFieldValue } =
  formik;


    const handleSelectCustomer=(value)=>{
     setFieldValue("file_no",value)
     // find Select customer
     const client=allClient.find((item)=>item.file_no===value);
     console.log("Select Customer", client)
     setSelectCustomer(client);

    }
   
    // handle service
    const handleSelectService = (value) => {
      setFieldValue("service_id", value);
      const service = allServices.find((item) => item.id === value);
      setFieldValue("total_cost", parseFloat(parseFloat(service.price)+parseFloat(service.IGST)+parseFloat(service.challan)))
      setChallan(service.challan);

      // service 
      if (service) {
        // Calculate total for the service
        const serviceData = {
          service: service.services,
          price: parseFloat(service.price),
          igst: parseFloat(service.IGST),
          total: parseFloat(service.price) + parseFloat(service.IGST),
        };
    
        // If challan exists, add Government Fees
        const governmentFeesRow = service.challan
          ? {
              service: "Government Fees",
              price: parseFloat(service.challan),
              igst: 0,
              total: parseFloat(service.challan),
            }
          : null;
    
        const finalData = governmentFeesRow
          ? [serviceData, governmentFeesRow]
          : [serviceData];

        setSelectService(finalData);
      }





    };




    

  return (
    <div className="p-4 sm:p-6">
    {/* Header */}
    <div className="flex items-center gap-2">
      <Link
        to={"/our-panels/taxation-panel"}
        className="text-zinc-700 font-semibold text-xl sm:text-2xl"
      >
        <IoMdArrowRoundBack />
      </Link>
      <h1 className="text-zinc-700 font-semibold text-lg sm:text-xl">
        Create New Order
      </h1>
    </div>
  
    {/* Form Section */}
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row gap-4 mt-4"
    >
      <Card className="bg-white rounded-lg shadow-sm flex-1">
        <Row gutter={[16, 16]} className="mb-6">
          {/* Select Customer */}
          <Col span={24}>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Select Customer
              </label>
              <Select
                size="large"
                className="w-full"
                placeholder="Select a customer"
                name="file_no"
                value={values.file_no}
                onChange={(value) => handleSelectCustomer(value)}
                onBlur={handleBlur}
                status={touched.file_no && errors.file_no ? "error" : ""}
              >
                {allClient.map((item) => (
                  <Option key={item.file_no} value={item.file_no}>
                    <div className="flex items-center gap-1 text-sm">
                      <span>{item.first_name}</span>
                      <span>{item.middle_name}</span>
                      <span>{item.last_name}</span>
                      <span>-</span>
                      <span>{item?.phone}</span>
                    </div>
                  </Option>
                ))}
              </Select>
              {touched.file_no && errors.file_no ? (
                <span className="text-red-500 text-sm">{errors.file_no}</span>
              ) : null}
            </div>
          </Col>
  
          {/* Select Service */}
          <Col span={24}>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Select Service
              </label>
              <Select
                size="large"
                className="w-full"
                placeholder="Select a service"
                name="service_id"
                value={values.service_id}
                onChange={(value) => handleSelectService(value)}
                onBlur={handleBlur}
                status={touched.service_id && errors.service_id ? "error" : ""}
              >
                {allServices.map((item) => (
                  <Option key={item.id} value={item.id}>
                    <div className="flex items-center gap-1">
                      <span>{item.services}</span>
                      <span>-</span>
                      <span>Rs {item.price}/-</span>
                    </div>
                  </Option>
                ))}
              </Select>
              {touched.service_id && errors.service_id ? (
                <span className="text-red-500 text-sm">{errors.service_id}</span>
              ) : null}
            </div>
          </Col>
  
          {/* Additional Charges */}
          <Col span={24}>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Additional Charges / Notes
              </label>
              <Input
                size="large"
                placeholder="Enter any additional notes or charges"
                value={challan}
                disabled={true}
              />
            </div>
          </Col>
        </Row>
  
        {/* Form Actions */}
        <div className="flex justify-end w-full gap-3 px-4">
          <Button className="w-full sm:w-[30%] h-10">Cancel</Button>
          <Button
            loading={loading}
            htmlType="submit"
            className="bg-green-700 text-white rounded-lg w-full sm:w-[30%] h-10"
          >
            Save
          </Button>
        </div>
      </Card>
  
      {/* Customer Details */}
      <Card
        title={
          <span className="flex items-center">
            <span className="font-semibold text-lg">Customer Details</span>
          </span>
        }
        bordered={false}
        className="bg-white rounded-lg shadow-md p-4 w-full lg:max-w-sm"
      >
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Name:</span>
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <span>{selectCustomer?.first_name}</span>
              <span>{selectCustomer?.middle_name}</span>
              <span>{selectCustomer?.last_name}</span>
            </span>
          </div>
          {/* Additional Details */}
          {/* Add more customer details here */}
        </div>
      </Card>
    </form>
  
    {/* Table Section */}
    <div className="mt-4 bg-white rounded-lg shadow-sm p-4 overflow-x-auto">
      <Table
        bordered
        dataSource={selectService}
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
