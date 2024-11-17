import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Upload, Image, Button, Input, notification } from "antd";
import {  CloseCircleOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { getDocumentInfo, uploadPartnerDoc } from "../../api/partner/uploadDocApi";

const validationSchema = Yup.object().shape({
  bank_name: Yup.string()
    .required("Bank name is required")
    .min(2, "Bank name must be at least 2 characters long"),
  account_number: Yup.string()
    .required("Account number is required")
    .matches(/^\d+$/, "Account number should contain only numbers")
    .min(8, "Account number must be at least 8 digits")
    .max(18, "Account number can't exceed 18 digits"),
  account_holder_name: Yup.string()
    .required("Account holder name is required")
    .min(2, "Account holder name must be at least 2 characters long"),
  ifsc_code: Yup.string()
    .required("IFSC code is required")
    .matches(/^[A-Za-z]{4}\d{7}$/, "Invalid IFSC code format"),
  branch: Yup.string()
    .required("Branch name is required")
    .min(2, "Branch name must be at least 2 characters long"),
  userPhoto: Yup.mixed()
  // .required("Profile photo is required")
    .test("fileSize", "Image must be less than 1MB", value => {
      return !value || (value && value.size <= 1048576);
    }),
    aadhar_front_image: Yup.mixed()
    // .required("Aadhar front image is required")
    .test("fileSize", "Image must be less than 1MB", value => {
      return value && value.size <= 1048576;
    }),
  aadhar_back_image: Yup.mixed()
    // .required("Aadhar back image is required")
    .test("fileSize", "Image must be less than 1MB", value => {
      return value && value.size <= 1048576;
    }),
  pan_card_image: Yup.mixed()
    // .required("PAN card image is required")
    .test("fileSize", "Image must be less than 1MB", value => {
      return value && value.size <= 1048576;
    }),
  blank_cheque_image: Yup.mixed()
    // .required("Blank cheque image is required")
    .test("fileSize", "Image must be less than 1MB", value => {
      return value && value.size <= 1048576;
    }),
});

const UploadDocuments = () => {
  const [images, setImages] = useState({
    userPhoto:null,
    aadhar_front_image:null,
    aadhar_back_image:null,
    pan_card_image:null,
    blank_cheque_image:null,
  });

  const [info, setInfo]=useState(null);


   // Initial values for the form fields
   const initialValues = {
    bank_name:"",
    account_number:"",
    account_holder_name:"",
    ifsc_code:"",
    branch:"",
    userPhoto:null,
    aadhar_front_image:null,
    aadhar_back_image:null,
    pan_card_image:null,
    blank_cheque_image:null,
  };


  // upload partner document
  const handelUploadPartnerDocuments=async(payload)=>{
    try {
      const { status } = await uploadPartnerDoc(payload);
      
      if (status === 201) {
          notification.success({
              message: 'Success',
              description: 'Document uploaded successfully!',
          });
      }
  } catch (error) {
      notification.error({
          message: 'Error',
          description: 'Failed to upload the document. Please try again later.',
      });
  }
  }

   // Formik setup for handling form state and validation
   const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("bank_name", values.bank_name);
      formData.append("account_number", values.account_number);
      formData.append("account_holder_name", values.account_holder_name);
      formData.append("ifsc_code", values.ifsc_code);
      formData.append("branch", values.branch);

      // Append files if they exist
      if (values.userPhoto) formData.append("userPhoto", values.userPhoto);
      if (values.aadhar_front_image) formData.append("aadhar_front_image", values.aadhar_front_image);
      if (values.aadhar_back_image) formData.append("aadhar_back_image", values.aadhar_back_image);
      if (values.pan_card_image) formData.append("pan_card_image", values.pan_card_image);
      if (values.blank_cheque_image) formData.append("blank_cheque_image", values.blank_cheque_image);

      handelUploadPartnerDocuments(formData)
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
    handleSubmit } = formik;

  const handlePreview = (file, key) => {
    const reader = new FileReader();
    setFieldValue(key, file);
    reader.onload = e => {
      setImages(prev => ({ ...prev, [key]: e.target.result }));
    };
    reader.readAsDataURL(file);
    return false; 
  };

  const handleRemove = (key) => {
    setImages(prev => ({ ...prev, [key]: null }));
    setFieldValue(key, null);
  };

  
 
  const renderUploadBox = (label, key) => (
    <div className="px-2">
      <h2 className="text-zinc-700 font-semibold">{label}</h2>
      <div className={`w-full flex justify-center items-center overflow-hidden rounded-lg border-dashed border-2 ${errors[key] ? "border-red-600" : "border-zinc-300"} bg-zinc-100 h-64 my-2 relative`}>
        {images[key] ? (
          <div className="relative h-full w-full">
            <Image src={images[key]} alt={label} className="h-full w-full object-cover" />
            <Button
              shape="circle"
              icon={<CloseCircleOutlined />}
              className="absolute top-2 right-2 bg-white text-zinc-700 hover:bg-red-500 hover:text-white"
              onClick={() => handleRemove(key)}
            />
          </div>
        ) : (
          <Upload
            showUploadList={false}
            beforeUpload={file => handlePreview(file, key)}
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



  useEffect(()=>{
   const fetchDocumentInfo=async()=>{
      try {
        const {data, status}=await getDocumentInfo();
        if(status===200){
          console.log("Document Info", data);
          setInfo(data?.data);
        }
      } catch (error) {
        
      }
   }

   fetchDocumentInfo()
  },[])


  useEffect(() => {
    if (info) {
      setImages({
        userPhoto: info?.userPhoto || null,
        aadhar_front_image: info?.aadhar_front_image || null,
        aadhar_back_image: info?.aadhar_back_image || null,
        pan_card_image: info?.pan_card_image || null,
        blank_cheque_image: info?.blank_cheque_image || null,
      });

    }
  }, [info, setFieldValue]);


  console.log("Values",values);

  return (
    <form onSubmit={handleSubmit} className="p-6 flex gap-3">
      <div className="w-[25%] bg-white rounded-lg shadow-sm p-4 ">
        <h2 className="text-zinc-700 font-semibold">Upload Profile Photo</h2>
        <div className={`w-full flex justify-center
         items-center overflow-hidden rounded-lg border-dashed border-2
           bg-zinc-100 h-72 my-2 relative ${ errors.userPhoto? "border-red-600" :"border-zinc-300"}`}>
          {images.userPhoto? (
            <div className="relative h-full w-full">
              <Image 
              src={images.userPhoto} 
              alt="Profile Photo" 
              className="h-full w-full object-cover" />
              <Button
                shape="circle"
                icon={<CloseCircleOutlined />}
                className="absolute top-2 right-2 bg-white 
                text-zinc-700 hover:bg-red-500 hover:text-white"
                onClick={() => handleRemove('userPhoto')}
              />
            </div>
          ) : (
            <Upload
              showUploadList={false}
              beforeUpload={file => handlePreview(file, 'userPhoto')}
            >
              <div className="flex flex-col items-center gap-2">
                <FaCloudUploadAlt className="text-3xl text-zinc-500" />
                <span className="text-sm text-zinc-700">Drag and Drop file here</span>
                <span className="text-sm text-zinc-700">Or</span>
                <button className="w-full h-7 border-1
                border-zinc-400 text-zinc-700 rounded-md">
                  Browse Files
                </button>
              </div>
            </Upload>
            
          )}
        </div>
        <div className="flex justify-center">
        {touched.userPhoto && errors.userPhoto ? (
                <span className="text-red-500 text-sm">{errors.userPhoto}</span>
        ) : null}
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

      <div className="w-[75%] bg-white rounded-lg shadow-sm p-4">
        <div className="border-b-1 border-b-zinc-100 pb-2 flex justify-between items-center">
        <h2 className="text-zinc-700 font-semibold text-xl">Upload Documents</h2>
        <Button htmlType="submit" className="w-[18%] h-10 bg-green-700 text-white 
        rounded-lg">Submit</Button>
        </div>
        <div className="py-3 ">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Bank Name</label>
              <Input
              name="bank_name"
              value={values.bank_name}
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.bank_name && errors.bank_name ? "error" : ""}
              size="large" placeholder="Enter bank name" />
               {touched.bank_name && errors.bank_name ? (
                <span className="text-red-500 text-sm">{errors.bank_name}</span>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">IFSC Code</label>
              <Input
                name="ifsc_code"
                value={values.ifsc_code}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.bank_name && errors.bank_name ? "error" : ""}
               size="large" placeholder="Enter ifsc code" />
               {touched.ifsc_code && errors.ifsc_code ? (
                <span className="text-red-500 text-sm">{errors.ifsc_code}</span>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Bank Account Number</label>
              <Input
               name="account_number"
               value={values.account_number}
               onChange={handleChange}
               onBlur={handleBlur}
               size="large" 
               status={touched.bank_name && errors.bank_name ? "error" : ""}
               placeholder="Enter bank account number" />
                {touched.account_number && errors.account_number ? (
                <span className="text-red-500 text-sm">{errors.account_number}</span>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Bank Account Holder Name</label>
              <Input 
              name="account_holder_name"
              value={values.account_holder_name}
              onChange={handleChange}
              onBlur={handleBlur}
              size="large" 
              status={touched.account_holder_name && errors.account_holder_name ? "error" : ""}
              placeholder="Enter bank account name" />
               {touched.account_holder_name && errors.account_holder_name ? (
                <span className="text-red-500 text-sm">{errors.account_holder_name}</span>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Branch</label>
              <Input 
               name="branch"
               value={values.branch}
               onChange={handleChange}
               onBlur={handleBlur}
               size="large" 
               status={touched.branch && errors.branch ? "error" : ""}
               placeholder="Enter branch name" />
               {touched.branch && errors.branch ? (
                <span className="text-red-500 text-sm">{errors.branch}</span>
              ) : null}
            </div>
          </div>
         </div>
        <div className="grid grid-cols-2 gap-4 mt-5">
          {renderUploadBox("Aadhar Front Image", "aadhar_front_image")}
          {renderUploadBox("Aadhar Back Image", "aadhar_back_image")}
          {renderUploadBox("Pan Card Image", "pan_card_image")}
          {renderUploadBox("Cancel Cheque Photo", "blank_cheque_image")}
        </div>
      </div>
    </form>
  );
};

export default UploadDocuments;
