import React from "react";
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram, 
  FaFacebook 
} from "react-icons/fa";

const ContactInfo = () => {
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
            Corporate Office: 2nd Floor, 206 Webel IT Park (Phase-1), DH Block (Newtown), Action Area 1, Newtown, Kolkata 700156
          </p>
        </div>
        {/* Phone */}
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <FaPhoneAlt className="text-2xl flex-shrink-0" />
          <p className="text-base sm:text-lg">+91 7864951543</p>
        </div>
        {/* Email */}
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <FaEnvelope className="text-2xl flex-shrink-0" />
          <p className="text-base sm:text-lg">Email Id - support@income.in</p>
        </div>
      </div>
      {/* Social Icons */}
      <div className="flex flex-wrap gap-6 mt-6 justify-center sm:justify-start">
        <a href="#" aria-label="Twitter" className="hover:text-green-400">
          <FaTwitter className="text-3xl" />
        </a>
        <a href="#" aria-label="LinkedIn" className="hover:text-green-400">
          <FaLinkedin className="text-3xl" />
        </a>
        <a href="#" aria-label="Instagram" className="hover:text-green-400">
          <FaInstagram className="text-3xl" />
        </a>
        <a href="#" aria-label="Facebook" className="hover:text-green-400">
          <FaFacebook className="text-3xl" />
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;
