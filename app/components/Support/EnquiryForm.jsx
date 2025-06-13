"use client";

import React, { useState } from 'react';
import { Calendar, FileText, RefreshCw, CreditCard } from 'lucide-react';

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    age: '',
    contact: '',
    address: '',
    remarks: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const quickHelpItems = [
    {
      icon: <Calendar className="w-6 h-6 text-pink-500" />,
      title: "Make or Change Appointment",
      bgColor: "bg-pink-50"
    },
    {
      icon: <FileText className="w-6 h-6 text-pink-500" />,
      title: "Book or Access Reports",
      bgColor: "bg-pink-50"
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-pink-500" />,
      title: "Reschedule or Request Refund",
      bgColor: "bg-pink-50"
    },
    {
      icon: <CreditCard className="w-6 h-6 text-pink-500" />,
      title: "Understand or Use Your Dashboard",
      bgColor: "bg-pink-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Quick Help Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Quick Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickHelpItems.map((item, index) => (
              <div
                key={index}
                className={`${item.bgColor} rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer border border-pink-100`}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-white rounded-full shadow-sm">
                    {item.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-700 leading-tight">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="h-full flex items-center justify-center p-8">
                {/* <div className="text-center">
                  <div className="w-48 h-64 bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <div className="text-6xl">👩‍💼</div>
                  </div>
                  <p className="text-gray-600 text-sm">Professional consultation available</p>
                </div> */}
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:w-2/3 p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Submit Your Enquiry</h2>
              
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Gender and Age */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-gray-700"
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Contact */}
                <div>
                  <input
                    type="tel"
                    name="contact"
                    placeholder="Contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Address */}
                <div>
                  <textarea
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Remarks */}
                <div>
                  <textarea
                    name="remarks"
                    placeholder="Remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100 to-transparent rounded-full -z-10 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-100 to-transparent rounded-full -z-10 opacity-50"></div>
      </div>
    </div>
  );
}