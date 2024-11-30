import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Card, Typography, Divider, Tooltip, Button, notification } from 'antd';
import { getLoanDocInfo } from '../../api/partner/loanApi';
import { DownloadOutlined, EyeOutlined, FilePdfOutlined } from '@ant-design/icons';
import pdfIcon from "../../assets/pdfIcon.png"

const { Title, Text } = Typography;

const LoanInfo = () => {
  const {fileNo}= useParams()
  const location = useLocation();
  const { loanInfo } = location.state || {};
  const [documents, setDocuments]=useState([])


  //Fectch Loan Details
  useEffect(()=>{
    const fetchLoanDetails=async()=>{
        try {
          const {data , status}= await getLoanDocInfo(fileNo);
          if(status===200){
            setDocuments(data?.data)
          }
        } catch (error) {
          
        }
      }
      fetchLoanDetails();
  },[fileNo])

  if (!loanInfo) {
    return <div className="text-center mt-10 text-red-500 text-lg">No loan information available.</div>;
  }

 

  return (
    <div className="container mx-auto p-6">
      <Title level={2} className=" mb-6">Loan Information</Title>

      {/* Customer Details Section */}
      <Card className="mb-6 shadow-sm">
        <Title level={4} className="mb-4 text-blue-600">Customer Details</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DetailItem label="First Name" value={loanInfo.first_name} />
          <DetailItem label="Middle Name" value={loanInfo.middle_name || 'N/A'} />
          <DetailItem label="Last Name" value={loanInfo.last_name} />
          <DetailItem label="Email" value={loanInfo.email} />
          <DetailItem label="Phone" value={loanInfo.phone} />
          <DetailItem label="PAN" value={loanInfo.pan} />
          <DetailItem label="Employment Type" value={loanInfo.employment_type} />
          <DetailItem label="Company Name" value={loanInfo.company_name} />
          <DetailItem label="Loan Amount" value={`$${loanInfo.loan_amount}`} />
          <DetailItem label="Tenure" value={`${loanInfo.tenure} months`} />
          <DetailItem label="Date of Birth" value={new Date(loanInfo.dob).toLocaleDateString()} />
          <DetailItem label="Monthly Income" value={`$${loanInfo.monthly_income}`} />
          <DetailItem label="Residence Address" value={loanInfo.residence_address} />
          <DetailItem label="Residence Pincode" value={loanInfo.residence_pincode} />
        </div>
      </Card>

      {/* Partner Details Section */}
      <Card className="mb-6 shadow-sm">
        <Title level={4} className="mb-4 text-blue-600">Partner Details</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DetailItem label="UUID" value={loanInfo.partner?.uuid} />
          <DetailItem label="Name" value={loanInfo.partner?.name} />
          <DetailItem label="Email" value={loanInfo.partner?.email} />
          <DetailItem label="Mobile Number" value={loanInfo.partner?.mobile_number} />
        </div>
      </Card>

     

         {/* Document Details Section */}
         <Card className="shadow-sm">
  <Title level={4} className="mb-4 text-blue-600">Document Details</Title>

  {/* Check if documents object has valid entries */}
  {Object.keys(documents).length === 0 || !Object.values(documents).some(value => value && typeof value === 'string' && value.startsWith('http')) ? (
    <p className="text-center text-gray-600 font-semibold text-lg mt-6">
    <span className="inline-block bg-yellow-200 text-yellow-700 px-4 py-2 rounded-md shadow-md">
      No Documents Uploaded Yet
    </span>
  </p>
  // Message when no documents are available
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(documents).map(([key, value]) => {
        if (value && typeof value === 'string' && value.startsWith('http')) {
          return (
            <DocumentItem
              key={key}
              label={formatDocumentLabel(key)}
              url={value}
              password={documents[`${key}_password`] || 'N/A'}
            />
          );
        }
        return null;
      })}
    </div>
  )}
</Card>

    </div>
  );
};

