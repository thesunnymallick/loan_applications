import React, { useState } from "react";
import { Input, DatePicker, notification, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { addClient } from "../../api/partner/taxationpanel";

// Validation Schema using Yup
const validationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  middle_name: Yup.string(),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  pan: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format")
    .required("PAN is required"),
  aadhar: Yup.string()
    .matches(/^\d{12}$/, "Aadhar number must be 12 digits")
    .required("Aadhar number is required"),
  residence_address: Yup.string().required("Residence Address is required"),
  residence_city: Yup.string().required("Residence City is required"),
  residence_pincode: Yup.string()
    .matches(/^\d{6}$/, "Pincode must be 6 digits")
    .required("Residence Pincode is required"),
  residence_state: Yup.string().required("Residence State is required"),
  office_address: Yup.string(),
  office_city: Yup.string(),
  office_pincode: Yup.string().matches(/^\d{6}$/, "Pincode must be 6 digits"),
  office_state: Yup.string(),
  dob: Yup.string().required("Date of Birth is required"),
});



const InputField = ({ id, label, placeholder, value, handleChange, handleBlur, error }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-zinc-600">{label}</label>
    <Input
      size="large"
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      className={error ? "border-red-500" : ""}
    />
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
);

const DatePickerField = ({ id, label, placeholder, setFieldValue, handleBlur, error }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-zinc-600">{label}</label>
    <DatePicker
      size="large"
      id={id}
      name={id}
      placeholder={placeholder}
      onChange={(date, dateString) => setFieldValue(id, dateString)}
      onBlur={handleBlur}
      className={error ? "border-red-500" : ""}
    />
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
);


const AddClient = () => {


  const navigate=useNavigate();
  const [loading, setLoading]=useState(false);
  // Initial Values
  const initialValues = {
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    pan: "",
    aadhar: "",
    residence_address: "",
    residence_city: "",
    residence_pincode: "",
    residence_state: "",
    office_address: "",
    office_city: "",
    office_pincode: "",
    office_state: "",
    dob: "",
  };



// Handle Add Client
const handleAddClient = async (values) => {
  try {

    setLoading(false);
    const { status } = await addClient(values);
    if (status === 200 || status === 201) {
      setLoading(true);
      // Notification Success
      notification.success({
        message: "Success",
        description: "Client has been added successfully!",
        placement: "topRight",
      });

      formik.resetForm();
      navigate(`/our-panels/taxation-panel`)

    }
  } catch (error) {
    setLoading(false);
    console.error(error);
    notification.error({
      message: "Error",
      description: "An error occurred while adding the client. Please try again later.",
      placement: "topRight",
    });
  }
};


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleAddClient(values)
    },
  });

  const { 
    handleChange, 
    handleBlur, 
    handleSubmit, 
    setFieldValue, 
    values, 
    errors, 
    touched 
   }=formik;

  return (
    <div className="p-6">
      <div className="flex items-center gap-2">
        <Link
          to={"/our-panels/taxation-panel"}
          className="text-zinc-700 font-semibold text-2xl"
        >
          <IoMdArrowRoundBack />
        </Link>
        <h1 className="text-zinc-700 font-semibold text-xl">Add Client</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4 mt-5">
        <div className="grid grid-cols-3 gap-3">
          {/* First Name */}
          <InputField
            id="first_name"
            label="First Name"
            placeholder="Enter First Name"
            value={values.first_name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.first_name && errors.first_name}
          />

          {/* Middle Name */}
          <InputField
            id="middle_name"
            label="Middle Name"
            placeholder="Enter Middle Name"
            value={values.middle_name}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />

          {/* Last Name */}
          <InputField
            id="last_name"
            label="Last Name"
            placeholder="Enter Last Name"
            value={values.last_name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.last_name && errors.last_name}
          />

          {/* Email */}
          <InputField
            id="email"
            label="Email"
            placeholder="Enter Email"
            value={values.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.email && errors.email}
          />

          {/* Phone */}
          <InputField
            id="phone"
            label="Phone"
            placeholder="Enter Phone Number"
            value={values.phone}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.phone && errors.phone}
          />

          {/* PAN */}
          <InputField
            id="pan"
            label="PAN"
            placeholder="Enter PAN"
            value={values.pan}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.pan && errors.pan}
          />

          {/* Aadhar */}
          <InputField
            id="aadhar"
            label="Aadhar"
            placeholder="Enter Aadhar Number"
            value={values.aadhar}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.aadhar && errors.aadhar}
          />

          {/* Residence Address */}
          <InputField
            id="residence_address"
            label="Residence Address"
            placeholder="Enter Residence Address"
            value={values.residence_address}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.residence_address && errors.residence_address}
          />

          {/* Residence City */}
          <InputField
            id="residence_city"
            label="Residence City"
            placeholder="Enter Residence City"
            value={values.residence_city}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.residence_city && errors.residence_city}
          />

          {/* Residence Pincode */}
          <InputField
            id="residence_pincode"
            label="Residence Pincode"
            placeholder="Enter Residence Pincode"
            value={values.residence_pincode}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.residence_pincode && errors.residence_pincode}
          />

          {/* Residence State */}
          <InputField
            id="residence_state"
            label="Residence State"
            placeholder="Enter Residence State"
            value={values.residence_state}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.residence_state && errors.residence_state}
          />

          {/* Office Address */}
          <InputField
            id="office_address"
            label="Office Address"
            placeholder="Enter Office Address"
            value={values.office_address}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />

          {/* Office City */}
          <InputField
            id="office_city"
            label="Office City"
            placeholder="Enter Office City"
            value={values.office_city}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />

          {/* Office Pincode */}
          <InputField
            id="office_pincode"
            label="Office Pincode"
            placeholder="Enter Office Pincode"
            value={values.office_pincode}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />

          {/* Office State */}
          <InputField
            id="office_state"
            label="Office State"
            placeholder="Enter Office State"
            value={values.office_state}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />

          {/* Date of Birth */}
          <DatePickerField
            id="dob"
            label="Date of Birth"
            placeholder="Select Date of Birth"
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            error={touched.dob && errors.dob}
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <Button 
          loading={loading}
          htmlType="submit" 
          className="px-6 py-2 bg-green-700 text-white rounded-md h-10">
            Save
          </Button>
          <button type="button" className="px-6 bg-zinc-200 text-black py-2 rounded-md">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClient;
