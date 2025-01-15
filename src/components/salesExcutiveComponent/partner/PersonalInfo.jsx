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
  subscription
}) => {

  
  const handleSubscription=(uuid)=>{
     setFieldValue("subscription", uuid)
     const findSubscriptionPrice=subscription.find((item)=>item.uuid===uuid);
     setFieldValue("subscription_price", findSubscriptionPrice.total_price);
  }


  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {/* Name Field */}
    <div className="flex flex-col gap-1">
      <label className="text-zinc-600 text-sm" htmlFor="name">
        Name
      </label>
      <Input
        size="large"
        placeholder="Enter your name"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        status={touched.name && errors.name ? "error" : ""}
      />
      {touched.name && errors.name && (
        <span className="text-red-500 text-sm">{errors.name}</span>
      )}
    </div>
  
    {/* Mobile Number Field */}
    <div className="flex flex-col gap-1">
      <label className="text-zinc-600 text-sm" htmlFor="mobile_number">
        Mobile Number
      </label>
      <Input
        size="large"
        placeholder="Enter your mobile number"
        name="mobile_number"
        value={values.mobile_number}
        onChange={handleChange}
        onBlur={handleBlur}
        status={touched.mobile_number && errors.mobile_number ? "error" : ""}
      />
      {touched.mobile_number && errors.mobile_number && (
        <span className="text-red-500 text-sm">{errors.mobile_number}</span>
      )}
    </div>
  
    {/* Email Field */}
    <div className="flex flex-col gap-1">
      <label className="text-zinc-600 text-sm" htmlFor="email">
        Email ID
      </label>
      <Input
        size="large"
        placeholder="Enter your email ID"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        status={touched.email && errors.email ? "error" : ""}
      />
      {touched.email && errors.email && (
        <span className="text-red-500 text-sm">{errors.email}</span>
      )}
    </div>
  
    {/* WhatsApp Number Field */}
    <div className="flex flex-col gap-1">
      <label className="text-zinc-600 text-sm" htmlFor="whatsapp_number">
        WhatsApp Number
      </label>
      <Input
        size="large"
        placeholder="Enter your WhatsApp number"
        name="whatsapp_number"
        value={values.whatsapp_number}
        onChange={handleChange}
        onBlur={handleBlur}
        status={
          touched.whatsapp_number && errors.whatsapp_number ? "error" : ""
        }
      />
      {touched.whatsapp_number && errors.whatsapp_number && (
        <span className="text-red-500 text-sm">{errors.whatsapp_number}</span>
      )}
    </div>
  
    {/* Date of Birth Field */}
    <div className="flex flex-col gap-1">
      <label className="text-zinc-600 text-sm" htmlFor="date_of_birth">
        Date of Birth
      </label>
      <DatePicker
        name="date_of_birth"
        value={values.date_of_birth}
        onChange={(date) => setFieldValue("date_of_birth", date)}
        onBlur={handleBlur}
        status={touched.date_of_birth && errors.date_of_birth ? "error" : ""}
        size="large"
        disabledDate={(current) => current && current >= moment().endOf("day")}
      />
      {touched.date_of_birth && errors.date_of_birth && (
        <span className="text-red-500 text-sm">{errors.date_of_birth}</span>
      )}
    </div>
  
    {/* Gender Field */}
    <div className="flex flex-col gap-1">
      <label className="text-zinc-600 text-sm" htmlFor="gender">
        Gender
      </label>
      <Select
        size="large"
        placeholder="Select Gender"
        name="gender"
        value={values.gender}
        onChange={(value) => setFieldValue("gender", value)}
        onBlur={handleBlur}
        status={touched.gender && errors.gender ? "error" : ""}
      >
        <Select.Option value="male">Male</Select.Option>
        <Select.Option value="female">Female</Select.Option>
      </Select>
      {touched.gender && errors.gender && (
        <span className="text-red-500 text-sm">{errors.gender}</span>
      )}
    </div>
  
    {/* Subscription Field */}
    <div className="flex flex-col gap-1">
      <label className="text-zinc-600 text-sm" htmlFor="subscription">
        Subscription
      </label>
      <Select
        size="large"
        placeholder="Select Subscription"
        name="subscription"
        value={values.subscription}
        onChange={(value) => handleSubscription(value)}
        onBlur={handleBlur}
        status={touched.subscription && errors.subscription ? "error" : ""}
      >
        {subscription.map((item) => (
          <Select.Option key={item.uuid} value={item.uuid}>
            {item.subscription_name}
          </Select.Option>
        ))}
      </Select>
      {touched.subscription && errors.subscription && (
        <span className="text-red-500 text-sm">{errors.subscription}</span>
      )}
    </div>
  
    {/* Subscription Price Field */}
    <div className="flex flex-col gap-1">
      <label className="text-zinc-600 text-sm" htmlFor="subscription_price">
        Subscription Price
      </label>
      <Input
        size="large"
        placeholder="Subscription price"
        name="subscription_price"
        value={values.subscription_price}
        disabled
        status={touched.subscription_price && errors.subscription_price ? "error" : ""}
      />
    </div>
  
    {/* Payment Mode Field */}
    <div className="flex flex-col gap-1">
      <label className="text-zinc-600 text-sm" htmlFor="payment_mode">
        Payment Mode
      </label>
      <Select
        size="large"
        placeholder="Select Payment Mode"
        name="payment_mode"
        value={values.payment_mode}
        onChange={(value) => setFieldValue("payment_mode", value)}
        onBlur={handleBlur}
        status={touched.payment_mode && errors.payment_mode ? "error" : ""}
      >
        <Select.Option value="cash">Cash</Select.Option>
      </Select>
      {touched.payment_mode && errors.payment_mode && (
        <span className="text-red-500 text-sm">{errors.payment_mode}</span>
      )}
    </div>
  
    {/* Payment Transaction ID Field */}
    <div className="flex flex-col gap-1">
      <label className="text-zinc-600 text-sm" htmlFor="payment_txn_id">
        Payment Transaction ID
      </label>
      <Input
        size="large"
        placeholder="Enter Payment Transaction ID"
        name="payment_txn_id"
        value={values.payment_txn_id}
        onChange={handleChange}
        onBlur={handleBlur}
        status={
          touched.payment_txn_id && errors.payment_txn_id ? "error" : ""
        }
      />
      {touched.payment_txn_id && errors.payment_txn_id && (
        <span className="text-red-500 text-sm">{errors.payment_txn_id}</span>
      )}
    </div>
  </div>
  
  
  );
};

export default PersonalInfo;
