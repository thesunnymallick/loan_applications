import React, { useState } from "react";
import { Button, DatePicker, Input, notification, Select } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addLoan } from "../../api/partner/loanApi";
import dayjs from "dayjs";
import ErrorHandler from "../../utils/ErrorHandler";

const { Option } = Select;

// Yup Schema for Validation
const loanSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z\s]*$/, "First name can only contain letters"),
  middle_name: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, "Middle name can only contain letters")
    .nullable(),
  last_name: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z\s]*$/, "Last name can only contain letters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[6-9]\d{9}$/, "Invalid phone number"),
  pan: Yup.string()
    .required("PAN is required")
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  employment_type: Yup.string().required("Employment type is required"),
  company_name: Yup.string().required("Company name is required"),
  company_type: Yup.string().required("Company type is required"),
  loan_amount: Yup.number()
    .required("Loan amount is required")
    .min(1000, "Loan amount must be at least 1000"),
  tenure: Yup.string()
  .required("Tenure is required")
  .matches(
    /^\d+(st|nd|rd|th)?\sMonths$/,
    "Tenure must be in the format '12th Months', '24th Months', etc."
  ),
  dob: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
  monthly_income: Yup.number()
    .required("Monthly income is required")
    .min(1000, "Monthly income must be at least 1000"),
  residence_address: Yup.string().required("Residence address is required"),
  residence_pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^[1-9][0-9]{5}$/, "Invalid pincode"),
  mother_name: Yup.string()
    .required("Mother's name is required")
    .matches(/^[a-zA-Z\s]*$/, "Mother's name can only contain letters"),
  reference_name_1: Yup.string()
    .required("Reference name 1 is required")
    .matches(/^[a-zA-Z\s]*$/, "Reference name can only contain letters"),
  reference_phone_1: Yup.string()
    .required("Reference phone 1 is required")
    .matches(/^[6-9]\d{9}$/, "Invalid phone number"),
  reference_name_2: Yup.string()
    .required("Reference name 2 is required")
    .matches(/^[a-zA-Z\s]*$/, "Reference name can only contain letters"),
  reference_phone_2: Yup.string()
    .required("Reference phone 2 is required")
    .matches(/^[6-9]\d{9}$/, "Invalid phone number"),
  loan_mode: Yup.string().required("Loan mode is required"),
});

