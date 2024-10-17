import React, { useState } from "react";
import { Input, Table } from "antd";
import { IoSearchOutline } from "react-icons/io5";

const PlaneOverview = () => {
  // Define the columns structure

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const columns = [
    {
      title: "No",
      dataIndex: "key", // unique identifier
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
               <span>{index+1})</span>
               <li  key={index}>{service}</li>
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
      services: [
        "Private Bank Loan Panel",
        "Govt Bank Loan Panel",
        "Offline Credit Card Panel",
        "Tax, GST, ROC Service Panel",
        "Instant Normal Payout",
        "RM Support",
      ],
    },
    {
      key: 3,
      name: "DSA DELIGHT",
      price: 9999,
      offerPrice: 9999,
      services: [
        "Private Bank Loan Panel",
        "Govt Bank Loan Panel",
        "Online Credit Card Panel",
        "Tax, GST, ROC Service Panel",
        "Monthly Highly Payout",
        "RM Support",
      ],
    },
    {
      key: 4,
      name: "DSA DELIGHT PRO",
      price: 18999,
      offerPrice: 18999,
      services: [
        "Private Bank Loan Panel",
        "Govt Bank Loan Panel",
        "Online Credit Card Panel",
        "Tax, GST, ROC Service Panel",
        "Micro Panel Instant & Direct Login Panel (Loan, Credit Card, Demat Account, Bank Account Open, Credit Line, Investment Account, UPI)",
        "AADHAR CARD & PAN CARD LOAN PANEL",
        "I2I Instant Panel (Credit Score Check Eligibility Loan)",
        "Credit Score Check Panel",
        "Instant Highly Payout",
        "Special RM Team Support",
      ],
    },
  ];


  // Filter the data based on the search text
  const handleSearch = (value) => {
    const filtered = dataSource.filter((record) => {
      // Check if search text exists in name, price, offer price, or services
      return (
        record.name.toLowerCase().includes(value.toLowerCase()) ||
        record.price.toString().includes(value) ||
        record.offerPrice.toString().includes(value) ||
        record.services.some((service) =>
          service.toLowerCase().includes(value.toLowerCase())
        )
      );
    });
    setFilteredData(filtered);
    setSearchText(value);
  };
  return (
    <div className="px-2">
        <div className="py-2 flex justify-between "
        >
         <h2 className="text-zinc-700 font-semibold text-xl">Plan Overview</h2>

           {/* Search Bar */}
         <Input
        placeholder="Search packages..."
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        prefix={<IoSearchOutline  />} // Add search icon
        style={{
          marginBottom: 16,
          width: 300,
          borderRadius: "8px", 
          padding: "10px 15px", 
        }}
        allowClear 
      />
        </div>
      <Table 
      bordered
      columns={columns} 
      dataSource={searchText ? filteredData : dataSource}
      pagination={false} />
    </div>
  );
};

export default PlaneOverview;
