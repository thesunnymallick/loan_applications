import { Button, Card, Col, Input, notification, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { getAllClient } from "../../api/partner/loanApi";
import { getAllServices } from "../../api/admin/adminSettingApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addPlaceOrder } from "../../api/partner/taxationpanel";
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
        console.log(error);
      }
    };

    const fetchAllServices = async () => {
      try {
        const { data, status } = await getAllServices();
        if (status === 200) {
          setAllServices(data?.data);
        }
      } catch (error) {
        console.log(error);
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
    <div className="p-6">
      <div className="flex items-center gap-2">
        <Link
          to={"/our-panels/taxation-panel"}
          className="text-zinc-700 font-semibold text-2xl"
        >
          <IoMdArrowRoundBack />
        </Link>
        <h1 className="text-zinc-700 font-semibold text-xl">
          Create New Order
        </h1>
      </div>

      <form  
      onSubmit={handleSubmit}
      className="flex  gap-4 mt-4">
        <Card className="bg-white rounded-lg shadow-sm">
          <Row gutter={[24, 24]} className="mb-6">
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
                  onChange={(value)=>handleSelectCustomer(value)}
                  onBlur={handleBlur}
                  status={touched.file_no && errors.file_no ? "error" : ""}
                >
                  {allClient.map((item) => {
                    return (
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
                    );
                  })}
                </Select>
                {touched.file_no && errors.file_no ? (
                <span className="text-red-500 text-sm">{errors.file_no}</span>
              ) : null}
              </div>
            </Col>

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
                  onChange={(value)=>handleSelectService(value)}
                  onBlur={handleBlur}
                  status={touched.file_no && errors.file_no ? "error" : ""}
                >
                  {allServices.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        <div className="flex items-center gap-1">
                          <span> {item.services}</span>
                          <span>-</span>
                          <span>Rs {item.price}/-</span>
                        </div>
                      </Option>
                    );
                  })}
                </Select>
                {touched.service_id && errors.service_id ? (
                <span className="text-red-500 text-sm">{errors.service_id}</span>
              ) : null}
              </div>
            </Col>

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

            <div className="flex justify-end w-full gap-3 px-4">
              <Button className="w-[15%] h-10">Cancel</Button>
              <Button 
                loading={loading}
                htmlType="submit"
                className="bg-green-700 text-white rounded-lg  w-[15%] h-10">
                Save
              </Button>
            </div>
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
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <span>{selectCustomer?.first_name}</span>
                <span>   {selectCustomer?.middle_name}  </span>
                <span>   {selectCustomer?.last_name}</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Email:</span>
              <span className="text-sm text-gray-600">{selectCustomer?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Phone:</span>
              <span className="text-sm text-gray-600">{selectCustomer?.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">ID:</span>
              <span className="text-sm text-gray-600">{selectCustomer?.file_no}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Address:</span>
              <span className="text-sm text-gray-600 flex flex-col gap-1">
                 <span>{selectCustomer?.residence_info?.address}</span>
                  <span>{selectCustomer?.residence_info?.city}</span>
                  <span>{selectCustomer?.residence_info?.state}</span>
                  <span>{selectCustomer?.residence_info?.pincode}</span>
                </span>
            </div>
          </div>
        </Card>
      </form>



      <div className="mt-4 bg-white rounded-lg shadow-sm p-6">
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
