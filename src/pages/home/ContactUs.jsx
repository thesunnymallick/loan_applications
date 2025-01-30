import React, { useState } from "react";
import { Button, Input, Select, DatePicker, notification } from "antd";
import HomeNavbar from "../../layouts/HomeNavbar";
import Footer from "./Footer";
import contactUsImage from "../../assets/contact.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorHandler from "../../utils/ErrorHandler";
import dayjs from "dayjs";
import { contactDetails } from "../../api/partner/homeApi";
const { Option } = Select;

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  work_email: Yup.string()
    .email("Invalid email address")
    .required("Work email is required"),
  company_size: Yup.string().required("Company size is required"),
  industry: Yup.string().required("Industry is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  demo_date: Yup.date().required("Demo date is required"),
  notes: Yup.string().nullable(),
});

const ContactUs = () => {

  const [loading, setLoading]=useState(false);
  // Initial values for the form fields
  const initialValues = {
    first_name: "",
    last_name: "",
    work_email: "",
    company_size: "",
    industry: "",
    description: "",
    demo_date: "",
    notes: "",
  };



  const handleContactDetails = async (values) => {
    try {
        setLoading(true)
      const { status } = await contactDetails(values);
      if (status === 200 || status === 2001) {
        setLoading(false);
        notification.success({
          message: "Demo Scheduled",
          description: "Your request for a free demo has been submitted successfully!",
        });
        formik.resetForm();
      }
    } catch (error) {
      setLoading(false);
      ErrorHandler.handleError(error);
      notification.error({
        message: "Submission Failed",
        description: "We couldn't schedule your demo. Please try again later.",
      });
    }
  };
  

  // Formik setup for handling form state and validation
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload={
        ...values,
        demo_date: dayjs(values.demo_date).format("YYYY-MM-DD")
      }
      handleContactDetails(payload);
    },
  });

  // Destructure Formik's properties for easier use
  const { handleChange, values, errors, touched, handleBlur, setFieldValue, handleSubmit } =
    formik;

  return (
    <div>
      {/* Navbar */}
      <HomeNavbar textColor="text-white" />

      {/* Hero Section */}
      <div className="bg-gray-100">
        <div
          className="relative bg-cover bg-center h-64"
          style={{ backgroundImage: `url(${contactUsImage})` }}
        >
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <h1 className="text-white text-4xl font-bold">Contact Us</h1>
          </div>
        </div>

        {/* Heading and Paragraph Section */}
        <div className="max-w-4xl mx-auto py-12 px-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            Schedule a Free Demo
          </h2>
          <p className="text-gray-600 text-lg">
            How can HRLink make your HR headaches disappear? Schedule a free
            demo and get your questions answered.
          </p>
        </div>

        {/* Testimonial Section */}
        <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-md shadow-lg text-left mb-12">
          <p className="text-gray-800 italic mb-4">
            “Our favorite things about HRLink are the easy-to-use UI and its
            well-fit recruitment features. Their team is also always available
            to help whenever we are in need of support.”
          </p>
          <p className="text-gray-600 font-semibold">Jerome Bell</p>
          <p className="text-gray-500">HR Executive - PayUp</p>
        </div>

        {/* Premium Contact Form */}
        <div className="max-w-4xl mx-auto mb-4 py-12 px-6 bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Get in Touch
          </h2>
          <form 
           onSubmit={handleSubmit}
          className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="first_name">First Name</label>
                <Input
                  id="first_name"
                  size="large"
                  placeholder="First Name"
                  className="rounded-lg shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
                  name="first_name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  status={
                    touched.first_name && errors.first_name ? "error" : ""
                  }
                />
                {touched.first_name && errors.first_name && (
                  <span className="text-red-500 text-xs">
                    {errors.first_name}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="last_name">Last Name</label>
                <Input
                  id="last_name"
                  size="large"
                  placeholder="Last Name"
                  className="rounded-lg shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
                  name="last_name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  status={
                    touched.first_name && errors.first_name ? "error" : ""
                  }
                />

                {touched.last_name && errors.last_name && (
                  <span className="text-red-500 text-xs">
                    {errors.last_name}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email">Work Email</label>
              <Input
                id="email"
                size="large"
                placeholder="Work Email"
                className="rounded-lg shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
                name="work_email"
                value={values.work_email}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.work_email && errors.work_email ? "error" : ""}
              />
              {touched.work_email && errors.work_email && (
                <span className="text-red-500 text-xs">
                  {errors.work_email}
                </span>
              )}
            </div>

            {/* Select Inputs: Company Size and Industry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="company-size">Select Company Size</label>
                <Select
                  id="company-size"
                  size="large"
                  placeholder="Company Size"
                  className="w-full rounded-lg shadow-sm focus:border-green-500"
                  name="company_size"
                  value={values.company_size}
                  onChange={(value)=>setFieldValue("company_size", value)}
                  onBlur={handleBlur}
                  status={
                    touched.company_size && errors.company_size ? "error" : ""
                  }
                >
                  <Option value="small">Small (1-50 employees)</Option>
                  <Option value="medium">Medium (51-200 employees)</Option>
                  <Option value="large">Large (200+ employees)</Option>
                </Select>
                {touched.company_size && errors.company_size && (
                  <span className="text-red-500 text-xs">
                    {errors.company_size}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="industry"> Select Industry</label>
                <Select
                  id="industry"
                  size="large"
                  placeholder="Industry"
                  className="w-full rounded-lg shadow-sm focus:border-green-500"
                  name="industry"
                  value={values.industry}
                  onChange={(value)=>setFieldValue("industry", value)}
                  onBlur={handleBlur}
                  status={touched.industry && errors.industry ? "error" : ""}
                >
                  <Option value="tech">Technology</Option>
                  <Option value="finance">Finance</Option>
                  <Option value="healthcare">Healthcare</Option>
                </Select>

                {touched.industry && errors.industry && (
                  <span className="text-red-500 text-xs">
                    {errors.industry}
                  </span>
                )}
              </div>
            </div>

            {/* Primary Challenge */}

            <div className="flex flex-col gap-1">
              <label htmlFor="describe">Why need this software?</label>
              <Input.TextArea
                size="large"
                rows={4}
                placeholder="Describe the primary challenge you want to solve with this software"
                className="rounded-lg shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.description && errors.description ? "error" : ""}
              />
            </div>
            {touched.description && errors.description && (
                  <span className="text-red-500 text-xs">
                    {errors.description}
                  </span>
                )}

            {/* Rollout Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="describe">Expected Rollout Date</label>
                <DatePicker
                  size="large"
                  placeholder="Expected Rollout Date"
                  className="w-full rounded-lg shadow-sm focus:border-green-500"
                  name="demo_date"
                  value={values.demo_date}
                  onChange={(value)=>setFieldValue("demo_date", value)}
                  onBlur={handleBlur}
                  status={touched.demo_date && errors.demo_date ? "error" : ""}
                />
                {touched.demo_date && errors.demo_date && (
                  <span className="text-red-500 text-xs">
                    {errors.demo_date}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="describe">Other Notes (optional)</label>
                <Input
                  size="large"
                  placeholder="Other Notes (optional)"
                  className="rounded-lg shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
                  name="notes"
                  value={values.notes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  status={touched.notes && errors.notes ? "error" : ""}
                />

                 {touched.notes && errors.notes && (
                  <span className="text-red-500 text-xs">
                    {errors.notes}
                  </span>
                )}
                
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                loading={loading}
                htmlType="submit"
                type="primary"
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg h-10 text-lg"
              >
                Submit Request
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;
