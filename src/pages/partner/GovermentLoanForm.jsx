import { Input, Select, Button } from "antd";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

const GovermentLoanForm = () => {
  const { loanType } = useParams();
  const { Option } = Select;

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center gap-2">
        <Link
          to="/our-panels/govermentLoan"
          className="text-zinc-800 font-semibold text-2xl"
        >
          <IoMdArrowRoundBack />
        </Link>
        <h1 className="text-zinc-700 font-semibold text-xl">
          Create New {loanType}
        </h1>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-5">
        <div className="grid grid-cols-4 gap-4">
          {/* Input Fields */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Loan Amount Requirement
            </label>
            <Input size="large" placeholder="Enter Loan Amount" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Type of Applicant
            </label>
            <Select size="large" placeholder="Select Applicant Type">
              <Option value="individual">Individual</Option>
              <Option value="startup">Startup</Option>
              <Option value="existing-business">Existing Business Owner</Option>
              <Option value="women-entrepreneur">Women Entrepreneur</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Type of Activity
            </label>
            <Select
              size="large"
              placeholder="Select Type of Activity"
              className="w-full"
            >
              <Option value="trader">Trader</Option>
              <Option value="artisan">Artisan (Handmade Worker)</Option>
              <Option value="shopkeeper">Shopkeeper</Option>
              <Option value="small-manufacturer">Small Manufacturer</Option>
              <Option value="retailer">Retailer</Option>
              <Option value="service-provider">Service Provider</Option>
              <Option value="other">Other</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Applicant Name
            </label>
            <Input size="large" placeholder="Enter Full Name" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Applicant Email
            </label>
            <Input size="large" placeholder="Enter Applicant Email" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Applicant DOB (As on PAN Card)
            </label>
            <Input type="date" size="large" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Gender
            </label>
            <Select size="large" placeholder="Select Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Applicant PAN Number
            </label>
            <Input size="large" placeholder="Enter PAN Number" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Father Name
            </label>
            <Input size="large" placeholder="Enter Father Name" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Mobile Number
            </label>
            <Input size="large" placeholder="Enter Mobile Number" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Alternate Number
            </label>
            <Input size="large" placeholder="Enter Alternate Number" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Applicant Marital Status
            </label>
            <Select size="large" placeholder="Select Marital Status">
              <Option value="single">Single</Option>
              <Option value="married">Married</Option>
              <Option value="divorced">Divorced</Option>
              <Option value="widowed">Widowed</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              If married, then name of spouse
            </label>
            <Input
              size="large"
              placeholder="Enter If married, then name of spouse"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Number of Children (if any)
            </label>
            <Input
              size="large"
              placeholder="Enter Number of Children (if any)"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Purpose of Loan
            </label>
            <Select
              size="large"
              placeholder="Select Purpose of Loan"
              className="w-full"
            >
              <Option value="supporting-existing-business">
                Supporting Existing Business
              </Option>
              <Option value="extension-existing-business">
                Extension of Existing Business
              </Option>
              <Option value="starting-new-business">
                Starting Fresh/New Business
              </Option>
            </Select>
          </div>

          <div className="flex flex-col gap-1 col-span-4">
            <label className="text-sm text-zinc-800 font-semibold">
              Brief us! What client will do by the loan amount
            </label>
            <Input.TextArea rows={2} placeholder="Describe the loan purpose" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Type of Loan
            </label>
            <Select size="large" placeholder="Select Type of Loan">
              <Option value="term-loan">
                Term Loan (if to purchase assets, machinery, building
                renovation, or other similar items)
              </Option>
              <Option value="cc-limit">
                CC Limit (if to purchase stock, raw material, or require working
                capital for business)
              </Option>
              <Option value="both">Both (if require both)</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Monthly Salary
            </label>
            <Input size="large" placeholder="Enter Monthly Salary" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Experience in Current Business Line
            </label>
            <Input size="large" placeholder="Enter Years of Experience" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Duration of Loan
            </label>
            <Select
              size="large"
              placeholder="Select Loan Duration"
              className="w-full"
            >
              <Option value="1-year">1 Year</Option>
              <Option value="2-year">2 Years</Option>
              <Option value="3-year">3 Years</Option>
              <Option value="4-year">4 Years</Option>
              <Option value="5-year">5 Years</Option>
              <Option value="6-year">6 Years</Option>
              <Option value="7-year">7 Years</Option>
              <Option value="8-year">8 Years</Option>
              <Option value="9-year">9 Years</Option>
              <Option value="10-year">10 Years</Option>
              <Option value="more-than-10-years">More than 10 Years</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Type of Residence Property
            </label>
            <Select size="large" placeholder="Select Residence Type">
              <Option value="owned">Owned</Option>
              <Option value="family">Family</Option>
              <Option value="rented">Rented</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Type of Official/Shop Property
            </label>
            <Select size="large" placeholder="Select Official/Shop Type">
              <Option value="owned">Owned</Option>
              <Option value="family">Family</Option>
              <Option value="rented">Rented</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Applicant Resident Pincode
            </label>
            <Input size="large" placeholder="Enter Resident Pincode" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Applicant Profession
            </label>
            <Select
              size="large"
              placeholder="Select Applicant Profession"
              className="w-full"
            >
              <Option value="salaried">Salaried</Option>
              <Option value="self-employed">Self Employed</Option>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Business Operating Since
            </label>
            <Input size="large" placeholder="Enter Business Operating Since" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Experience in Current Business Line{" "}
            </label>
            <Input
              size="large"
              placeholder="Enter Experience in Current Business Line"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Duration at Current Address
            </label>
            <Input
              size="large"
              placeholder="Enter Duration at Current Address"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Does Applicant File ITR?
            </label>
            <Select size="large" placeholder="Select Option">
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Is Applicant GST Registered?
            </label>
            <Select size="large" placeholder="Select Option">
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Any other Loan is running of Applicant?
            </label>
            <Select size="large" placeholder="Select Option">
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-1 col-span-4">
            <label className="text-sm text-zinc-800 font-semibold">
              If any other loan is running, provide details
            </label>
            <Input.TextArea
              rows={2}
              placeholder="Enter loan details if applicable"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Specify Caste of Client
            </label>
            <Select size="large" placeholder="Select Caste" >
              <Option value="general">General</Option>
              <Option value="sc-st">SC/ST</Option>
              <Option value="minority">Minority</Option>
              <Option value="obc">OBC</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Bank Name
            </label>
            <Input size="large" placeholder="Enter Bank Name" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              Account Number
            </label>
            <Input size="large" placeholder="Enter Account Number" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-800 font-semibold">
              IFSC Code
            </label>
            <Input size="large" placeholder="Enter IFSC Code" />
          </div>
        </div>

        <div className="flex flex-col gap-1 col-span-4 mt-2">
          <label className="text-sm text-zinc-800 font-semibold">
            Other Bank(IF Any):- Name, Account Number, IFSC Code
          </label>
          <Input.TextArea
            rows={2}
            placeholder="if have other bank, provide all details"
          />
        </div>

        <div className="mt-8 bg-gray-100 p-4 rounded border border-gray-300">
          <p className="text-sm text-gray-600">
            <strong>Disclaimer:</strong> (Read it carefully before submitting
            this form)
          </p>
          <p className="text-sm text-gray-600 mt-2">
            We at <strong>Incomekaro</strong> only prepare the documents which
            are required for the purpose of filing. We don't commit to loan
            approval. Bank has the sole discretion for disbursal of the loan
            amount.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            We at <strong>Incomekaro</strong> are bound by the rules and
            regulations issued by the Government of India. Loan approval is
            based on the financials, credibility, and many other parameters of
            the applicant.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Submitting this form means you have read the above Disclaimer and
            agreed.
          </p>
        </div>

        {/* Submit Section */}
        <div className="flex justify-end gap-4 mt-6">
          <Button size="large" className="rounded-lg w-[10%] h-10" danger>
            Cancel
          </Button>
          <Button
            size="large"
            className="bg-green-700 text-white rounded-lg w-[10%] h-10"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GovermentLoanForm;
