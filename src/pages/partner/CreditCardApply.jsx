import { Input, Select, DatePicker, notification, Button } from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { applyCreditCard } from "../../api/partner/creditcardApi";
import dayjs from "dayjs";
import ErrorHandler from "../../utils/ErrorHandler";

const { Option } = Select;

const validationSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .matches(/^[A-Za-z]+$/, "First name should contain only letters")
    .max(50, "First name cannot exceed 50 characters"),

  last_name: Yup.string()
    .required("Last name is required")
    .matches(/^[A-Za-z]+$/, "Last name should contain only letters")
    .max(50, "Last name cannot exceed 50 characters"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["Male", "Female", "Other"], "Invalid gender"),

  date_of_birth: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),

  qualification: Yup.string().required("Qualification is required"),

  permanent_pincode: Yup.string()
    .required("Permanent pincode is required")
    .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),

  current_pincode: Yup.string()
    .required("Current pincode is required")
    .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),

  company_name: Yup.string()
    .max(100, "Company name cannot exceed 100 characters"),

  designation: Yup.string().max(50, "Designation cannot exceed 50 characters"),

  income: Yup.number()
    .required("Income is required")
    .positive("Income must be a positive number"),

  have_credit_card: Yup.boolean().required(
    "Please specify if you have a credit card"
  ),

  pan: Yup.string()
    .required("PAN is required")
    .matches(
      /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
      "Invalid PAN format (e.g., ABCDE1234F)"
    ),

  employment_type: Yup.string()
    .required("Employment type is required")
    .oneOf(
      ["Salaried", "Self-employed", "Unemployed"],
      "Invalid employment type"
    ),

  profession: Yup.string().required("Profession is required"),

  office_pincode: Yup.string().matches(
    /^[0-9]{6}$/,
    "Office pincode must be exactly 6 digits"
  ),

  mother_name: Yup.string()
    .required("Mother's name is required")
    .matches(/^[A-Za-z\s]+$/, "Mother's name should contain only letters")
    .max(50, "Mother's name cannot exceed 50 characters"),
});

