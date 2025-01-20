import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import userCricle from "../../assets/userCricle.jpg";
import { Button,  Input, notification, Upload } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { getCustomerDetails, uploadDocForLoan } from "../../api/partner/loanApi";
import dayjs from "dayjs";
import { getTaxtationsDetails, uploadTaxDoc } from "../../api/partner/taxationpanel";





const TaxationUploadDoc = () => {

  const { fileNo}=useParams()
  // State for storing uploaded files dynamically
  const [images, setImages] = useState({});
  const [customerDetails, setCustomerDetails]=useState(null);









const handleUpload = (file, key, isPdf) => {
  // Validate file type
  const isValidImage = file.type.startsWith("image/");
  const isValidPdf = file.type === "application/pdf";

  console.log(isValidPdf)

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
  const handleSave = async (title, key, passwordKey ) => {
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
      const { status } = await uploadTaxDoc(fileNo, formData); // Pass formData to the API
  
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
          description: "There was an issue uploading the document. Please try again.",
          duration: 3,
        });
      }
    } catch (error) {
      // Handle unexpected errors
      notification.error({
        message: "Error Occurred",
        description: error?.response?.data?.message || "Something went wrong. Please try again later.",
        duration: 3,
      });
      console.error("Error in handleSave:", error);
    }
  };
  

  useEffect(()=>{
    
    // Fetch Loan Deatils
    const fetchLoanCustomerDetails=async()=>{
      try {
        const  {data, status}=await getTaxtationsDetails(fileNo);
         if(status===200){
           setCustomerDetails(data);
         }
      } catch (error) {
        console.log(error);
      }
    }
    // Fetch Loan Deatils
    fetchLoanCustomerDetails();

  },[fileNo]);


  // aadhar_front', 'aadhar_back', 'pan', 'passport_photo', 'one_year_bank_statement'

 const requiredDocuments= [
    { title: "Aadhar Card Front", imageKey: "aadhar_front", passwordKey: "aadhar_front_password" },
    { title: "Aadhar Card Back", imageKey: "aadhar_back", passwordKey: "aadhar_back_password" },
    { title: "Pan Card Image", imageKey: "pan", passwordKey: "pan_password" },
    { title: "Passport Photo", imageKey: "passport_photo", passwordKey: "passport_photo_password" },
  ]





  return (
    <div className="p-6">
    <div className="flex items-center gap-2 mb-4">
      <Link to="/our-panels/taxation-panel" className="text-zinc-800 font-semibold text-xl">
        <FaArrowLeft />
      </Link>
      <h2 className="text-zinc-800 font-semibold text-xl">Upload Doc</h2>
    </div>
  
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Upload documents details */}
      <div className="w-full lg:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {requiredDocuments.map(({ title, imageKey, isPdf, passwordKey }, index) => (
          <div key={index} className="p-2">
            <h2 className="text-zinc-700 font-semibold">{title}</h2>
            <div className="w-full flex justify-center items-center overflow-hidden rounded-lg border-dashed border-2 bg-zinc-100 h-52 my-2 relative">
              {images[imageKey] ? (
                <div className="relative h-full w-full flex justify-center items-center">
                  {isPdf ? (
                    <>
                      <FaFilePdf className="text-red-600 text-5xl" />
                      <span className="text-sm text-zinc-700 mt-2">
                        {images[imageKey].name}
                      </span>
                    </>
                  ) : (
                    <img
                      src={images[imageKey]?.preview}
                      alt={`${title} Preview`}
                      className="h-full w-full object-cover"
                    />
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
                    <button className="w-full h-7 border border-zinc-400 text-zinc-700 rounded-md">
                      Browse Files
                    </button>
                  </div>
                </Upload>
              )}
            </div>
            <div className="flex items-center gap-2 w-full">
              <Input.Password
                id={passwordKey}
                className="w-[80%]"
                size="large"
                placeholder="Enter Password"
              />
              <Button
                onClick={() => handleSave(title, imageKey, passwordKey)}
                className="w-[20%] h-10 bg-green-700 text-white rounded-lg"
              >
                Save
              </Button>
            </div>
          </div>
        ))}
      </div>
  
      {/* Loan form details */}
      <div className="w-full lg:w-[30%]">
  <div className="flex flex-col gap-4">
    {/* Partner Information Card */}
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full border-[1px] border-green-700 overflow-hidden">
          <img className="w-full h-full object-cover" src={userCricle} alt="userImage" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg text-zinc-800 font-semibold text-center">
          {customerDetails?.partner?.name || "N/A"}
        </h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-zinc-700">Email:</span>
          <span className="text-zinc-700 font-semibold">
            {customerDetails?.partner?.email || "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-zinc-700">Phone:</span>
          <span className="text-zinc-700 font-semibold">
            {customerDetails?.partner?.mobile_number || "N/A"}
          </span>
        </div>
      </div>
    </div>

    {/* Customer Details Card */}
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg text-zinc-800 font-semibold mb-4">Customer Details</h2>
      <div className="grid grid-cols-2 gap-3 text-sm">
        {[
          { label: "File Number", value: customerDetails?.data?.file_no || "N/A" },
          { label: "Partner ID", value: customerDetails?.data?.partner_id || "N/A" },
          { label: "Unique ID", value: customerDetails?.data?.unique_id || "N/A" },
          { label: "First Name", value: customerDetails?.data?.first_name || "N/A" },
          { label: "Middle Name", value: customerDetails?.data?.middle_name || "N/A" },
          { label: "Last Name", value: customerDetails?.data?.last_name || "N/A" },
          { label: "Email", value: customerDetails?.data?.email || "N/A" },
          { label: "Phone", value: customerDetails?.data?.phone || "N/A" },
          { label: "Pan", value: customerDetails?.data?.pan || "N/A" },
          { label: "Aadhar", value: customerDetails?.data?.aadhar || "N/A" },
          { label: "Residence Address", value: customerDetails?.data?.residence_address || "N/A" },
          { label: "Residence City", value: customerDetails?.data?.residence_city || "N/A" },
          { label: "Residence Pincode", value: customerDetails?.data?.residence_pincode || "N/A" },
          { label: "Residence State", value: customerDetails?.data?.residence_state || "N/A" },
          { label: "Office Address", value: customerDetails?.data?.office_address || "N/A" },
          { label: "Office City", value: customerDetails?.data?.office_city || "N/A" },
          { label: "Office Pincode", value: customerDetails?.data?.office_pincode || "N/A" },
          { label: "Office State", value: customerDetails?.data?.office_state || "N/A" },
          { label: "Status", value: customerDetails?.data?.status || "N/A" },
        ].map(({ label, value }, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <span className="text-zinc-600">{label}</span>
            <span className="text-zinc-700 font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

 
    </div>
  </div>
  
  );
};

export default TaxationUploadDoc;
