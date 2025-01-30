import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import userCricle from "../../assets/userCricle.jpg";
import { Button, Input, notification, Upload } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import {
  getCustomerDetails,
  uploadDocForLoan,
} from "../../api/partner/loanApi";
import dayjs from "dayjs";
import ErrorHandler from "../../utils/ErrorHandler";
import Loader from "../../components/Loader";

const loanDocumentConfig = {
  businessLoan: [
    {
      title: "Aadhar Card Front",
      imageKey: "aadhar_front",
      passwordKey: "aadhar_front_password",
    },
    {
      title: "Aadhar Card Back",
      imageKey: "aadhar_back",
      passwordKey: "aadhar_back_password",
    },
    { title: "Pan Card Image", imageKey: "pan", passwordKey: "pan_password" },
    {
      title: "Passport Photo",
      imageKey: "passport_photo",
      passwordKey: "passport_photo_password",
    },
    {
      title: "2 Year ITR PDF File (pdf)",
      imageKey: "two_year_itr_file",
      isPdf: true,
      passwordKey: "two_year_itr_file_password",
    },
    {
      title: "1 Year Business Proof (pdf)",
      imageKey: "one_year_business_proof",
      isPdf: true,
      passwordKey: "one_year_business_proof_password",
    },
    {
      title: "1 Year Full Net Banking Statement (pdf)",
      imageKey: "one_year_net_banking_statement",
      isPdf: true,
      passwordKey: "one_year_net_banking_statement_password",
    },
  ],
  personalLoan: [
    {
      title: "Aadhar Card Front (jpg, pdf)",
      imageKey: "aadhar_front",
      passwordKey: "aadhar_front_password",
    },
    {
      title: "Aadhar Card Back",
      imageKey: "aadhar_back",
      passwordKey: "aadhar_back_password",
    },
    { title: "Pan Card Image", imageKey: "pan", passwordKey: "pan_password" },
    {
      title: "Passport Photo",
      imageKey: "passport_photo",
      passwordKey: "passport_photo_password",
    },
    {
      title: "1 Year Bank Statement (pdf)",
      imageKey: "one_year_bank_statement",
      isPdf: true,
      passwordKey: "one_year_bank_statement_password",
    },
    {
      title: "1 Month Salary Slip",
      imageKey: "one_month_salary_slip",
      isPdf: true,
      passwordKey: "one_month_salary_slip_password",
    },
    {
      title: "2 Month Salary Slip",
      imageKey: "two_month_salary_slip",
      isPdf: true,
      passwordKey: "two_month_salary_slip_password",
    },
    {
      title: "3 Month Salary Slip",
      imageKey: "three_month_salary_slip",
      isPdf: true,
      passwordKey: "three_month_salary_slip_password",
    },
  ],
  homeLoan: [
    {
      title: "Aadhar Card Front (jpg, pdf)",
      imageKey: "aadhar_front",
      passwordKey: "aadhar_front_password",
    },
    {
      title: "Aadhar Card Back",
      imageKey: "aadhar_back",
      passwordKey: "aadhar_back_password",
    },
    { title: "Pan Card Image", imageKey: "pan", passwordKey: "pan_password" },
    {
      title: "1 Month Salary Slip",
      imageKey: "one_month_salary_slip",
      isPdf: true,
      passwordKey: "one_month_salary_slip_password",
    },
    {
      title: "2 Month Salary Slip",
      imageKey: "two_month_salary_slip",
      isPdf: true,
      passwordKey: "two_month_salary_slip_password",
    },
    {
      title: "3 Month Salary Slip",
      imageKey: "three_month_salary_slip",
      isPdf: true,
      passwordKey: "three_month_salary_slip_password",
    },
    {
      title: "1 Year Bank Statement (pdf)",
      imageKey: "one_year_bank_statement",
      isPdf: true,
      passwordKey: "one_year_bank_statement_password",
    },
    {
      title: "3 Year ITR or Business Proof (pdf)",
      imageKey: "three_year_itr",
      isPdf: true,
      passwordKey: "three_year_itr_password",
    },
    {
      title: "Complete Chain Deed (pdf)",
      imageKey: "complete_chain_deed",
      isPdf: true,
      passwordKey: "complete_chain_deed_password",
    },
    {
      title: "Registration Paper (pdf)",
      imageKey: "registration_paper",
      isPdf: true,
      passwordKey: "registration_paper_password",
    },
    {
      title: "Side Plan (pdf)",
      imageKey: "side_plan",
      isPdf: true,
      passwordKey: "side_plan_password",
    },
    {
      title: "Building Plan (pdf)",
      imageKey: "building_plan",
      isPdf: true,
      passwordKey: "building_plan_password",
    },
  ],
  loanAgainstProperty: [
    {
      title: "Aadhar Card Front",
      imageKey: "aadhar_front",
      passwordKey: "aadhar_front_password",
    },
    {
      title: "Aadhar Card Back",
      imageKey: "aadhar_back",
      passwordKey: "aadhar_back_password",
    },
    { title: "Pan Card Image", imageKey: "pan", passwordKey: "pan_password" },
    {
      title: "1 Month Salary Slip",
      imageKey: "one_month_salary_slip",
      isPdf: true,
      passwordKey: "one_month_salary_slip_password",
    },
    {
      title: "2 Month Salary Slip",
      imageKey: "two_month_salary_slip",
      isPdf: true,
      passwordKey: "two_month_salary_slip_password",
    },
    {
      title: "3 Month Salary Slip",
      imageKey: "three_month_salary_slip",
      isPdf: true,
      passwordKey: "three_month_salary_slip_password",
    },
    {
      title: "1 Year Bank Statement (pdf)",
      imageKey: "one_year_bank_statement",
      isPdf: true,
      passwordKey: "one_year_bank_statement_password",
    },
    {
      title: "3 Year ITR / 3 Year Business Proof (pdf)",
      imageKey: "three_year_itr",
      isPdf: true,
      passwordKey: "three_year_itr_password",
    },
    {
      title: "Complete Chain Deed (pdf)",
      imageKey: "complete_chain_deed",
      isPdf: true,
      passwordKey: "complete_chain_deed_password",
    },
    {
      title: "Registration Paper (pdf)",
      imageKey: "registration_paper",
      isPdf: true,
      passwordKey: "registration_paper_password",
    },
    {
      title: "Side Plan (pdf)",
      imageKey: "side_plan",
      isPdf: true,
      passwordKey: "side_plan_password",
    },
    {
      title: "Building Plan (pdf)",
      imageKey: "building_plan",
      isPdf: true,
      passwordKey: "building_plan_password",
    },
  ],
  carLoan: [
    {
      title: "Aadhar Card Front",
      imageKey: "aadhar_front",
      passwordKey: "aadhar_front_password",
    },
    {
      title: "Aadhar Card Back",
      imageKey: "aadhar_back",
      passwordKey: "aadhar_back_password",
    },
    { title: "Pan Card Image", imageKey: "pan", passwordKey: "pan_password" },
    { title: "RC", imageKey: "rc", passwordKey: "rc_password" },
  ],
  oldCarLoan: [
    {
      title: "Aadhar Card Front",
      imageKey: "aadhar_front",
      passwordKey: "aadhar_front_password",
    },
    {
      title: "Aadhar Card Back",
      imageKey: "aadhar_back",
      passwordKey: "aadhar_back_password",
    },
    { title: "Pan Card Image", imageKey: "pan", passwordKey: "pan_password" },
    { title: "RC", imageKey: "rc", passwordKey: "rc_password" },
  ],
};

