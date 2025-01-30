import React, { useState } from "react";
import { Button, Input, notification, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { applyInsurance } from "../../api/partner/InsuranceApi";
import ErrorHandler from "../../utils/ErrorHandler";
const { Option } = Select;

const validationSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),
  middle_name: Yup.string().max(50, "Middle name cannot exceed 50 characters"),
  last_name: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone_number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  pan_number: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number format")
    .required("PAN number is required"),
  aadhar_number: Yup.string()
    .matches(/^\d{12}$/, "Aadhar number must be exactly 12 digits")
    .required("Aadhar number is required"),
  residence_address: Yup.string()
    .required("Residence address is required")
    .max(100, "Address cannot exceed 100 characters"),
  residence_city: Yup.string()
    .required("City is required")
    .max(50, "City cannot exceed 50 characters"),
  residence_pincode: Yup.string()
    .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
    .required("Pincode is required"),
  residence_state: Yup.string()
    .required("State is required")
    .max(50, "State cannot exceed 50 characters"),
  insurance_type: Yup.string()
    .required("Insurance type is required")
    .oneOf(["Bike", "Car", "Others"], "Invalid insurance type"),
  bike_or_car_number: Yup.string()
    .matches(/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/, "Invalid vehicle number format")
    .required("Vehicle number is required"),
});

