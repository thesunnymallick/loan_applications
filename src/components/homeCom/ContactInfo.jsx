import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTwitter, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="bg-green-700 text-white py-10 px-6 my-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
      <div className="space-y-4">
        {/* Address */}
        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-xl" />
          <p className="text-base">
            Corporate Office: 2nd Floor, 206 Webel IT Park (Phase-1), DH Block (Newtown), Action Area 1, Newtown, Kolkata 700156
          </p>
        </div>
        {/* Phone */}
        <div className="flex items-center gap-3">
          <FaPhoneAlt className="text-xl" />
          <p className="text-base">+91 7864951543</p>
        </div>
        {/* Email */}
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-xl" />
          <p className="text-base">Email Id - support@income.in</p>
        </div>
      </div>
      {/* Social Icons */}
      <div className="flex gap-6 mt-6">
        <a href="#" aria-label="Twitter" className="hover:text-green-400">
          <FaTwitter className="text-2xl" />
        </a>
        <a href="#" aria-label="LinkedIn" className="hover:text-green-400">
          <FaLinkedin className="text-2xl" />
        </a>
        <a href="#" aria-label="Instagram" className="hover:text-green-400">
          <FaInstagram className="text-2xl" />
        </a>
        <a href="#" aria-label="Facebook" className="hover:text-green-400">
          <FaFacebook className="text-2xl" />
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;
