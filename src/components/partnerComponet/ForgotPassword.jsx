import { useFormik } from "formik";
import React, { useState } from "react";
import { forgotPassword } from "../../api/partner/authApi";
import * as Yup from "yup";
import { Button, Input, notification } from "antd";
import ErrorHandler from "../../utils/ErrorHandler";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  
  new_password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),

  new_password_confirmation: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});



const ForgotPassword = ({handleForgotPasswordModalClose}) => {

  const [loading, setLoading]=useState(false);
  // Initial values for the form fields
  const initialValues = {
    email: "",
    new_password: "",
    new_password_confirmation: "",
  };



  const handleForgotPassword = async (values) => {
    try {
      setLoading(true);
      const { status } = await forgotPassword(values);
      if (status === 200) {
        setLoading(false);
        handleForgotPasswordModalClose();
        // Show success notification
        notification.success({
          message: "Success",
          description: "Your password reset request was successful. Please check your email.",
        });
      }
    } catch (error) {
      setLoading(false);
      ErrorHandler.handleError(error);
    }
  };
  
  // Formik setup for handling form state and validation
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
     handleForgotPassword(values)
    },
  });

  // Destructure Formik's properties for easier use
  const { handleChange, values, errors, touched, handleBlur, handleSubmit } =
  formik;

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="mt-4 px-6 w-full py-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-zinc-700 font-semibold">
            Enter Email Id
          </label>
          <Input
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            status={touched.email && errors.email ? "error" : ""}
            size="large"
            placeholder="Enter Email Id"
          />
          {touched.email && errors.email ? (
            <span className="text-red-500 text-sm">{errors.email}</span>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="new_password" className="text-zinc-700 font-semibold">
            Enter New Password
          </label>
          <Input.Password
            size="large"
            name="new_password"
            value={values.new_password}
            onChange={handleChange}
            onBlur={handleBlur}
            status={touched.new_password && errors.new_password ? "error" : ""}
            placeholder="Enter New Password"
            className="rounded-lg"
          />
          {touched.new_password && errors.new_password && (
            <span className="text-red-500 text-xs">{errors.new_password}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="new_password_confirmation"
            className="text-zinc-700 font-semibold"
          >
            Enter Confirm Password
          </label>
          <Input.Password
            size="large"
            name="new_password_confirmation"
            value={values.new_password_confirmation}
            onChange={handleChange}
            onBlur={handleBlur}
            status={
              touched.new_password_confirmation &&
              errors.new_password_confirmation
                ? "error"
                : ""
            }
            placeholder="Enter Confirm Password"
            className="rounded-lg"
          />
          {touched.new_password_confirmation &&
            errors.new_password_confirmation && (
              <span className="text-red-500 text-xs">{errors.new_password_confirmation}</span>
            )}
        </div>
      </div>

      <div className="mt-4 px-6 flex flex-col gap-4 pb-4">
        <Button
          htmlType="submit"
          loading={loading}
          className="w-full h-10 rounded-3xl bg-green-700 text-white"
        >
          Save
        </Button>
        <Button
          onClick={handleForgotPasswordModalClose}
          className="w-full h-10 rounded-3xl border-[1px] border-green-700 text-green-700"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ForgotPassword;
