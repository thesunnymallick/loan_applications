import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Upload, Button, Input, notification } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getDocumentInfo,
  uploadPartnerDoc,
  uploadBankDetails,
  removePartnerDoc,
} from "../../api/partner/uploadDocApi";
import { MdOutlineRemoveCircle, MdVerified } from "react-icons/md";
import VerificationModal from "../../components/partnerComponet/VerificationModal";
import { useSelector } from "react-redux";
import ProfileShimmerUi from "../../components/shimmerUi/ProfileShimmerUi";
import LazyImage from "../../components/LazyImage";


const validationSchema = Yup.object().shape({
  bank_name: Yup.string()
    .required("Bank name is required")
    .min(2, "Bank name must be at least 2 characters long"),
  account_number: Yup.string()
    .required("Account number is required")
    .matches(/^\d+$/, "Account number should contain only numbers")
    .min(8, "Account number must be at least 8 digits")
    .max(18, "Account number can't exceed 18 digits"),
  bank_account_holder_name: Yup.string()
    .required("Account holder name is required")
    .min(2, "Account holder name must be at least 2 characters long"),
  ifsc_code: Yup.string()
    .required("IFSC code is required")
    .matches(/^[A-Za-z]{4}\d{7}$/, "Invalid IFSC code format"),
  branch: Yup.string()
    .required("Branch name is required")
    .min(2, "Branch name must be at least 2 characters long"),
});

