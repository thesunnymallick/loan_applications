import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import PersonalInfo from "../../components/salesExcutiveComponent/partner/PersonalInfo";
import PermanentAddress from "../../components/salesExcutiveComponent/partner/PermanentAddress";
import OfficeAddress from "../../components/salesExcutiveComponent/partner/OfficeAddress";
import IdentityDetails from "../../components/salesExcutiveComponent/partner/IdentityDetails";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { State} from "country-state-city";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long'),
  
  mobile_number: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),

  email: Yup.string()
    .required('Email is required')
    .email('Email is not valid'),

  subscription: Yup.string()
    .required('Subscription is required'),

  subscription_price: Yup.number()
    .required('Subscription price is required')
    .positive('Subscription price must be a positive number'),

  payment_mode: Yup.string()
    .required('Payment mode is required'),

  payment_txn_id: Yup.string()
    .required('Transaction ID is required'),

  whatsapp_number: Yup.string().required('WhatsApp number is required')
    .matches(/^[0-9]{10}$/, 'WhatsApp number must be 10 digits')
    .nullable(),

  date_of_birth: Yup.date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth must be in the past'),

  gender: Yup.string()
    .required('Gender is required'),

  permanent_address: Yup.object().shape({
    address: Yup.string()
      .required('Permanent address is required'),

    city: Yup.string()
      .required('City is required'),

    pincode: Yup.string()
      .required('Pincode is required')
      .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits'),

    state: Yup.string()
      .required('State is required'),
  }),

  office_address: Yup.object().shape({
    address: Yup.string()
      .required('Office address is required'),

    city: Yup.string()
      .required('City is required'),

    pincode: Yup.string()
      .required('Pincode is required')
      .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits'),

    state: Yup.string()
      .required('State is required'),
  }),

  gst: Yup.string()
    .nullable()
    .matches(/^([0-9]{2})([A-Z])([0-9]{4})([A-Z])([A-Z]{1})([A-Z0-9]{1})([0-9]{1})$/, 'GST number is not valid'),

  aadhar: Yup.string()
    .nullable()
    .matches(/^[0-9]{12}$/, 'Aadhar number must be 12 digits'),

  pan: Yup.string()
    .nullable()
    .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, 'PAN number is not valid'),
});




const AddNewMember = () => {
  const [isPersonalInfo, setIsPersonalInfo] = useState(true);
  const [isPermanetAddress, setIsPermanetAddress] = useState(true);
  const [isOfficeAddress, setIsOfficeAddress] = useState(true);
  const [isIdentityDetails, setIsIdentityDetails] = useState(true);
  const [stateOptions, setStateOptions] = useState([]);

  // Initial values for the form fields
  const initialValues = {
    name: "",
    mobile_number: "",
    email: "",
    subscription: "",
    subscription_price: "",
    payment_mode: "",
    payment_txn_id:"",
    whatsapp_number: "",
    date_of_birth: "",
    gender: "",
    permanent_address: {
      address: "",
      city: "",
      pincode: "",
      state: ""
  },
  office_address: {
      address: "",
      city: "",
      pincode: "",
      state: ""
  },
    gst: "",
    aadhar: "",
    pan: ""
  };


   // Formik setup for handling form state and validation
   const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Values", values)

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
    handleSubmit } = formik;



  
    // India as default country
    const countryIsoCode = "IN";
  
    
  
    // Fetch states based on countryIsoCode parameter
    useEffect(() => {
      if (countryIsoCode) {
        const fetchedStates = State.getStatesOfCountry(countryIsoCode).map((state) => ({
          value: state.isoCode,
          label: state.name,
        }));
        setStateOptions(fetchedStates);
      }
    }, [countryIsoCode]);



  return (
    <form 
     onSubmit={handleSubmit}
     className="px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
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

        <div className="flex-1 flex items-center justify-end gap-2">
          <Button className="w-[15%] h-10 rounded-lg">Cancel</Button>
          <Button htmlType="submit" className="w-[15%] h-10 bg-green-700 text-white rounded-lg">
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
  );
};

export default AddNewMember;