// DetailItem Component
const DetailItem = ({ label, value }) => (
  <div className="flex flex-col">
    <Text className="font-semibold text-gray-700">{label}</Text>
    <Text className="text-gray-900">{value}</Text>
    <Divider className="mt-2 mb-0" />
  </div>
);


// Helper to format document labels
const formatDocumentLabel = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const DocumentItem = ({ label, url, password }) => {
    // Check if the URL is for an image or a PDF
    const isImage = url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    const isPDF = url.match(/\.pdf$/) != null;
  
    const handleDownload = (fileUrl) => {
        // Open a new tab for the download
        const newTab = window.open('', '_blank'); // Open an empty new tab
      
        newTab.document.write(`
          <html>
            <head>
              <title>File Download</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
                  background-color: #f4f7fc;
                  color: #333;
                  text-align: center;
                }
                .content {
                  padding: 20px;
                  background: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  width: 90%;
                  max-width: 400px;
                }
                h1 {
                  font-size: 24px;
                  color: #4CAF50;
                }
                p {
                  font-size: 16px;
                  margin-top: 10px;
                  color: #555;
                }
                .button-container {
                  margin-top: 20px;
                }
                button {
                  padding: 12px 24px;
                  background-color: #4CAF50;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 16px;
                  transition: background-color 0.3s ease;
                }
                button:hover {
                  background-color: #45a049;
                }
                .spinner {
                  border: 4px solid #f3f3f3;
                  border-top: 4px solid #4CAF50;
                  border-radius: 50%;
                  width: 30px;
                  height: 30px;
                  animation: spin 2s linear infinite;
                  margin: 20px auto;
                }
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              </style>
            </head>
            <body>
              <div class="content">
                <h1>Downloading your file...</h1>
                <div class="spinner"></div>
                <p>If the download doesn't start automatically, please click the button below.</p>
                <div class="button-container">
                  <button onclick="window.location.href='${fileUrl}';">Download File</button>
                </div>
              </div>
            </body>
          </html>
        `);
      
        // Close the document after writing content
        newTab.document.close();
      
        // Optionally, trigger the download automatically after a short delay
        setTimeout(() => {
          newTab.location.href = fileUrl; // Direct download after a short delay
        }, 500); // Delay to ensure the page loads before triggering download
      };
      
  
    const handleCopyPassword = () => {
      navigator.clipboard.writeText(password).then(() => {
        // Show notification after copying the password
        notification.success({
          message: 'Password Copied!',
          description: 'The password has been successfully copied to your clipboard.',
          placement: 'topRight',
        });
      }).catch((err) => {
        notification.error({
          message: 'Failed to Copy Password',
          description: 'An error occurred while copying the password.',
          placement: 'topRight',
        });
      });
    };
  
    return (
      <div className="flex flex-col p-4 border rounded-lg shadow-sm bg-white">
        <Text className="font-semibold text-gray-700 text-lg mb-2">{label}</Text>
  
        <div className="mt-4">
          {isImage ? (
            <div className="flex justify-center mb-4">
              <img
                src={url}
                alt={label}
                className="max-w-xs max-h-40 object-contain rounded-lg cursor-pointer"
                onClick={() => handleDownload(url)} // Trigger download on image click
              />
            </div>
          ) : isPDF ? (
            <div className="flex justify-center mb-4 h-40">
              <img className="w-28 h-28 object-cover" src={pdfIcon} alt="PDF Icon" />
            </div>
          ) : null}
  
          <div className="flex items-center justify-between space-x-4 mt-4">
            <Button
              icon={<DownloadOutlined />}
              onClick={() => handleDownload(url)} // Trigger download on button click
              className="w-full sm:w-auto bg-green-700 text-white"
            >
              Download
            </Button>
  
            <Tooltip title={`Password: ${password}`} placement="top">
              <Button
                icon={<EyeOutlined />}
                className="w-full sm:w-auto text-blue-700"
                onClick={handleCopyPassword} // Trigger copy password on click
              >
                Copy Password
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  };
  

export default LoanInfo;
