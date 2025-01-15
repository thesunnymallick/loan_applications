import React, { useState } from 'react';
import loginBg from "../../assets/loginBg.png";
import { Button, Checkbox, Input, notification } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik"
import * as Yup from "yup";
import { adminLogin } from '../../api/admin/adminAuth';
import Cookies from 'js-cookie';
import {useDispatch} from "react-redux"
import { setLogin } from '../../features/authSlice';
import { salesExecutiveLogin } from '../../api/salesExecutive/seAuth';
import { partnerLogin } from '../../api/partner/authApi';
import { rmLogin } from '../../api/rm/authRmApi';
// Define the validation schema
const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// A reusable login component with loginType as a prop
const Login = ({ loginType }) => {

  const [loading, setLoading]=useState(false);
  const dispatch=useDispatch()
  const navigate=useNavigate();
  // Define login types and their corresponding display names
  const loginTitles = {
    Admin: "Admin Login",
    SalesExecutive: "Sales Executive Login",
    RelationshipManager: "Relationship Manager Login",
    Partner: "Partner Login"
  };

  // Initial values for the form fields
  const initialValues = {
    email: "",
    password: "",
  };


  // Partner Login 
  const handelPartnerLogin=async(values)=>{
    try {
      setLoading(true);
      const { data, status } = await partnerLogin(values);
      if (status === 200) {
        setLoading(false);
        // Save token in cookies
        Cookies.set('authToken', data.token, { expires: 7 });
        const modifyData={
          ...data?.partner,
          role:"partner"
        }
        dispatch(setLogin({ token: data?.token, status:data?.status, user:modifyData  }));
        // Success notification
        notification.success({
          message: 'Login Successful',
          description: 'You have logged in successfully.',
          placement: 'topRight',
        });
        navigate(`/partner/dashboard`);
      }
    } catch (error) {
      setLoading(false);
      // Error notification
      notification.error({
        message: 'Login Failed',
        description: error.response?.data?.message || 
        'An error occurred during login. Please try again.',
        placement: 'topRight',
      });
    }
  }


  // Sales Executive Login
  const handelSalesExecutiveLogin=async()=>{
    try {
      setLoading(true);
      const { data, status } = await salesExecutiveLogin(values);
      if (status === 200) {
        setLoading(false);
        // Save token in cookies
        Cookies.set('authToken', data.token, { expires: 7 });
        dispatch(setLogin({ token: data?.token, status:"active", user: data?.userInfo }));
        // Success notification
        notification.success({
          message: 'Login Successful',
          description: 'You have logged in successfully.',
          placement: 'topRight',
        });
        navigate(`/sales-executive/dashboard`);
      }
    } catch (error) {
      setLoading(false);
      // Error notification
      notification.error({
        message: 'Login Failed',
        description: error.response?.data?.message || 
        'An error occurred during login. Please try again.',
        placement: 'topRight',
      });
    }
  }

   // Admin login
  const handelLoginAdmin = async (values) => {
    try {
      setLoading(true);
      const { data, status } = await adminLogin(values);
      if (status === 200) {
        setLoading(false);
        // Save token in cookies
        Cookies.set('authToken', data.token, { expires: 7 });
        dispatch(setLogin({ token: data?.token, status:"active", user: data?.admin }));
  
        // Success notification
        notification.success({
          message: 'Login Successful',
          description: 'You have logged in successfully.',
          placement: 'topRight',
        });
        navigate(`/admin/dashboard`);
      }
    } catch (error) {
      setLoading(false);
      // Error notification
      notification.error({
        message: 'Login Failed',
        description: error.response?.data?.message || 
        'An error occurred during login. Please try again.',
        placement: 'topRight',
      });
    }
  };

  // Handle login RM
  const handleLoginRM = async (values) => {
    try {
      setLoading(true);
      const { data, status } = await rmLogin(values);
      if (status === 200) {
        setLoading(false);
      //  Save token in cookies
        Cookies.set('authToken', data.token, { expires: 7 });
        dispatch(setLogin({ token: data?.token, status:"active", user: data?.admin }));
  
        // Success notification
        notification.success({
          message: 'Login Successful',
          description: 'You have logged in successfully.',
          placement: 'topRight',
        });
        navigate(`/rm/dashboard`);
      }
    } catch (error) {
      setLoading(false);
      // Error notification
      notification.error({
        message: 'Login Failed',
        description: error.response?.data?.message || 
        'An error occurred during login. Please try again.',
        placement: 'topRight',
      });
    }
  };
  

  // Formik setup for handling form state and validation
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
   
      // login type admin
      if (loginType === "Admin") {
        handelLoginAdmin(values);
      }
      // login type sales executive
      if(loginType==="SalesExecutive"){
        handelSalesExecutiveLogin(values)
      }
       // login type partner
      if(loginType==="Partner"){
        handelPartnerLogin(values)
      }
      // RM login
      if(loginType==="RelationshipManager"){
        handleLoginRM(values);
      }

    },
  });




  // Destructure Formik's properties for easier use
  const {
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit } = formik;

  return (
    <div className="bg-zinc-100 p-6 flex justify-end items-center h-screen relative">
    {/* Background image section */}
    <div className="w-[70%] hidden md:block">
      <img className="w-full object-cover rounded-md" src={loginBg} alt="" />
    </div>
  
    {/* Login form section */}
    <form
      onSubmit={handleSubmit}
      className="absolute md:top-[20%] left-[0%] md:left-[15%] w-full md:w-[30%] flex items-center justify-center p-6 md:p-0">
      <div className="bg-white w-full p-6 rounded-lg shadow-sm">
        {/* Dynamic title based on login type */}
        <div className="flex justify-center pb-6">
          <h1 className="text-2xl text-zinc-700">
            Login to
            <span className="text-zinc-800 font-semibold ml-2">{loginTitles[loginType]}</span>
          </h1>
        </div>
  
        {/* Form fields */}
        <div className="flex flex-col gap-3 mt-8">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <Input
              size="large"
              className="w-full"
              name='email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.email && errors.email ? "error" : ""}
              placeholder="Enter your email" />
            {touched.email && errors.email ? (
              <span className="text-red-500 text-sm">{errors.email}</span>
            ) : null}
          </div>
  
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <Input.Password
              size="large"
              className="w-full"
              placeholder="Enter your password"
              name='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.password && errors.password ? "error" : ""}
            />
            {touched.password && errors.password ? (
              <span className="text-red-500 text-sm">{errors.password}</span>
            ) : null}
          </div>
  
          <div className="mt-0">
            <Checkbox>I agree to the terms and conditions</Checkbox>
          </div>
  
          {/* Login button */}
          <div className="mt-3">
            <Button
              loading={loading}
              htmlType='submit'
              className="bg-green-600 text-white rounded-lg shadow-sm text-lg border-none w-full h-12">
              Login
            </Button>
  
            {/* Forgot password link */}
            <div className="flex justify-end mt-3">
              <Link className="text-zinc-500 text-sm hover:text-green-600">Forgot Password?</Link>
            </div>
          </div>
  
          {/* Register link */}
          {loginType === "Partner" && (
            <div className="mt-6 flex justify-center pb-3">
              <span className="text-sm text-zinc-500">
                Don't have an account?
                <Link to="/partner-apply" className="text-green-600 ml-1">Register</Link>
              </span>
            </div>
          )}
        </div>
      </div>
    </form>
  </div>
  
  );
};

export default Login;
