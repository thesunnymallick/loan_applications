import { Button, Input, notification, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getRoleInfo, roleAssignUpdate } from "../../api/admin/roleAssign";
import { GoPlus } from "react-icons/go";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  phone_no: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),

  account_holder_name: Yup.string()
    .required("Account holder name is required")
    .min(3, "Account holder name must be at least 3 characters"),

  bank_account_name: Yup.string().required("Bank account name is required"),

  bank_account_no: Yup.string()
    .matches(/^\d+$/, "Bank account number must only contain numbers")
    .min(9, "Bank account number must be at least 9 digits")
    .max(18, "Bank account number must be at most 18 digits")
    .required("Bank account number is required"),

  ifsc_code: Yup.string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format")
    .required("IFSC code is required"),

  role: Yup.string().required("Role is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),

  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),

  userPhoto: Yup.mixed(),
});

const EditRole = () => {
  // Initial values for the form fields
  const { id } = useParams();
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const [imgLoading, setimgLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const initialValues = {
    name: "",
    email: "",
    phone_no: "",
    account_holder_name: "",
    bank_account_name: "",
    bank_account_no: "",
    ifsc_code: "",
    role: "",
    userPhoto: "",
    password: "",
    password_confirmation: "",
  };

  const handelRoleAssignUpdate = async (values) => {
    try {
      setLoading(true);
      const { status, data } = await roleAssignUpdate(id, values); 
      if (status === 200) {
        // Success notification
        notification.success({
          message: "Role Assigned update Successfully",
          description: `The role "${data?.data?.role}" has been assigned update successfully.`,
        });
        setLoading(false);
         navigate(`/admin/role-assigned`)
      }
    } catch (error) {
      setLoading(false);
      // Error notification
      notification.error({
        message: "Role Assignment update Failed",
        description:
          error.response?.data?.message ||
          "An error occurred while assigning the role.",
      });
    }
  };

  // Formik setup for handling form state and validation
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Values", values);
    
      const formData = new FormData();
      
      if(values.userPhoto===""){
       for (const key in values) {
        if (values[key]) {
          formData.append(key, values[key]);
        } 
      }
      }else{
        for (const key in values) {
          if (key === "userPhoto" && values[key]) {
            formData.append(key, values[key]);
          } else {
            formData.append(key, values[key]);
          }
        }
      }

       handelRoleAssignUpdate(formData);
    },
  });

  // genarate password
  const generatePassword = () => {
    const { name, phone_no } = values;
    if (name && phone_no) {
      const generatedPassword = `${name.slice(0, 3)}${phone_no.slice(-4)}!`;
      setFieldValue("password", generatedPassword);
      setFieldValue("password_confirmation", generatedPassword);
    } else {
      notification.warning({
        message: "Missing Information",
        description:
          "Please enter both name and phone number to generate a password.",
        placement: "topRight", // Optional: adjust placement as desired
      });
    }
  };

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

  const beforeUpload = (file) => {
    setimgLoading(true);
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      setimgLoading(false);
      notification.error({
        message: "File too large",
        description: "Image must be smaller than 1MB!",
      });
    }
    return isLt1M;
  };


  // get role info
  useEffect(() => {
    //fetch role info
    const fetchRoleInfo = async () => {
      try {
        const { data, status } = await getRoleInfo(id);
        if (status === 200) {
          setFieldValue("name", data?.data?.name);
          setFieldValue("email", data?.data?.email);
          setFieldValue("phone_no", data?.data?.phone_no);
          setFieldValue("account_holder_name", data?.data?.account_holder_name);
          setFieldValue("bank_account_name", data?.data?.bank_account_name)
          setFieldValue("bank_account_no", data?.data?.bank_account_no);
          setFieldValue("ifsc_code", data?.data?.ifsc_code);
          setFieldValue("role", data?.data?.role);
          setPreviewUrl(data?.data?.userPhoto)
        }
      } catch (error) {
        console.log(error);
      }
    };
    // Fetch role info
    fetchRoleInfo();
  }, [setFieldValue, id]);

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2">
          <Link
            to="/admin/role-assigned"
            className="ext-zinc-700 font-semibold text-2xl cursor-pointer"
          >
            <FaArrowLeft />
          </Link>
          <h2 className="text-zinc-700 font-semibold text-xl">
            Sales Excutive/RM Create
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <h2 className="text-zinc-700 font-semibold text-lg pt-2">
            Personal Details
          </h2>
          <div className="my-3 flex justify-center">
            <Upload
              name="userPhoto"
              showUploadList={false}
              beforeUpload={(file) => {
                if (beforeUpload(file)) {
                  setimgLoading(false);
                  setFieldValue("userPhoto", file);
                  setPreviewUrl(URL.createObjectURL(file));
                  notification.success({
                    message: "Upload Successful",
                    description: "Your profile picture has been uploaded.",
                  });
                }
                return false; // Prevent automatic upload
              }}
            >
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-28 h-28 ${
                    previewUrl
                      ? "border-green-500"
                      : errors.userPhoto && touched.userPhoto
                      ? "border-red-500"
                      : "border-zinc-400"
                  } border-dashed border-2 flex flex-col items-center justify-center text-sm rounded-full cursor-pointer bg-zinc-100`}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="avatar"
                      className="w-full h-full object-cover rounded-full"
                      onLoad={() => URL.revokeObjectURL(previewUrl)}
                    />
                  ) : (
                    <>
                      {imgLoading ? (
                        <LoadingOutlined />
                      ) : (
                        <GoPlus className="text-zinc-700 text-lg" />
                      )}
                      <span className="text-zinc-700">Upload</span>
                    </>
                  )}
                </div>

                {/* Error Message */}
                <div className="text-sm flex justify-center my-1">
                  {touched.userPhoto && errors.userPhoto && (
                    <span className="text-red-500 text-sm">
                      {errors.userPhoto}
                    </span>
                  )}
                </div>
              </div>
            </Upload>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Name
              </label>
              <Input
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.name && errors.name ? "error" : ""}
                size="large"
                placeholder="Enter your name"
              />
              {touched.name && errors.name ? (
                <span className="text-red-500 text-sm">{errors.name}</span>
              ) : null}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Email
              </label>
              <Input
                type="email"
                size="large"
                placeholder="Enter your email"
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

            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Phone No
              </label>
              <Input
                size="large"
                placeholder="Enter your phone number"
                name="phone_no"
                value={values.phone_no}
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.phone_no && errors.phone_no ? "error" : ""}
              />
              {touched.phone_no && errors.phone_no ? (
                <span className="text-red-500 text-sm">{errors.phone_no}</span>
              ) : null}
            </div>
          </div>

          <h2 className="text-zinc-700 font-semibold text-lg pt-2 mt-4">
            Bank Details
          </h2>
          <div className="flex items-center gap-3 mt-1 ">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Account holder Name
              </label>
              <Input
                size="large"
                placeholder="Enter your Account holder name "
                name="account_holder_name"
                value={values.account_holder_name}
                onChange={handleChange}
                onBlur={handleBlur}
                status={
                  touched.account_holder_name && errors.account_holder_name
                    ? "error"
                    : ""
                }
              />

              {touched.account_holder_name && errors.account_holder_name ? (
                <span className="text-red-500 text-sm">
                  {errors.account_holder_name}
                </span>
              ) : null}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Bank Account name
              </label>
              <Input
                size="large"
                placeholder="Enter your bank account name "
                name="bank_account_name"
                value={values.bank_account_name}
                onChange={handleChange}
                onBlur={handleBlur}
                status={
                  touched.bank_account_name && errors.bank_account_name
                    ? "error"
                    : ""
                }
              />
              {touched.bank_account_name && errors.bank_account_name ? (
                <span className="text-red-500 text-sm">
                  {errors.bank_account_name}
                </span>
              ) : null}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Bank account No
              </label>
              <Input
                type="text"
                size="large"
                placeholder="Enter your Bank account no"
                name="bank_account_no"
                value={values.bank_account_no}
                onChange={handleChange}
                onBlur={handleBlur}
                status={
                  touched.bank_account_no && errors.bank_account_no
                    ? "error"
                    : ""
                }
              />

              {touched.bank_account_no && errors.bank_account_no ? (
                <span className="text-red-500 text-sm">
                  {errors.bank_account_no}
                </span>
              ) : null}
            </div>
          </div>
          <div className="w-[33%] mt-2">
            <div className=" flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                IFSC Code
              </label>
              <Input
                size="large"
                placeholder="Enter your IFSC code"
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

          <h2 className="text-zinc-700 font-semibold text-lg pt-2 mt-4">
            More Info
          </h2>

          <div className="flex items-center gap-3 mt-1 ">
            <div className="w-[40%] flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Select Role
              </label>
              <Select
                name="role"
                value={values.role}
                onChange={(value) => setFieldValue("role", value)}
                onBlur={handleBlur}
                status={touched.role && errors.role ? "error" : ""}
                size="large"
                placeholder="Select role "
              >
                <Select.Option value="Sales Executive">
                  Sales Executive
                </Select.Option>
                <Select.Option value="RM">Realation Manager</Select.Option>
              </Select>
              {touched.role && errors.role ? (
                <span className="text-red-500 text-sm">{errors.role}</span>
              ) : null}
            </div>

            <div className=" w-[40%] flex items-center gap-2">
              <div className="w-[70%] flex flex-col   gap-1">
                <label
                  className="text-sm text-zinc-500 font-semibold"
                  htmlFor=""
                >
                  Password
                </label>
                <Input.Password
                  size="large"
                  placeholder="Enter password"
                  name="role"
                  value={values.password}
                  // onChange={handleChange}
                  onBlur={handleBlur}
                  status={touched.password && errors.password ? "error" : ""}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
                {touched.password && errors.password ? (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                ) : null}
              </div>
              <div className="w-[30%]  mt-6">
                <Button
                  onClick={generatePassword}
                  className="w-full h-10 bg-green-700 text-white rounded-md shadow-sm"
                >
                  Genarate
                </Button>
              </div>
            </div>
          </div>

          <div className="py-2 mt-10 flex justify-center items-center gap-3">
            <Button className="w-[15%] h-10 rounded-lg">Cancel</Button>
            <Button
              loading={loading}
              htmlType="submit"
              className="w-[15%] h-10 bg-green-700 text-white rounded-lg"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRole;
