"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  CreditCard,
  CheckCircle,
  FileText,
  BarChart3,
  Activity,
} from "lucide-react";
import Image from "next/image";
import image from "../assets/woman/shape.png";

const TestBookingSystem = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: "",
    selectedTest: "",
    typeOfTest: "",
    contact: "",
    streetName: "",
    pincode: "",
    date: "",
    timeSlot: "",
    remarks: "",
    paymentMode: "",
    applyCode: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const HeaderSection = () => (
    <div className="__gapTop">
      <div className="flex items-center justify-between w-full ">
        {/* Text Section - 30%, aligned to right */}
        <div className="w-[31%] flex justify-center items-center">
          <h1 className="__secondary-text text-3xl font-bold text-right">
            BOOK YOUR TEST
          </h1>
        </div>

        {/* Image Section - 70% */}
        <div className="w-[60%]">
          <img
            src="/test-book-banner/banner.jpg"
            alt="Sukaii Logo"
            className="w-full h-[280px] object-cover rounded-l-lg"
          />
        </div>
      </div>
    </div>
  );

  const Step1 = () => (
    <div className="rounded-lg p-6 flex items-center justify-between">
      {/* Left Section - Increased width and margin */}
      <div className="space-y-6 ml-16 w-[50%]">
        <h2 className="text-[30px] font-[600] mb-6">Fill in the Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                placeholder="Enter age"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selected Test
            </label>
            <select
              value={formData.selectedTest}
              onChange={(e) =>
                handleInputChange("selectedTest", e.target.value)
              }
              className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
            >
              <option value="">Select Test</option>
              <option value="complete-blood-count">Complete Blood Count</option>
              <option value="lipid-profile">Lipid Profile</option>
              <option value="diabetes-screening">Diabetes Screening</option>
              <option value="thyroid-function">Thyroid Function Test</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of Test
            </label>
            <select
              value={formData.typeOfTest}
              onChange={(e) => handleInputChange("typeOfTest", e.target.value)}
              className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
            >
              <option value="">Select Type</option>
              <option value="home-collection">Home Collection</option>
              <option value="lab-visit">Lab Visit</option>
              <option value="express">Express Service</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-center mt-6 cursor-pointer">
          <button
            onClick={handleContinue}
            className="w-[200px] __secondary-bg text-white py-3 px-6 rounded-lg font-medium"
          >
            Continue
          </button>
        </div>
      </div>
      {/* Right Section - Image flush right */}
      <div className="flex justify-end items-end w-[40%] absolute right-0 top-30 h-full">
        <Image
          src={image}
          width={400}
          height={300}
          alt="Sukaii Logo"
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="rounded-lg p-6 flex items-center justify-between realtive">
      <div className="space-y-4 ml-16 w-[50%]">
        <h2 className="text-xl font-semibold mb-6">Contact Details</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact
            </label>
            <input
              type="tel"
              value={formData.contact}
              onChange={(e) => handleInputChange("contact", e.target.value)}
              className="w-[80%] px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Name
            </label>
            <input
              type="text"
              value={formData.streetName}
              onChange={(e) => handleInputChange("streetName", e.target.value)}
              className="w-[80%] px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              placeholder="Enter street address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pincode
            </label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => handleInputChange("pincode", e.target.value)}
              className="w-[80%] px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              placeholder="Enter pincode"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="w-[80%] px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              />
              {/* <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" /> */}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time Slot
            </label>
            <select
              value={formData.timeSlot}
              onChange={(e) => handleInputChange("timeSlot", e.target.value)}
              className="w-[80%] px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
            >
              <option value="">Select Time</option>
              <option value="09:00-10:00">09:00 - 10:00 AM</option>
              <option value="10:00-11:00">10:00 - 11:00 AM</option>
              <option value="11:00-12:00">11:00 - 12:00 PM</option>
              <option value="12:00-13:00">12:00 - 01:00 PM</option>
              <option value="14:00-15:00">02:00 - 03:00 PM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remarks
            </label>
            <textarea
              value={formData.remarks}
              onChange={(e) => handleInputChange("remarks", e.target.value)}
              rows={3}
              className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              placeholder="Any special instructions or remarks"
            />
          </div>
        </div>

        <div className="flex items-center justify-center mt-6 cursor-pointer">
          <button
            onClick={handleContinue}
            className="w-[200px] __secondary-bg text-white py-3 px-6 rounded-lg font-medium"
          >
            Continue
          </button>
        </div>
      </div>
      {/* Right Section - Image flush right */}
      <div className="flex justify-end items-start w-[40%] absolute right-0 translate-y-[60%] h-full">
        <Image
          src={image}
          width={400}
          height={300}
          alt="Sukaii Logo"
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );

  const Step3 = () => (
    <div className="rounded-lg p-6 flex items-center justify-between relative">
      <div className="space-y-6 ml-16 w-[50%]">
        <h2 className="text-xl font-semibold mb-6">Review and Pay</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Booking Summary
            </label>
            <textarea
              value={formData.remarks}
              onChange={(e) => handleInputChange("remarks", e.target.value)}
              rows={7}
              className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Cost
              </label>
              <input
                type="text"
                value={formData.applyCode}
                onChange={(e) => handleInputChange("applyCode", e.target.value)}
                className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                placeholder="Cost"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apply Code
              </label>
              <input
                type="text"
                value={formData.applyCode}
                onChange={(e) => handleInputChange("applyCode", e.target.value)}
                className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                placeholder="Discount code"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Mode
            </label>
            <select
              value={formData.paymentMode}
              onChange={(e) => handleInputChange("paymentMode", e.target.value)}
              className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
            >
              <option value="">Select Payment Method</option>
              <option value="credit-card">Credit Card</option>
              <option value="debit-card">Debit Card</option>
              <option value="online-banking">Online Banking</option>
              <option value="digital-wallet">Digital Wallet</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="rounded" />
            <label htmlFor="terms" className="text-sm text-gray-600">
              By continuing, you agree to our Terms & Conditions and Privacy
              Policy
            </label>
          </div>
        </div>

        <div className="flex items-center justify-center mt-6 cursor-pointer">
          <button
            onClick={handleContinue}
            className="w-[200px] __secondary-bg text-white py-3 px-6 rounded-lg font-medium"
          >
            Continue
          </button>
        </div>
      </div>
      {/* Right Section - Image flush right */}
      <div className="flex justify-end items-end w-[40%] absolute -right-33 translate-y-[30%] h-full">
        <Image
          src={image}
          width={400}
          height={300}
          alt="Sukaii Logo"
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );

  const Step4 = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-start space-x-6 ">
        <div className="w-32 h-full rounded-lg flex items-center justify-center overflow-hidden">
         <Image
            src='/thank-you-page/thank-you.jpg'
            alt="thank you bg-image"
            width={200}
            height={300}
            className="object-cover rounded-lg "
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h2 className="text-2xl font-bold __secondary-text">
              Congratulations!
            </h2>
          </div>
          <p className="text-lg text-gray-700 mb-6">Your test is booked!</p>

          <div className="space-y-3 text-sm w-full">
            <div className="grid grid-cols-2">
              <span className="text-gray-600">Full Name</span>
              <span className="font-medium">{formData.fullName || "John Doe"}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-600">Gender</span>
              <span className="font-medium">{formData.gender || "Male"}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-600">Age</span>
              <span className="font-medium">{formData.age || "36"}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-600">Contact</span>
              <span className="font-medium">{formData.contact || "+60 123 456 789"}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-600">Address</span>
              <span className="font-medium">{formData.streetName || "3rd Street, Malaysia"} - {formData.pincode || "19028"}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-600">Remarks</span>
              <span className="font-medium">{formData.remarks || "Lorem ipsum dolor sit amet"}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-600">Selected Test</span>
              <span className="font-medium">{formData.selectedTest || "Complete Blood Count"}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-600">Type</span>
              <span className="font-medium">{formData.typeOfTest || "Home Collection"}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{formData.date || "14/05/2025"}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-600">Time Slot</span>
              <span className="font-medium">{formData.timeSlot || "12:00 - 02:00 PM"}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-600">Total Paid</span>
              <span className="font-medium">60 RM (Including Tax)</span>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <div className="flex items-center space-x-2 bg-white shadow- px-3 py-2 rounded-lg">
              <FileText className="w-4 h-4 " />
              <span className="text-sm text-blue-700">Book a New Test</span>
            </div>
            <div className="flex items-center space-x-2 bg-white shadow- px-3 py-2 rounded-lg">
              <BarChart3 className="w-4 h-4 " />
              <span className="text-sm ">
                Upload Past Reports
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white shadow- px-3 py-2 rounded-lg">
              <Activity className="w-4 h-4 " />
              <span className="text-sm ">
                View Health Summary
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center mt-6 cursor-pointer">
            <button
              onClick={handleContinue}
              className="w-[200px] __secondary-bg text-white py-3 px-6 rounded-lg font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HeaderSection />
      <div className="container mx-auto realtive">

        {/* Step content */}
        <div className="container mx-auto __gapTop">
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 />}
          {currentStep === 4 && <Step4 />}
        </div>

        {/* Navigation */}
        {currentStep > 1 && currentStep < 4 && (
          <div className="flex justify-center">
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-2 cursor-pointer __secondary-text font-medium"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TestBookingSystem;
