import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { getAllClient } from "../../api/partner/taxationpanel";
import { Table } from "antd";
import dayjs from "dayjs";
import ErrorHandler from "../../utils/ErrorHandler";

const AllClient = () => {
  const [allClient, setAllClient] = useState([]);

  const columns = [
    {
      title: "File No",
      dataIndex: "file_no",
      key: "file_no",
    },

    {
      title: "Name",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-1">
            <span>{record.first_name}</span>
            <span>{record.middle_name}</span>
            <span>{record.last_name}</span>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "PAN",
      dataIndex: "pan",
      key: "pan",
    },
    {
      title: "Aadhar",
      dataIndex: "aadhar",
      key: "aadhar",
    },
    {
      title: "Addresses",
      children: [
        {
          title: "Residence",
          children: [
            {
              title: "Address",
              dataIndex: ["residence_info", "address"],
              key: "residence_address",
            },
            {
              title: "City",
              dataIndex: ["residence_info", "city"],
              key: "residence_city",
            },
            {
              title: "Pincode",
              dataIndex: ["residence_info", "pincode"],
              key: "residence_pincode",
            },
            {
              title: "State",
              dataIndex: ["residence_info", "state"],
              key: "residence_state",
            },
          ],
        },
        {
          title: "Office",
          children: [
            {
              title: "Address",
              dataIndex: ["office_info", "address"],
              key: "office_address",
            },
            {
              title: "City",
              dataIndex: ["office_info", "city"],
              key: "office_city",
            },
            {
              title: "Pincode",
              dataIndex: ["office_info", "pincode"],
              key: "office_pincode",
            },
            {
              title: "State",
              dataIndex: ["office_info", "state"],
              key: "office_state",
            },
          ],
        },
      ],
    },

    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record) => {
        return <span>{dayjs(record.created_at).format("DD-MM-YYYY")}</span>;
      },
    },
  ];

  useEffect(() => {
    // fetch all client
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

    // Fetch All Client
    fetchAllClient();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2">
        <Link
          to={"/our-panels/taxation-panel"}
          className="text-zinc-700 font-semibold text-2xl"
        >
          <IoMdArrowRoundBack />
        </Link>
        <h1 className="text-zinc-700 font-semibold text-xl">All Client</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
       <div className="">
       <Table
          columns={columns}
          dataSource={allClient}
          bordered
          scroll={{ x: "max-content" }}
        />
       </div>
      </div>
    </div>
  );
};

export default AllClient;
