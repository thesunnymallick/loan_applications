import React, { useState } from "react";
import loginBg from "../../assets/loginBg.png";
import { Button, Checkbox, Input, notification, Select } from "antd";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextArea from "antd/es/input/TextArea";
import { partneIrnterestApply } from "../../api/partner/authApi";
import logo1 from "../../assets/logo/logo1.png";
import ErrorHandler from "../../utils/ErrorHandler";
// Define the validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't be more than 15 digits")
    .required("Phone number is required"),
  service: Yup.string().required("Please select a service"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

const Register = () => {
  const [loading, setLoading] = useState(false);

  // Initial values for the form fields
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  };
  // handel partner fisrt register or irnterest show

  const partnerRegister = async (values) => {
    try {
      setLoading(true);
      const { status } = await partneIrnterestApply(values);

      if (status === 201) {
        setLoading(false);
        notification.success({
          message: "Information Submitted",
          description:
            "We have received your information. Our team will contact you on your registered phone number soon.",
        });
        resetForm();
      }
    } catch (error) {
      setLoading(false);
      ErrorHandler.handleError(error);
    }
  };

  // Formik setup for handling form state and validation
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      partnerRegister(values);
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
    resetForm,
  } = formik;

  return (
    <div
      className="bg-gradient-to-r from-green-700
  via-green-700 to-green-200 p-2 md:p-6 flex items-center justify-center min-h-screen relative"
    >
      {/* Background image and overlay */}
      <div className="hidden lg:block w-[50%] relative">
        <img
          src={loginBg}
          alt="Login Background"
          className="w-full h-full object-cover rounded-xl shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50 rounded-xl"></div>
      </div>

      {/* Register form */}
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-[30%] bg-white p-8 rounded-lg shadow-2xl flex flex-col justify-center ml-0 md:ml-4"
      >
        <div className="">
          <div className="pb-5">
            <img className="w-60 mx-auto" src={logo1} alt="Logo" />
          </div>

          <div className="flex flex-col items-center gap-2 justify-center pb-6">
            <h1 className="text-3xl font-bold text-black">Ready to Join Us?</h1>
            <span className="block text-black text-sm font-medium mt-1">
              Apply now to{" "}
              <span className="text-green-600 font-semibold">Incomekaro</span> and
              get started today!
            </span>
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="service">Service</label>
              <Select
                size="large"
                placeholder="Select Service"
                name="service"
                onChange={(value) => setFieldValue("service", value)}
                onBlur={handleBlur}
                status={touched.service && errors.service ? "error" : ""}
              >
                <Select.Option value="DSA">DSA</Select.Option>
                <Select.Option value="IT">IT</Select.Option>
              </Select>
              {touched.service && errors.service ? (
                <span className="text-red-500 text-sm">{errors.service}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Input
                size="large"
                className="w-full"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.name && errors.name ? "error" : ""}
                placeholder="Enter your name"
              />
              {touched.name && errors.name ? (
                <span className="text-red-500 text-sm">{errors.name}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Input
                size="large"
                className="w-full"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.email && errors.email ? "error" : ""}
                placeholder="Enter your email"
              />
              {touched.email && errors.email ? (
                <span className="text-red-500 text-sm">{errors.email}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phone">Phone No</label>
              <Input
                size="large"
                className="w-full"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.phone && errors.phone ? "error" : ""}
                placeholder="Enter your phone no"
              />
              {touched.phone && errors.phone ? (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message">Message</label>
              <TextArea
                rows={4}
                placeholder="Enter Message"
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.message && errors.message ? "error" : ""}
              />
              {touched.message && errors.message ? (
                <span className="text-red-500 text-sm">{errors.message}</span>
              ) : null}
            </div>

            <div className="mt-0">
              <Checkbox>I agree to the terms and conditions</Checkbox>
            </div>

            {/* Submit button */}
            <div className="mt-3">
              <Button
                loading={loading}
                htmlType="submit"
                className="bg-green-600 text-white rounded-lg shadow-sm text-lg border-none w-full h-12"
              >
                Submit
              </Button>
            </div>

            {/* Login link */}
            <div className="mt-3 flex justify-center pb-3">
              <span className="text-sm text-zinc-500">
                Already have an account?
                <Link to="/partner/login" className="text-green-600 ml-1">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
