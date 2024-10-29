import React, { useState } from "react";
import loginBg from "../../assets/loginBg.png";
import { Button, Checkbox, Input, notification, Select } from "antd";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextArea from "antd/es/input/TextArea";
import { partneIrnterestApply } from "../../api/partner/authApi";
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

   const [loading, setLoading]=useState(false);

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

      setLoading(true)
      const { status } = await partneIrnterestApply(values);

      if (status === 201) {
        setLoading(false);
        notification.success({
          message: "Information Submitted",
          description:
            "We have received your information. Our team will contact you on your registered phone number soon.",
        });
      }
    } catch (error) {
      setLoading(false)
      notification.error({
        message: "Submission Failed",
        description:
          "There was an issue with your submission. Please try again.",
      });
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
  } = formik;

  return (
    <div className="bg-zinc-100 p-6 flex justify-end items-center h-full relative">
      {/* Background image section */}
      <div className="w-[70%]">
        <img className="w-full object-cover rounded-md" src={loginBg} alt="" />
      </div>

      {/* Register form section */}
      <form
        onSubmit={handleSubmit}
        className="absolute top-[20%] left-[8%] w-[30%] flex items-center "
      >
        <div className="bg-white w-full p-6 rounded-lg shadow-sm">
          <div className="flex justify-center pb-6">
            <h1 className="text-2xl text-zinc-700">
              Apply now
              <span className="text-zinc-800 font-semibold ml-2">
                Company Name
              </span>
            </h1>
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-3 ">
            <div className="flex flex-col gap-1">
              <label htmlFor="service">Service</label>
              <Select
                size="large"
                placeholder="Selcet Service"
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

            {/* Login button */}
            <div className="mt-3">
              <Button
              loading={loading}
                htmlType="submit"
                className="bg-green-600
                text-white rounded-lg shadow-sm text-lg border-none w-full h-12"
              >
                Submit
              </Button>
            </div>

            {/* Login link */}
            <div className="mt-3 flex justify-center pb-3">
              <span className="text-sm text-zinc-500">
                all ready have register?
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
