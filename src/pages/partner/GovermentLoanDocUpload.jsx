import React, { useState } from "react";
import {
  Card,
  Typography,
  Table,
  Divider,
  notification,
  Upload,
  Button,
  Input,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";
import { CloseCircleOutlined } from "@ant-design/icons";
import { uploadGovermentDoc } from "../../api/partner/govermentLoanApi";
const { Title } = Typography;

const GovermentLoanDocUpload = () => {
  const { fileNo } = useParams();
  // State for storing uploaded files dynamically
  const [images, setImages] = useState({});
  const [customerDetails, setCustomerDetails] = useState(null);

  const applicantDetails1 = [
    { key: "1", label: "File No", value: "LDGV-1045" },
    { key: "2", label: "Pan Number", value: "IZPPB8404K" },
    { key: "3", label: "Rm ID", value: "DIPAK MANDAL" },
    { key: "4", label: "Father Name", value: "VANADDS" },
    { key: "5", label: "Applicant DOB", value: "2024-06-05 00:00:00" },
    { key: "6", label: "Loan Amount", value: "5,000,000" },
    { key: "7", label: "Mobile Number", value: "9091963351" },
    { key: "8", label: "Alternate Number", value: "9007363198" },
  ];

  const applicantDetails2 = [
    { key: "9", label: "Email", value: "rahiomandal053@gmail.com" },
    { key: "10", label: "Marital Status", value: "Married" },
    { key: "11", label: "Gender", value: "Male" },
    { key: "12", label: "Residence Years", value: "12" },
    { key: "13", label: "Monthly Salary", value: "600,000" },
    { key: "14", label: "Type of Applicant", value: "Individual" },
    { key: "15", label: "Business Since", value: "20 Years" },
  ];

  const loanDetails = [
    { key: "1", label: "Type of Loan", value: "CC Limit" },
    { key: "2", label: "Loan Purpose", value: "Supporting existing business" },
    { key: "3", label: "Loan Usage", value: "To purchase stock for business" },
    { key: "4", label: "If Running Other Loans", value: "No" },
    { key: "5", label: "Bank Name", value: "Bank of Baroda" },
    { key: "6", label: "Account Number", value: "5265169465500" },
    { key: "7", label: "IFSC Code", value: "ABCD1251F" },
  ];

  const columns = [
    {
      title: "Field",
      dataIndex: "label",
      key: "label",
      width: "50%",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Details",
      dataIndex: "value",
      key: "value",
    },
  ];

  const handleUpload = (file, key, isPdf) => {
    // Validate file type
    const isValidImage = file.type.startsWith("image/");
    const isValidPdf = file.type === "application/pdf";

    console.log(isValidPdf);

    // If isPdf is true, ensure the file is a valid PDF
    if (isPdf && !isValidPdf) {
      notification.error({
        message: "Invalid File Type",
        description: "Please upload a valid PDF file.",
        placement: "topRight", // You can adjust the position of the notification
      });
      return false;
    }

    // If isPdf is false, ensure the file is a valid image
    if (!isPdf && !isValidImage) {
      notification.error({
        message: "Invalid File Type",
        description: "Please upload a valid image file.",
        placement: "topRight", // You can adjust the position of the notification
      });
      return false;
    }

    // Generate a preview URL for the file
    const previewUrl = URL.createObjectURL(file);

    // Save file and preview URL in state
    setImages((prev) => ({
      ...prev,
      [key]: { file, preview: previewUrl }, // Save both file and preview
    }));

    return false; // Prevent automatic upload
  };

  // handle removed
  const handleRemove = (key) => {
    if (images[key]?.preview) {
      URL.revokeObjectURL(images[key].preview);
    }
    setImages((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  // handle Uplaod doc
  const handleSave = async (title, key, passwordKey) => {
    try {
      if (!images[key]) {
        notification.error({
          message: "Upload Error",
          description: "Please upload a document before saving.",
          duration: 3,
        });
        return;
      }
      const password = document.getElementById(passwordKey)?.value || "";
      // Prepare the form data
      const formData = new FormData();
      formData.append("images", images[key]?.file); // Ensure the file is correctly appended
      formData.append("type", key);
      formData.append("password", password); // Add password dynamically if needed

      // Make the API call
      const { status } = await uploadGovermentDoc(fileNo, formData);

      if (status === 200) {
        // Success Notification
        notification.success({
          message: "Upload Successful",
          description: `The document "${title}" has been uploaded successfully.`,
          duration: 3,
        });

        // Optional: Perform any additional actions on success
      } else {
        // API error (non-200 status)
        notification.error({
          message: "Upload Failed",
          description:
            "There was an issue uploading the document. Please try again.",
          duration: 3,
        });
      }
    } catch (error) {
      // Handle unexpected errors
      notification.error({
        message: "Error Occurred",
        description:
          error?.response?.data?.message ||
          "Something went wrong. Please try again later.",
        duration: 3,
      });
      console.error("Error in handleSave:", error);
    }
  };

  const requiredDocuments = [
    {
      title: "Project Report",
      imageKey: "project_report",
      isPdf: true,
      passwordKey: "project_report_password",
    },
    {
      title: "MSME Certification",
      imageKey: "MSME_certification",
      isPdf: true,
      passwordKey: "MSME_certification_password",
    },
    {
      title: "Two Year ITR File",
      imageKey: "two_year_ITR_file",
      isPdf: true,
      passwordKey: "two_year_ITR_file_password",
    },
    {
      title: "Two Year Trade Licence",
      imageKey: "two_year_trade_licence",
      isPdf: true,
      passwordKey: "two_year_trade_licence_password",
    },
    {
      title: "1 Year Bank Statement (pdf)",
      imageKey: "one_year_bank_statement",
      isPdf: true,
      passwordKey: "one_year_bank_statement_password",
    },
  ];



  

  return (
    <div className="p-6">
    <div className="flex items-center gap-2 py-3">
      <Link to={"/our-panels/govermentLoan"} className="text-zinc-800 font-semibold text-xl">
        <FaArrowLeft />
      </Link>
      <h2 className="text-zinc-800 font-semibold text-xl sm:text-lg">Upload Documents</h2>
    </div>
  
    <Card className="mb-6 shadow-sm">
      <Title level={4} className="mb-4 text-blue-600">Applicant Details - Part 1</Title>
      <Table dataSource={applicantDetails1} columns={columns} pagination={false} bordered className="mb-6" />
    </Card>
  
    <Card className="mb-6 shadow-sm">
      <Title level={4} className="mb-4 text-blue-600">Applicant Details - Part 2</Title>
      <Table dataSource={applicantDetails2} columns={columns} pagination={false} bordered className="mb-6" />
    </Card>
  
    <Card className="shadow-sm">
      <Title level={4} className="mb-4 text-blue-600">Loan Details</Title>
      <Table dataSource={loanDetails} columns={columns} pagination={false} bordered />
    </Card>
  
    <Divider className="my-6" />
  
    <div className="flex justify-center items-center py-4">
      <h1 className="text-zinc-700 text-xl font-semibold sm:text-lg">Upload Documents For Government Loan</h1>
    </div>
  
    {/* upload documents details */}
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 gap-4">
      {requiredDocuments.map(({ title, imageKey, isPdf, passwordKey }, index) => (
        <div key={index} className="p-2">
          <h2 className="text-zinc-700 font-semibold">{title}</h2>
          <div className="w-full flex justify-center items-center overflow-hidden rounded-lg border-dashed border-2 bg-zinc-100 h-52 my-2 relative">
            {images[imageKey] ? (
              <div className="relative h-full w-full flex justify-center items-center">
                {isPdf ? (
                  <>
                    <FaFilePdf className="text-red-600 text-5xl" />
                    <span className="text-sm text-zinc-700 mt-2">{images[imageKey].name}</span>
                  </>
                ) : (
                  <img src={images[imageKey]?.preview} alt={`${title} Preview`} className="h-full w-full object-cover" />
                )}
                <Button
                  shape="circle"
                  icon={<CloseCircleOutlined />}
                  className="absolute top-2 right-2 bg-white text-zinc-700 hover:bg-red-500 hover:text-white"
                  onClick={() => handleRemove(imageKey)}
                />
              </div>
            ) : (
              <Upload
                showUploadList={false}
                accept={isPdf ? ".pdf" : "image/*"}
                beforeUpload={(file) => handleUpload(file, imageKey, isPdf)}
              >
                <div className="flex flex-col items-center gap-2">
                  <FaCloudUploadAlt className="text-3xl text-zinc-500" />
                  <span className="text-sm text-zinc-700">Drag and Drop file here</span>
                  <span className="text-sm text-zinc-700">Or</span>
                  <button className="w-full h-7 border border-zinc-400 text-zinc-700 rounded-md">Browse Files</button>
                </div>
              </Upload>
            )}
          </div>
          <div className="flex items-center gap-2 w-full">
            <Input.Password id={passwordKey} className="w-[80%]" size="large" placeholder="Enter Password" />
            <Button onClick={() => handleSave(title, imageKey, passwordKey)} className="w-[20%] h-10 bg-green-700 text-white rounded-lg">
              Save
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default GovermentLoanDocUpload;
