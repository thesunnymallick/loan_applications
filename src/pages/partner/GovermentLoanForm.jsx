import { Input, Select, Button, DatePicker, notification } from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as Yup from "yup";
import { applyGovermentLoan } from "../../api/partner/govermentLoanApi";
import dayjs from "dayjs";

const loanDurations = [
  "1-year",
  "2-year",
  "3-year",
  "4-year",
  "5-year",
  "6-year",
  "7-year",
  "8-year",
  "9-year",
  "10-year",
  "more-than-10-years",
];
const validationSchema = Yup.object({
  loan: Yup.string().required("Loan type is required."),
  loan_amount_requirement: Yup.number()
    .min(1, "Loan amount must be greater than zero.")
    .required("Loan amount is required."),
  type_of_applicant: Yup.string().required("Type of applicant is required."),
  type_of_activity: Yup.string().required("Type of activity is required."),
  applicant_name: Yup.string()
    .min(3, "Name must be at least 3 characters long.")
    .required("Applicant name is required."),
  applicant_email: Yup.string()
    .email("Invalid email address.")
    .required("Email is required."),
  applicant_dob: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future.")
    .required("Date of birth is required."),
  gender: Yup.string().required("Gender is required."),
  applicant_pan_number: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number format.")
    .required("PAN number is required."),
  father_name: Yup.string().required("Father's name is required."),
  mobile_number: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits.")
    .required("Mobile number is required."),
  alternate_number: Yup.string()
    .matches(/^\d{10}$/, "Alternate number must be 10 digits.")
    .required("Alternate number is required."),

  applicant_marital_status: Yup.string().required(
    "Marital status is required."
  ),

  if_married: Yup.string().test(
    "required-if-married",
    "Name of spouse is required when marital status is Married.",
    function (value) {
      const { applicant_marital_status } = this.parent; // Access sibling field
      // Validation fails if marital status is "Married" and if_married is empty
      if (applicant_marital_status === "Married" && !value) {
        return false;
      }
      return true; // Validation passes in all other cases
    }
  ),

  number_of_children: Yup.number()
    .min(0, "Number of children cannot be negative.")
    .required("Number of children is required."),
  purpose_of_loan: Yup.string().required("Purpose of loan is required."),

  brief_us: Yup.string()
    .required("Please briefly describe what the loan amount will be used for.")
    .min(10, "Please provide at least 10 characters."),

  type_of_loan: Yup.string().required("Type of loan is required."),
  monthly_salary: Yup.number()
    .min(1, "Monthly salary must be greater than zero.")
    .required("Monthly salary is required."),
  experience_in_current_business: Yup.number()
    .min(0, "Experience cannot be negative.")
    .required("Experience in current business is required."),
  duration_of_loan: Yup.string()
    .oneOf(loanDurations, "Please select a valid loan duration.")
    .required("Duration of loan is required."),
  type_of_residence_property: Yup.string().required(
    "Type of residence property is required."
  ),
  type_of_official_shop_property: Yup.string().required(
    "Type of official shop property is required."
  ),
  applicant_residence_pincode: Yup.string()
    .matches(/^\d{6}$/, "Pincode must be 6 digits.")
    .required("Pincode is required."),
  applicant_profession: Yup.string().required("Profession is required."),
  business_operating_since: Yup.date()
    .max(new Date(), "Date cannot be in the future.")
    .required("Business operating since date is required."),
  experience_in_current_business_line: Yup.number()
    .min(0, "Experience cannot be negative.")
    .required("Experience in current business line is required."),
  duration_at_current_address: Yup.number()
    .min(0, "Duration cannot be negative.")
    .required("Duration at current address is required."),
  does_applicant_file_itr: Yup.string()
    .oneOf(["Yes", "No"], "ITR filing status must be Yes or No.")
    .required("ITR filing status is required."),

  is_applicant_gst_registered: Yup.string()
    .oneOf(["Yes", "No"], "GST registration status must be Yes or No.")
    .required("GST registration status is required."),

  any_other_loan_running: Yup.string()
    .oneOf(["Yes", "No"], "Other loan running status must be Yes or No.")
    .required("Other loan running status is required."),

  other_running_loan_details: Yup.string().test(
    "required-if-loan-running",
    "Details of other running loans are required when any other loan is running.",
    function (value) {
      const { any_other_loan_running } = this.parent; // Access sibling field
      // Validation fails if "Yes" and value is empty
      if (any_other_loan_running === "Yes" && !value) {
        return false;
      }
      return true; // Validation passes in all other cases
    }
  ),

  specify_caste_of_client: Yup.string().required("Caste is required."),
  bank_name: Yup.string().required("Bank name is required."),
  account_number: Yup.string()
    .matches(/^\d{9,18}$/, "Account number must be 9 to 18 digits.")
    .required("Account number is required."),
  ifsc_code: Yup.string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format.")
    .required("IFSC code is required."),
  other_bank_details: Yup.string().required("Other bank details are required."),
});

