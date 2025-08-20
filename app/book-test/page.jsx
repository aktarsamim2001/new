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
            <h2 className="section__heading mb-8 hidden md:block">
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
                    placeholder="Enter your full name"
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
                  <div className="flex flex-col gap-1">
                    <div className="relative w-[140px]">
                      <select
                        {...register("gender", {
                          required: "Gender is required",
                          validate: (value) =>
                            value !== "Select" ||
                            "Gender is required",
                        })}
                        className="w-full text-sm appearance-none px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                      >
                        <option value="Select">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <ChevronDown />
                      </div>
                    </div>
                    {errors.gender && (
                      <p className="text-red-500 text-sm">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>

                  {/* Age */}
                  <div className="flex flex-col gap-1">
                    <div className="lg:flex lg:flex-row lg:items-center flex flex-col gap-3">
                      <label className="text-[20px] font-medium block text-gray-600 whitespace-nowrap">
                        Age
                      </label>
                      <div className="w-full">
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
                          placeholder="Enter age"
                        />
                      </div>
                    </div>
                    {errors.age && (
                      <p className="text-red-500 text-sm">
                        {errors.age.message}
                      </p>
                    )}
                  </div>
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
                      validate: (value) =>
                        value !== "selected test" ||
                        "Please select a valid test",
                    })}
                    className="w-full appearance-none px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                  >
                    <option value="selected test">Selected Test</option>
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
            <h2 className="section__heading mb-8 hidden md:block">
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
                    placeholder="Enter phone number"
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
                    placeholder="Enter street address"
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
                    placeholder="Enter pincode"
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
                    className="custom-date w-full px-4 py-4 pr-12 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                    style={{
                      WebkitTextFillColor: watch("date")
                        ? "black"
                        : "transparent",
                      colorScheme: "light", // This helps with better calendar styling
                    }}
                  />

                  {/* Custom Calendar Icon */}
                  <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-pink-500 transition-colors duration-200"
                    onClick={() => {
                      const dateInput =
                        document.querySelector('input[type="date"]');
                      if (dateInput) {
                        dateInput.focus();
                        dateInput.showPicker && dateInput.showPicker();
                      }
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <path
                        d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.6947 13.7002H15.7037M15.6947 16.7002H15.7037M11.9955 13.7002H12.0045M11.9955 16.7002H12.0045M8.29431 13.7002H8.30329M8.29431 16.7002H8.30329"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.date.message}
                    </p>
                  )}
                </div>
              </div>
              <style jsx>{`
                .custom-date::-webkit-calendar-picker-indicator {
                  opacity: 0;
                  position: absolute;
                  right: 0;
                  width: 100%;
                  height: 100%;
                  cursor: pointer;
                }

                .custom-date::-webkit-datetime-edit-text {
                  color: transparent;
                }

                .custom-date::-webkit-datetime-edit-month-field {
                  color: ${watch("date") ? "black" : "transparent"};
                }

                .custom-date::-webkit-datetime-edit-day-field {
                  color: ${watch("date") ? "black" : "transparent"};
                }

                .custom-date::-webkit-datetime-edit-year-field {
                  color: ${watch("date") ? "black" : "transparent"};
                }
              `}</style>

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
                    placeholder="Select Time Slot"
                  >
                    <option value="">Select Time Slot</option>
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
                    placeholder="Any special instructions or remarks"
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
          <div className="space-y-6 lg:ml-16 w-full">
            <h2 className="section__heading mb-8 hidden md:block">
              Review and Pay
            </h2>

            <div className="md:space-y-6">
              {/* Booking Summary - Large textarea */}
              <div className="md:flex flex-row items-start gap-3">
                <div className="md:w-[230px] w-full">
                  <label className="block text-[20px] font-medium text-gray-700 lg:mb-0 mb-2">
                    Booking Summary
                  </label>
                </div>
                <div className="w-full">
                  <textarea
                    {...register("bookingSummary", {
                      required: "Booking summary is required",
                    })}
                    rows={6}
                    className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all resize-none"
                    placeholder="Enter booking summary"
                  />
                  {errors.bookingSummary && (
                    <p className="text-red-500 text-sm mt-2 block">
                      {errors.bookingSummary.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Cost and Discount Code - Consistent with above */}
              <div className="md:grid grid-cols-2 gap-4">
                <div className="md:flex flex-row items-start gap-3">
                  <div className="w-[300px] pt-4">
                    <label className="block text-[20px] font-medium text-gray-700 lg:mb-0 mb-2">
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
                  <div className="w-[180px] md:ml-4 pt-4">
                    <label className="block text-[20px] font-medium text-gray-700 lg:mb-0 mb-2">
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
                <div className="md:w-[190px] pt-4">
                  <label className="block text-[20px] font-medium text-gray-700 lg:mb-0 mb-2">
                    Payment Mode
                  </label>
                </div>
                <div className="relative w-full md:w-1/2">
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
                <div className="md:w-[190px]"></div>
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
                  <div className="md:w-[190px]"></div>
                  <p className="text-red-500 text-sm">
                    {errors.agreeTerms.message}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm & Pay Button */}
            <div className="flex items-center justify-center md:justify-start mt-6 cursor-pointer">
              <div className="md:w-[200px]"></div>
              <button
                type="submit"
                className="w-[200px] __secondary-bg text-white text-[20px] py-3 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  const Step4 = () => (
    <div className="">
      <div className="md:flex items-center justify-center gap-28">
        <div className="md:rounded-lg flex items-center justify-center overflow-hidden">
          <Image
            src="/thank-you-page/thank-you.jpg"
            alt="thank you bg-image"
            width={460}
            height={100}
            className="object-cover md:rounded-4xl h-[350] md:h-[800px] w-[full]"
          />
        </div>

        <div className="p-6 md:p-0">
          <div className="flex items-center gap-2">
            <h2 className="text-[30px] md:text-[50px] font-[600] __secondary-text">
              Congratulations!
            </h2>
          </div>
          <h2 className="text-[28px] md:text-[40px] font-[400] leading-[135%] tracking-[-2%] text-gray-700 mb-6">
            Your test is booked!
          </h2>

          <div className="space-y-4 text-[15px] w-full">
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Full Name
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.fullName || "John Doe"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px min-w-[140px]">
                Gender
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.gender || "Male"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Age
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.age || "36"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Contact
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.contact || "+60 123 456 789"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Address
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.streetName || "3rd Street, Malaysia"} -{" "}
                {allFormData.pincode || "19028"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Remarks
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.remarks || "Lorem ipsum dolor sit amet"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Selected Test
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.selectedTest || "Complete Blood Count"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Date
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.date || "14/05/2025"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Time Slot
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.timeSlot || "12:00 - 02:00 PM"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Total Paid
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.totalCost
                  ? `${allFormData.totalCost} RM (Including Tax)`
                  : "60 RM (Including Tax)"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mt-6">
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
                Upload Past <br className="d-none md:block" /> Reports
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
                View Health <br className="d-none md:block" /> Summary
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
      <div className="">
        {/* Step content */}
        <div className="container mx-auto __gapTop relative">
          {currentStep === 1 && <Step1 handleContinue={handleStepContinue} />}
          {currentStep === 2 && <Step2 handleContinue={handleStepContinue} />}
          {currentStep === 3 && <Step3 handleContinue={handleStepContinue} />}
          {currentStep === 4 && <Step4 />}
          {/* Right Section - Image with custom top per step */}
        </div>
      </div>
      <div
        className={`hidden lg:flex justify-end items-end w-[70%] z-[-1] absolute right-0 h-full
              ${currentStep === 1 ? "top-[85%] -translate-y-1/2" : ""}
              ${currentStep === 2 ? "top-[80%]" : ""}
              ${currentStep === 3 ? "top-[60%]" : ""}
              ${currentStep === 4 ? "top-[45%]" : ""}
            `}
      >
        <Image
          src={image}
          width={400}
          height={400}
          alt="Sukaii Logo"
          className="object-cover rounded-lg"
        />
      </div>
    </>
  );
};

export default TestBookingSystem;
