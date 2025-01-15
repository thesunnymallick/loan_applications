import React from "react";
import { Form, Input, Button, notification } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import {withDrawalRequest} from "../../api/partner/walletApi"


const WithdrawlRequest = ({setIsWithdrawl}) => {


 

    const handlewithDrawalRequest = async (values) => {
      try {
        const { status } = await withDrawalRequest(values);
        if (status === 201) {
          setIsWithdrawl(false);
          notification.success({
            message: 'Withdrawal Successful',
            description: 'Your withdrawal request was successfully processed.',
            placement: 'topRight',
          });
        }
      } catch (error) {
        notification.error({
          message: 'Withdrawal Failed',
          description: 'There was an issue processing your withdrawal request. Please try again.',
          placement: 'topRight',
        });
        console.log(error); // Log the error for debugging
      }
    };
    



  const formik = useFormik({
    initialValues: {
      transfer_amount: "",
      tds_amount: "",
      net_amount: "",
      account_holder_name: "",
      bank_name: "",
      bank_account_number: "",
      account_type: "",
      ifsc_code: "",
    },
    validationSchema: Yup.object({
      transfer_amount: Yup.number()
        .required("Transfer amount is required")
        .positive("Must be a positive number"),
      account_holder_name: Yup.string().required("Account holder name is required"),
      bank_name: Yup.string().required("Bank name is required"),
      bank_account_number: Yup.string()
        .required("Bank account number is required")
        .matches(/^\d+$/, "Must be a valid account number"),
      account_type: Yup.string().required("Account type is required"),
      ifsc_code: Yup.string()
        .required("IFSC code is required")
        .matches(/^[A-Za-z]{4}\d{7}$/, "Invalid IFSC code format"),
    }),
    onSubmit: (values) => {
        handlewithDrawalRequest(values)
    },
  });

  // Automatically calculate TDS and Net Amount
  const handleTransferAmountChange = (e) => {
    const transferAmount = parseFloat(e.target.value) || 0;
    const tdsAmount = transferAmount * 0.1; // Assuming TDS is 10%
    const netAmount = transferAmount - tdsAmount;

    formik.setFieldValue("transfer_amount", transferAmount);
    formik.setFieldValue("tds_amount", tdsAmount.toFixed(2));
    formik.setFieldValue("net_amount", netAmount.toFixed(2));
  };

  return (
    <div className="p-6">
      <Form
        layout="vertical"
        onFinish={formik.handleSubmit}
        className="p-4 space-y-4"
      >
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       <Form.Item
          label="Transfer Amount"
          validateStatus={
            formik.touched.transfer_amount && formik.errors.transfer_amount
              ? "error"
              : ""
          }
          help={formik.touched.transfer_amount && formik.errors.transfer_amount}
        >
          <Input
            name="transfer_amount"
            value={formik.values.transfer_amount}
            onChange={handleTransferAmountChange}
            onBlur={formik.handleBlur}
            placeholder="Enter transfer amount"
          />
        </Form.Item>

        <Form.Item label="TDS Amount">
          <Input
            name="tds_amount"
            value={formik.values.tds_amount}
            disabled
            placeholder="TDS amount"
          />
        </Form.Item>

        <Form.Item label="Net Amount">
          <Input
            name="net_amount"
            value={formik.values.net_amount}
            disabled
            placeholder="Net amount"
          />
        </Form.Item>

        <Form.Item
          label="Account Holder Name"
          validateStatus={
            formik.touched.account_holder_name &&
            formik.errors.account_holder_name
              ? "error"
              : ""
          }
          help={
            formik.touched.account_holder_name &&
            formik.errors.account_holder_name
          }
        >
          <Input
            name="account_holder_name"
            value={formik.values.account_holder_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter account holder name"
          />
        </Form.Item>

        <Form.Item
          label="Bank Name"
          validateStatus={
            formik.touched.bank_name && formik.errors.bank_name ? "error" : ""
          }
          help={formik.touched.bank_name && formik.errors.bank_name}
        >
          <Input
            name="bank_name"
            value={formik.values.bank_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter bank name"
          />
        </Form.Item>

        <Form.Item
          label="Bank Account Number"
          validateStatus={
            formik.touched.bank_account_number &&
            formik.errors.bank_account_number
              ? "error"
              : ""
          }
          help={
            formik.touched.bank_account_number &&
            formik.errors.bank_account_number
          }
        >
          <Input
            name="bank_account_number"
            value={formik.values.bank_account_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter bank account number"
          />
        </Form.Item>

        <Form.Item
          label="Account Type"
          validateStatus={
            formik.touched.account_type && formik.errors.account_type
              ? "error"
              : ""
          }
          help={formik.touched.account_type && formik.errors.account_type}
        >
          <Input
            name="account_type"
            value={formik.values.account_type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter account type"
          />
        </Form.Item>

        <Form.Item
          label="IFSC Code"
          validateStatus={
            formik.touched.ifsc_code && formik.errors.ifsc_code ? "error" : ""
          }
          help={formik.touched.ifsc_code && formik.errors.ifsc_code}
        >
          <Input
            name="ifsc_code"
            value={formik.values.ifsc_code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter IFSC code"
          />
        </Form.Item>
       </div>

        <div className="flex justify-end">
          <Button className="bg-green-700 text-white rounded-lg shadow-sm" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default WithdrawlRequest;
