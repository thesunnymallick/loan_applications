import React, { useState } from "react";
import loginBg from "../../assets/loginBg.png";
import { Button, Checkbox, Input, Modal, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setLogin } from "../../features/authSlice";
import { salesExecutiveLogin } from "../../api/salesExecutive/seAuth";
import { partnerLogin } from "../../api/partner/authApi";
import logo1 from "../../assets/logo/logo1.png";
import { RxCross2 } from "react-icons/rx";
import ForgotPassword from "../../components/partnerComponet/ForgotPassword";
import ErrorHandler from "../../utils/ErrorHandler";
// Define the validation schema
const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// A reusable login component with loginType as a prop
const Login = ({ loginType }) => {
  const [loading, setLoading] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Define login types and their corresponding display names
  const loginTitles = {
    Admin: "Admin",
    SalesExecutive: "Sales Executive",
    RelationshipManager: "Relationship Manager",
    Partner: "Partner",
  };

  // Initial values for the form fields
  const initialValues = {
    email: "",
    password: "",
  };

  // Partner Login
  const handelPartnerLogin = async (values) => {
    try {
      setLoading(true);
      const { data, status } = await partnerLogin(values);
      if (status === 200) {
        setLoading(false);
        // Save token in cookies
        Cookies.set("authToken", data.token, { expires: 7 });
        const modifyData = {
          ...data?.partner,
          role: "partner",
        };
        dispatch(
          setLogin({
            token: data?.token,
            status: data?.status,
            user: modifyData,
          })
        );
        // Success notification
        notification.success({
          message: "Login Successful",
          description: "You have logged in successfully.",
          placement: "topRight",
        });
        navigate(`/partner/dashboard`);
      }
    } catch (error) {
      setLoading(false);
      ErrorHandler.handleError(error);
    }
  };

  // Sales Executive Login
  const handelSalesExecutiveLogin = async () => {
    try {
      setLoading(true);
      const { data, status } = await salesExecutiveLogin(values);
      if (status === 200) {
        setLoading(false);
        // Save token in cookies
        Cookies.set("authToken", data.token, { expires: 7 });
        dispatch(
          setLogin({
            token: data?.token,
            status: "active",
            user: data?.userInfo,
          })
        );
        // Success notification
        notification.success({
          message: "Login Successful",
          description: "You have logged in successfully.",
          placement: "topRight",
        });
        navigate(`/sales-executive/dashboard`);
      }
    } catch (error) {
      setLoading(false);
      ErrorHandler.handleError(error);
    }
  };

  // Formik setup for handling form state and validation
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      // login type sales executive
      if (loginType === "SalesExecutive") {
        handelSalesExecutiveLogin(values);
      }
      // login type partner
      if (loginType === "Partner") {
        handelPartnerLogin(values);
      }
    },
  });

  // Destructure Formik's properties for easier use
  const { handleChange, values, errors, touched, handleBlur, handleSubmit } =
    formik;

  const handleForgotPasswordModalOpen = () => {
    setIsForgot(true);
  };

  const handleForgotPasswordModalClose = () => {
    setIsForgot(false);
  };

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

      {/* Login form */}
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-[30%] bg-white p-8 rounded-lg shadow-2xl flex flex-col justify-center ml-0 md:ml-4"
      >
        <div className="pb-5">
          <img className="w-60 mx-auto" src={logo1} alt="Logo" />
        </div>
        {/* Login title */}
        <h1 className="text-3xl font-bold text-zinc-700 mb-4 text-center">
          Login to
          <span className="text-green-600 ml-2">{loginTitles[loginType]}</span>
        </h1>
        <p className="text-center text-zinc-500 mb-8">
          Please enter your credentials to continue
        </p>

        {/* Form fields */}
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-600 mb-1"
            >
              Email
            </label>
            <Input
              size="large"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.email && errors.email ? "error" : ""}
              placeholder="Enter your email"
              className="rounded-lg"
            />
            {touched.email && errors.email && (
              <span className="text-red-500 text-xs">{errors.email}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-600 mb-1"
            >
              Password
            </label>
            <Input.Password
              size="large"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.password && errors.password ? "error" : ""}
              placeholder="Enter your password"
              className="rounded-lg"
            />
            {touched.password && errors.password && (
              <span className="text-red-500 text-xs">{errors.password}</span>
            )}
          </div>
          <Checkbox className="text-sm text-zinc-600">
            I agree to the
            <span className="text-green-600">terms and conditions</span>
          </Checkbox>
        </div>

        {/* Login button */}
        <Button
          loading={loading}
          htmlType="submit"
          className="w-full bg-green-700 h-10
          hover:bg-green-800 text-white rounded-lg mt-6 py-3 text-lg shadow-lg"
        >
          Login
        </Button>
        {/* Forgot password link */}
      {
        loginType==="Partner" && (
          <div className="flex justify-end mt-3">
          <Link
            onClick={handleForgotPasswordModalOpen}
            className="text-zinc-500 text-sm hover:text-green-600"
          >
            Forgot Password?
          </Link>
        </div>
        )
      }

        {/* Register link */}
        {loginType === "Partner" && (
          <div className="mt-6 flex justify-center pb-3">
            <span className="text-sm text-zinc-500">
              Don't have an account?
              <Link to="/partner-apply" className="text-green-600 ml-1">
                Register
              </Link>
            </span>
          </div>
        )}
      </form>

      <Modal
        open={isForgot}
        onCancel={handleForgotPasswordModalClose}
        title={null}
        width={400}
        centered
        footer={null}
        closable={false}
        maskClosable={false}
        modalRender={(modal) => {
          return React.cloneElement(modal, {
            style: {
              ...modal.props.style,
              ...{ borderRadius: 10, padding: 0 },
            },
          });
        }}
      >
        <div className="flex justify-between items-center py-2 px-4 border-b-[1px] border-b-zinc-300">
          <h1 className="text-zinc-700 font-semibold text-xl">
            Forgot Password
          </h1>
          <span
            onClick={handleForgotPasswordModalClose}
            className="text-zinc-600 hover:text-zinc-800 font-semibold text-2xl cursor-pointer"
          >
            <RxCross2 />
          </span>
        </div>
        <ForgotPassword
          handleForgotPasswordModalClose={handleForgotPasswordModalClose}
        />
      </Modal>
    </div>
  );
};

export default Login;
