"use client";

import Image from "next/image";
import React, { useState } from "react";
import image from "../../assets/woman/support-woman.jpg";
import Button from "../ui/Button";

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: "",
    contact: "",
    address: "",
    remarks: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const quickHelpItems = [
    {
      icon: "/support-icon/icon.png",
      title: "Make or Change Appointment",
      bgColor: "bg-[#FFFFFF]",
    },
    {
      icon: "/support-icon/icon (2).png",
      title: "Book or Access Reports",
      bgColor: "bg-[#FFFFFF]",
    },
    {
      icon: "/support-icon/icon (3).png",
      title: "Reschedule or Request Refund",
      bgColor: "bg-[#FFFFFF]",
    },
    {
      icon: "/support-icon/icon (4).png",
      title: "Understand or Use Your Dashboard",
      bgColor: "bg-[#FFFFFF]",
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-0">
      <div className="container mx-auto">
        {/* Quick Help Section */}
        <div className="__gapTop">
          <h2 className="text-gray-900 text-2xl md:text-4xl leading-tight lg:leading-[150%] -tracking-[1%] lg:-tracking-[2%] font-[600] mb-8 lg:mb-15 md:mb-12">
            Quick Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickHelpItems.map((item, index) => (
              <div
                key={index}
                className={`${item.bgColor} rounded-[22px] p-8 __cardShadow cursor-pointer`}
              >
                <div className="flex flex-col items-start space-y-3">
                  <div className="">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={24}
                      height={30}
                    />
                  </div>
                  <p className="text-[15px] font-medium text-gray-700 leading-tight">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="__gapTop overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="">
              <div className="h-full flex items-center justify-center p-8">
                <Image
                  src={image}
                  alt="Support Image"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:w-2/3 px-8 lg:px-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Submit Your Enquiry
              </h2>

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
                <div className="pt-">
                  <button
                    type="submit"
                    className="__secondary-bg text-white font-semibold px-8 py-3 rounded-xl cursor-pointer shadow-lg hover:shadow-xl"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:px-12">
            <div className="__primary-bg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-14 md:pr-20 relative mt-[80px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center relative z-10">
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl lg:text-[40px] font-bold text-white mb-2 sm:mb-3 leading-tight">
                    Smarter Health Starts Here
                  </h3>
                  <p className="text-white text-opacity-90 text-sm sm:text-[17px]">
                    Discover how our Smart Health Dashboard helps you stay on
                    top of
                    <br /> your health effortlessly.
                  </p>
                </div>

                <div className="flex justify-start md:justify-end mt-4 md:mt-0 relative">
                  <Button
                    variant="outline"
                    className="__secondary-bg hover:bg-pink-600 text-white !py-3 p !text-[16px] !font-[600] text-sm sm:text-base"
                  >
                    Explore More!
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
