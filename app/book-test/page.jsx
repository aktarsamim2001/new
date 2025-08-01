"use client";

import React, { useState, useRef } from "react";
import { CheckCircle, FileText, BarChart3, Activity } from "lucide-react";
import Image from "next/image";
import image from "../assets/woman/shape.png";
import image1 from "../assets/book-test/heart.png";
import image2 from "../assets/book-test/lab.png";
import image3 from "../assets/book-test/medical-team.png";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";
import { useForm } from "react-hook-form";
import { ChevronDown } from "lucide-react";

const TestBookingSystem = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [allFormData, setAllFormData] = useState({});

  const handleStepContinue = (stepData) => {
    setAllFormData((prev) => ({ ...prev, ...stepData }));
    if (currentStep <= 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const HeaderSection = () => (
    <div className="__gapTop">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full ">
        {/* Text Section - 30%, aligned to right */}
        <div className="w-full md:mt-0 mt-[2rem] md:w-[29%] flex ml-8 lg:justify-end items-center">
          <h1 className="__secondary-text text-2xl lg:text-5xl font-bold text-right">
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

  const Step1 = ({ handleContinue }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: allFormData,
    });

    const onSubmit = (data) => {
      console.log("Step 1 Form Data:", data);
      handleContinue(data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-lg px-4 flex items-center justify-between relative">
          {/* Left Section */}
          <div className="space-y-6 lg:ml-[100px] lg:w-[40%] w-full">
            <h2 className="text-[30px] font-[600] mb-8 hidden md:block">
              Fill in the Details
            </h2>

            <div className="space-y-6">
              {/* Full Name */}
              <div className="lg:flex lg:flex-row lg:justify-between lg:items-center">
                <label className="block text-[20px] font-medium text-gray-700 lg:mb-0 mb-2 lg:text-right">
                  Full Name
                </label>
                <div className="lg:w-[70%]">
                  <input
                    {...register("fullName", {
                      required: "Full Name is required",
                    })}
                    type="text"
                    className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                    // placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Gender and Age Row */}

              <div className="lg:flex lg:flex-row lg:justify-between lg:items-center gap-8">
                <div className="lg:text-right">
                  <label className="block text-[20px] font-medium text-gray-700 mb-2 lg:mb-0">
                    Gender
                  </label>
                </div>
                <div className="lg:w-[70%] flex flex-row items-center gap-6">
                  {/* Gender */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-[140px]">
                      <select
                        {...register("gender", {
                          required: "Gender is required",
                        })}
                        className="w-full text-sm appearance-none px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                      >
                        <option value=""></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <ChevronDown />
                      </div>
                    </div>
                  </div>

                  {/* Age */}
                  <div className="lg:flex lg:flex-row lg:items-center flex flex-col -mt-10 md:mt-0 gap-3">
                    <label className="text-[20px] font-medium block text-gray-600 whitespace-nowrap">
                      Age
                    </label>
                    <div className="w-[full]">
                      <input
                        {...register("age", {
                          required: "Age is required",
                          min: {
                            value: 1,
                            message: "Age must be greater than 0",
                          },
                          max: {
                            value: 120,
                            message: "Age must be less than 120",
                          },
                        })}
                        type="number"
                        className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                        // placeholder="Enter age"
                      />
                    </div>
                  </div>
                </div>

                {/* Error Messages */}
                <div className="lg:hidden">
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.gender.message}
                    </p>
                  )}
                  {errors.age && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.age.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Selected Test */}
              <div className="lg:flex lg:justify-between lg:flex-row lg:items-center gap-8">
                <label className="block text-[20px] font-medium text-gray-700 lg:mb-0 mb-2 lg:text-right">
                  Selected Test
                </label>
                <div className="lg:w-[70%] relative">
                  <select
                    {...register("selectedTest", {
                      required: "Test selection is required",
                    })}
                    className="w-full appearance-none px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                  >
                    <option value=""></option>
                    <option value="complete-blood-count">
                      Complete Blood Count
                    </option>
                    <option value="lipid-profile">Lipid Profile</option>
                    <option value="diabetes-screening">
                      Diabetes Screening
                    </option>
                    <option value="thyroid-function">
                      Thyroid Function Test
                    </option>
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <ChevronDown />
                  </div>
                  {errors.selectedTest && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.selectedTest.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Type of Test */}
              <div className="lg:flex lg:flex-row lg:justify-between lg:items-center gap-8">
                <label className="block text-[20px] font-medium text-gray-700 lg:mb-0 mb-2 lg:text-right">
                  Service Type
                </label>
                <div className="lg:w-[70%] relative">
                  <select
                    {...register("typeOfTest", {
                      required: "Type of test is required",
                    })}
                    className="w-full appearance-none px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                  >
                    <option value=""></option>
                    <option value="home-collection">Home Collection</option>
                    <option value="lab-visit">Lab Visit</option>
                    <option value="express">Express Service</option>
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <ChevronDown />
                  </div>
                  {errors.typeOfTest && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.typeOfTest.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between mt-10">
              <div className="hidden lg:block lg:w-[30%]"></div>
              <div className="lg:w-[70%]">
                <button
                  type="submit"
                  className="w-[166px] __secondary-bg text-white text-[20px] py-3 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="hidden lg:flex justify-end items-end w-[60%] z-[-1] absolute -right-10 -top-10 h-full">
            <Image
              src={image}
              width={400}
              height={400}
              alt="Sukaii Logo"
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </form>
    );
  };
  const Step2 = ({ handleContinue }) => {
    const {
      register,
      handleSubmit,
      control,
      setValue,
      watch,
      formState: { errors },
    } = useForm({
      defaultValues: allFormData,
    });

    const watchDate = watch("date");

    const onSubmit = (data) => {
      console.log("Step 2 Form Data:", data);
      handleContinue(data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-lg px-4 md:p-6 flex items-center justify-between relative lg:pt-[60px]">
          <div className="space-y-4 lg:ml-16 lg:w-[40%] w-full">
            <h2 className="text-[30px] font-[600] mb-8 hidden md:block">
              Contact Details
            </h2>

            <div className="space-y-4">
              <div className="lg:flex flex-row items-center gap-3">
                <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
                  Contact
                </label>
                <div className="lg:w-[60%] w-full">
                  <input
                    {...register("contact", {
                      required: "Contact number is required",
                      pattern: {
                        value: /^[+]?[\d\s-()]+$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                    type="tel"
                    className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                    // placeholder="Enter phone number"
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contact.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="lg:flex flex-row items-center gap-3">
                <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
                  Street Name
                </label>
                <div className="lg:w-[60%] w-full">
                  <input
                    {...register("streetName", {
                      required: "Street address is required",
                    })}
                    type="text"
                    className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                    // placeholder="Enter street address"
                  />
                  {errors.streetName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.streetName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="lg:flex flex-row items-center gap-3">
                <label className="block mb-2 lg:mb-0 text-[20px] font-medium text-gray-700 w-[160px]">
                  Pin Code
                </label>
                <div className="lg:w-[60%] w-full">
                  <input
                    {...register("pincode", {
                      required: "Pin code is required",
                      pattern: {
                        value: /^\d{5,6}$/,
                        message: "Please enter a valid pin code",
                      },
                    })}
                    type="text"
                    className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                    // placeholder="Enter pincode"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pincode.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="lg:flex flex-row items-center gap-3">
                <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
                  Date
                </label>
                <div className="relative lg:w-[60%] w-full">
                  <input
                    {...register("date", {
                      required: "Date is required",
                    })}
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="custom-date w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                    style={{
                      WebkitTextFillColor: watch("date")
                        ? "black"
                        : "transparent", // Chrome/Safari
                    }}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.date.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="lg:flex flex-row items-center gap-3">
                <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
                  Select Time Slot
                </label>
                <div className="relative md:w-[60%] w-full">
                  <select
                    {...register("timeSlot", {
                      required: "Time slot is required",
                    })}
                    className="appearance-none w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                  >
                    <option value=""></option>
                    <option value="09:00-10:00">09:00 - 10:00 AM</option>
                    <option value="10:00-11:00">10:00 - 11:00 AM</option>
                    <option value="11:00-12:00">11:00 - 12:00 PM</option>
                    <option value="12:00-13:00">12:00 - 01:00 PM</option>
                    <option value="14:00-15:00">02:00 - 03:00 PM</option>
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <ChevronDown />
                  </div>
                  {errors.timeSlot && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.timeSlot.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="lg:flex flex-row items-start gap-3">
                <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
                  Remarks
                </label>
                <div className="lg:w-[105%] w-full relative lg:left-11">
                  <textarea
                    {...register("remarks")}
                    rows={3}
                    className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                    // placeholder="Any special instructions or remarks"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center lg:justify-start mt-6 lg:pl-[8px] cursor-pointer">
              <label className="hidden lg:block lg:w-[160px]"></label>
              <button
                type="submit"
                className="w-[166px] __secondary-bg text-white text-[20px] lg:ml-2 font-bold py-3 px-6 rounded-lg"
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
      </form>
    );
  };

  const Step3 = ({ handleContinue }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        ...allFormData,
        totalCost: allFormData.totalCost || "60",
      },
    });

    const onSubmit = (data) => {
      console.log("Step 3 Form Data:", data);
      handleContinue(data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-lg px-4 lg:w-10/12 lg:mx-auto md:p-6 md:pt-0 flex items-center justify-between relative pt-[60px]">
          <div className="space-y-6 lg:ml-16 md:w-[70%] w-full">
            <h2 className="text-[30px] font-[600] mb-8 hidden md:block">
              Review and Pay
            </h2>

            <div className="md:space-y-6">
              {/* Booking Summary - Now properly aligned */}
              <div className="md:flex flex-row items-start gap-3">
                <div className="md:w-[160px] w-full">
                  <label className="mb-2 md:mb-0 block text-[15px] font-medium text-gray-700">
                    Booking Summary
                  </label>
                </div>
                <textarea
                  value={`Test: ${allFormData.selectedTest || "Not selected"}
Type: ${allFormData.typeOfTest || "Not selected"}
Date: ${allFormData.date || "Not selected"}
Time: ${allFormData.timeSlot || "Not selected"}
Name: ${allFormData.fullName || "Not provided"}
Contact: ${allFormData.contact || "Not provided"}
Address: ${allFormData.streetName || "Not provided"} - ${
                    allFormData.pincode || "Not provided"
                  }`}
                  readOnly
                  rows={7}
                  className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                />
              </div>

              {/* Cost and Discount Code - Consistent with above */}
              <div className="md:grid grid-cols-2 gap-4">
                <div className="md:flex flex-row items-start gap-3">
                  <div className="w-[220px] pt-4">
                    <label className="mb-2 md:mb-0 block text-[15px] font-medium text-gray-700">
                      Total Cost
                    </label>
                  </div>
                  <div className="w-full">
                    <input
                      {...register("totalCost", {
                        required: "Total cost is required",
                        min: {
                          value: 1,
                          message: "Cost must be greater than 0",
                        },
                      })}
                      type="number"
                      className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                      placeholder="Enter cost"
                    />
                    {errors.totalCost && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.totalCost.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="md:flex flex-row items-start gap-3">
                  <div className="w-[160px] md:ml-4 pt-4">
                    <label className="mb-2 md:mb-0 block text-[15px] font-medium text-gray-700">
                      Apply Code
                    </label>
                  </div>
                  <input
                    {...register("applyCode")}
                    type="text"
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
                <div className="relative w-full">
                  <select
                    {...register("paymentMode", {
                      required: "Payment mode is required",
                    })}
                    className="w-full appearance-none px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="debit-card">Debit Card</option>
                    <option value="online-banking">Online Banking</option>
                    <option value="cash-on-delivery">Cash on Delivery</option>
                  </select>

                  <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <ChevronDown />
                  </div>
                  {errors.paymentMode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.paymentMode.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions - Consistent spacing */}
              <div className="mt-4 md:mt-0 flex flex-row items-start gap-3">
                <div className="md:w-[130px]"></div>
                <div className="flex md:items-center items-start gap-2">
                  <input
                    {...register("agreeTerms", {
                      required: "You must agree to terms and conditions",
                    })}
                    type="checkbox"
                    id="terms"
                    className="rounded relative top-1 md:top-0"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    By continuing, you agree to our Terms & Conditions and
                    Privacy Policy
                  </label>
                </div>
              </div>
              {errors.agreeTerms && (
                <div className="md:flex flex-row items-start gap-3">
                  <div className="md:w-[130px]"></div>
                  <p className="text-red-500 text-sm">
                    {errors.agreeTerms.message}
                  </p>
                </div>
              )}
            </div>

            {/* Continue Button */}
            <div className="flex items-center justify-center md:justify-start mt-6 cursor-pointer">
              <div className="md:w-[140px]"></div>
              <button
                type="submit"
                className="w-[200px] __secondary-bg text-white py-3 px-6 rounded-lg font-medium"
              >
                Continue
              </button>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="flex justify-end items-end w-[60%] absolute -right-30 top-[0%] h-full">
            <Image
              src={image}
              width={400}
              height={300}
              alt="Sukaii Logo"
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </form>
    );
  };

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
            <h2 className="text-[38px] font-bold __secondary-text">
              Congratulations!
            </h2>
          </div>
          <h2 className="text-[28px] text-gray-700 mb-6">
            Your test is booked!
          </h2>

          <div className="space-y-4 text-[15px] w-full">
            <div className="flex gap-4">
              <span className="text-gray-600 min-w-[100px]">Full Name</span>
              <span className="font-medium">
                {allFormData.fullName || "John Doe"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 min-w-[100px]">Gender</span>
              <span className="font-medium">
                {allFormData.gender || "Male"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 min-w-[100px]">Age</span>
              <span className="font-medium">{allFormData.age || "36"}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 min-w-[100px]">Contact</span>
              <span className="font-medium">
                {allFormData.contact || "+60 123 456 789"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 min-w-[100px]">Address</span>
              <span className="font-medium">
                {allFormData.streetName || "3rd Street, Malaysia"} -{" "}
                {allFormData.pincode || "19028"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 min-w-[100px]">Remarks</span>
              <span className="font-medium">
                {allFormData.remarks || "Lorem ipsum dolor sit amet"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 min-w-[100px]">Selected Test</span>
              <span className="font-medium">
                {allFormData.selectedTest || "Complete Blood Count"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 min-w-[100px]">Type</span>
              <span className="font-medium">
                {allFormData.typeOfTest || "Home Collection"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 min-w-[100px]">Date</span>
              <span className="font-medium">
                {allFormData.date || "14/05/2025"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 min-w-[100px]">Time Slot</span>
              <span className="font-medium">
                {allFormData.timeSlot || "12:00 - 02:00 PM"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 min-w-[100px]">Total Paid</span>
              <span className="font-medium">
                {allFormData.totalCost
                  ? `${allFormData.totalCost} RM (Including Tax)`
                  : "60 RM (Including Tax)"}
              </span>
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
              />
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
              />
              <span className="text-sm leading-[16px]">
                Upload Past Reports
              </span>
            </div>
            <div className="flex ____shadow-card items-center space-x-2 bg-white px-5 py-3 rounded-2xl">
              <Image
                src={image3}
                alt="thank you bg-image"
                width={35}
                height={35}
                className="object-cover"
              />
              <span className="text-sm leading-[16px]">
                View Health Summary
              </span>
            </div>
          </div>

          <Link href="/user-dashboard">
            <button className="mt-6 __secondary-bg text-white py-3 px-6 rounded-lg font-medium">
              Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {currentStep <= 3 && <HeaderSection />}
      <div className="container mx-auto realtive">
        {/* Step content */}
        <div className="container mx-auto __gapTop">
          {currentStep === 1 && <Step1 handleContinue={handleStepContinue} />}
          {currentStep === 2 && <Step2 handleContinue={handleStepContinue} />}
          {currentStep === 3 && <Step3 handleContinue={handleStepContinue} />}
          {currentStep === 4 && <Step4 />}
        </div>

        {/* Navigation */}
        {/* {currentStep > 1 && currentStep < 4 && (
          <div className="flex justify-center">
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-2 cursor-pointer __secondary-text font-medium"
            >
              ← Back
            </button>
          </div>
        )} */}
      </div>
    </>
  );
};

export default TestBookingSystem;
