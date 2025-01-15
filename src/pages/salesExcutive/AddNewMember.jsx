import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import PersonalInfo from "../../components/salesExcutiveComponent/partner/PersonalInfo";
import PermanentAddress from "../../components/salesExcutiveComponent/partner/PermanentAddress";
import OfficeAddress from "../../components/salesExcutiveComponent/partner/OfficeAddress";
import IdentityDetails from "../../components/salesExcutiveComponent/partner/IdentityDetails";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { State } from "country-state-city";
import * as Yup from "yup";
import { RxCross2 } from "react-icons/rx";
import EmailVerify from "../../components/salesExcutiveComponent/partner/EmailVerify";
import {
  getAllSubscription,
  newPartnerCreate,
  partnerSendOTP,
} from "../../api/salesExecutive/partnerApi";
import moment from "moment";
import dayjs from "dayjs";
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long"),

  mobile_number: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),

  email: Yup.string().required("Email is required").email("Email is not valid"),

  subscription: Yup.string().required("Subscription is required"),

  subscription_price: Yup.number()
    .required("Subscription price is required")
    .positive("Subscription price must be a positive number"),

  payment_mode: Yup.string().required("Payment mode is required"),

  payment_txn_id: Yup.string().required("Transaction ID is required"),

  whatsapp_number: Yup.string()
    .required("WhatsApp number is required")
    .matches(/^[0-9]{10}$/, "WhatsApp number must be 10 digits")
    .nullable(),

  date_of_birth: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth must be in the past"),

  gender: Yup.string().required("Gender is required"),

  permanent_address: Yup.object().shape({
    address: Yup.string().required("Permanent address is required"),

    city: Yup.string().required("City is required"),

    pincode: Yup.string()
      .required("Pincode is required")
      .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),

    state: Yup.string().required("State is required"),
  }),

  office_address: Yup.object().shape({
    address: Yup.string().required("Office address is required"),

    city: Yup.string().required("City is required"),

    pincode: Yup.string()
      .required("Pincode is required")
      .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),

    state: Yup.string().required("State is required"),
  }),

  gst: Yup.string()
    .nullable()
    .matches(
      /^([0-9]{2})([A-Z])([0-9]{4})([A-Z])([A-Z]{1})([A-Z0-9]{1})([0-9]{1})$/,
      "GST number is not valid"
    ),

  aadhar: Yup.string()
    .nullable()
    .matches(/^[0-9]{12}$/, "Aadhar number must be 12 digits"),

  pan: Yup.string()
    .nullable()
    .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "PAN number is not valid"),
});

