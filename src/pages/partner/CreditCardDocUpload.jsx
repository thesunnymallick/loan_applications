import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import userCricle from "../../assets/userCricle.jpg";
import { Button,  Input, notification, Upload } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { getCustomerDetails, uploadDocForLoan } from "../../api/partner/loanApi";
import dayjs from "dayjs";
import { getCreditCardCustomerDetails, uploadCreditCardDoc } from "../../api/partner/creditcardApi";





const CreditCardDocUpload = () => {

  const { fileNo}=useParams()
  // State for storing uploaded files dynamically
  const [images, setImages] = useState({});
  const [customerDetails, setCustomerDetails]=useState(null);


  console.log("File No", fileNo);






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
      const { status } = await uploadCreditCardDoc(fileNo, formData); 
  
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
        const  {data, status}=await  getCreditCardCustomerDetails(fileNo);
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


 const requiredDocuments= [
    { title: "Aadhar Card Front", imageKey: "aadhar_front", passwordKey: "aadhar_front_password" },
    { title: "Aadhar Card Back", imageKey: "aadhar_back", passwordKey: "aadhar_back_password" },
    { title: "Pan Card Image", imageKey: "pan", passwordKey: "pan_password" },
    { title: "Passport Photo", imageKey: "passport_photo", passwordKey: "passport_photo_password" },
    { title: "1 Year Bank Statement (pdf)", imageKey: "one_year_bank_statement", isPdf: true, passwordKey: "one_year_bank_statement_password" },
    { title: "1 Month Salary Slip", imageKey: "one_month_salary_slip", isPdf: true, passwordKey: "one_month_salary_slip_password" },
    { title: "2 Month Salary Slip", imageKey: "two_month_salary_slip", isPdf: true, passwordKey: "two_month_salary_slip_password" },
    { title: "3 Month Salary Slip", imageKey: "three_month_salary_slip", isPdf: true, passwordKey: "three_month_salary_slip_password" },
  ]


  return (
    <div className="p-6">
    <div className="flex items-center gap-2">
      <Link to={"/our-panels/creditCard-panel"} className="text-zinc-800 font-semibold text-xl">
        <FaArrowLeft />
      </Link>
      <h2 className="text-zinc-800 font-semibold text-xl">Upload Doc</h2>
    </div>
  
    <div className="flex flex-col md:flex-row gap-4 mt-4">
      {/* Upload documents details */}
      <div className="w-full md:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-4">
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
    
      <div className="w-full md:w-[30%]">
      <div className="flex flex-col gap-4">
        {/* Partner Information */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full border-[1px] border-green-700 overflow-hidden">
              <img className="w-full h-full object-cover" src={userCricle} alt="User" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-lg text-zinc-800 font-semibold text-center">
              {customerDetails?.partner?.name}
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-zinc-700">Email:</span>
              <span className="text-zinc-700 font-semibold">{customerDetails?.partner?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-zinc-700">Phone:</span>
              <span className="text-zinc-700 font-semibold">{customerDetails?.partner?.mobile_number}</span>
            </div>
            <h2 className="text-zinc-800 font-bold">
          Credit Limit: Rs <span>{customerDetails?.data?.credit_limit || "Not Available"}</span>
        </h2>
          </div>
        </div>

        {/* Customer Details */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg text-zinc-800 font-semibold">Customer Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 p-4 text-sm">
            {Object.entries(customerDetails?.data || {})
              .filter(([key]) => !["created_at", "updated_at"].includes(key)) // Exclude created_at and updated_at
              .map(([key, value]) => (
                <div key={key} className="flex flex-col gap-1">
                  <span className="text-zinc-600 capitalize">{key.replace(/_/g, " ")}</span>
                  <span className="text-zinc-700 font-semibold">
                    {key === "date_of_birth"
                      ? dayjs(value).format("DD-MM-YYYY")
                      : value || "N/A"}
                  </span>
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

export default CreditCardDocUpload;
