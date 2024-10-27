import { Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const PermanentAddress = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setFieldValue,
  stateOptions,
}) => {
  const handleStateChange = (selectedOption) => {
    setFieldValue("permanent_address.state", selectedOption); // Set the selected state's isoCode
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 ">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-zinc-600 text-sm" htmlFor="">
            Address
          </label>
          <TextArea
            name="permanent_address.address"
            value={values.permanent_address.address}
            onChange={handleChange}
            onBlur={handleBlur}
            status={
              touched.permanent_address?.address &&
              errors.permanent_address?.address
                ? "error"
                : ""
            }
            rows={4}
            size="large"
            placeholder="Enter your address"
          />
          {touched.permanent_address?.address &&
          errors.permanent_address?.address ? (
            <span className="text-red-500 text-sm">
              {errors.permanent_address?.address}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-3 ">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-zinc-600 text-sm" htmlFor="">
            State
          </label>
          <Select
            size="large"
            name="permanent_address.state"
            options={stateOptions}
            onChange={handleStateChange}
            onBlur={handleBlur}
            placeholder="Select your state"
            value={values.permanent_address.state}
            status={
              touched.permanent_address?.state && errors.permanent_address?.state
                ? "error"
                : ""
            }
          />
          {touched.permanent_address?.state && errors.permanent_address?.state ? (
            <span className="text-red-500 text-sm">
              {errors.permanent_address?.state}
            </span>
          ) : null}
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-zinc-600 text-sm" htmlFor="">
            City
          </label>
          <Input
            size="large"
            placeholder="Enter your City"
            name="permanent_address.city"
            value={values.permanent_address?.city}
            onChange={handleChange}
            onBlur={handleBlur}
            status={
              touched.permanent_address?.city && errors.permanent_address?.city
                ? "error"
                : ""
            }
          />
          {touched.permanent_address?.city && errors.permanent_address?.city ? (
            <span className="text-red-500 text-sm">
              {errors.permanent_address?.city}
            </span>
          ) : null}
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-zinc-600 text-sm" htmlFor="">
            Pincode
          </label>
          <Input
            name="permanent_address.pincode"
            value={values.permanent_address?.pincode}
            onChange={handleChange}
            onBlur={handleBlur}
            size="large"
            placeholder="Enter your pincode"
            status={
              touched.permanent_address?.pincode &&
              errors.permanent_address?.pincode
                ? "error"
                : ""
            }
          />
          {touched.permanent_address?.pincode &&
          errors.permanent_address?.pincode ? (
            <span className="text-red-500 text-sm">
              {errors.permanent_address?.pincode}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PermanentAddress;