const GovermentLoanForm = () => {
  const { loanType } = useParams();
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Initial values for the form fields
  const initialValues = {
    loan: "MSME",
    loan_amount_requirement: "",
    type_of_applicant: "",
    type_of_activity: "Trading",
    applicant_name: "John Doe",
    applicant_email: "johndoe@example.com",
    applicant_dob: "",
    gender: "Male",
    applicant_pan_number: "ABCDE1234F",
    father_name: "Richard Doe",
    mobile_number: "9876543210",
    alternate_number: "9123456789",
    applicant_marital_status: "Married",
    if_married: "",

    number_of_children: 2,
    purpose_of_loan: "To expand the trading business.",
    brief_us: "",
    type_of_loan: "Business Loan",
    monthly_salary: 45000,

    experience_in_current_business: 5,
    duration_of_loan: 36,
    type_of_residence_property: "Owned",
    type_of_official_shop_property: "Rented",
    applicant_residence_pincode: "560001",
    applicant_profession: "Trader",
    business_operating_since: "",
    experience_in_current_business_line: 8,
    duration_at_current_address: 6,
    does_applicant_file_itr: true,
    is_applicant_gst_registered: true,
    any_other_loan_running: true,
    other_running_loan_details:
      "Loan from XYZ Bank, remaining balance: 200,000",
    specify_caste_of_client: "General",
    bank_name: "State Bank of India",
    account_number: "123456789012",
    ifsc_code: "SBIN0001234",
    other_bank_details:
      "HDFC Bank, Account No: 987654321098, IFSC: HDFC0005678",
  };

  // Apply Goverment Loan
  const handleGovermentLoan = async (payload) => {
    try {
      setLoading(true);
      const { status } = await applyGovermentLoan(payload);
      if (status === 200 || status === 201) {
        setLoading(false);
        notification.success({
          message: "Loan Application Successful",
          description:
            "Your application for a government loan has been successfully submitted.",
          duration: 2, // Duration of the notification (in seconds)
        });
        navigate(`/our-panels/govermentLoan`);
        formik.resetForm();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      notification.error({
        message: "Loan Application Failed",
        description:
          "There was an error submitting your application. Please try again later.",
        duration: 2,
      });
    }
  };

  // Formik setup for handling form state and validation
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);

      const payload = {
        ...values,
        applicant_dob: dayjs(values.applicant_dob).format("YYYY-MM-DD"),
        business_operating_since: dayjs(values.business_operating_since).format(
          "YYYY-MM-DD"
        ),
      };

      if (loanType === "MUDRALoan") {
        setFieldValue("loan", "MUDRA");
      } else if (loanType === "MSMELoan") {
        setFieldValue("loan", "MSME");
      } else if (loanType === "PMEGPLoan") {
        setFieldValue("loan", "PMEGP");
      } else if (loanType === "ODCC") {
        setFieldValue("loan", "ODCC");
      }

      handleGovermentLoan(payload);
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
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center gap-2">
        <Link
          to="/our-panels/govermentLoan"
          className="text-zinc-800 font-semibold text-2xl"
        >
          <IoMdArrowRoundBack />
        </Link>
        <h1 className="text-zinc-700 font-semibold text-xl">
          Create New {loanType}
        </h1>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm p-6 mt-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Input Fields */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Loan Amount Requirement
            </label>
            <Input
              size="large"
              placeholder="Enter Loan Amount"
              name="loan_amount_requirement"
              value={values.loan_amount_requirement}
              onChange={handleChange}
              onBlur={handleBlur}
              status={
                touched.loan_amount_requirement &&
                errors.loan_amount_requirement
                  ? "error"
                  : ""
              }
            />
            {touched.loan_amount_requirement &&
            errors.loan_amount_requirement ? (
              <span className="text-red-500 text-sm">
                {errors.loan_amount_requirement}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Type of Applicant
            </label>
            <Select
              size="large"
              placeholder="Select Applicant Type"
              name="type_of_applicant"
              value={values.type_of_applicant}
              onChange={(value) => setFieldValue("type_of_applicant", value)}
              onBlur={handleBlur}
              status={
                touched.type_of_applicant && errors.type_of_applicant
                  ? "error"
                  : ""
              }
            >
              <Option value="Individual">Individual</Option>
              <Option value="Startup">Startup</Option>
              <Option value="Existing Business Owner">
                Existing Business Owner
              </Option>
              <Option value="Women Entrepreneur">Women Entrepreneur</Option>
            </Select>
            {touched.type_of_applicant && errors.type_of_applicant ? (
              <span className="text-red-500 text-sm">
                {errors.type_of_applicant}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Type of Activity
            </label>
            <Select
              size="large"
              placeholder="Select Type of Activity"
              className="w-full"
              name="type_of_activity"
              value={values.type_of_activity}
              onChange={(value) => setFieldValue("type_of_activity", value)}
              onBlur={handleBlur}
              status={
                touched.type_of_activity && errors.type_of_activity
                  ? "error"
                  : ""
              }
            >
              <Option value="Trader">Trader</Option>
              <Option value="Artisan (Handmade Worker)">
                Artisan (Handmade Worker)
              </Option>
              <Option value="Shopkeeper">Shopkeeper</Option>
              <Option value="Small Manufacturer">Small Manufacturer</Option>
              <Option value="Retailer">Retailer</Option>
              <Option value="Service Provider">Service Provider</Option>
              <Option value="Other">Other</Option>
            </Select>

            {touched.type_of_activity && errors.type_of_activity ? (
              <span className="text-red-500 text-sm">
                {errors.type_of_activity}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Applicant Name
            </label>
            <Input
              size="large"
              placeholder="Enter Full Name"
              name="applicant_name"
              value={values.applicant_name}
              onChange={handleChange}
              onBlur={handleBlur}
              status={
                touched.applicant_name && errors.applicant_name ? "error" : ""
              }
            />

            {touched.applicant_name && errors.applicant_name ? (
              <span className="text-red-500 text-sm">
                {errors.applicant_name}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Applicant Email
            </label>
            <Input
              size="large"
              placeholder="Enter Applicant Email"
              name="applicant_email"
              value={values.applicant_email}
              onChange={handleChange}
              onBlur={handleBlur}
              status={
                touched.applicant_email && errors.applicant_email ? "error" : ""
              }
            />

            {touched.applicant_email && errors.applicant_email ? (
              <span className="text-red-500 text-sm">
                {errors.applicant_email}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Applicant DOB (As on PAN Card)
            </label>
            <DatePicker
              size="large"
              name="applicant_dob"
              value={values.applicant_dob}
              onChange={(value) => setFieldValue("applicant_dob", value)}
              onBlur={handleBlur}
              status={
                touched.applicant_dob && errors.applicant_dob ? "error" : ""
              }
            />

            {touched.applicant_dob && errors.applicant_dob ? (
              <span className="text-red-500 text-sm">
                {errors.applicant_dob}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Gender
            </label>
            <Select
              name="applicant_dob"
              value={values.gender}
              onChange={(value) => setFieldValue("applicant_dob", value)}
              onBlur={handleBlur}
              status={touched.gender && errors.gender ? "error" : ""}
              size="large"
              placeholder="Select Gender"
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>

            {touched.gender && errors.gender ? (
              <span className="text-red-500 text-sm">{errors.gender}</span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Applicant PAN Number
            </label>
            <Input
              size="large"
              placeholder="Enter PAN Number"
              name="applicant_pan_number"
              value={values.applicant_pan_number}
              onChange={handleChange}
              onBlur={handleBlur}
              status={
                touched.applicant_pan_number && errors.applicant_pan_number
                  ? "error"
                  : ""
              }
            />
            {touched.applicant_pan_number && errors.applicant_pan_number ? (
              <span className="text-red-500 text-sm">
                {errors.applicant_pan_number}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Father Name
            </label>
            <Input
              size="large"
              placeholder="Enter Father Name"
              name="father_name"
              value={values.father_name}
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.father_name && errors.father_name ? "error" : ""}
            />
            {touched.father_name && errors.father_name ? (
              <span className="text-red-500 text-sm">{errors.father_name}</span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Mobile Number
            </label>
            <Input
              size="large"
              placeholder="Enter Mobile Number"
              name="mobile_number"
              value={values.mobile_number}
              onChange={handleChange}
              onBlur={handleBlur}
              status={
                touched.mobile_number && errors.mobile_number ? "error" : ""
              }
            />

            {touched.mobile_number && errors.mobile_number ? (
              <span className="text-red-500 text-sm">
                {errors.mobile_number}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Alternate Number
            </label>
            <Input
              name="alternate_number"
              value={values.alternate_number}
              onChange={handleChange}
              onBlur={handleBlur}
              status={
                touched.alternate_number && errors.alternate_number
                  ? "error"
                  : ""
              }
              size="large"
              placeholder="Enter Alternate Number"
            />
            {touched.alternate_number && errors.alternate_number ? (
              <span className="text-red-500 text-sm">
                {errors.alternate_number}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Applicant Marital Status
            </label>
            <Select
              name="applicant_marital_status"
              value={values.applicant_marital_status}
              onChange={(value) =>
                setFieldValue("applicant_marital_status", value)
              }
              onBlur={handleBlur}
              status={
                touched.applicant_marital_status &&
                errors.applicant_marital_status
                  ? "error"
                  : ""
              }
              size="large"
              placeholder="Select Marital Status"
            >
              <Option value="Single">Single</Option>
              <Option value="Married">Married</Option>
              <Option value="Divorced">Divorced</Option>
              <Option value="Widowed">Widowed</Option>
            </Select>
            {touched.applicant_marital_status &&
            errors.applicant_marital_status ? (
              <span className="text-red-500 text-sm">
                {errors.applicant_marital_status}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              If married, then name of spouse
            </label>
            <Input
              size="large"
              placeholder="Enter If married, then name of spouse"
              name="if_married"
              value={values.if_married}
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.if_married && errors.if_married ? "error" : ""}
            />
            {touched.if_married && errors.if_married ? (
              <span className="text-red-500 text-sm">{errors.if_married}</span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Number of Children (if any)
            </label>
            <Input
              size="large"
              placeholder="Enter Number of Children (if any)"
              name="number_of_children"
              value={values.number_of_children}
              onChange={handleChange}
              onBlur={handleBlur}
              status={
                touched.number_of_children && errors.number_of_children
                  ? "error"
                  : ""
              }
            />
            {touched.number_of_children && errors.number_of_children ? (
              <span className="text-red-500 text-sm">
                {errors.number_of_children}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Purpose of Loan
            </label>
            <Select
              size="large"
              placeholder="Select Purpose of Loan"
              className="w-full"
              name="purpose_of_loan"
              value={values.purpose_of_loan}
              onChange={(value) => setFieldValue("purpose_of_loan", value)}
              onBlur={handleBlur}
              status={
                touched.purpose_of_loan && errors.purpose_of_loan ? "error" : ""
              }
            >
              <Option value="supporting-existing-business">
                Supporting Existing Business
              </Option>
              <Option value="extension-existing-business">
                Extension of Existing Business
              </Option>
              <Option value="starting-new-business">
                Starting Fresh/New Business
              </Option>
            </Select>

            {touched.purpose_of_loan && errors.purpose_of_loan ? (
              <span className="text-red-500 text-sm">
                {errors.purpose_of_loan}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1 md:col-span-4">
            <label className="text-sm text-zinc-800 font-semibold">
              Brief us! What client will do by the loan amount
            </label>
            <Input.TextArea
              rows={2}
              placeholder="Describe the loan purpose"
              name="brief_us"
              value={values.brief_us}
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.brief_us && errors.brief_us ? "error" : ""}
            />
            {touched.brief_us && errors.brief_us ? (
              <span className="text-red-500 text-sm">{errors.brief_us}</span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Type of Loan
            </label>
            <Select
              size="large"
              placeholder="Select Type of Loan"
              name="type_of_loan"
              value={values.type_of_loan}
              onChange={(value) => setFieldValue("type_of_loan", value)}
              onBlur={handleBlur}
              status={
                touched.type_of_loan && errors.type_of_loan ? "error" : ""
              }
            >
              <Option value="term-loan">
                Term Loan (if to purchase assets, machinery, building
                renovation, or other similar items)
              </Option>
              <Option value="cc-limit">
                CC Limit (if to purchase stock, raw material, or require working
                capital for business)
              </Option>
              <Option value="both">Both (if require both)</Option>
            </Select>

            {touched.type_of_loan && errors.type_of_loan ? (
              <span className="text-red-500 text-sm">
                {errors.type_of_loan}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Monthly Salary
            </label>
            <Input
              size="large"
              placeholder="Enter Monthly Salary"
              name="monthly_salary"
              value={values.monthly_salary}
              onChange={handleChange}
              onBlur={handleBlur}
              status={
                touched.monthly_salary && errors.monthly_salary ? "error" : ""
              }
            />
            {touched.monthly_salary && errors.monthly_salary ? (
              <span className="text-red-500 text-sm">
                {errors.monthly_salary}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Experience in Current Business Line
            </label>
            <Input
              size="large"
              placeholder="Enter Years of Experience"
              name="experience_in_current_business"
              value={values.experience_in_current_business}
              onChange={handleChange}
              onBlur={handleBlur}
              status={
                touched.experience_in_current_business &&
                errors.experience_in_current_business
                  ? "error"
                  : ""
              }
            />
            {touched.experience_in_current_business &&
            errors.experience_in_current_business ? (
              <span className="text-red-500 text-sm">
                {errors.experience_in_current_business}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Duration of Loan
            </label>
            <Select
              size="large"
              placeholder="Select Loan Duration"
              className="w-full"
              name="duration_of_loan"
              value={values.duration_of_loan}
              onChange={(value) => setFieldValue("duration_of_loan", value)}
              onBlur={handleBlur}
              status={
                touched.duration_of_loan && errors.duration_of_loan
                  ? "error"
                  : ""
              }
            >
              {loanDurations.map((duration) => (
                <Option key={duration} value={duration}>
                  {duration.replace("-", " ")}
                </Option>
              ))}
            </Select>
            {touched.duration_of_loan && errors.duration_of_loan ? (
              <span className="text-red-500 text-sm">
                {errors.duration_of_loan}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Type of Residence Property
            </label>
            <Select
              name="type_of_residence_property"
              value={values.type_of_residence_property}
              onChange={(value) =>
                setFieldValue("type_of_residence_property", value)
              }
              onBlur={handleBlur}
              status={
                touched.type_of_residence_property &&
                errors.type_of_residence_property
                  ? "error"
                  : ""
              }
              size="large"
              placeholder="Select Residence Type"
            >
              <Option value="owned">Owned</Option>
              <Option value="family">Family</Option>
              <Option value="rented">Rented</Option>
            </Select>
            {touched.type_of_residence_property &&
            errors.type_of_residence_property ? (
              <span className="text-red-500 text-sm">
                {errors.type_of_residence_property}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Type of Official/Shop Property
            </label>
            <Select
              size="large"
              placeholder="Select Official/Shop Type"
              name="type_of_official_shop_property"
              value={values.type_of_official_shop_property}
              onChange={(value) =>
                setFieldValue("type_of_official_shop_property", value)
              }
              onBlur={handleBlur}
              status={
                touched.type_of_official_shop_property &&
                errors.type_of_official_shop_property
                  ? "error"
                  : ""
              }
            >
              <Option value="owned">Owned</Option>
              <Option value="family">Family</Option>
              <Option value="rented">Rented</Option>
            </Select>
            {touched.type_of_official_shop_property &&
            errors.type_of_official_shop_property ? (
              <span className="text-red-500 text-sm">
                {errors.type_of_official_shop_property}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Applicant Resident Pincode
            </label>
            <Input
              name="applicant_residence_pincode"
              value={values.applicant_residence_pincode}
              onChange={handleChange}
              onBlur={handleBlur}
              status={
                touched.applicant_residence_pincode &&
                errors.applicant_residence_pincode
                  ? "error"
                  : ""
              }
              size="large"
              placeholder="Enter Resident Pincode"
            />
            {touched.applicant_residence_pincode &&
            errors.applicant_residence_pincode ? (
              <span className="text-red-500 text-sm">
                {errors.applicant_residence_pincode}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Applicant Profession
            </label>
            <Select
              size="large"
              placeholder="Select Applicant Profession"
              className="w-full"
              name="applicant_profession"
              value={values.applicant_profession}
              onChange={(value) => setFieldValue("applicant_profession", value)}
              onBlur={handleBlur}
              status={
                touched.applicant_profession && errors.applicant_profession
                  ? "error"
                  : ""
              }
            >
              <Option value="salaried">Salaried</Option>
              <Option value="self-employed">Self Employed</Option>
            </Select>
            {touched.applicant_profession && errors.applicant_profession ? (
              <span className="text-red-500 text-sm">
                {errors.applicant_profession}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Business Operating Since
            </label>
            <DatePicker
              size="large"
              placeholder="Enter Business Operating Since"
              name="business_operating_since"
              value={values.business_operating_since}
              onChange={(value) =>
                setFieldValue("business_operating_since", value)
              }
              onBlur={handleBlur}
              status={
                touched.business_operating_since &&
                errors.business_operating_since
                  ? "error"
                  : ""
              }
            />
            {touched.business_operating_since &&
            errors.business_operating_since ? (
              <span className="text-red-500 text-sm">
                {errors.business_operating_since}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Experience in Current Business Line{" "}
            </label>
            <Input
              size="large"
              placeholder="Enter Experience in Current Business Line"
              name="experience_in_current_business_line"
              value={values.experience_in_current_business_line}
              onChange={handleChange}
              onBlur={handleBlur}
              status={
                touched.experience_in_current_business_line &&
                errors.experience_in_current_business_line
                  ? "error"
                  : ""
              }
            />
            {touched.experience_in_current_business_line &&
            errors.experience_in_current_business_line ? (
              <span className="text-red-500 text-sm">
                {errors.experience_in_current_business_line}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Duration at Current Address
            </label>
            <Input
              size="large"
              placeholder="Enter Duration at Current Address"
              name="duration_at_current_address"
              value={values.duration_at_current_address}
              onChange={handleChange}
              onBlur={handleBlur}
              status={
                touched.duration_at_current_address &&
                errors.duration_at_current_address
                  ? "error"
                  : ""
              }
            />
            {touched.duration_at_current_address &&
            errors.duration_at_current_address ? (
              <span className="text-red-500 text-sm">
                {errors.duration_at_current_address}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Does Applicant File ITR?
            </label>
            <Select
              name="does_applicant_file_itr"
              value={values.does_applicant_file_itr}
              onChange={(value) =>
                setFieldValue("does_applicant_file_itr", value)
              }
              onBlur={handleBlur}
              status={
                touched.does_applicant_file_itr &&
                errors.does_applicant_file_itr
                  ? "error"
                  : ""
              }
              size="large"
              placeholder="Select Option"
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>

            {touched.does_applicant_file_itr &&
            errors.does_applicant_file_itr ? (
              <span className="text-red-500 text-sm">
                {errors.does_applicant_file_itr}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Is Applicant GST Registered?
            </label>
            <Select
              size="large"
              placeholder="Select Option"
              name="is_applicant_gst_registered"
              value={values.is_applicant_gst_registered}
              onChange={(value) =>
                setFieldValue("is_applicant_gst_registered", value)
              }
              onBlur={handleBlur}
              status={
                touched.is_applicant_gst_registered &&
                errors.is_applicant_gst_registered
                  ? "error"
                  : ""
              }
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>

            {touched.is_applicant_gst_registered &&
            errors.is_applicant_gst_registered ? (
              <span className="text-red-500 text-sm">
                {errors.is_applicant_gst_registered}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Any other Loan is running of Applicant?
            </label>
            <Select
              size="large"
              placeholder="Select Option"
              name="any_other_loan_running"
              value={values.any_other_loan_running}
              onChange={(value) =>
                setFieldValue("any_other_loan_running", value)
              }
              onBlur={handleBlur}
              status={
                touched.any_other_loan_running && errors.any_other_loan_running
                  ? "error"
                  : ""
              }
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>

            {touched.any_other_loan_running && errors.any_other_loan_running ? (
              <span className="text-red-500 text-sm">
                {errors.any_other_loan_running}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1 md:col-span-4">
            <label className="text-sm text-zinc-800 font-semibold">
              If any other loan is running, provide details
            </label>
            <Input.TextArea
              rows={2}
              placeholder="Enter loan details if applicable"
              name="other_running_loan_details"
              value={values.other_running_loan_details}
              onChange={handleChange}
              onBlur={handleBlur}
              status={
                touched.other_running_loan_details &&
                errors.other_running_loan_details
                  ? "error"
                  : ""
              }
            />
            {touched.other_running_loan_details &&
            errors.other_running_loan_details ? (
              <span className="text-red-500 text-sm">
                {errors.other_running_loan_details}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Specify Caste of Client
            </label>
            <Select
              size="large"
              placeholder="Select Caste"
              name="specify_caste_of_client"
              value={values.specify_caste_of_client}
              onChange={(value) =>
                setFieldValue("specify_caste_of_client", value)
              }
              onBlur={handleBlur}
              status={
                touched.specify_caste_of_client &&
                errors.specify_caste_of_client
                  ? "error"
                  : ""
              }
            >
              <Option value="general">General</Option>
              <Option value="sc-st">SC/ST</Option>
              <Option value="minority">Minority</Option>
              <Option value="obc">OBC</Option>
            </Select>
            {touched.specify_caste_of_client &&
            errors.specify_caste_of_client ? (
              <span className="text-red-500 text-sm">
                {errors.specify_caste_of_client}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Bank Name
            </label>
            <Input
              size="large"
              placeholder="Enter Bank Name"
              name="bank_name"
              value={values.bank_name}
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.bank_name && errors.bank_name ? "error" : ""}
            />
            {touched.bank_name && errors.bank_name ? (
              <span className="text-red-500 text-sm">{errors.bank_name}</span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Account Number
            </label>
            <Input
              size="large"
              placeholder="Enter Account Number"
              name="account_number"
              value={values.account_number}
              onChange={handleChange}
              onBlur={handleBlur}
              status={
                touched.account_number && errors.account_number ? "error" : ""
              }
            />
            {touched.account_number && errors.account_number ? (
              <span className="text-red-500 text-sm">
                {errors.account_number}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              IFSC Code
            </label>
            <Input
              size="large"
              placeholder="Enter IFSC Code"
              name="ifsc_code"
              value={values.ifsc_code}
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.ifsc_code && errors.ifsc_code ? "error" : ""}
            />
            {touched.ifsc_code && errors.ifsc_code ? (
              <span className="text-red-500 text-sm">{errors.ifsc_code}</span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-1 md:col-span-4 mt-2">
          <label className="text-sm text-zinc-800 font-semibold">
            Other Bank(IF Any):- Name, Account Number, IFSC Code
          </label>
          <Input.TextArea
            rows={2}
            placeholder="if have other bank, provide all details"
            name="other_bank_details"
            value={values.other_bank_details}
            onChange={handleChange}
            onBlur={handleBlur}
            status={
              touched.other_bank_details && errors.other_bank_details
                ? "error"
                : ""
            }
          />
          {touched.other_bank_details && errors.other_bank_details ? (
            <span className="text-red-500 text-sm">
              {errors.other_bank_details}
            </span>
          ) : null}
        </div>

        <div className="mt-8 bg-gray-100 p-4 rounded border border-gray-300">
          <p className="text-sm text-gray-600">
            <strong>Disclaimer:</strong> (Read it carefully before submitting
            this form)
          </p>
          <p className="text-sm text-gray-600 mt-2">
            We at <strong>Incomekaro</strong> only prepare the documents which
            are required for the purpose of filing. We don't commit to loan
            approval. Bank has the sole discretion for disbursal of the loan
            amount.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            We at <strong>Incomekaro</strong> are bound by the rules and
            regulations issued by the Government of India. Loan approval is
            based on the financials, credibility, and many other parameters of
            the applicant.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Submitting this form means you have read the above Disclaimer and
            agreed.
          </p>
        </div>

        {/* Submit Section */}
        <div className="flex justify-end gap-4 mt-6 flex-wrap">
          <Button
            size="large"
            className="rounded-lg w-full sm:w-[10%] h-10"
            danger
          >
            Cancel
          </Button>
          <Button
            loading={loading}
            htmlType="submit"
            size="large"
            className="bg-green-700 text-white rounded-lg w-full sm:w-[10%] h-10"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GovermentLoanForm;
