import { Button, Input, Modal, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
const Subscriptions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Offer Price",
      dataIndex: "offerPrice",
      key: "offerPrice",
    },
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
      render: (services) => (
        <ul>
          {services.map((service, index) => (
            <div className="flex items-center gap-1 text-xs">
              <span>{index + 1})</span>
              <li key={index}>{service}</li>
            </div>
          ))}
        </ul>
      ),
    },
  ];

  // Define the data source
  const dataSource = [
    {
      key: 1,
      name: "DSA LITE",
      price: 1499,
      offerPrice: 1499,
      services: [
        "Private Bank Loan Panel",
        "Govt Bank Loan Panel",
        "Offline Credit Card Panel",
      ],
    },
    {
      key: 2,
      name: "DSA LITE PRO",
      price: 4999,
      offerPrice: 4999,
      services: ["Private Bank Loan Panel", "Govt Bank Loan Panel"],
    },
  ];

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-zinc-800 text-2xl font-semibold">
            All Subscriptions Plans 
          </h1>
          <button
            onClick={() => setIsOpen(true)}
            className="
           w-[16%] h-10
           bg-green-700
           text-white rounded-lg shadow-sm flex justify-center items-center gap-1 text-base"
          >
            <span className="text-lg">
              <MdOutlineAdd />
            </span>
            <span>Add New Plans</span>
          </button>
        </div>

        <div className="p-3">
          <Table bordered columns={columns} dataSource={dataSource} />
        </div>
      </div>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(true)}
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
            Create Subscriptions Plan
          </h1>
          <span
            onClick={() => setIsOpen(false)}
            className="text-zinc-600 hover:text-zinc-800 font-semibold text-2xl cursor-pointer"
          >
            <RxCross2 />
          </span>
        </div>
        <form className="p-6 flex flex-col gap-2">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
              Subscription Name
            </label>
            <Input
              name="name"
              // value={values.name}
              // onChange={handleChange}
              // onBlur={handleBlur}
              // status={touched.name && errors.name ? "error" : ""}
              size="large"
              placeholder="Enter subscription name"
            />
            {/* {touched.name && errors.name ? (
                <span className="text-red-500 text-sm">{errors.name}</span>
              ) : null} */}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Subscription Price
              </label>
              <Input
                name="name"
                // value={values.name}
                // onChange={handleChange}
                // onBlur={handleBlur}
                // status={touched.name && errors.name ? "error" : ""}
                size="large"
                placeholder="Enter subscription price"
              />
              {/* {touched.name && errors.name ? (
                <span className="text-red-500 text-sm">{errors.name}</span>
              ) : null} */}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Offer Price
              </label>
              <Input
                name="name"
                // value={values.name}
                // onChange={handleChange}
                // onBlur={handleBlur}
                // status={touched.name && errors.name ? "error" : ""}
                size="large"
                placeholder="Enter Offer price"
              />
              {/* {touched.name && errors.name ? (
                <span className="text-red-500 text-sm">{errors.name}</span>
              ) : null} */}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
              Descriptions
            </label>
            <TextArea
              rows={4}
              name="name"
              // value={values.name}
              // onChange={handleChange}
              // onBlur={handleBlur}
              // status={touched.name && errors.name ? "error" : ""}
              size="large"
              placeholder="Enter subscriptions descriptions"
            />
            {/* {touched.name && errors.name ? (
                <span className="text-red-500 text-sm">{errors.name}</span>
              ) : null} */}
          </div>

          <div className="flex justify-end items-center mt-4 gap-2">
           <Button className="w-[20%] h-10 rounded-lg">Cancel</Button>
           <Button className="w-[20%] h-10 bg-green-700 text-white rounded-lg">Save</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Subscriptions;
