import React, { useState } from "react";
import { FaArrowLeft, FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import userCricle from "../../assets/userCricle.jpg";
import { Button, Image, Input, Upload } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const loanDocumentConfig = {
  businessLoan: [
    { title: "Aadhar Card Front (jpg, pdf)", imageKey: "aadharFront" },
    { title: "Aadhar Card Back", imageKey: "aadharBack" },
    { title: "Pan Card Image", imageKey: "panCard" },
    { title: "Passport Photo", imageKey: "passportPhoto" },
    { title: "2 Year ITR PDF File (pdf)", imageKey: "irtPdf", isPdf: true },
    { title: "1 Year Business Proof (pdf)", imageKey: "businessProofPdf", isPdf: true },
    { title: "1 Year Full Net Banking Statement (pdf)", imageKey: "bankingStatementPdf", isPdf: true },
  ],
  personalLoan: [
    { title: "Aadhar Card Front (jpg, pdf)", imageKey: "aadharFront" },
    { title: "Aadhar Card Back", imageKey: "aadharBack" },
    { title: "Pan Card Image", imageKey: "panCard" },
    { title: "Passport Photo", imageKey: "passportPhoto" },
    { title: "1 Year Bank Statement (pdf)", imageKey: "bankStatementPdf", isPdf: true },
    { title: "1 Month Salary Slip", imageKey: "salarySlip1", isPdf: true },
    { title: "2 Month Salary Slip", imageKey: "salarySlip2", isPdf: true },
    { title: "3 Month Salary Slip", imageKey: "salarySlip3", isPdf: true },
  ],
  homeLoan: [
    { title: "Aadhar Card Front (jpg, pdf)", imageKey: "aadharFront" },
    { title: "Aadhar Card Back", imageKey: "aadharBack" },
    { title: "Pan Card Image", imageKey: "panCard" },
    { title: "1 Month Salary Slip", imageKey: "salarySlip1", isPdf: true },
    { title: "2 Month Salary Slip", imageKey: "salarySlip2", isPdf: true },
    { title: "3 Month Salary Slip", imageKey: "salarySlip3", isPdf: true },
    { title: "1 Year Bank Statement (pdf)", imageKey: "bankStatementPdf", isPdf: true },
    { title: "3 Year ITR or Business Proof (pdf)", imageKey: "itrOrBusinessProof", isPdf: true },
    { title: "Complete Chain Deed (pdf)", imageKey: "chainDeed", isPdf: true },
    { title: "Registration Paper (pdf)", imageKey: "registrationPaper", isPdf: true },
    { title: "Side Plan (pdf)", imageKey: "sidePlan", isPdf: true },
    { title: "Building Plan (pdf)", imageKey: "buildingPlan", isPdf: true },
  ],
};

const UploadDocForLoan = () => {

  const {loanType, fileNo}=useParams()
 // State for storing uploaded files dynamically
const [images, setImages] = useState({});

// Get the list of required documents for the selected loan type
const requiredDocuments = loanDocumentConfig[loanType] || [];


  // handle upload 
  const handleUpload = (file, key) => {
    // Handle file validation
    const isValidImage = file.type.startsWith("image/");
    const isValidPdf = file.type === "application/pdf";

    if (key.includes("Pdf") && !isValidPdf) {
      alert("Please upload a valid PDF file.");
      return false;
    }

    if (!key.includes("Pdf") && !isValidImage) {
      alert("Please upload a valid image file.");
      return false;
    }

    // Save file in state
    const reader = new FileReader();
    reader.onload = (e) => {
      setImages((prev) => ({
        ...prev,
        [key]: key.includes("Pdf") ? { name: file.name, file } : e.target.result,
      }));
    };
    reader.readAsDataURL(file);

    return false; 
  };

  // handle removed
  const handleRemove = (key) => {
    setImages((prev) => ({
      ...prev,
      [key]: null,
    }));
  };


  const allFiles = [
    {
      title: "Aadhar Card Front (jpg, pdf)",
      imageKey: "aadharFront",
    },
    {
      title: "Aadhar Card Back",
      imageKey: "aadharBack",
    },
    {
      title: "Pan Card Image",
      imageKey: "panCard",
    },
    {
      title: "Passport Photo",
      imageKey: "passportPhoto",
    },
    {
      title: "2 Year IRT PDF File (pdf)",
      imageKey: "irtPdf",
      isPdf: true,
    },
    {
      title: "1 Year Business Proof (pdf)",
      imageKey: "businessProofPdf",
      isPdf: true,
    },
    {
      title: "1 Year Full Net Banking Statement (pdf)",
      imageKey: "bankingStatementPdf",
      isPdf: true,
    },
  ];

  

  return (
    <div className="p-6">
      <div className="flex items-center gap-2">
        <Link
          to={"/our-panels/loan-panels"}
          className="text-zinc-800 font-semibold text-xl"
        >
          <FaArrowLeft />
        </Link>
        <h2 className="text-zinc-800 font-semibold text-xl">Upload Doc</h2>
      </div>

      <div className="flex gap-4">
        {/* upload documents details */}
        <div className="w-[70%] grid grid-cols-2 mt-4 gap-4">
          {requiredDocuments.map(({ title, imageKey, isPdf }, index) => (
        <div key={index} className="p-2">
          <h2 className="text-zinc-700 font-semibold">{title}</h2>
          <div
            className="w-full flex justify-center items-center overflow-hidden rounded-lg border-dashed border-2 bg-zinc-100 h-52 my-2 relative"
          >
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
                    src={images[imageKey]}
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
                beforeUpload={(file) => handleUpload(file, imageKey)}
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
              className="w-[80%]"
              size="large"
              placeholder="Enter Password"
            />
            <Button className="w-[20%] h-10 bg-green-700 text-white rounded-lg">
              Save
            </Button>
          </div>
        </div>
      ))}
        </div>

        {/* Loan form details */}
        <div className="w-[30%]">
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
                  MASOOD RANA
                </h1>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-zinc-700">Email</span>
                  <span className="text-zinc-700 font-semibold">
                    najmulmolla1476@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-zinc-700">Phone</span>
                  <span className="text-zinc-700 font-semibold">
                    62971719586
                  </span>
                </div>
                <h2 className="text-zinc-800 font-bold">
                  Business Loan of RS. 500000 for 24
                </h2>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg text-zinc-800 font-semibold">
                Customer Details
              </h2>

              <div className="grid grid-cols-2 gap-3 p-4 text-sm">
                {/* Column 1 */}
                <div className="flex flex-col gap-1 ">
                  <span className="text-zinc-600">Pan</span>
                  <span className="text-zinc-700 font-semibold">
                    CZAPM5688M
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-600">DOB</span>
                  <span className="text-zinc-700 font-semibold">
                    2024-11-15
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-600">Pincode</span>
                  <span className="text-zinc-700 font-semibold">743425</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-600">Residence Address</span>
                  <span className="text-zinc-700 font-semibold">
                    PAIKPARA, HAROA, NORTH 24 PARGANAS, 743425
                  </span>
                </div>
                {/* Column 2 */}
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-600">Mother Name</span>
                  <span className="text-zinc-700 font-semibold">
                    Alaya Bibi
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-600">Reference1</span>
                  <span className="text-zinc-700 font-semibold">
                    JALAL UDDIN - 9093237626
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-600">Reference2</span>
                  <span className="text-zinc-700 font-semibold">
                    AMIR ALI - 7699135978
                  </span>
                </div>
                {/* Column 3 */}
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-600">Employment Type</span>
                  <span className="text-zinc-700 font-semibold">
                    Self Employed
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-600">Company Name</span>
                  <span className="text-zinc-700 font-semibold">GROWFRONT</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-600">Company Type</span>
                  <span className="text-zinc-700 font-semibold">
                    Sole Proprietorship
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-600">Monthly Income</span>
                  <span className="text-zinc-700 font-semibold">500000</span>
                </div>
                {/* Column 4 */}
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-600">Managed By</span>
                  <span className="text-zinc-700 font-semibold">
                    Executive: NA
                  </span>
                  <span className="text-zinc-700 font-semibold">
                    Team Leader: NA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocForLoan;