const UploadDocuments = () => {
  const {status } = useSelector((state) => state.auth);
  const [images, setImages] = useState({
    userPhoto: null,
    aadhar_front_image: null,
    aadhar_back_image: null,
    pan_card_image: null,
    blank_cheque_image: null,
    education_qualification:null,
  });
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [loadingPage, setLoadingPage]=useState(false);

  // Initial values for the form fields
  const initialValues = {
    bank_name: "",
    account_number: "",
    bank_account_holder_name: "",
    ifsc_code: "",
    branch: "",
  };

  const handelUploadBankDetails = async (values) => {
    try {
      setLoading(true);
      const { status } = await uploadBankDetails(values);
      if (status === 201) {
        setLoading(false);
        notification.success({
          message: "Success",
          description: "Bank details uploaded successfully!",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      notification.error({
        message: "Error",
        description: "Failed to upload bank details. Please try again later.",
      });
    }
  };

  // upload partner document
  const handelUploadPartnerDocuments = async (file, imageType) => {
    try {
      const formData = new FormData();
      formData.append("images", file);
      formData.append("type", imageType);
      const { status } = await uploadPartnerDoc(formData);

      if (status === 200) {
        notification.success({
          message: "Success",
          description: "Document uploaded successfully!",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to upload the document. Please try again later.",
      });
    }
  };

  const handelRemovePartnerDocuments = async (imageType) => {
    try {
      const payload = {
        type: imageType,
      };
      const { status } = await removePartnerDoc(payload);

      if (status === 200) {
        notification.success({
          message: "Success",
          description: "Document removed successfully!",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to remove the document. Please try again later.",
      });
    }
  };

  // Formik setup for handling form state and validation
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // upload banking details
      handelUploadBankDetails(values);
    },
  });

  // Destructure Formik's properties for easier use
  const {
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formik;

  const handlePreview = (file, key) => {
    console.log(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImages((prev) => ({ ...prev, [key]: e.target.result }));
    };
    reader.readAsDataURL(file);
    handelUploadPartnerDocuments(file, key);
    return false;
  };

  const handleRemove = (key) => {
    handelRemovePartnerDocuments(key);
    setImages((prev) => ({ ...prev, [key]: null }));
  };

  const renderUploadBox = (label, key, verifiedKey) => (
    <div className="px-2">
      <div className="flex justify-between items-center">
        <h2 className="text-zinc-700 font-semibold">{label}</h2>

        {info?.[verifiedKey] === 1 ? (
          <span
            className="px-2  bg-green-600
           text-white rounded-md flex justify-center gap-1 items-center text-sm"
          >
            <span>
              <MdVerified />{" "}
            </span>
            <span>Verfied</span>
          </span>
        ) : (
          <span
            className="px-2  bg-red-600
          text-white rounded-md flex justify-center gap-1 items-center text-sm"
          >
            <span>
              <MdOutlineRemoveCircle />{" "}
            </span>
            <span>Not verfied</span>
          </span>
        )}
      </div>
      
      <div
  className={` flex justify-center items-center overflow-hidden rounded-lg border-dashed border-2 ${
    errors[key] ? "border-red-600" : "border-zinc-300"
  } bg-zinc-100 h-64 sm:h-80 my-2 relative`}
>
  {images[key] ? (
    <div className="relative w-full h-full">
      <LazyImage
        src={images[key]}
        alt={label}
        className="object-contain w-full h-full max-w-full max-h-full"
      />
      <Button
        disabled={info?.[verifiedKey] === 1}
        shape="circle"
        icon={<CloseCircleOutlined />}
        className={`absolute top-2 right-2 bg-white  
         ${
           info?.[verifiedKey] === 1
             ? "cursor-not-allowed text-gray-400 bg-gray-100"
             : "hover:bg-red-500 hover:text-white text-zinc-700"
         }`}
        onClick={() => handleRemove(key)}
      />
    </div>
  ) : (
    <Upload
      showUploadList={false}
      beforeUpload={(file) => handlePreview(file, key)}
    >
      <div className="flex flex-col items-center gap-2">
        <FaCloudUploadAlt className="text-3xl text-zinc-500" />
        <span className="text-sm text-zinc-700">Drag and Drop file here</span>
        <span className="text-sm text-zinc-700">Or</span>
        <button className="w-full h-7 border-1 border-zinc-400 text-zinc-700 rounded-md">
          Browse Files
        </button>
      </div>
    </Upload>
  )}
</div>

      <div className="flex justify-center">
        {touched[key] && errors[key] ? (
          <span className="text-red-500 text-sm">{errors[key]}</span>
        ) : null}
      </div>
    </div>
  );

  useEffect(() => {
    const fetchDocumentInfo = async () => {
      try {
         setLoadingPage(true);
        const { data, status } = await getDocumentInfo();
        if (status === 200) {
          setLoadingPage(false);
          setInfo(data?.data);
          setFieldValue("bank_name", data?.data?.banking_details?.bank_name);
          setFieldValue(
            "account_number",
            data?.data?.banking_details?.account_number
          );
          setFieldValue(
            "bank_account_holder_name",
            data?.data?.banking_details?.bank_account_holder_name
          );
          setFieldValue("branch", data?.data?.banking_details?.branch);
          setFieldValue("ifsc_code", data?.data?.banking_details?.ifsc_code);
          setImages({
            userPhoto: data?.data?.userPhoto || null,
            aadhar_front_image: data?.data?.aadhar_front_image || null,
            aadhar_back_image: data?.data?.aadhar_back_image || null,
            pan_card_image: data?.data?.pan_card_image || null,
            blank_cheque_image: data?.data?.blank_cheque_image || null,
            education_qualification: data?.data?.education_qualification || null,
          });
        }
      } catch (error) {
         setLoadingPage(false);
        console.log(error);
      }
    };

    fetchDocumentInfo();
  }, [setFieldValue]);



  

  return (
 <>
    {
      loadingPage!==true ? ( 
      <div onSubmit={handleSubmit} className="p-6 flex flex-col md:flex-row gap-6">
        {/* Profile Photo Section */}
        <div className="w-full md:w-[25%] bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-zinc-700 font-semibold">Profile Photo</h2>
            {info?.is_user_photo_verified === 1 ? (
              <span className="px-2 bg-green-600 text-white rounded-md flex justify-center gap-1 items-center text-sm">
                <MdVerified /> <span>Verified</span>
              </span>
            ) : (
              <span className="px-2 bg-red-600 text-white rounded-md flex justify-center gap-1 items-center text-sm">
                <MdOutlineRemoveCircle /> <span>Not Verified</span>
              </span>
            )}
          </div>
      
          <div className="w-full flex justify-center items-center overflow-hidden rounded-lg border-dashed border-2 bg-zinc-100 h-72 my-2 relative border-zinc-300">
            {images.userPhoto ? (
              <div className="relative h-full w-full">
                <LazyImage
                  src={images.userPhoto}
                  alt="Profile Photo"
                  className="h-full w-full object-cover"
                />
                <Button
                  disabled={info?.is_user_photo_verified === 1}
                  shape="circle"
                  icon={<CloseCircleOutlined />}
                  className={`absolute top-2 right-2 bg-white ${info?.is_user_photo_verified === 1 ? "cursor-not-allowed text-gray-400 bg-gray-100" : "hover:bg-red-500 hover:text-white text-zinc-700"}`}
                  onClick={() => handleRemove("userPhoto")}
                />
              </div>
            ) : (
              <Upload
                showUploadList={false}
                beforeUpload={(file) => handlePreview(file, "userPhoto")}
              >
                <div className="flex flex-col items-center gap-2">
                  <FaCloudUploadAlt className="text-3xl text-zinc-500" />
                  <span className="text-sm text-zinc-700">Drag and Drop file here</span>
                  <span className="text-sm text-zinc-700">Or</span>
                  <button className="w-full h-7 border-1 border-zinc-400 text-zinc-700 rounded-md">
                    Browse Files
                  </button>
                </div>
              </Upload>
            )}
          </div>
          <div className="px-2">
            <div className="flex flex-col items-center py-3">
              <h1 className="text-zinc-700 font-semibold text-2xl">{info?.name}</h1>
              <span className="flex items-center gap-2 text-base text-zinc-600">
                (<span>ID:</span> <span className="font-semibold">{info?.uuid}</span>)
              </span>
            </div>
          </div>
        </div>
      
        {/* Upload Documents Section */}
        <div className="w-full md:w-[75%] bg-white rounded-lg shadow-sm p-4">
          <div className="border-b-1 border-b-zinc-100 pb-2 flex justify-between items-center">
            <h2 className="text-zinc-700 font-semibold text-xl">Upload Documents</h2>
          </div>
      
          <form className="p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-zinc-800" htmlFor="bank_name">Bank Name</label>
                <Input
                  name="bank_name"
                  value={values.bank_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  status={touched.bank_name && errors.bank_name ? "error" : ""}
                  size="large"
                  placeholder="Enter bank name"
                />
                {touched.bank_name && errors.bank_name && (
                  <span className="text-red-500 text-sm">{errors.bank_name}</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-zinc-800" htmlFor="ifsc_code">IFSC Code</label>
                <Input
                  name="ifsc_code"
                  value={values.ifsc_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  status={touched.ifsc_code && errors.ifsc_code ? "error" : ""}
                  size="large"
                  placeholder="Enter IFSC code"
                />
                {touched.ifsc_code && errors.ifsc_code && (
                  <span className="text-red-500 text-sm">{errors.ifsc_code}</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-zinc-800" htmlFor="account_number">Bank Account Number</label>
                <Input
                  name="account_number"
                  value={values.account_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="large"
                  status={touched.account_number && errors.account_number ? "error" : ""}
                  placeholder="Enter bank account number"
                />
                {touched.account_number && errors.account_number && (
                  <span className="text-red-500 text-sm">{errors.account_number}</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-zinc-800" htmlFor="bank_account_holder_name">Bank Account Holder Name</label>
                <Input
                  name="bank_account_holder_name"
                  value={values.bank_account_holder_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="large"
                  status={touched.bank_account_holder_name && errors.bank_account_holder_name ? "error" : ""}
                  placeholder="Enter account holder name"
                />
                {touched.bank_account_holder_name && errors.bank_account_holder_name && (
                  <span className="text-red-500 text-sm">{errors.bank_account_holder_name}</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-zinc-800" htmlFor="branch">Branch</label>
                <Input
                  name="branch"
                  value={values.branch}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="large"
                  status={touched.branch && errors.branch ? "error" : ""}
                  placeholder="Enter branch name"
                />
                {touched.branch && errors.branch && (
                  <span className="text-red-500 text-sm">{errors.branch}</span>
                )}
              </div>
              <div className="mt-6">
                <Button
                  disabled={status==="verified"? true : false}
                  loading={loading}
                  htmlType="submit"
                  className="w-full sm:w-[50%] h-10 bg-green-700 text-white rounded-lg"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
      
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            {renderUploadBox("Aadhar Front Image", "aadhar_front_image", "is_aadhar_front_verified")}
            {renderUploadBox("Aadhar Back Image", "aadhar_back_image", "is_aadhar_back_verified")}
            {renderUploadBox("Pan Card Image", "pan_card_image", "is_pan_card_verified")}
            {renderUploadBox("Cancel Cheque Photo", "blank_cheque_image", "is_blank_cheque_verified")}
            {renderUploadBox("Education Qualification", "education_qualification", "is_education_qualification_verified")}
          </div>
        </div>
      
        {/* Verification Modal */}
        <VerificationModal />
       </div>) : (<ProfileShimmerUi/>)
    }
 </>
  
  );
};

export default UploadDocuments;
