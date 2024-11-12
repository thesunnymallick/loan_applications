import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import * as Yup from "yup";
import { Button } from "antd";
import { State } from "country-state-city";
import PersonalInfo from "../../components/salesExcutiveComponent/partner/PersonalInfo";
import PermanentAddress from "../../components/salesExcutiveComponent/partner/PermanentAddress";
import OfficeAddress from "../../components/salesExcutiveComponent/partner/OfficeAddress";
import IdentityDetails from "../../components/salesExcutiveComponent/partner/IdentityDetails";
import { getPartnerInfo } from "../../api/admin/users";
import moment from "moment";


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

const PartnerEdit = () => {
  const {id}=useParams();
  const [isPersonalInfo, setIsPersonalInfo] = useState(true);
  const [isPermanetAddress, setIsPermanetAddress] = useState(true);
  const [isOfficeAddress, setIsOfficeAddress] = useState(true);
  const [isIdentityDetails, setIsIdentityDetails] = useState(true);
  const [loading, setLoading] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [partnerInfo, setPartnerInfo]=useState(null);
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
      // handelPartnerRegister(updateData);
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



   useEffect(()=>{
    // get partner details
     const fetchPartnerInfo=async()=>{
      try {
        const {data, status}=await getPartnerInfo(id) 
        if(status===200){
          setPartnerInfo(data?.partner);
        }
      } catch (error) {
        
      }
     }
     fetchPartnerInfo();
   }, [id])


    
  // Partner Set Values
  useEffect(() => {
    if (partnerInfo !== null) {
      setFieldValue("name", partnerInfo.name);
      setFieldValue("mobile_number", partnerInfo.mobile);
      setFieldValue("email", partnerInfo.email);
      setFieldValue("subscription", partnerInfo.subscription);
      setFieldValue("subscription_price", partnerInfo.subscription_price);
      setFieldValue("payment_txn_id", partnerInfo.payment_txn_id);
      setFieldValue("whatsapp_number", partnerInfo.whatsapp_number);
      setFieldValue("date_of_birth", partnerInfo.date_of_birth ? moment(partnerInfo.date_of_birth) : null);
      setFieldValue("gender", partnerInfo.gender)
      setFieldValue("payment_mode", partnerInfo?.payment_mode);
      // Set permanent address fields
      setFieldValue("permanent_address.address", partnerInfo.permanent_address.address);
      setFieldValue("permanent_address.city", partnerInfo.permanent_address.city);
      setFieldValue("permanent_address.pincode", partnerInfo.permanent_address.pincode);
      setFieldValue("permanent_address.state", partnerInfo.permanent_address.state);
  
      // Set office address fields
      setFieldValue("office_address.address", partnerInfo.office_address.address);
      setFieldValue("office_address.city", partnerInfo.office_address.city);
      setFieldValue("office_address.pincode", partnerInfo.office_address.pincode);
      setFieldValue("office_address.state", partnerInfo.office_address.state);
  
      // Set additional fields
      setFieldValue("gst", partnerInfo.gst || "");
      setFieldValue("aadhar", partnerInfo.aadhar || "");
      setFieldValue("pan", partnerInfo.pan || "");
    }
  }, [partnerInfo, setFieldValue]);



  return (
    <div className="p-6">
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/users`}
            className="cursor-pointer text-2xl text-zinc-700 font-semibold"
          >
            <IoMdArrowRoundBack />
          </Link>
          <h1 className="text-zinc-700 font-semibold text-xl">Partner Edit</h1>

          <div className="flex-1 flex justify-end items-center gap-2 px-4">
            <Button className="w-[15%] h-10">Cancel</Button>
            <Button className="bg-green-700 text-white rounded-md shadow-sm 
            w-[15%] h-10">Save</Button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="py-4 px-4">
            {/* PERSONAL INFO */}
            <div className="py-2 bg-zinc-100 rounded-md px-2 shadow-sm flex justify-between items-center">
              <h2 className="text-zinc-700 font-semibold text-xl">
                Personal Info
              </h2>
              <span
                onClick={() => setIsPersonalInfo(!isPersonalInfo)}
                className="text-green-500 text-2xl cursor-pointer"
              >
                {isPersonalInfo ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
              </span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isPersonalInfo ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              <div className="bg-white rounded-b-md p-6">
                <PersonalInfo
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched}
                  errors={errors}
                  setFieldValue={setFieldValue}
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
                isPermanetAddress ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              <div className="bg-white rounded-b-md p-6">
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
                isOfficeAddress ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              <div className="bg-white rounded-b-md p-6">
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
              <div className="bg-white rounded-b-md p-6">
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
        </form>
      </div>
    </div>
  );
};

export default PartnerEdit;
