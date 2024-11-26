import React, { useEffect, useState } from "react";
import userImage from "../../assets/user.jpg";
import { FaFileDownload } from "react-icons/fa";
import { Tabs } from "antd";
import UploadDocView from "../../components/salesExcutiveComponent/partner/UploadDocView";
import { getPartnerProfileInfo } from "../../api/partner/profileApi";
import dayjs from "dayjs";
const { TabPane } = Tabs;

const PartnerProfile = () => {

  const [info, setInfo]=useState(null);

  // get user info 
  useEffect(()=>{
   
    // get partner profile info
   const handlePartnerProfileInfo=async()=>{
    try {
      const {status, data}=await getPartnerProfileInfo();
       if(status===200){
        setInfo(data?.partner);
       }
    } catch (error) {
       console.log(error)
    }
   }

   // get partner profile info
   handlePartnerProfileInfo();



  },[])


  // "id": 2,
  //       "uuid": "IK-000002",
  //       "name": "Sunny",
  //       "mobile": "6297179586",
  //       "email": "alfesunnymallick2000@gmail.com",
  //       "is_email_verified": 1,
  //       "payment_transaction_id": null,
  //       "payment_txn_id": "TXN987654321",
  //       "": {
  //           "name": "Sunny",
  //           "email": "alfesunnymallick2000@gmail.com",
  //           "mobile": "6297179586",
  //           "whatsapp_no": "1234567890",
  //           "gender": "female",
  //           "date_of_birth": "1985-05-15",
  //           "subscription": "premium",
  //           "subscription_price": "199.99"
  //       },
  //       "permanent_address": {
  //           "address": "Kolkata",
  //           "city": "West Bengal",
  //           "pincode": "722208",
  //           "state": "CA"
  //       },
  //       "office_address": {
  //           "address": "321 Business Blvd",
  //           "city": "Gotham",
  //           "pincode": "456789",
  //           "state": "TX"
  //       },
  //       "banking_details": {
  //           "bank_name": null,
  //           "account_number": null,
  //           "ifsc_code": null,
  //           "branch": null,
  //           "bank account name": ""
  //       },
  //       "identity_details": {
  //           "gst": null,
  //           "pan number": null,
  //           "aadhar number": null
  //       },
  //       "userPhoto": "https://api.incomekaro.in/images/1731990450_userPhoto.jpg",
  //       "aadhar_front_image": "https://api.incomekaro.in/images/1731990450_aadhar_front_image.jpg",
  //       "aadhar_back_image": "https://api.incomekaro.in/images/1731990450_aadhar_back_image.jpg",
  //       "pan_card_image": "https://api.incomekaro.in/images/1731990450_pan_card_image.jpg",
  //       "blank_cheque_image": "https://api.incomekaro.in/images/1731990450_blank_cheque_image.jpeg",
  //       "is_aadhar_front_verified": 1,
  //       "is_aadhar_back_verified": 1,
  //       "is_pan_card_verified": 1,
  //       "is_blank_cheque_verified": 1,
  //       "is_user_photo_verified": 1,



  return (
    <div className="p-6 flex gap-3">
      <div className="w-[30%] bg-white rounded-lg shadow-sm p-4">
        <div className="w-full flex justify-center  overflow-hidden rounded-lg">
          <img
            className="w-[80%] object-cover rounded-lg"
            src={info?.userPhoto}
            alt="Partner Profile"
          />
        </div>
        <div className="px-2">
          <div className="flex flex-col items-center py-3">
            <h1 className="text-zinc-700 font-semibold text-2xl">
              {info?.name}
            </h1>
            <span className="flex items-center gap-2 text-base text-zinc-600">
              (<span>ID:</span>
              <span className="font-semibold">{info?.uuid}</span>)
            </span>
          </div>
        </div>
      </div>
      <div className="w-[80%] bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-3  gap-4 px-6">
          <div className="flex flex-col text-zinc-600">
            <span>Id</span>
            <span className="text-zinc-700 font-semibold">{info?.uuid}</span>
          </div>
          <div className="flex flex-col text-zinc-600">
            <span>RM Name</span>
            <span className="text-zinc-700 font-semibold">DIPAK MANDAL</span>
          </div>
          <div className="flex flex-col text-zinc-600">
            <span>RM Phone</span>
            <span className="text-zinc-700 font-semibold">9091963351</span>
          </div>
          <div className="flex flex-col text-zinc-600">
            <span>Plan Name</span>
            <span className="text-zinc-700 font-semibold">{info?.personal_details?.subscription}</span>
          </div>
          <div className="flex flex-col text-zinc-600">
            <span>Joining Date</span>
            <span className="text-zinc-700 font-semibold">
              { dayjs(info?.joining_date).format("Do MMMM YYYY")}
            </span>
          </div>
          <div className="flex flex-col text-zinc-600">
            <span>State</span>
            <span className="text-zinc-700 font-semibold">WEST BENGAL</span>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className=" w-[20%] h-10 flex justify-center items-center gap-2 bg-green-700 text-white rounded-md">
            <span>
              <FaFileDownload />
            </span>
            <span>Download</span>
          </button>
        </div>

        <div className="">
          <Tabs defaultActiveKey="1" onChange={(key) => console.log(key)}>
            <TabPane tab="About" key="1">
              <div className="h-[40vh] overflow-x-auto">
              <div className="">
                <h2 className="text-zinc-800 font-semibold text-lg">
                  Personal Details
                </h2>
                <div className="p-2 grid grid-cols-3  gap-4">
                  <div className="flex flex-col text-zinc-600">
                    <span className="">Name</span>
                    <span className="text-zinc-700 font-semibold">
                      {info?.personal_details?.name}
                    </span>
                  </div>
                  <div className="flex flex-col text-zinc-600">
                    <span className="">Email</span>
                    <span className="text-zinc-700 font-semibold">
                      {info?.personal_details?.email}
                    </span>
                  </div>

                  <div className="flex flex-col text-zinc-600">
                    <span className="">Phone No</span>
                    <span className="text-zinc-700 font-semibold">
                      {info?.personal_details?.mobile}
                    </span>
                  </div>

                  <div className="flex flex-col text-zinc-600">
                    <span className="">WhatsApp No</span>
                    <span className="text-zinc-700 font-semibold">
                      {info?.personal_details?.whatsapp_no}
                    </span>
                  </div>
                  <div className="flex flex-col text-zinc-600">
                    <span className="">Gender</span>
                    <span className="text-zinc-700 font-semibold">
                      {info?.personal_details?.gender}
                    </span>
                  </div>

                  <div className="flex flex-col text-zinc-600">
                    <span className="">Date Of Birth</span>
                    <span className="text-zinc-700 font-semibold">
                      {dayjs(info?.personal_details?.date_of_birth).format("DD-MM-YYYY")}
                    </span>
                  </div>

                  <div className="flex flex-col text-zinc-600">
                    <span className="">Subscription</span>
                    <span className="text-zinc-700 font-semibold">
                      {info?.personal_details?.subscription}
                    </span>
                  </div>
                  <div className="flex flex-col text-zinc-600">
                    <span className="">Subscription Prize</span>
                    <span className="text-zinc-700 font-semibold">{info?.personal_details?.subscription_price}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <h2 className="text-zinc-800 font-semibold text-lg">
                Banking Details
                </h2>

                <div className="p-2 grid grid-cols-3 gap-2">

                <div className="flex flex-col text-zinc-600">
                    <span className="">Bank Name</span>
                    <span className="text-zinc-700 font-semibold">
                      {info?.banking_details?.bank_name}
                    </span>
                </div>

                <div className="flex flex-col text-zinc-600">
                    <span className="">Bank Ifsc</span>
                    <span className="text-zinc-700 font-semibold">
                    {info?.banking_details?.ifsc_code}
                    </span>
                </div>

                <div className="flex flex-col text-zinc-600">
                    <span className="">Bank Account No</span>
                    <span className="text-zinc-700 font-semibold">
                     {info?.banking_details?.account_number}
                    </span>
                </div>
                <div className="flex flex-col text-zinc-600">
                    <span className="">Bank Account Name</span>
                    <span className="text-zinc-700 font-semibold">
                     {info?.banking_details?.bank_account_name}
                    </span>
                </div>

                </div>
              </div>

              <div className="mt-3">
                <h2 className="text-zinc-800 font-semibold text-lg">
                Identity Details
                </h2>

                <div className="p-2 grid grid-cols-3 gap-2">

                <div className="flex flex-col text-zinc-600">
                    <span className="">GST</span>
                    <span className="text-zinc-700 font-semibold">
                      {info?.identity_details?.gst}
                    </span>
                </div>

                <div className="flex flex-col text-zinc-600">
                    <span className="">Aadhar No</span>
                    <span className="text-zinc-700 font-semibold">
                    {info?.identity_details?.aadhar_number}
                    </span>
                </div>

                <div className="flex flex-col text-zinc-600">
                    <span className="">Pan No</span>
                    <span className="text-zinc-700 font-semibold">
                     {info?.identity_details?.pan_number}
                    </span>
                </div>

                </div>
              </div>

              <div className="mt-3">
                <h2 className="text-zinc-800 font-semibold text-lg">
                  Permanent Address
                </h2>

                <div className="p-2 grid grid-cols-3 gap-2">

                <div className="flex flex-col text-zinc-600">
                    <span className="">City</span>
                    <span className="text-zinc-700 font-semibold">
                      Bankura
                    </span>
                </div>

                <div className="flex flex-col text-zinc-600">
                    <span className="">Pincode</span>
                    <span className="text-zinc-700 font-semibold">
                       722208
                    </span>
                </div>

                <div className="flex flex-col text-zinc-600">
                    <span className="">State</span>
                    <span className="text-zinc-700 font-semibold">
                     westbengal
                    </span>
                </div>
                <div className="flex flex-col text-zinc-600">
                    <span className="">Address</span>
                    <span className="text-zinc-700 font-semibold">
                    UTTAR KATGAON, DIGHABANA HAT, CHOPRA, UTTAR DINAJPUR, WEST BENGAL, 733207
                    </span>
                </div>

                </div>
              </div>
              <div className="mt-3">
                <h2 className="text-zinc-800 font-semibold text-lg">
                Office Address
                </h2>

                <div className="p-2 grid grid-cols-3 gap-2">

                <div className="flex flex-col text-zinc-600">
                    <span className="">City</span>
                    <span className="text-zinc-700 font-semibold">
                      Bankura
                    </span>
                </div>

                <div className="flex flex-col text-zinc-600">
                    <span className="">Pincode</span>
                    <span className="text-zinc-700 font-semibold">
                       722208
                    </span>
                </div>

                <div className="flex flex-col text-zinc-600">
                    <span className="">State</span>
                    <span className="text-zinc-700 font-semibold">
                     westbengal
                    </span>
                </div>
                <div className="flex flex-col text-zinc-600">
                    <span className="">Address</span>
                    <span className="text-zinc-700 font-semibold">
                    UTTAR KATGAON, DIGHABANA HAT, CHOPRA, UTTAR DINAJPUR, WEST BENGAL, 733207
                    </span>
                </div>

                </div>
              </div>
              </div>
            </TabPane>
            <TabPane tab="Upload Documents" key="2">
              <UploadDocView/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;
