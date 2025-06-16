"use client";

import React, { useState } from "react";
import { CheckCircle, FileText, BarChart3, Activity } from "lucide-react";
import Image from "next/image";
import image from "../assets/woman/shape.png";
import image1 from "../assets/book-test/heart.png";
import image2 from "../assets/book-test/lab.png";
import image3 from "../assets/book-test/medical-team.png";

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
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full ">
        {/* Text Section - 30%, aligned to right */}
        <div className="w-full lg:mt-0 mt-[2rem] lg:w-[31%] flex justify-center items-center">
          <h1 className="__secondary-text text-4xl lg:text-5xl font-bold text-right">
            Book Your Test
          </h1>
        </div>

        {/* Image Section - 70% */}
        <div className="w-[100%] md:w-[50%]">
          <img
            src="/test-book-banner/banner.jpg"
            alt="Sukaii Logo"
            className="w-full h-[280px] object-cover  lg:rounded-l-4xl"
          />
        </div>
      </div>
    </div>
  );

  const Step1 = () => (
    <div className="rounded-lg p-6 flex items-center justify-between">
      {/* Left Section - Increased width and margin */}
      <div className="space-y-6 lg:ml-[100px] lg:w-[40%]">
        <h2 className="text-[30px] font-[600] mb-8">Fill in the Details</h2>
        <div className="space-y-4">
          <div className="lg:flex flex-row items-start gap-3">
            <label className="block text-[15px] lg:mb-0 mb-2 font-medium text-gray-700 lg:w-[110px]">
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
            <div className="lg:flex flex-row items-start gap-3">
              <label className="lg:mb-0 mb-2 block text-[15px] font-medium text-gray-700 w-[110px] mr-6 pt-2">
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
            <div className="lg:flex flex-row items-start gap-3">
              <label className="lg:mb-0 mb-2 block text-[15px] font-medium text-gray-700 mr-4 ml-2 pt-2">
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
          <div className="lg:flex flex-row items-start gap-3">
            <label className="lg:mb-0 mb-2 block text-[15px] font-medium text-gray-700 w-[110px]">
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
          <div className="lg:flex flex-row items-start gap-3">
            <label className="lg:mb-0 mb-2 block text-[15px] font-medium text-gray-700 w-[110px]">
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
        <div className="flex items-center justify-center lg:justify-start mt-10 cursor-pointer">
          <label className="block text-[15px] font-medium text-gray-700 lg:w-[105px]"></label>
          <button
            onClick={handleContinue}
            className="w-[200px] __secondary-bg text-white py-3 px-6 rounded-lg font-medium"
          >
            Continue
          </button>
        </div>
      </div>
      {/* Right Section - Image flush right */}
      <div className="flex justify-end items-end w-[60%] absolute right-0 top-50 h-full">
        <Image
          src={image}
          width={400}
          height={400}
          alt="Sukaii Logo"
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="rounded-lg p-6 flex items-center justify-between realtive">
      <div className="space-y-4 lg:ml-16 lg:w-[40%] w-full">
        <h2 className="text-[30px] font-[600] mb-8">Contact Details</h2>

        <div className="space-y-4">
          <div className="lg:flex flex-row items-start gap-3">
            <label className="mb-2 lg:mb-0 block text-[15px] font-medium text-gray-700 w-[110px]">
              Contact
            </label>
            <input
              type="tel"
              value={formData.contact}
              onChange={(e) => handleInputChange("contact", e.target.value)}
              className="lg:w-[80%] w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              placeholder="Enter phone number"
            />
          </div>

          <div className="lg:flex flex-row items-start gap-3">
            <label className="mb-2 lg:mb-0 block text-[15px] font-medium text-gray-700 w-[110px]">
              Street Name
            </label>
            <input
              type="text"
              value={formData.streetName}
              onChange={(e) => handleInputChange("streetName", e.target.value)}
              className="lg:w-[80%] w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              placeholder="Enter street address"
            />
          </div>

          <div className="lg:flex flex-row items-start gap-3">
            <label className="block mb-2 lg:mb-0 text-[15px] font-medium text-gray-700 w-[110px]">
              Pin Code
            </label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => handleInputChange("pincode", e.target.value)}
              className="lg:w-[80%] w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              placeholder="Enter pincode"
            />
          </div>

          <div className="lg:flex flex-row items-start gap-3">
            <label className="mb-2 lg:mb-0 block text-[15px] font-medium text-gray-700 w-[110px]">
              Date
            </label>

            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="lg:w-[80%] w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
            />
          </div>

          <div className="lg:flex flex-row items-start gap-3">
            <label className="mb-2 lg:mb-0 block text-[15px] font-medium text-gray-700 w-[110px]">
              Select Time Slot
            </label>
            <select
              value={formData.timeSlot}
              onChange={(e) => handleInputChange("timeSlot", e.target.value)}
              className="lg:w-[80%] w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
            >
              <option value="">Select Time</option>
              <option value="09:00-10:00">09:00 - 10:00 AM</option>
              <option value="10:00-11:00">10:00 - 11:00 AM</option>
              <option value="11:00-12:00">11:00 - 12:00 PM</option>
              <option value="12:00-13:00">12:00 - 01:00 PM</option>
              <option value="14:00-15:00">02:00 - 03:00 PM</option>
            </select>
          </div>

          <div className="lg:flex flex-row items-start gap-3">
            <label className="mb-2 lg:mb-0 block text-[15px] font-medium text-gray-700 w-[110px]">
              Remarks
            </label>
            <textarea
              value={formData.remarks}
              onChange={(e) => handleInputChange("remarks", e.target.value)}
              rows={3}
              className="lg:w-[150%] w-full relative lg:left-11 px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              placeholder="Any special instructions or remarks"
            />
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-start mt-6 pl-[8px] cursor-pointer">
          <label className="lg:w-[110px]"></label>
          <button
            onClick={handleContinue}
            className="w-[200px] __secondary-bg text-white py-3 px-6 rounded-lg font-medium"
          >
            Continue
          </button>
        </div>
      </div>
      {/* Right Section - Image flush right */}
      <div className="flex justify-end items-end w-[60%] absolute right-0 top-[50%] h-full">
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
      <div className="space-y-6 lg:ml-16 md:w-[50%] w-full">
        <h2 className="text-[30px] font-[600] mb-8">Review and Pay</h2>

        <div className="md:space-y-6">
          {/* Booking Summary - Now properly aligned */}
          <div className="md:flex flex-row items-start gap-3">
            <div className="md:w-[160px] w-full">
              {" "}
              {/* Added pt-4 to match textarea padding */}
              <label className="mb-2 md:mb-0 block text-[15px] font-medium text-gray-700">
                Booking Summary
              </label>
            </div>
            <textarea
              value={formData.remarks}
              onChange={(e) => handleInputChange("remarks", e.target.value)}
              rows={7}
              className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
            />
          </div>

          {/* Cost and Discount Code - Consistent with above */}
          <div className="md:grid grid-cols-2 gap-4">
            <div className="md:flex flex-row items-start gap-3">
              <div className="w-[220px] pt-4">
                {" "}
                {/* Added pt-4 */}
                <label className="mb-2 md:mb-0 block text-[15px] font-medium text-gray-700">
                  Total Cost
                </label>
              </div>
              <input
                type="text"
                value={formData.totalCost}
                onChange={(e) => handleInputChange("totalCost", e.target.value)}
                className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                placeholder="Cost"
              />
            </div>

            <div className="md:flex flex-row items-start gap-3">
              <div className="w-[160px] md:ml-4 pt-4">
                {" "}
                {/* Added pt-4 */}
                <label className="mb-2 md:mb-0 block text-[15px] font-medium text-gray-700">
                  Apply Code
                </label>
              </div>
              <input
                type="text"
                value={formData.applyCode}
                onChange={(e) => handleInputChange("applyCode", e.target.value)}
                className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                placeholder="Discount code"
              />
            </div>
          </div>

          {/* Payment Mode - Consistent with above */}
          <div className="md:flex flex-row items-start gap-3">
            <div className="md:w-[160px] pt-4">
              <label className="mb-2 md:mb-0 block text-[15px] font-medium text-gray-700">
                Payment Mode
              </label>
            </div>
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

          {/* Terms and Conditions - Consistent spacing */}
          <div className="mt-4 md:nt-0 flex flex-row items-start gap-3">
            <div className="md:w-[130px]"></div>
            <div className="flex md:items-center items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="rounded relative top-1 md:top-0"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                By continuing, you agree to our Terms & Conditions and Privacy
                Policy
              </label>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex items-center justify-center md:justify-start mt-6 cursor-pointer">
          <div className="md:w-[140px]"></div>
          <button
            onClick={handleContinue}
            className="w-[200px] __secondary-bg text-white py-3 px-6 rounded-lg font-medium"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="flex justify-end items-end w-[60%] absolute right-0 top-[0%] h-full">
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
    <div className="bg-white rounded-lg">
      <div className="md:flex items-center justify-center gap-10">
        <div className="md:rounded-lg flex items-center justify-center overflow-hidden">
          <Image
            src="/thank-you-page/thank-you.jpg"
            alt="thank you bg-image"
            width={460}
            height={100}
            className="object-cover md:rounded-4xl h-[350] md:h-[680px] w-[full]"
          />
        </div>

        <div className="p-6 md:p-0">
          <div className="flex items-center gap-2">
            {/* <CheckCircle className="w-10 h-10 text-green-500" /> */}
            <h2 className="text-[38px] font-bold __secondary-text">
              Congratulations!
            </h2>
          </div>
          <h2 className="text-[28px] text-gray-700 mb-6">
            Your test is booked!
          </h2>

          <div className="space-y-4 text-[15px] w-full">
            <div className="flex gap-4">
              <span className="text-gray-600">Full Name</span>
              <span className="font-medium">
                {formData.fullName || "John Doe"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600">Gender</span>
              <span className="font-medium">{formData.gender || "Male"}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600">Age</span>
              <span className="font-medium">{formData.age || "36"}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600">Contact</span>
              <span className="font-medium">
                {formData.contact || "+60 123 456 789"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600">Address</span>
              <span className="font-medium">
                {formData.streetName || "3rd Street, Malaysia"} -{" "}
                {formData.pincode || "19028"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600">Remarks</span>
              <span className="font-medium">
                {formData.remarks || "Lorem ipsum dolor sit amet"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600">Selected Test</span>
              <span className="font-medium">
                {formData.selectedTest || "Complete Blood Count"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600">Type</span>
              <span className="font-medium">
                {formData.typeOfTest || "Home Collection"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">
                {formData.date || "14/05/2025"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600">Time Slot</span>
              <span className="font-medium">
                {formData.timeSlot || "12:00 - 02:00 PM"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600">Total Paid</span>
              <span className="font-medium">60 RM (Including Tax)</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mt-6">
            <div className="flex ____shadow-card items-center space-x-2 bg-white px-5 py-3 rounded-2xl">
              <Image
                src={image2}
                alt="thank you bg-image"
                width={35}
                height={35}
                className="object-cover"
              />{" "}
              <span className="text-sm leading-[16px]">
                Book a <br className="d-none md:block" /> New Test
              </span>
            </div>
            <div className="flex ____shadow-card items-center space-x-2 bg-white px-5 py-3 rounded-2xl">
              <Image
                src={image1}
                alt="thank you bg-image"
                width={35}
                height={35}
                className="object-cover"
              />{" "}
              <span className="text-sm leading-[16px]">
                Upload Past <br /> Reports
              </span>
            </div>
            <div className="flex ____shadow-card  items-center space-x-2 bg-white px-5 py-3 rounded-2xl">
              <Image
                src={image3}
                alt="thank you bg-image"
                width={35}
                height={35}
                className="object-cover"
              />{" "}
              <span className="text-sm leading-[16px]">
                View Health <br /> Summary
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start mt-6 cursor-pointer">
            <button
              onClick={handleContinue}
              className="w-[200px] __secondary-bg text-white py-3 px-6 rounded-lg font-medium"
            >
              Dashboard
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
