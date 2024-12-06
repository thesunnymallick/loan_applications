import React, { useEffect, useState } from "react";
import SettingCard from "../../components/adminCom/SettingCard";
import { getAllServices, servicesAdd } from "../../api/admin/adminSettingApi";
import { Button, Input, Modal, notification, Table } from "antd";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { useFormik } from "formik";
import * as Yup from "yup";

// validation schema
const validationSchema = Yup.object().shape({
  services: Yup.string()
    .required("Services is required")
    .min(3, "Services must be at least 3 characters long"),
  challan: Yup.string()
    .matches(/^[0-9]+$/, "Challan must be a numeric value")
    .nullable(),
  price: Yup.number()
    .required("Price is required")
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .integer("Price must be an integer"),
    
  IGST: Yup.string()
    .matches(/^[0-9]+$/, "IGST must be a numeric value")
    .nullable(),
});

const ServiceSetting = () => {
  const [services, setServices] = useState([]);
  const [isServiceAdd, setIsServiceAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    services: "",
    challan: "",
    price: "",
    IGST :"",
  };

  // Fetch all services
  const fetchGetAllService = async () => {
    try {
      const { data, status } = await getAllServices();
      if (status === 200) {
        setServices(data?.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchGetAllService();
  }, []);

  // handle services setting
  const handleSubmitServiceSetting = async (values) => {
    try {
      setLoading(true);
      const { status } = await servicesAdd(values);

      if (status === 201 || status === 200) {
        setLoading(false);
        setIsServiceAdd(false);
        formik.resetForm();
        fetchGetAllService();

        notification.success({
          message: "Success",
          description: "Service has been added successfully.",
          placement: "topRight",
        });
      }
    } catch (error) {
      setLoading(false);

      notification.error({
        message: "Error",
        description:
          error.response?.data?.message || "Something went wrong. Please try again.",
        placement: "topRight",
      });

      console.error(error);
    }
  };

  const closeServiceModal = async () => {
    setIsServiceAdd(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmitServiceSetting(values);
    },
  });

  const { handleChange, values, errors, touched, handleBlur, handleSubmit } =
    formik;

  // Columns for the Ant Design Table
  const columns = [
    {
      title: "Service Name",
      dataIndex: "services",
      key: "services",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (price) => `₹${price}`, // Format price with a dollar sign
    },
    {
      title: "IGST",
      dataIndex: "IGST",
      key: "IGST",
      render: (price) => `₹${price}`, // Format price with a dollar sign
  },
    {
      title: "Challan",
      dataIndex: "challan",
      key: "challan",
    },
   
  ];

  return (
    <div className="flex gap-4 p-6 ">
      <SettingCard />
      <div className="bg-white rounded-lg shadow-sm p-4 w-[80%]">
        <div className="flex justify-between py-4 items-center px-2">
          <h1 className="text-zinc-800 font-semibold text-2xl">Service Settings</h1>

          <button
            onClick={() => setIsServiceAdd(true)}
            className="w-[20%] h-10 bg-green-700 text-white rounded-lg flex justify-center items-center gap-1 text-lg"
          >
            <span className="text-xl">
              <GoPlus />
            </span>
            <span>Add</span>
          </button>
        </div>

        {/* Ant Design Table to display services */}
        <Table
          columns={columns}
          dataSource={services}
          rowKey="id"
          bordered
          pagination={{ pageSize: 5 }}
        />
      </div>

      {/* Modal for Adding Services */}
      <Modal
        open={isServiceAdd}
        onCancel={closeServiceModal}
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
          <h1 className="text-zinc-700 font-semibold text-xl">Add Services</h1>
          <span
            onClick={closeServiceModal}
            className="text-zinc-600 hover:text-zinc-800 font-semibold text-2xl cursor-pointer"
          >
            <RxCross2 />
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mt-4 px-6 w-full py-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-zinc-700 font-semibold">
                Enter Service Name
              </label>
              <Input
                name="services"
                value={values.services}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.services && errors.services ? "error" : ""}
                size="large"
                placeholder="Enter Service Name"
              />
              {touched.services && errors.services ? (
                <span className="text-red-500 text-sm">{errors.services}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-zinc-700 font-semibold">
                Enter Service Price
              </label>
              <Input
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.price && errors.price ? "error" : ""}
                size="large"
                placeholder="Enter Service Price"
              />
              {touched.price && errors.price ? (
                <span className="text-red-500 text-sm">{errors.price}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-zinc-700 font-semibold">
                Enter Service IGST
              </label>
              <Input
                name="IGST"
                value={values.IGST}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.IGST && errors.IGST ? "error" : ""}
                size="large"
                placeholder="Enter Service Price"
              />
              {touched.IGST && errors.IGST ? (
                <span className="text-red-500 text-sm">{errors.IGST}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-zinc-700 font-semibold">
                Enter Service Challan
              </label>
              <Input
                name="challan"
                value={values.challan}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.challan && errors.challan ? "error" : ""}
                size="large"
                placeholder="Enter Service Challan"
              />
              {touched.challan && errors.challan ? (
                <span className="text-red-500 text-sm">{errors.challan}</span>
              ) : null}
            </div>
          </div>

          <div className="mt-4 px-6 flex flex-col gap-4 pb-4">
            <Button
              htmlType="submit"
              loading={loading}
              className="w-full h-10 rounded-3xl bg-green-700 text-white"
            >
              Save
            </Button>
            <Button
              onClick={closeServiceModal}
              className="w-full h-10 rounded-3xl border-[1px] border-green-700 text-green-700"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ServiceSetting;
