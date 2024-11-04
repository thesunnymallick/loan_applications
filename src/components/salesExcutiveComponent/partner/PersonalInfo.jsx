import { DatePicker, Input, Select } from "antd";
import React from "react";
import moment from "moment";
const PersonalInfo = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setFieldValue,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 ">
        <div className=" flex-1 flex flex-col gap-1">
          <label className="text-zinc-600 text-sm" htmlFor="">
            Name
          </label>
          <Input
            size="large"
            placeholder="Enter your name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            status={touched.email && errors.email ? "error" : ""}
          />
          {touched.name && errors.name ? (
            <span className="text-red-500 text-sm">{errors.name}</span>
          ) : null}
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-zinc-600 text-sm" htmlFor="">
            Mobile No
          </label>
          <Input
            name="mobile_number"
            value={values.mobile_number}
            onChange={handleChange}
            onBlur={handleBlur}
            status={
              touched.mobile_number && errors.mobile_number ? "error" : ""
            }
            size="large"
            placeholder="Enter your mobile number"
          />
          {touched.mobile_number && errors.mobile_number ? (
            <span className="text-red-500 text-sm">{errors.mobile_number}</span>
          ) : null}
        </div>

        <div className=" flex-1 flex flex-col gap-1">
          <label className="text-zinc-500 text-sm" htmlFor="">
            Email Id
          </label>
          <Input
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            status={touched.email && errors.email ? "error" : ""}
            size="large"
            placeholder="Enter your email id"
          />
          {touched.email && errors.email ? (
            <span className="text-red-500 text-sm">{errors.email}</span>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-3 ">
        <div className=" flex-1 flex flex-col gap-1">
          <label className="text-zinc-600 text-sm" htmlFor="">
            Whats app number
          </label>
          <Input
            size="large"
            placeholder="Enter whats app number"
            name="whatsapp_number"
            value={values.whatsapp_number}
            onChange={handleChange}
            onBlur={handleBlur}
            status={
              touched.whatsapp_number && errors.whatsapp_number ? "error" : ""
            }
          />
          {touched.whatsapp_number && errors.whatsapp_number ? (
            <span className="text-red-500 text-sm">{errors.email}</span>
          ) : null}
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-zinc-600 text-sm" htmlFor="date_of_birth">
            Date Of Birth
          </label>
          <DatePicker
            name="date_of_birth"
            value={values.date_of_birth}
            onChange={(date)=>setFieldValue("date_of_birth", date)}
            onBlur={handleBlur}
            status={
              touched.date_of_birth && errors.date_of_birth ? "error" : ""
            }
            size="large"
            disabledDate={(current) =>
              current && current >= moment().endOf("day")
            } // Disable today and future dates
          />
          {touched.date_of_birth && errors.date_of_birth ? (
            <span className="text-red-500 text-sm">{errors.date_of_birth}</span>
          ) : null}
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-zinc-500 text-sm" htmlFor="">
            Gender
          </label>
          <Select
            placeholder="Select Gender"
            size="large"
            name="gender"
            value={values.gender}
            onChange={(value) => setFieldValue("gender", value)}
            onBlur={handleBlur}
            status={touched.gender && errors.gender ? "error" : ""}
          >
            <Select.Option value={"male"}>Male</Select.Option>
            <Select.Option value={"female"}>Female</Select.Option>
          </Select>
          {touched.gender && errors.gender ? (
            <span className="text-red-500 text-sm">{errors.gender}</span>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-3 ">
        <div className=" flex-1 flex flex-col gap-1">
          <label className="text-zinc-600 text-sm" htmlFor="">
            Subscription
          </label>
          <Select
            name="subscription"
            value={values.subscription}
            onChange={(value) => setFieldValue("subscription", value)}
            onBlur={handleBlur}
            status={touched.subscription && errors.subscription ? "error" : ""}
            placeholder="Select Subscription"
            size="large"
          >
            <Select.Option value="DSA">DSA</Select.Option>
          </Select>
          {touched.subscription && errors.subscription ? (
            <span className="text-red-500 text-sm">{errors.subscription}</span>
          ) : null}
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-zinc-600 text-sm" htmlFor="">
            Subscription Prize
          </label>
          <Input
            size="large"
            placeholder="Enter Subscription prize"
            name="subscription_price"
            value={values.subscription_price}
            onChange={handleChange}
            onBlur={handleBlur}
            status={
              touched.subscription_price && errors.subscription_price
                ? "error"
                : ""
            }
          />
          {touched.subscription && errors.subscription ? (
            <span className="text-red-500 text-sm">{errors.subscription}</span>
          ) : null}
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-zinc-500 text-sm" htmlFor="">
            Payment Mode
          </label>
          <Select
            name="payment_mode"
            value={values.payment_mode}
            onChange={(value) => setFieldValue("payment_mode", value)}
            onBlur={handleBlur}
            status={touched.payment_mode && errors.payment_mode ? "error" : ""}
            placeholder="Select Payment Mode"
            size="large"
          >
            <Select.Option value="cash">Cash</Select.Option>
          </Select>
          {touched.payment_mode && errors.payment_mode ? (
            <span className="text-red-500 text-sm">{errors.payment_mode}</span>
          ) : null}
        </div>
      </div>

      <div className="flex items-center ">
        <div className="flex flex-col gap-1 w-[40%]">
          <label className="text-zinc-600 text-sm" htmlFor="">
            Payment Transaction Id
          </label>
          <Input
            placeholder="Enter payment transaction id"
            size="large"
            name="payment_txn_id"
            value={values.payment_txn_id}
            onChange={handleChange}
            onBlur={handleBlur}
            status={
              touched.payment_txn_id && errors.payment_txn_id ? "error" : ""
            }
          />
          {touched.payment_txn_id && errors.payment_txn_id ? (
            <span className="text-red-500 text-sm">
              {errors.payment_txn_id}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
