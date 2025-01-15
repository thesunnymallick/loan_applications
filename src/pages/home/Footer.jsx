import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo2.png"
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-5 relative  bttom-0 ">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="py-3">
        <img className="w-60 h-auto object-cover" src={logo} alt="logo" />
        </div>
        <div className="flex flex-wrap justify-between items-center mb-10">
          <div>
           
            <h2 className="text-xl md:text-2xl font-bold">
              Growth Your Business, Take Your Step with Us!
            </h2>
          </div>
          <button className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-full">
            Contact Us
          </button>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 text-sm">
          {/* Column 1 */}
          <div>
            <h3 className="text-green-600 font-bold mb-4">Login</h3>
            <ul className="space-y-2 flex flex-col ">
              <Link to={"/partner/login"} className="hover:text-green-500 transition-all cursor-pointer">Partner Login</Link>
              <Link to={"/sales-executive/login"} className="hover:text-green-500 transition-all cursor-pointer">Sales Executive Login</Link>
              {/* <Link to={"/relationship-manager/login"} className="hover:text-green-500 transition-all cursor-pointer">RM login</Link>
              <Link to={"/admin/login"} className="hover:text-green-500 transition-all cursor-pointer">Admin login</Link> */}
            </ul>
          </div>
          {/* Column 2 */}
          <div>
            <h3 className="text-green-600 font-bold mb-4">MICRO PANEL</h3>
            <ul className="space-y-2">
              <li>Credit Card Online</li>
              <li>Micro Loan</li>
              <li>Saving Account Opening</li>
              <li>Demat Account Opening</li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h3 className="text-green-600 font-bold mb-4">Loan Apply</h3>
            <ul className="space-y-2">
              <li>Personal Loan</li>
              <li>Business Loan</li>
              <li>Home Loan</li>
              <li>Loan Against Property</li>
            </ul>
          </div>
          {/* Column 4 */}
          <div>
            <h3 className="text-green-600 font-bold mb-4">LEGAL</h3>
            <ul className="space-y-2">
              <li>Company Doc</li>
              <li>Terms of Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        {/* Policy Section */}
        <div className="border-t border-gray-700 pt-6 text-sm mb-6">
          <p>
            <span className="text-green-400">Policy:</span> Loan Approval and
            Rejection Bank or NBFC Policy
          </p>
        </div>

        {/* Bottom Info */}
        <div className="text-xs text-gray-400 space-y-4">
          <p>
          INCOMEKARO SOFTWARE PRIVATE LIMITED is present in more than 27+
            states of India: Andhra Pradesh, Assam, Bihar, Chandigarh, etc.
          </p>
          <p>
            <span className="text-green-600 font-bold">Attention:</span> INCOMEKARO SOFTWARE PRIVATE LIMITED does not ask any sensitive details
            like debit card, credit card, CVV, or OTP.
          </p>
          <p>CIN: </p>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-wrap justify-between items-center mt-6 text-xs">
          <p>Copyright 2023 - 2024. INCOMEKARO SOFTWARE PRIVATE LIMITED.</p>
          <div className="space-x-4">
            <Link href="#" className="text-green-600 hover:underline">
              Terms of Conditions
            </Link>
            <Link href="#" className="text-green-600 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
