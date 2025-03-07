import { Input } from "antd";
import React from "react";

const IdentityDetails = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-zinc-600 text-sm" htmlFor="gst">
          GST
        </label>
        <Input
          size="large"
          placeholder="Enter your gst"
          name="gst"
          value={values.gst}
          onChange={handleChange}
          onBlur={handleBlur}
          status={touched.gst && errors.gst ? "error" : ""}
        />
        {touched.gst && errors.gst ? (
          <span className="text-red-500 text-sm">{errors.gst}</span>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-zinc-600 text-sm" htmlFor="aadhar">
          Aadhar
        </label>
        <Input
          size="large"
          placeholder="Enter aadhar no"
          name="aadhar"
          value={values.aadhar}
          onChange={handleChange}
          onBlur={handleBlur}
          status={touched.aadhar && errors.aadhar ? "error" : ""}
        />
        {touched.aadhar && errors.aadhar ? (
          <span className="text-red-500 text-sm">{errors.aadhar}</span>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-zinc-600 text-sm" htmlFor="pan">
          Pan
        </label>
        <Input
          size="large"
          placeholder="Enter your pan no"
          name="pan"
          value={values.pan}
          onChange={handleChange}
          onBlur={handleBlur}
          status={touched.pan && errors.pan ? "error" : ""}
        />
        {touched.pan && errors.pan ? (
          <span className="text-red-500 text-sm">{errors.pan}</span>
        ) : null}
      </div>
    </div>
  );
};

export default IdentityDetails;