const LoanForm = ({ loanType }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loanHeading = {
    personalLoan: "Personal Loan",
    businessLoan: "Business Loan",
    homeLoan: "Home Loan",
    loanAgainstProperty: "Loan Against Property",
    carLoan: "Car Loan",
    oldCarLoan: "Old Car Loan",
  }[loanType];

  // Initial Values
  const initialValues = {
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    pan: "",
    employment_type: "",
    company_name: "",
    company_type: "",
    loan_amount: "",
    tenure: "",
    dob: "",
    monthly_income: "",
    residence_address: "",
    residence_pincode: "",
    mother_name: "",
    reference_name_1: "",
    reference_phone_1: "",
    reference_name_2: "",
    reference_phone_2: "",
    loan_mode: "",
  };

  const loanTypeMapping = {
    personalLoan: "personal_loan",
    businessLoan: "business_loan",
    homeLoan: "home_loan",
    loanAgainstProperty: "loan_against_property",
    carLoan: "car_loan",
    oldCarLoan: "old_car_loan",
  };

  const loanTypeFullName = loanTypeMapping[loanType];

  // Add Loan Apply
  const handleLoanApply = async (values) => {
    try {
      const payload = {
        ...values,
        dob: dayjs(values.dob).format("YYYY-MM-DD"),
        loan_type: loanTypeFullName,
      };
      setLoading(true);
      const { status } = await addLoan(payload);

      if (status === 200 || 201) {
        setLoading(false);
        navigate(`/our-panels/loan-panels`);
        notification.success({
          message: "Loan Application Successful",
          description: "Your loan application has been submitted successfully.",
          placement: "topRight", // Optional: You can customize placement
        });
        formik.resetForm();
      } else {
        setLoading(false);
        notification.error({
          message: "Loan Application Failed",
          description:
            "There was an issue with your loan application. Please try again.",
          placement: "topRight",
        });
      }
    } catch (error) {
      setLoading(false);
      ErrorHandler.handleError(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loanSchema,
    onSubmit: (values) => {
      handleLoanApply(values);
    },
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    formik;

  return (
<div className="p-4 sm:p-6">
  <div className=" gap-4 mt-3">
    <div className="flex gap-2">
      <Link to="/our-panels/loan-panels" className="text-zinc-800 text-xl">
        <FaArrowLeft />
      </Link>
      <h2 className="text-zinc-800 font-semibold text-lg sm:text-xl">
        {loanHeading}
      </h2>
    </div>
  </div>

  <form
    onSubmit={handleSubmit}
    className="p-4 sm:p-6 bg-white rounded-lg shadow-sm my-3"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Dynamically render each form field */}
      {Object.keys(initialValues).map((key) => (
        <div key={key} className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor={key}>
            {key.replace("_", " ").toUpperCase()}
          </label>
          {key === "dob" ? (
            <DatePicker
               size="large"
              id={key}
              name={key}
              onChange={(date, dateString) =>
                formik.setFieldValue(key, dateString)
              }
              onBlur={handleBlur}
              status={touched[key] && errors[key] ? "error" : ""}
              style={{ width: "100%" }}
            />
          ) : key.includes("type") ||
            key.includes("mode") ||
            key.includes("tenure") ? (
            <>
              {key.includes("loan_mode") && (
                <Select
                size="large"
                  id={key}
                  name={key}
                  onChange={(value) => formik.setFieldValue(key, value)}
                  onBlur={handleBlur}
                  value={values[key]}
                  status={touched[key] && errors[key] ? "error" : ""}
                  placeholder={`Select ${key}`}
                  style={{ width: "100%" }}
                >
                  <Select.Option value="new">New</Select.Option>
                  <Select.Option value="top up">Top Up</Select.Option>
                  <Select.Option value="bt">BT</Select.Option>
                  <Select.Option value="card to card">Card To Card</Select.Option>
                </Select>
              )}

              {key.includes("employment_type") && (
                <Select
                 size="large"
                  id={key}
                  name={key}
                  onChange={(value) => formik.setFieldValue(key, value)}
                  onBlur={handleBlur}
                  value={values[key]}
                  status={touched[key] && errors[key] ? "error" : ""}
                  placeholder={`Select ${key}`}
                  style={{ width: "100%" }}
                >
                  <Select.Option value="salaried">Salaried</Select.Option>
                  <Select.Option value="self_employed">
                    Self Employed
                  </Select.Option>
                </Select>
              )}

              {key.includes("company_type") && (
                <Select
                 size="large"
                  id={key}
                  name={key}
                  onChange={(value) => formik.setFieldValue(key, value)}
                  onBlur={handleBlur}
                  value={values[key]}
                  status={touched[key] && errors[key] ? "error" : ""}
                  placeholder={`Select ${key}`}
                  style={{ width: "100%" }}
                >
                  <Option value="Public Limited Company">
                    Public Limited Company
                  </Option>
                  <Option value="One Person Company">
                    One Person Company
                  </Option>
                  <Option value="Private Limited Company">
                    Private Limited Company
                  </Option>
                  <Option value="Joint-Venture Company">
                    Joint-Venture Company
                  </Option>
                  <Option value="Partnership Firm">Partnership Firm</Option>
                  <Option value="Sole Proprietorship">
                    Sole Proprietorship
                  </Option>
                  <Option value="Branch Office">Branch Office</Option>
                  <Option value="Non-Government Organization (NGO)">
                    Non-Government Organization (NGO)
                  </Option>
                </Select>
              )}

              {key.includes("tenure") && (
                <Select
                 size="large"
                  id={key}
                  name={key}
                  onChange={(value) => formik.setFieldValue(key, value)}
                  onBlur={handleBlur}
                  value={values[key]}
                  status={touched[key] && errors[key] ? "error" : ""}
                  placeholder={`Select ${key}`}
                  style={{ width: "100%" }}
                >
                  {Array.from({ length: 30 }, (_, index) => {
                    const months = (index + 1) * 12;
                    return (
                      <Option key={months} value={`${months} Months`}>
                        {`${months} Months`}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </>
          ) : (
            <Input
              size="large"
              id={key}
              name={key}
              type={key.includes("email") ? "email" : "text"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values[key]}
              status={touched[key] && errors[key] ? "error" : ""}
              placeholder={`Enter ${key}`}
            />
          )}
          {touched[key] && errors[key] && (
            <span className="text-red-500 text-sm">{errors[key]}</span>
          )}
        </div>
      ))}
    </div>

    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
      <Button className="bg-gray-300 w-full sm:w-auto h-10" onClick={() => formik.resetForm()}>
        Cancel
      </Button>
      <Button
        loading={loading}
        className="bg-green-700 text-white w-full sm:w-auto h-10"
        htmlType="submit"
      >
        Save
      </Button>
    </div>
  </form>
</div>

  );
};

export default LoanForm;
