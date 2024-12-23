import React from 'react';
import HomeNavbar from '../../layouts/HomeNavbar';
import Footer from './Footer';
import AboutImage from "../../assets/about.jpg"
import image1 from "../../assets/loan1.jpg"
import image2 from "../../assets/discuss.jpg"
const About = () => {
  return (
   <>
    <HomeNavbar textColor="text-white" />
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div
      className="relative bg-cover bg-center h-64 bg-gray-700"
      style={{ backgroundImage: `url(${AboutImage})` }}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-4xl font-bold">About Us</h1>
      </div>
    </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-4">About Us</h2>
            <p className="text-gray-700 text-lg">
              Incomekaro, under the inspired leadership of Pratap Mondal, was launched in the year 2024 as a Direct Sales Associate for Piramal. Now it is India's No. 1 instant disbursed, instant payout provider with services in 60+ cities, 30+ franchises, and an excellent distribution network of over 75,000+ partners. Join our family to change your life.
            </p>
          </div>
          <div>
            <img
              src={image1}
              alt="About Us"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src={image2}
                alt="Why Choose Us"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-green-700 mb-4">Why Choose Incomekaro?</h2>
              <p className="text-gray-700 text-lg">
                We are providing developments in digital technology. Incomekaro helps partners find the best CRM support & financial products most suited to their customers’ needs. Every year, over Rs. 25,000 crore loans are disbursed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-green-100 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-green-700 mb-4">Our Mission</h3>
            <p className="text-gray-700 text-lg">
              To lead the charge in digital technology, helping partners achieve their financial goals with innovative solutions.
            </p>
          </div>
          <div className="bg-green-100 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-green-700 mb-4">Our Vision</h3>
            <p className="text-gray-700 text-lg">
              To revolutionize the financial landscape with cutting-edge tools, empowering individuals and businesses.
            </p>
          </div>
        </div>
      </div>

   
    </div>
    <Footer/>
   </>
  );
};

export default About;
