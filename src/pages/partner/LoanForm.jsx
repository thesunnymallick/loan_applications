import { Button, DatePicker, Input, Select } from "antd";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoanForm = ({ loanType }) => {
  console.log(loanType);

  let loanHeading = "";



  const initialValues = {
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    pan: "",
    employment_type: "",
    company_name: "",
    company_type: "",
    loan_amount: "",
    tenure:"",
    dob: "",
    monthly_income: "",
    residence_address: "",
    residence_pincode: "",
    mother_name: "",
    reference_name_1: "",
    reference_phone_1: "",
    reference_name_2: "",
    reference_phone_2: "",
    loan_mode: "",
  };


  if (loanType === "personalLoan") {
    loanHeading = "Personal Loan";
  } else if (loanType === "businessLoan") {
    loanHeading = "Business Loan";
  }
  else if(loanType==="homeLoan"){
    loanHeading = "Home Loan";
  }
  else if(loanType==="loanAgainstProperty"){
    loanHeading = "Loan Against Property";
  }
  else if(loanType==="carLoan"){
    loanHeading = "Car Loan";
  }
  else if(loanType==="oldCarLoan"){
    loanHeading = "Old Car Loan";
  }




  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link
            to={"/our-panels/loan-panels"}
            className="text-zinc-800 font-semibold text-xl"
          >
            <FaArrowLeft />{" "}
          </Link>
          <h2 className="text-zinc-800 font-semibold text-xl">{loanHeading}</h2>
        </div>
        <div className="flex justify-end items-center gap-4 py- w-[30%]">
            <Button className="w-[35%] h-10 rounded-lg ">Cancel</Button>
            <Button className="w-[35%] h-10 bg-green-700 text-white rounded-lg">Save</Button>
            
        </div>
      </div>
     
      <form className="p-6  bg-white rounded-lg shadow-sm my-3">
     <div className="grid grid-cols-4 gap-4">
              
        {/* Loan Mode */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="loan-mode">
            Loan Mode
          </label>
          <Select id="loan-mode" size="large" placeholder="Select Mode">
            <Select.Option value="new">New</Select.Option>
            <Select.Option value="renew">Renew</Select.Option>
          </Select>
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="amount">
            Amount
          </label>
          <Input id="amount" size="large" placeholder="Enter Loan Amount" />
        </div>

        {/* Tenure */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="tenure">
            Tenure
          </label>
          <Input id="tenure" size="large" placeholder="Tenure" />
        </div>

        {/* DOB */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="dob">
            DOB
          </label>
          <DatePicker
            id="dob"
            size="large"
            placeholder="Select DOB"
            style={{ width: "100%" }}
          />
        </div>

        {/* First Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="first-name">
            First Name
          </label>
          <Input id="first-name" size="large" placeholder="Enter First Name" />
        </div>

        {/* Middle Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="middle-name">
            Middle Name
          </label>
          <Input
            id="middle-name"
            size="large"
            placeholder="Enter Middle Name"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="last-name">
            Last Name
          </label>
          <Input id="last-name" size="large" placeholder="Enter Last Name" />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            size="large"
            placeholder="Enter Email"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="phone">
            Phone
          </label>
          <Input id="phone" size="large" placeholder="Enter Phone Number" />
        </div>

        {/* PAN */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="pan">
            PAN
          </label>
          <Input id="pan" size="large" placeholder="Enter PAN Number" />
        </div>

        {/* Employment Type */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="employment-type">
            Employment Type
          </label>
          <Select
            id="employment-type"
            size="large"
            placeholder="Employment Type"
          >
            <Select.Option value="salaried">Salaried</Select.Option>
            <Select.Option value="self-employed">Self-Employed</Select.Option>
          </Select>
        </div>

        {/* Company Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="company-name">
            Company Name
          </label>
          <Input
            id="company-name"
            size="large"
            placeholder="Enter Company Name"
          />
        </div>

        {/* Company Type */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="company-type">
            Company Type
          </label>
          <Input id="company-type" size="large" placeholder="Company Type" />
        </div>

        {/* Monthly Income */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="monthly-income">
            Monthly Income
          </label>
          <Input id="monthly-income" size="large" placeholder="Enter Income" />
        </div>

        {/* Residence Address */}
        <div className="flex flex-col gap-1 col-span-2">
          <label className="text-sm text-zinc-800" htmlFor="residence-address">
            Residence Address
          </label>
          <Input
            id="residence-address"
            size="large"
            placeholder="Enter Residence Address"
          />
        </div>

        {/* Residence Pincode */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="residence-pincode">
            Residence Pincode
          </label>
          <Input
            id="residence-pincode"
            size="large"
            placeholder="Enter Residence Pincode"
          />
        </div>

        {/* Mother Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="mother-name">
            Mother Name
          </label>
          <Input
            id="mother-name"
            size="large"
            placeholder="Enter Mother Name"
          />
        </div>

        {/* Reference Name 1 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="reference-name1">
            Reference Name 1
          </label>
          <Input
            id="reference-name1"
            size="large"
            placeholder="Enter Reference Name"
          />
        </div>

        {/* Reference Phone 1 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="reference-phone1">
            Reference Phone 1
          </label>
          <Input
            id="reference-phone1"
            size="large"
            placeholder="Enter Reference Contact No"
          />
        </div>

        {/* Reference Name 2 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="reference-name2">
            Reference Name 2
          </label>
          <Input
            id="reference-name2"
            size="large"
            placeholder="Enter Reference Name"
          />
        </div>

        {/* Reference Phone 2 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-800" htmlFor="reference-phone2">
            Reference Phone 2
          </label>
          <Input
            id="reference-phone2"
            size="large"
            placeholder="Enter Reference Contact No"
          />
        </div>
     </div>
      </form>
    </div>
  );
};

export default LoanForm;
