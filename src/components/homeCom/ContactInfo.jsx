import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

const ContactInfo = () => {
  // eslint-disable-next-line
  return (
    <div className="bg-green-700 text-white py-10 px-6 my-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
        Contact Information
      </h2>
      <div className="space-y-6">
        {/* Address */}
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <FaMapMarkerAlt className="text-2xl flex-shrink-0" />
          <p className="text-base sm:text-lg text-center sm:text-left">
            443,EKFORD ROAD,SUKCHAR KHARDAH, KOLKATA 700115
          </p>
        </div>
        {/* Phone */}
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <FaPhoneAlt className="text-2xl flex-shrink-0" />
          <p className="text-base sm:text-lg">+91 7864951543</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <FaPhoneAlt className="text-2xl flex-shrink-0" />
          <p className="text-base sm:text-lg">+91 87778 34218</p>
        </div>
        {/* Email */}
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <FaEnvelope className="text-2xl flex-shrink-0" />
          <p className="text-base sm:text-lg">
            Email Id - support@incomekaro.in
          </p>
        </div>
      </div>
      {/* Social Icons */}
      <div className="flex flex-wrap gap-6 mt-6 justify-center sm:justify-start">
        <button
          onClick={() => alert("Twitter link coming soon!")}
          aria-label="Twitter"
          className="hover:text-green-400"
        >
          <FaTwitter className="text-3xl" />
        </button>
        <button
          onClick={() => alert("LinkedIn link coming soon!")}
          aria-label="LinkedIn"
          className="hover:text-green-400"
        >
          <FaLinkedin className="text-3xl" />
        </button>
        <button
          onClick={() => alert("Instagram link coming soon!")}
          aria-label="Instagram"
          className="hover:text-green-400"
        >
          <FaInstagram className="text-3xl" />
        </button>
        <button
          onClick={() => alert("Facebook link coming soon!")}
          aria-label="Facebook"
          className="hover:text-green-400"
        >
          <FaFacebook className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default ContactInfo;
