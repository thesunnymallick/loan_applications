import React, { useEffect, useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import { Tabs } from "antd";
import UploadDocView from "../../components/salesExcutiveComponent/partner/UploadDocView";
import { getPartnerProfileInfo } from "../../api/partner/profileApi";
import dayjs from "dayjs";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AgreementPDF from "./AgreementPDF";
import { getAgrementDetails } from "../../api/partner/uploadDocApi";
import ProfileShimmerUi from "../../components/shimmerUi/ProfileShimmerUi";
import LazyImage from "../../components/LazyImage";
const { TabPane } = Tabs;

const PartnerProfile = () => {
  const [info, setInfo] = useState(null);
  const [aggrementDetails, setAgreementDeatils]=useState(null)
  const [loading, setLoading]=useState(false);

  // get user info
  useEffect(() => {
    // get partner profile info
    const handlePartnerProfileInfo = async () => {
      try {
         setLoading(true);
        const { status, data } = await getPartnerProfileInfo();
        if (status === 200) {
           setLoading(false);
          setInfo(data?.partner);
          console.log(data?.partner);
          setInfo({
            ...data?.partner,
            rm_details: data?.relationship_manager,
            selea_Deatils: data?.sales_executive,
            subscription_details: data?.subscription_details,
          });
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    // get partner profile info
    handlePartnerProfileInfo();
  }, []);


  useEffect(()=>{
    const fetchAgrementDetails=async()=>{
     try {
      const {data, status}=await getAgrementDetails();
      if(status===200){
        setAgreementDeatils(data)
      }
     } catch (error) {
      console.log(error)
     }
    }
    fetchAgrementDetails()
    },[])

  return (
    <>
    {
      loading!==true ? ( <div className="p-6 flex flex-col gap-6 md:flex-row">
        {/* Left Section: Profile Image and Info */}
        <div className="w-full md:w-[30%] bg-white rounded-lg shadow-sm p-4">
          <div className="w-full flex justify-center overflow-hidden rounded-full">
            <LazyImage
              className="w-[80%] object-cover rounded-full"
              src={info?.documents?.userPhoto}
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
  
        {/* Right Section: Details */}
        <div className="w-full md:w-[80%] bg-white rounded-lg shadow-sm p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
            {/* Individual Info Blocks */}
            <div className="flex flex-col text-zinc-600">
              <span>Id</span>
              <span className="text-zinc-700 font-semibold">{info?.uuid}</span>
            </div>
            <div className="flex flex-col text-zinc-600">
              <span>RM Name</span>
              <span className="text-zinc-700 font-semibold">
                {info?.rm_details?.name}
              </span>
            </div>
            <div className="flex   flex-col text-zinc-600">
              <span>RM Phone</span>
              <span className="text-zinc-700 font-semibold">
                {info?.rm_details?.mobile}
              </span>
            </div>
            <div className="flex flex-col text-zinc-600">
              <span>Plan Name</span>
              <span className="text-zinc-700 font-semibold">
                {info?.subscription_details?.name}
              </span>
            </div>
            <div className="flex flex-col text-zinc-600">
              <span>Joining Date</span>
              <span className="text-zinc-700 font-semibold">
                {dayjs(info?.joining_date).format("Do MMMM YYYY")}
              </span>
            </div>
            <div className="flex flex-col text-zinc-600">
              <span>State</span>
              <span className="text-zinc-700 font-semibold">
                {info?.permanent_address?.state}
              </span>
            </div>
          </div>
  
          {/* Download Button */}
          <div className="flex justify-center mt-8">
           
            <button className="w-[40%] md:w-[20%] h-10 flex justify-center items-center gap-2 bg-green-700 text-white rounded-md">
            <PDFDownloadLink
              document={<AgreementPDF aggrementDetails={aggrementDetails} />}
              fileName="Agreement.pdf"
            >
              {({ loading }) =>
                loading ? "Preparing document..." : <span className="flex items-center gap-2"> <span>
              <FaFileDownload />
            </span>
            <span>Download</span></span>
              }
           
            </PDFDownloadLink>
              </button>
          </div>
  
          {/* Tabs Section */}
          <Tabs defaultActiveKey="1" onChange={(key) => console.log(key)}>
            <TabPane tab="About" key="1">
              <div className="h-[40vh] overflow-x-auto">
                {/* Personal Details */}
                <div>
                  <h2 className="text-zinc-800 font-semibold text-lg">
                    Personal Details
                  </h2>
                  <div className="p-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Personal Info Items */}
                    {[
                      "Name",
                      "Email",
                      "Mobile",
                      "WhatsApp No",
                      "Gender",
                      "Date Of Birth",
                    ].map((label, index) => (
                      <div className="flex flex-col text-zinc-600" key={index}>
                        <span>{label}</span>
                        <span className="text-zinc-700 font-semibold">
                          {
                            info?.personal_details?.[
                              label.toLowerCase().replace(/ /g, "_")
                            ]
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
  
                <div>
                  <h2 className="text-zinc-800 font-semibold text-lg">
                    Subscription Details
                  </h2>
                  <div className="p-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Personal Info Items */}
                    {["name", "price"].map((label, index) => (
                      <div className="flex flex-col text-zinc-600" key={index}>
                        <span>{label}</span>
                        <span className="text-zinc-700 font-semibold">
                          {
                            info?.subscription_details?.[
                              label.toLowerCase().replace(/ /g, "_")
                            ]
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
  
                {/* Banking Details */}
                <div className="mt-3">
                  <h2 className="text-zinc-800 font-semibold text-lg">
                    Banking Details
                  </h2>
                  <div className="p-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {[
                      "Bank Name",
                      "Ifsc Code",
                      "Account Number",
                      "Account Name",
                    ].map((label, index) => (
                      <div className="flex flex-col text-zinc-600" key={index}>
                        <span>{label}</span>
                        <span className="text-zinc-700 font-semibold">
                          {
                            info?.banking_details?.[
                              label.toLowerCase().replace(/ /g, "_")
                            ]
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
  
                {/* Identity Details */}
                <div className="mt-3">
                  <h2 className="text-zinc-800 font-semibold text-lg">
                    Identity Details
                  </h2>
                  <div className="p-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {["GST", "Aadhar Number", "Pan Number"].map(
                      (label, index) => (
                        <div className="flex flex-col text-zinc-600" key={index}>
                          <span>{label}</span>
                          <span className="text-zinc-700 font-semibold">
                            {
                              info?.identity_details?.[
                                label.toLowerCase().replace(/ /g, "_")
                              ]
                            }
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
  
                {/* Address Details */}
                <div className="mt-3">
                  <h2 className="text-zinc-800 font-semibold text-lg">
                    Permanent Address
                  </h2>
                  <div className="p-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {["City", "Pincode", "State", "Address"].map(
                      (label, index) => (
                        <div className="flex flex-col text-zinc-600" key={index}>
                          <span>{label}</span>
                          <span className="text-zinc-700 font-semibold">
                            {info?.permanent_address?.[label.toLowerCase()]}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
  
                {/* Office Address */}
                <div className="mt-3">
                  <h2 className="text-zinc-800 font-semibold text-lg">
                    Office Address
                  </h2>
                  <div className="p-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {["City", "Pincode", "State", "Address"].map(
                      (label, index) => (
                        <div className="flex flex-col text-zinc-600" key={index}>
                          <span>{label}</span>
                          <span className="text-zinc-700 font-semibold">
                            {info?.office_address?.[label.toLowerCase()]}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </TabPane>
  
            {/* Upload Documents Tab */}
            <TabPane tab="Upload Documents" key="2">
              <UploadDocView info={info} />
            </TabPane>
          </Tabs>
        </div>
      </div>) : (<ProfileShimmerUi/>)
    }
   </>
  );
};

export default PartnerProfile;