const InsuranceApply = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleApplyInsurance = async (values) => {
    try {
      setLoading(true);
      const { status } = await applyInsurance(values);

      if (status === 200 || status === 201) {
        setLoading(false);
        notification.success({
          message: "Application Successful",
          description: `Your ${values?.insurance_type} insurance application was submitted successfully!`,
        });

        formik.resetForm();
        navigate(`/our-panels/insurancePanel`);
      }
    } catch (error) {
      setLoading(false);
      ErrorHandler.handleError(error);
    }
  };

  const initialValues = {
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    pan_number: "",
    aadhar_number: "",
    residence_address: "",
    residence_city: "",
    residence_pincode: "",
    residence_state: "",
    insurance_type: "",
    bike_or_car_number: "",
  };

  // Formik setup for handling form state and validation
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleApplyInsurance(values);
    },
  });

  // Destructure Formik's properties for easier use
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
          to={`/our-panels/insurancePanel`}
          className="text-2xl text-zinc-800 cursor-pointer"
        >
          <FaArrowLeft />
        </Link>
        <span className="text-zinc-800 font-semibold text-2xl">
          Create New Insurance
        </span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* First Name */}
            <div className="flex flex-col gap-2">
              <label>First Name</label>
              <Input
                size="large"
                placeholder="Enter First Name"
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.first_name && errors.first_name ? "error" : ""}
              />

              {touched.first_name && errors.first_name ? (
                <span className="text-red-500 text-sm">
                  {errors.first_name}
                </span>
              ) : null}
            </div>

            {/* Middle Name */}
            <div className="flex flex-col gap-2">
              <label>Middle Name</label>
              <Input
                size="large"
                placeholder="Enter Middle Name"
                name="middle_name"
                value={values.middle_name}
                onChange={handleChange}
                onBlur={handleBlur}
                status={
                  touched.middle_name && errors.middle_name ? "error" : ""
                }
              />

              {touched.middle_name && errors.middle_name ? (
                <span className="text-red-500 text-sm">
                  {errors.middle_name}
                </span>
              ) : null}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2">
              <label>Last Name</label>
              <Input
                size="large"
                placeholder="Enter Last Name"
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.last_name && errors.last_name ? "error" : ""}
              />

              {touched.last_name && errors.last_name ? (
                <span className="text-red-500 text-sm">{errors.last_name}</span>
              ) : null}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <Input
                size="large"
                placeholder="Enter Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.email && errors.email ? "error" : ""}
              />

              {touched.email && errors.email ? (
                <span className="text-red-500 text-sm">{errors.email}</span>
              ) : null}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label>Phone Number</label>
              <Input
                size="large"
                placeholder="Enter Phone Number"
                type="tel"
                name="phone_number"
                value={values.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                status={
                  touched.phone_number && errors.phone_number ? "error" : ""
                }
              />
              {touched.phone_number && errors.phone_number ? (
                <span className="text-red-500 text-sm">
                  {errors.phone_number}
                </span>
              ) : null}
            </div>

            {/* PAN Number */}
            <div className="flex flex-col gap-2">
              <label>PAN Number</label>
              <Input
                size="large"
                placeholder="Enter PAN Number"
                name="pan_number"
                value={values.pan_number}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.pan_number && errors.pan_number ? "error" : ""}
              />
              {touched.pan_number && errors.pan_number ? (
                <span className="text-red-500 text-sm">
                  {errors.pan_number}
                </span>
              ) : null}
            </div>

            {/* Aadhar Number */}
            <div className="flex flex-col gap-2">
              <label>Aadhar Number</label>
              <Input
                size="large"
                placeholder="Enter Aadhar Number"
                name="aadhar_number"
                value={values.aadhar_number}
                onChange={handleChange}
                onBlur={handleBlur}
                status={
                  touched.aadhar_number && errors.aadhar_number ? "error" : ""
                }
              />

              {touched.aadhar_number && errors.aadhar_number ? (
                <span className="text-red-500 text-sm">
                  {errors.aadhar_number}
                </span>
              ) : null}
            </div>

            {/* Residence Address */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label>Residence Address</label>
              <Input
                size="large"
                placeholder="Enter Residence Address"
                name="residence_address"
                value={values.residence_address}
                onChange={handleChange}
                onBlur={handleBlur}
                status={
                  touched.residence_address && errors.residence_address
                    ? "error"
                    : ""
                }
              />
              {touched.residence_address && errors.residence_address ? (
                <span className="text-red-500 text-sm">
                  {errors.residence_address}
                </span>
              ) : null}
            </div>

            {/* Residence City */}
            <div className="flex flex-col gap-2">
              <label>Residence City</label>
              <Input
                size="large"
                placeholder="Enter Residence City"
                name="residence_city"
                value={values.residence_city}
                onChange={handleChange}
                onBlur={handleBlur}
                status={
                  touched.residence_city && errors.residence_city ? "error" : ""
                }
              />

              {touched.residence_city && errors.residence_city ? (
                <span className="text-red-500 text-sm">
                  {errors.residence_city}
                </span>
              ) : null}
            </div>

            {/* Residence Pincode */}
            <div className="flex flex-col gap-2">
              <label>Residence Pincode</label>
              <Input
                size="large"
                placeholder="Enter Residence Pincode"
                name="residence_pincode"
                value={values.residence_pincode}
                onChange={handleChange}
                onBlur={handleBlur}
                status={
                  touched.residence_pincode && errors.residence_pincode
                    ? "error"
                    : ""
                }
              />

              {touched.residence_pincode && errors.residence_pincode ? (
                <span className="text-red-500 text-sm">
                  {errors.residence_pincode}
                </span>
              ) : null}
            </div>

            {/* Residence State */}
            <div className="flex flex-col gap-2">
              <label>Residence State</label>
              <Input
                size="large"
                placeholder="Enter Residence State"
                name="residence_state"
                value={values.residence_state}
                onChange={handleChange}
                onBlur={handleBlur}
                status={
                  touched.residence_state && errors.residence_state
                    ? "error"
                    : ""
                }
              />

              {touched.residence_state && errors.residence_state ? (
                <span className="text-red-500 text-sm">
                  {errors.residence_state}
                </span>
              ) : null}
            </div>

            {/* Insurance Type */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label>Insurance Type</label>
              <Select
                size="large"
                placeholder="Select Insurance Type"
                name="insurance_type"
                value={values.insurance_type}
                onChange={(value) => setFieldValue("insurance_type", value)}
                onBlur={handleBlur}
                status={
                  touched.insurance_type && errors.insurance_type ? "error" : ""
                }
              >
                <Option value="Bike">Bike Insurance</Option>
                <Option value="Car">Car Insurance</Option>
                <Option value="Others">Others</Option>
              </Select>

              {touched.insurance_type && errors.insurance_type ? (
                <span className="text-red-500 text-sm">
                  {errors.insurance_type}
                </span>
              ) : null}
            </div>

            {/* Vehicle Number */}
            <div className="flex flex-col gap-2">
              <label>Bike/Car Number</label>
              <Input
                size="large"
                placeholder="Enter Bike/Car Number"
                name="bike_or_car_number"
                value={values.bike_or_car_number}
                onChange={handleChange}
                onBlur={handleBlur}
                status={
                  touched.bike_or_car_number && errors.bike_or_car_number
                    ? "error"
                    : ""
                }
              />
              {touched.bike_or_car_number && errors.bike_or_car_number ? (
                <span className="text-red-500 text-sm">
                  {errors.bike_or_car_number}
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6 flex-wrap">
            <Button
              htmlType="submit"
              loading={loading}
              className="bg-green-700 text-white px-6 py-2 rounded h-10 w-full sm:w-[10%]"
            >
              Save
            </Button>
            <Button
              type="button"
              className="bg-zinc-400 text-white px-6 py-2 rounded w-full sm:w-[10%] h-10"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InsuranceApply;