const UploadDocForLoan = () => {
  const { loanType, fileNo } = useParams();
  // State for storing uploaded files dynamically
  const [images, setImages] = useState({});
  const [customerDetails, setCustomerDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get the list of required documents for the selected loan type
  const requiredDocuments = loanDocumentConfig[loanType] || [];

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
      const { status } = await uploadDocForLoan(fileNo, formData); // Pass formData to the API

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
    }
  };

  useEffect(() => {
    // Fetch Loan Deatils
    const fetchLoanCustomerDetails = async () => {
      try {
        setLoading(true);
        const { data, status } = await getCustomerDetails(fileNo);
        if (status === 200) {
          setCustomerDetails(data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        ErrorHandler.handleError(error);
      }
    };
    // Fetch Loan Deatils
    fetchLoanCustomerDetails();
  }, [fileNo]);

  return (
    <>
      {loading !== true ? (
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-2">
            <Link
              to="/our-panels/loan-panels"
              className="text-zinc-800 font-semibold text-xl"
            >
              <FaArrowLeft />
            </Link>
            <h2 className="text-zinc-800 font-semibold text-xl">Upload Doc</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Upload Documents Section */}
            <div
              className="w-full lg:w-[70%] 
           grid grid-cols-1 md:grid-cols-2 mt-4 gap-4"
            >
              {requiredDocuments.map(
                ({ title, imageKey, isPdf, passwordKey }, index) => (
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
                          beforeUpload={(file) =>
                            handleUpload(file, imageKey, isPdf)
                          }
                        >
                          <div className="flex flex-col items-center gap-2">
                            <FaCloudUploadAlt className="text-3xl text-zinc-500" />
                            <span className="text-sm text-zinc-700">
                              Drag and Drop file here
                            </span>
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
                )
              )}
            </div>

            {/* Customer Details Section */}
            <div className="w-full lg:w-[30%]">
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full border-[1px] border-green-700 overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={userCricle}
                        alt="userImage"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h1 className="text-lg text-zinc-800 font-semibold text-center">
                      {customerDetails?.partner?.name}
                    </h1>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-zinc-700">Email:</span>
                      <span className="text-zinc-700 font-semibold">
                        {customerDetails?.partner?.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-zinc-700">Phone:</span>
                      <span className="text-zinc-700 font-semibold">
                        {customerDetails?.partner?.mobile_number}
                      </span>
                    </div>
                    <h2 className="text-zinc-800 font-bold">
                      {customerDetails?.data?.loan_type} of Rs{" "}
                      {customerDetails?.data?.loan_amount} for{" "}
                      {customerDetails?.data?.tenure}
                    </h2>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="text-lg text-zinc-800 font-semibold">
                    Customer Details
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-3 p-4 text-sm">
                    {[
                      { label: "Pan", value: customerDetails?.data?.pan },
                      {
                        label: "DOB",
                        value: dayjs(customerDetails?.data?.dob).format(
                          "DD-MM-YYYY"
                        ),
                      },
                      {
                        label: "Pincode",
                        value: customerDetails?.data?.residence_pincode,
                      },
                      {
                        label: "Residence Address",
                        value: customerDetails?.data?.residence_address,
                      },
                      {
                        label: "Mother Name",
                        value: customerDetails?.data?.mother_name,
                      },
                      {
                        label: "Reference1",
                        value: `${customerDetails?.data?.reference_name_1} - ${customerDetails?.data?.reference_phone_1}`,
                      },
                      {
                        label: "Reference2",
                        value: `${customerDetails?.data?.reference_name_2} - ${customerDetails?.data?.reference_phone_2}`,
                      },
                      {
                        label: "Employment Type",
                        value: customerDetails?.data?.employment_type,
                      },
                      {
                        label: "Company Name",
                        value: customerDetails?.data?.company_name,
                      },
                      {
                        label: "Company Type",
                        value: customerDetails?.data?.company_type,
                      },
                      {
                        label: "Monthly Income",
                        value: customerDetails?.data?.monthly_income,
                      },
                      {
                        label: "Managed By",
                        value: "Executive: NA, Team Leader: NA",
                      },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex flex-col gap-1">
                        <span className="text-zinc-600">{label}</span>
                        <span className="text-zinc-700 font-semibold">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UploadDocForLoan;
