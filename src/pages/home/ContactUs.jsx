import React from 'react';
import { Button, Input, Select, DatePicker } from 'antd';
import HomeNavbar from '../../layouts/HomeNavbar';
import Footer from './Footer';
import contactUsImage from '../../assets/contact.jpg';

const { Option } = Select;

const ContactUs = () => {
  return (
    <div>
      {/* Navbar */}
      <HomeNavbar textColor="text-white" />

      {/* Hero Section */}
      <div className="bg-gray-100">
        <div
          className="relative bg-cover bg-center h-64"
          style={{ backgroundImage: `url(${contactUsImage})` }}
        >
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <h1 className="text-white text-4xl font-bold">Contact Us</h1>
          </div>
        </div>

        {/* Heading and Paragraph Section */}
        <div className="max-w-4xl mx-auto py-12 px-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            Schedule a Free Demo
          </h2>
          <p className="text-gray-600 text-lg">
            How can HRLink make your HR headaches disappear? Schedule a free
            demo and get your questions answered.
          </p>
        </div>

        {/* Testimonial Section */}
        <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-md shadow-lg text-left mb-12">
          <p className="text-gray-800 italic mb-4">
            “Our favorite things about HRLink are the easy-to-use UI and its
            well-fit recruitment features. Their team is also always available
            to help whenever we are in need of support.”
          </p>
          <p className="text-gray-600 font-semibold">Jerome Bell</p>
          <p className="text-gray-500">HR Executive - PayUp</p>
        </div>

        {/* Premium Contact Form */}
        <div className="max-w-4xl mx-auto mb-4 py-12 px-6 bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Get in Touch
          </h2>
          <form className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
              size='large'
                placeholder="First Name"
                className="rounded-lg shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
              <Input
              size='large'
                placeholder="Last Name"
                className="rounded-lg shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            {/* Email Field */}
            <Input
            size='large'
              placeholder="Work Email"
              className="rounded-lg shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
            />

            {/* Select Inputs: Company Size and Industry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
              size='large'
                placeholder="Company Size"
                className="w-full rounded-lg shadow-sm focus:border-green-500"
              >
                <Option value="small">Small (1-50 employees)</Option>
                <Option value="medium">Medium (51-200 employees)</Option>
                <Option value="large">Large (200+ employees)</Option>
              </Select>
              <Select
              size='large'
                placeholder="Industry"
                className="w-full rounded-lg shadow-sm focus:border-green-500"
              >
                <Option value="tech">Technology</Option>
                <Option value="finance">Finance</Option>
                <Option value="healthcare">Healthcare</Option>
              </Select>
            </div>

            {/* Primary Challenge */}
            <Input.TextArea
            size='large'
              rows={4}
              placeholder="Describe the primary challenge you want to solve with HR software"
              className="rounded-lg shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
            />

            {/* Rollout Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DatePicker
                size='large'
                placeholder="Expected Rollout Date"
                className="w-full rounded-lg shadow-sm focus:border-green-500"
              />
              <Input
              size='large'
                placeholder="Other Notes (optional)"
                className="rounded-lg shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="primary"
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg h-10 text-lg"
              >
                Submit Request
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;
