import { Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const OfficeAddress = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setFieldValue,
  stateOptions,
}) => {
  const handleStateChange = (selectedOption) => {
    setFieldValue("office_address.state", selectedOption); // Set the selected state's isoCode
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="flex flex-col gap-1">
      <label className="text-zinc-600 text-sm" htmlFor="address">
        Address
      </label>
      <TextArea
        name="office_address.address"
        value={values.office_address.address}
        onChange={handleChange}
        onBlur={handleBlur}
        status={
          touched.office_address?.address && errors.office_address?.address
            ? "error"
            : ""
        }
        rows={4}
        size="large"
        placeholder="Enter your address"
      />
      {touched.office_address?.address && errors.office_address?.address ? (
        <span className="text-red-500 text-sm">
          {errors.office_address?.address}
        </span>
      ) : null}
    </div>
  
    <div className="flex flex-col gap-1">
      <label className="text-zinc-600 text-sm" htmlFor="state">
        State
      </label>
      <Select
        size="large"
        name="office_address.state"
        options={stateOptions}
        onChange={handleStateChange}
        onBlur={handleBlur}
        placeholder="Select your state"
        value={values.office_address.state}
        status={
          touched.office_address?.state && errors.office_address?.state
            ? "error"
            : ""
        }
      />
      {touched.office_address?.state && errors.office_address?.state ? (
        <span className="text-red-500 text-sm">
          {errors.office_address?.state}
        </span>
      ) : null}
    </div>
  
    <div className="flex flex-col gap-1">
      <label className="text-zinc-600 text-sm" htmlFor="city">
        City
      </label>
      <Input
        size="large"
        placeholder="Enter your City"
        name="office_address.city"
        value={values.office_address?.city}
        onChange={handleChange}
        onBlur={handleBlur}
        status={
          touched.office_address?.city && errors.office_address?.city
            ? "error"
            : ""
        }
      />
      {touched.office_address?.city && errors.office_address?.city ? (
        <span className="text-red-500 text-sm">
          {errors.office_address?.city}
        </span>
      ) : null}
    </div>
  
    <div className="flex flex-col gap-1">
      <label className="text-zinc-600 text-sm" htmlFor="pincode">
        Pincode
      </label>
      <Input
        name="office_address.pincode"
        value={values.office_address?.pincode}
        onChange={handleChange}
        onBlur={handleBlur}
        size="large"
        placeholder="Enter your pincode"
        status={
          touched.office_address?.pincode && errors.office_address?.pincode
            ? "error"
            : ""
        }
      />
      {touched.office_address?.pincode && errors.office_address?.pincode ? (
        <span className="text-red-500 text-sm">
          {errors.office_address?.pincode}
        </span>
      ) : null}
    </div>
  </div>
  
  );
};

export default OfficeAddress;
