"use client";

import Image from "next/image";
import React, { useState } from "react";
import image from "../../assets/woman/support-woman.jpg";
import Button from "../ui/Button";
import Link from "next/link";
import BrandLogo from "../../components/BrandLogo/BrandLogo";
import texture from "../../assets/woman/shape.png";

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
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 md:px-4">
        <div className="__gapTop md:px-24 ">
          <h2 className="text-gray-900 section__heading mb-5">
            Quick Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-3">
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
      </div>

      {/* Main Content */}
      <div className="__gapTop overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:gap-5">
          {/* Image Section */}

          <div className="h-full">
            <Image
              src={image}
              alt="Support Image"
              width={500}
              height={400}
              className="md:rounded-r-[50px] shadow-lg md:h-full h-[400px] object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="md:w-3/5 w-full md:px-8 mt-4 md:pt-0 p-[12px] lg:px-12">
            <h2 className="section__heading text-gray-800 mb-5">
              Submit Your Enquiry
            </h2>

            <div className="space-y-6">
              {/* Full Name */}
              <div className="md:flex items-center ">
                <p className="md:min-w-[100px] pb-2 md:pb-0">Full Name</p>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Gender and Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="md:flex items-center w-full">
                  <p className="md:min-w-[100px] pb-2 md:pb-0">Gender</p>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="px-4 py-4 bg-gray-50 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-gray-700"
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:flex items-center w-full md:pl-10">
                  <p className="md:min-w-[100px] pb-2 md:pb-0">Age</p>
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="px-4 py-4 w-full bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />{" "}
                </div>
              </div>

              {/* Contact */}
              <div className="md:flex items-center w-full">
                <p className="md:min-w-[100px] pb-2 md:pb-0">Contact</p>
                <input
                  type="tel"
                  name="contact"
                  placeholder="Contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Address */}
              <div className="md:flex items-center w-full">
                <p className="md:min-w-[100px] pb-2 md:pb-0">Address</p>
                <textarea
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Remarks */}
              <div className="md:flex items-center w-full">
                <p className="md:min-w-[100px] pb-2 md:pb-0">Remarks</p>
                <textarea
                  name="remarks"
                  placeholder="Remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Submit Button */}

              <div className="md:flex items-center w-full mt-10">
                <p className="md:min-w-[100px]"> </p>
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

        <div className="container mx-auto">
          <div className="container mx-auto px-4 md:px-28">
          <div className="__primary-bg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 md:px-26 md:pr-20 relative __gapTop">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 items-center relative z-10">
              <div className="text-left">
                <h3 className="section__heading text-white mb-2 sm:mb-3">
                  Talk to a Correspondant
                </h3>
                <p className="text-white text-opacity-90 text-sm sm:text-[17px]">
                 Live Chat: Available Monday–Saturday, 9am–8pm MYT
                </p>
              </div>

             <Link href="/our-services" passHref>
               <div className="flex justify-start mt-4 md:mt-0 relative">
                <Button
                  variant="outline"
                  className="__secondary-bg hover:bg-pink-600 text-white !py-3 p !text-[16px] !font-[600] text-sm sm:text-base"
                >
                  Call Now!
                </Button>
              </div>
             </Link>
            </div>
          </div>
        </div>
         <div className="absolute bottom-2 right-0 z-50 hidden md:block">
          <Image src={texture} alt=" " className="h-[400px] w-[400px]" />
        </div>
        <div className="px-4 md:px-10">
            <BrandLogo />
        </div>
        </div>
      </div>
    </div>
  );
}
