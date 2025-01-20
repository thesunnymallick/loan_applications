import React, { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import certificate from "../../assets/certificate.png";
import authorisation from "../../assets/authorisation.png";
import { getCertificateDetails } from '../../api/partner/uploadDocApi';

const Certificate = () => {
  const certificateRef = useRef(null);
  const authorisationRef = useRef(null);
  const [certificateDetails, setCertificateDetails]=useState(null);

  const downloadImage = (ref, fileName) => {
    if (ref.current) {
      toPng(ref.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = fileName;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error(`Error while downloading ${fileName}:`, error);
        });
    }
  };


  useEffect(()=>{

    const fetchCertificateDetails=async()=>{
      try {
        const {data, status}= await getCertificateDetails();
         if(status===200){
           setCertificateDetails(data);
         }
      } catch (error) {
        console.log(error)
      }
    }

    fetchCertificateDetails();

  },[])


  const PARTNER_NAME=certificateDetails?.PARTNER_NAME
  const PARTNER_ID=certificateDetails?.PARTNER_ID
  const CIN_NO=certificateDetails?.CIN_NO
  const CUSTOMER_ADDRESS=certificateDetails?.CUSTOMER_ADDRESS
  const AADHAR_NO=certificateDetails?.AADHAR_NO
  const PAN_NO=certificateDetails?.PAN_NO
  const DATE=certificateDetails?.DATE
  const COMPANY_ADDRESS=certificateDetails?.COMPANY_ADDRESS
  const DIRECTOR_NAME=certificateDetails?.DIRECTOR_NAME
  


  return (
    <div className="p-4 flex flex-col items-center space-y-8">
      {/* Page Heading */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Certificate of Achievement</h1>
        <p className="text-sm sm:text-base text-gray-600">
          This is to certify that the individual has successfully completed the required tasks with excellence.
        </p>
      </div>

      {/* Certificate Container */}
      <div
        className="w-full max-w-lg h-auto relative bg-white shadow-lg rounded-lg overflow-hidden"
        ref={certificateRef}
      >
        <img className="w-full h-full object-cover" src={certificate} alt="Certificate" />
        <h1 className="absolute top-[42%] 
        left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-sm md:text-lg font-serif font-semibold text-green-700 text-center italic" style={{ fontFamily: 'Playfair Display, serif' }}>
  {PARTNER_NAME}
</h1>


        <span className='absolute top-[50%] 
        left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-sm  
        font-semibold  text-green-700 text-center'>
          {PARTNER_ID}
        </span>
      </div>
      <button
        onClick={() => downloadImage(certificateRef, "certificate.png")}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg shadow-lg text-sm sm:text-base md:text-lg hover:shadow-xl hover:opacity-90 transition-all"
      >
        Download Certificate
      </button>

      {/* Authorization Section */}
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Authorization Document</h2>
        <p className="text-sm sm:text-base text-gray-600">
          This document authorizes the individual to perform the specified tasks under the organization's guidance.
        </p>
      </div>
      <div
        className="w-full max-w-lg h-auto relative bg-white shadow-lg rounded-lg overflow-hidden"
        ref={authorisationRef}
      >
        <img
          className="w-full h-full object-contain"
          src={authorisation}
          alt="Authorization Document"
        />
        <span className="absolute top-[23%] left-[54%] 
          text-sm
         md:text-lg
         font-bold text-gray-900">
          {CIN_NO}
        </span>
        <span className="absolute top-[31%] left-[22%] 
          text-sm
         md:text-lg
         font-bold text-gray-900">
          {PARTNER_NAME}
        </span>

        <span className="absolute top-[32%] left-[17%] 
         
         font-bold bg-white w-4 h-4 sm:w-6 sm:h-5">
          
        </span>

        <span className="absolute top-[54%] left-[10%] 
          text-[0.4rem]
          sm:text-[0.6rem]
          text-gray-700 font-bold">
          {CUSTOMER_ADDRESS}
        </span>

        <span className="absolute top-[59%] left-[29%] 
          text-xs sm:text-base
          text-gray-900 font-bold">
          {AADHAR_NO}
        </span>

        <span className="absolute top-[63%] left-[24%] 
            text-xs sm:text-base
          text-gray-700 font-bold">
          {PAN_NO}
        </span>
        <span className="absolute top-[84%] left-[10%] 
            text-xs 
          text-gray-900 font-bold">
          ({DATE})
        </span>
        <span className="absolute top-[79%] left-[10%] 
            text-xs sm:text-base
          text-gray-900 font-bold">
          {DIRECTOR_NAME}
        </span>
        <span className="absolute top-[88%] left-[10%] 
            text-xs
          text-gray-700 font-bold">
          {COMPANY_ADDRESS}
        </span>
      </div>
      <button
        onClick={() => downloadImage(authorisationRef, "authorization.png")}
        className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-6 rounded-lg shadow-lg text-sm sm:text-base md:text-lg hover:shadow-xl hover:opacity-90 transition-all"
      >
        Download Authorization
      </button>
    </div>
  );
};

export default Certificate;