const AddNewMember = () => {
  const [isPersonalInfo, setIsPersonalInfo] = useState(true);
  const [isPermanetAddress, setIsPermanetAddress] = useState(true);
  const [isOfficeAddress, setIsOfficeAddress] = useState(true);
  const [isIdentityDetails, setIsIdentityDetails] = useState(true);
  const [stateOptions, setStateOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscription, setSubcription] = useState([]);

  // Initial values for the form fields
  const initialValues = {
    name: "",
    mobile_number: "",
    email: "",
    subscription: "",
    subscription_price: "",
    payment_mode: "",
    payment_txn_id: "",
    whatsapp_number: "",
    date_of_birth: "",
    gender: "",
    permanent_address: {
      address: "",
      city: "",
      pincode: "",
      state: "",
    },
    office_address: {
      address: "",
      city: "",
      pincode: "",
      state: "",
    },
    gst: "",
    aadhar: "",
    pan: "",
  };

  // Hnadel Send OTP For Email
  const handelSendOtp = async (email) => {
    try {
      const { status } = await partnerSendOTP({ email: email });
      // Assuming a successful response returns a status code of 200
      if (status === 200 || 201) {
        notification.success({
          message: "Success",
          description: "OTP has been sent successfully.",
        });
      } else {
        notification.error({
          message: "Error",
          description: "Failed to send OTP. Please try again.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message || "An unexpected error occurred.",
      });
    }
  };

  // Partner Register
  const handelPartnerRegister = async (values) => {
    try {
      setLoading(true);
      const { status } = await newPartnerCreate(values);
      if (status === 200 || 201) {
        setLoading(false);
        setIsOpen(true);

        notification.success({
          message: "Registration Successful",
          description:
            "The partner has been registered but the email is not verified. Please verify the email.",
        });
        handelSendOtp(values.email);
      }
    } catch (error) {
      setIsOpen(false);
      setLoading(false);
      notification.error({
        message: "Registration Failed",
        description:
          "There was an error while registering the partner. Please try again.",
      });
      console.log(error);
    }
  };

  // Formik setup for handling form state and validation
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const updateData = {
        ...values,
        date_of_birth: dayjs(values.date_of_birth).isValid()
          ? dayjs(values.date_of_birth).format("YYYY-MM-DD")
          : "",
      };
      handelPartnerRegister(updateData);
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

  // India as default country
  const countryIsoCode = "IN";

  // Fetch states based on countryIsoCode parameter
  useEffect(() => {
    if (countryIsoCode) {
      const fetchedStates = State.getStatesOfCountry(countryIsoCode).map(
        (state) => ({
          value: state.isoCode,
          label: state.name,
        })
      );
      setStateOptions(fetchedStates);
    }
  }, [countryIsoCode]);

  useEffect(() => {
    const fetchAllSubscription = async () => {
      try {
        const { data, status } = await getAllSubscription();
        if (status === 200) {
          setSubcription(data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllSubscription();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="p-4 md:px-6 py-4">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link
            to={"/sales-executive/partner"}
            className="text-zinc-800 font-semibold text-2xl mt-1 cursor-pointer"
          >
            <FaArrowLeft />
          </Link>
          <h1 className="text-zinc-800 font-semibold text-2xl">
            File DSA Application
          </h1>
        </div>

        <div className="flex-1 flex items-center justify-end gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
          <Button className="w-[40%] sm:w-[15%] h-10 rounded-lg">Cancel</Button>
          <Button
            loading={loading}
            htmlType="submit"
            className="w-[40%] sm:w-[15%] h-10 bg-green-700 text-white rounded-lg"
          >
            Save
          </Button>
        </div>
      </div>

      <div className="py-4 px-4">
        {/* PERSONAL INFO */}
        <div className="py-2 bg-zinc-100 rounded-md px-2 shadow-sm flex justify-between items-center">
          <h2 className="text-zinc-700 font-semibold text-xl">Personal Info</h2>
          <span
            onClick={() => setIsPersonalInfo(!isPersonalInfo)}
            className="text-green-500 text-2xl cursor-pointer"
          >
            {isPersonalInfo ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isPersonalInfo ? "md:max-h-[500px] h-full" : "max-h-0"
          }`}
        >
          <div className="bg-white rounded-b-md p-2 md:p-6">
            <PersonalInfo
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
              subscription={subscription}
            />
          </div>
        </div>

        {/* PERMANENT ADDRESS */}
        <div className="py-2 bg-zinc-100 rounded-md px-2 shadow-sm flex justify-between items-center">
          <h2 className="text-zinc-700 font-semibold text-xl">
            Permanent Address
          </h2>
          <span
            onClick={() => setIsPermanetAddress(!isPermanetAddress)}
            className="text-green-500 text-2xl cursor-pointer"
          >
            {isPermanetAddress ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isPermanetAddress ? "md:max-h-[500px] h-full" : "max-h-0"
          }`}
        >
          <div className="bg-white rounded-b-md p-2 md:p-6">
            <PermanentAddress
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
              stateOptions={stateOptions}
            />
          </div>
        </div>

        {/* OFFICE ADDRESS */}
        <div className="py-2 bg-zinc-100 rounded-md px-2 shadow-sm flex justify-between items-center">
          <h2 className="text-zinc-700 font-semibold text-xl">
            Office Address
          </h2>
          <span
            onClick={() => setIsOfficeAddress(!isOfficeAddress)}
            className="text-green-500 text-2xl cursor-pointer"
          >
            {isOfficeAddress ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOfficeAddress ? "md:max-h-[500px] h-full" : "max-h-0"
          }`}
        >
          <div className="bg-white rounded-b-md p-2 md:p-6">
            <OfficeAddress
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
              stateOptions={stateOptions}
            />
          </div>
        </div>

        {/* IDENTITY DETAILS */}
        <div className="py-2 bg-zinc-100 rounded-md px-2 shadow-sm flex justify-between items-center">
          <h2 className="text-zinc-700 font-semibold text-xl">
            Identity Details
          </h2>
          <span
            onClick={() => setIsIdentityDetails(!isIdentityDetails)}
            className="text-green-500 text-2xl cursor-pointer"
          >
            {isIdentityDetails ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isIdentityDetails ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="bg-white rounded-b-md p-2 md:p-6">
            <IdentityDetails
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
            />
          </div>
        </div>
      </div>

      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title={null}
        width={400}
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
        <div
          className="flex justify-between 
         items-center py-2 px-4 border-b-[1px] border-b-zinc-300"
        >
          <h1 className="text-zinc-700 font-semibold text-xl">
            Email Verification
          </h1>
          <span
            onClick={() => setIsOpen(false)}
            className="text-zinc-600 hover:text-zinc-800 font-semibold text-2xl cursor-pointer"
          >
            <RxCross2 />
          </span>
        </div>

        <EmailVerify email={values.email} setIsOpen={setIsOpen} />
      </Modal>
    </form>
  );
};

export default AddNewMember;