const CreditCardApply = () => {

  const navigate=useNavigate();
  const [loading, setLoading]=useState(false);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    income: "",
    qualification: "",
    permanent_pincode: "",
    current_pincode: "",
    company_name: "",
    designation: "",
    have_credit_card: "", // Default to an empty string
    pan: "",
    employment_type: "",
    profession: "",
    office_pincode: "",
    mother_name: "",
  };




  const handleApplyCreditCard = async (values) => {
    try {
      setLoading(true);
      const { status } = await applyCreditCard(values);
  
      if (status === 200 || status === 201) {
        setLoading(false);
        notification.success({
          message: 'Application Successful',
          description: 'Your credit card application was submitted successfully!',
        });

        formik.resetForm();
        navigate(`/our-panels/creditCard-panel`)
      }
    } catch (error) {
      setLoading(false);
      ErrorHandler.handleError(error);
    }
  };
  

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {

      const updateData={
        ...values,
        date_of_birth: dayjs(values.date_of_birth).format("YYYY-MM-DD")
      }
      handleApplyCreditCard(updateData)
    },
  });

  const {
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;

  return (
    <div className="p-6">
        <div className="flex items-center gap-2">
    <Link
      to={`/our-panels/creditCard-panel`}
      className="text-2xl text-zinc-800 cursor-pointer"
    >
      <FaArrowLeft />
    </Link>
    <span className="text-zinc-800 font-semibold text-lg md:text-2xl text-center">
      Create New Credit Card
    </span>
  </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* First Name */}
            <InputField
              label="First Name"
              name="first_name"
              value={values.first_name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.first_name}
              error={errors.first_name}
            />

            {/* Last Name */}
            <InputField
              label="Last Name"
              name="last_name"
              value={values.last_name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.last_name}
              error={errors.last_name}
            />

            {/* Email */}
            <InputField
              label="Email"
              name="email"
              value={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.email}
              error={errors.email}
            />

            {/* Phone */}
            <InputField
              label="Phone"
              name="phone"
              value={values.phone}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.phone}
              error={errors.phone}
            />

            {/* Gender */}
            <DropdownField
              label="Gender"
              name="gender"
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" },
              ]}
              value={values.gender}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              touched={touched.gender}
              error={errors.gender}
            />

            {/* Date of Birth */}
            <DatePickerField
              label="Date of Birth"
              name="date_of_birth"
              value={values.date_of_birth}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              touched={touched.date_of_birth}
              error={errors.date_of_birth}
            />


             {/* Qualification */}
             <InputField
              label="Qualification"
              name="qualification"
              value={values.qualification}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.qualification}
              error={errors.qualification}
            />

            {/* Permanent Pincode */}
            <InputField
              label="Permanent Pincode"
              name="permanent_pincode"
              value={values.permanent_pincode}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.permanent_pincode}
              error={errors.permanent_pincode}
            />

            {/* Current Pincode */}
            <InputField
              label="Current Pincode"
              name="current_pincode"
              value={values.current_pincode}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.current_pincode}
              error={errors.current_pincode}
            />

            {/* Company Name */}
            <InputField
              label="Company Name"
              name="company_name"
              value={values.company_name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.company_name}
              error={errors.company_name}
            />

            {/* Designation */}
            <InputField
              label="Designation"
              name="designation"
              value={values.designation}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.designation}
              error={errors.designation}
            />

            {/* PAN */}
            <InputField
              label="PAN"
              name="pan"
              value={values.pan}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.pan}
              error={errors.pan}
            />


       

            {/* Have Credit Card */}
            <DropdownField
              label="Have a Credit Card"
              name="have_credit_card"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              value={values.have_credit_card}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              touched={touched.have_credit_card}
              error={errors.have_credit_card}
            />

                 {/* Income */}
              <InputField
              label="Income"
              name="income"
              value={values.income}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.income}
              error={errors.income}
            />

            {/* Employment Type */}
            <DropdownField
              label="Employment Type"
              name="employment_type"
              options={[
                { label: "Salaried", value: "Salaried" },
                { label: "Self-employed", value: "Self-employed" },
                { label: "Unemployed", value: "Unemployed" },
              ]}
              value={values.employment_type}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              touched={touched.employment_type}
              error={errors.employment_type}
            />


               {/* Profession */}
               <InputField
              label="Profession"
              name="profession"
              value={values.profession}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.profession}
              error={errors.profession}
            />

                {/* Office Pincode */}
                <InputField
              label="Office Pincode"
              name="office_pincode"
              value={values.office_pincode}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.office_pincode}
              error={errors.office_pincode}
            />

            {/* Mother's Name */}
            <InputField
              label="Mother's Name"
              name="mother_name"
              value={values.mother_name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.mother_name}
              error={errors.mother_name}
            />


            {/* Add other fields similarly */}
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
        <Button
          loading={loading}
          htmlType="submit"
          className="bg-green-700 text-white px-6 py-2 rounded w-full sm:w-auto h-10"
        >
          Save
        </Button>
        <Button
          type="button"
          className="bg-zinc-400 text-white px-6 py-2 rounded w-full sm:w-auto h-10"
        >
          Cancel
        </Button>
      </div>
        </form>
      </div>
    </div>
  );
};

// Helper Components
const InputField = ({ label, name, value, handleChange, handleBlur, touched, error }) => (
  <div className="flex flex-col gap-2">
    <label>{label}</label>
    <Input
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      size="large"
      status={touched && error ? "error" : ""}
      placeholder={`Enter ${label}`}
    />
    {touched && error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

const DropdownField = ({ label, name, options, value, setFieldValue, handleBlur, touched, error }) => (
  <div className="flex flex-col gap-2">
    <label>{label}</label>
    <Select
      name={name}
      value={value}
      onChange={(val) => setFieldValue(name, val)}
      onBlur={handleBlur}
      size="large"
      placeholder={`Select ${label}`}
      status={touched && error ? "error" : ""}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
    {touched && error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

const DatePickerField = ({ label, name, value, setFieldValue, handleBlur, touched, error }) => (
  <div className="flex flex-col gap-2">
    <label>{label}</label>
    <DatePicker
      name={name}
      value={value}
      onChange={(date) => setFieldValue(name, date)}
      onBlur={handleBlur}
      size="large"
      status={touched && error ? "error" : ""}
    />
    {touched && error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

export default CreditCardApply;
