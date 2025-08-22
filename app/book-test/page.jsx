"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../features/store/userProfileSlice";
import { createBooking } from "../../features/store/bookingSlice";
import {
  CheckCircle,
  FileText,
  BarChart3,
  Activity,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
import { fetchServiceDetailsPageData } from "../../features/store/serviceDetailsPageSlice";
import { fetchServicesList } from "../../features/store/servicesListSlice";
import { fetchAddressList } from "../../features/store/addressListSlice";
import ProtectedRoute from "@/features/Routes/ProtectedRoute";
const TestBookingSystem = () => {
  const dispatch = useDispatch();
  const {
    data: userProfile,
    status,
    error,
  } = useSelector((state) => state.userProfile || {});
  const serviceDetailsPageData = useSelector(
    (state) => state?.serviceDetailsPage?.data
  );
  const servicesListData = useSelector((state) => state?.servicesList?.data);
  const addressList = useSelector((state) => state.addressList.data);
  const [currentStep, setCurrentStep] = useState(1);
  const [allFormData, setAllFormData] = useState({});

  useEffect(() => {
    dispatch(fetchServicesList());
    dispatch(fetchUserProfile({ userId: 1 }));
    dispatch(fetchServiceDetailsPageData({ package_id: "3" }));
    dispatch(fetchAddressList());
  }, [dispatch]);

  const setValueRef = useRef(null);

  useEffect(() => {
    if (userProfile && userProfile.name) {
      const normalizedGender = (userProfile.gender || "Select").toLowerCase();
      setAllFormData((prev) => ({
        ...prev,
        fullName: userProfile.name,
        gender: normalizedGender,
        age: userProfile.dob
          ? new Date().getFullYear() - new Date(userProfile.dob).getFullYear()
          : "",
        contact: userProfile.mobile,
      }));

      if (setValueRef.current) {
        setValueRef.current("fullName", userProfile.name);
        setValueRef.current("gender", normalizedGender);
        setValueRef.current(
          "age",
          userProfile.dob
            ? new Date().getFullYear() - new Date(userProfile.dob).getFullYear()
            : ""
        );
        setValueRef.current("contact", userProfile.mobile);
      }
    }
  }, [userProfile]);

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
      watch,
      setValue,
      formState: { errors },
    } = useForm({
      defaultValues: allFormData,
    });

    // Store setValue in ref for use in parent useEffect
    useEffect(() => {
      setValueRef.current = setValue;
      return () => {
        setValueRef.current = null;
      };
    }, [setValue]);

    // Get test packages from servicesListData (API data)
    const testPackages = Array.isArray(servicesListData?.packages)
      ? servicesListData.packages
      : [];

    // Auto-select a test package by id if not already set
    useEffect(() => {
      // Set your default package id here, or get it from userProfile/serviceDetailsPageData
      const defaultTestId =
        serviceDetailsPageData?.id || (testPackages[0] && testPackages[0].id);
      if (testPackages.length > 0 && !watch("selectedTest") && defaultTestId) {
        setValue("selectedTest", String(defaultTestId));
        setAllFormData((prev) => ({
          ...prev,
          selectedTest: String(defaultTestId),
        }));
      }
    }, [testPackages, serviceDetailsPageData, setValue]);

    // Watch selected test id
    const selectedTestId = watch("selectedTest");
    // Find selected test object
    const selectedTest = testPackages.find(
      (t) => String(t.id) === String(selectedTestId)
    );

    // Helper to strip <br/> from name
    const stripBr = (str) => str?.replace(/<br\s*\/?>(\s*)?/gi, " ").trim();

    const onSubmit = (data) => {
      console.log("Step 1 Form Data:", data);
      handleContinue(data);
    };
    const isDisabled = !selectedTestId;

    return (
      <div onSubmit={handleSubmit(onSubmit)}>
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
                    disabled={isDisabled}
                    className={`w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl transition-all 
    ${
      isDisabled
        ? "opacity-50 cursor-not-allowed"
        : "focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white"
    }`}
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
                            value !== "Select" || "Gender is required",
                        })}
                        disabled={isDisabled}
                        className={`w-full text-sm appearance-none px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl transition-all 
    ${
      isDisabled
        ? "opacity-50 cursor-not-allowed"
        : "focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white"
    }`}
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
                          disabled={isDisabled}
                          className={`w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl transition-all 
    ${
      isDisabled
        ? "opacity-50 cursor-not-allowed"
        : "focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white"
    }`}
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
                        value !== "" || "Please select a valid test",
                    })}
                    className="w-full appearance-none px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                  >
                    <option value="">Select Test</option>
                    {testPackages.map((test) => (
                      <option key={test.id} value={test.id}>
                        {stripBr(test.name)}
                      </option>
                    ))}
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
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="w-[166px] __secondary-bg text-white text-[20px] py-3 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Professional Date Time Picker Component
  const ProfessionalDateTimePicker = ({
    onDateTimeChange,
    initialDate = "",
    initialTime = "",
  }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [selectedTime, setSelectedTime] = useState(initialTime);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [errors, setErrors] = useState({});

    const datePickerRef = useRef(null);
    const timePickerRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          datePickerRef.current &&
          !datePickerRef.current.contains(event.target)
        ) {
          setShowDatePicker(false);
        }
        if (
          timePickerRef.current &&
          !timePickerRef.current.contains(event.target)
        ) {
          setShowTimePicker(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const timeSlots = [
      { value: "09:00-10:00", label: "09:00 - 10:00 AM", available: true },
      { value: "10:00-11:00", label: "10:00 - 11:00 AM", available: true },
      { value: "11:00-12:00", label: "11:00 - 12:00 PM", available: false },
      { value: "12:00-13:00", label: "12:00 - 01:00 PM", available: true },
      { value: "14:00-15:00", label: "02:00 - 03:00 PM", available: true },
      { value: "15:00-16:00", label: "03:00 - 04:00 PM", available: true },
      { value: "16:00-17:00", label: "04:00 - 05:00 PM", available: false },
      { value: "17:00-18:00", label: "05:00 - 06:00 PM", available: true },
    ];

    const formatDate = (date) => {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const getDaysInMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const days = [];

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }

      // Get today's date at midnight
      const todayMidnight = new Date();
      todayMidnight.setHours(0, 0, 0, 0);

      // Add all days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        const currentDateMidnight = new Date(currentDate);
        currentDateMidnight.setHours(0, 0, 0, 0);
        const isToday = currentDateMidnight.getTime() === todayMidnight.getTime();
        // Only disable dates strictly before today
        const isPast = currentDateMidnight.getTime() < todayMidnight.getTime();
        const isSelected =
          selectedDate === currentDate.toISOString().split("T")[0];

        days.push({
          day,
          date: currentDate,
          isToday,
          isPast,
          isSelected,
          disabled: isPast,
        });
      }

      return days;
    };

    const handleDateSelect = (date) => {
      // Use local date string to avoid timezone issues
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const localDateString = `${year}-${month}-${day}`;
      setSelectedDate(localDateString);
      setShowDatePicker(false);
      setErrors((prev) => ({ ...prev, date: "" }));
      onDateTimeChange &&
        onDateTimeChange({ date: localDateString, timeSlot: selectedTime });
    };

    const handleTimeSelect = (timeSlot) => {
      if (timeSlot.available) {
        setSelectedTime(timeSlot.value);
        setShowTimePicker(false);
        setErrors((prev) => ({ ...prev, timeSlot: "" }));
        onDateTimeChange &&
          onDateTimeChange({ date: selectedDate, timeSlot: timeSlot.value });
      }
    };

    const navigateMonth = (direction) => {
      setCurrentMonth((prev) => {
        const newMonth = new Date(prev);
        newMonth.setMonth(prev.getMonth() + direction);
        return newMonth;
      });
    };

    const days = getDaysInMonth(currentMonth);
    const monthYear = currentMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    const selectedTimeSlot = timeSlots.find(
      (slot) => slot.value === selectedTime
    );

    return (
      <div className="space-y-6">
        {/* Date Picker */}
        <div className="lg:flex flex-row items-center gap-3">
          <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
            Date Schedule
          </label>
          <div className="relative lg:w-[60%] w-full" ref={datePickerRef}>
            <div
              onClick={() => setShowDatePicker(!showDatePicker)}
              className={`w-full custom-outline-input cursor-pointer ${
                showDatePicker ? "bg-white" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar
                    className={`w-6 h-6 transition-colors ${
                      showDatePicker ? "text-pink-500" : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-lg ${
                      selectedDate
                        ? "text-gray-800 font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {selectedDate
                      ? formatDate(new Date(selectedDate))
                      : "Choose your preferred date"}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    showDatePicker ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {showDatePicker && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-pink-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                {/* Calendar Header */}
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => navigateMonth(-1)}
                      className="p-2 hover:bg-pink-400 rounded-xl transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <h3 className="text-xl font-semibold text-white">
                      {monthYear}
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateMonth(1)}
                      className="p-2 hover:bg-pink-400 rounded-xl transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="p-4">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="p-2 text-center text-sm font-medium text-gray-500"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((dayObj, index) => (
                      <div key={index} className="aspect-square">
                        {dayObj && (
                          <button
                            type="button"
                            onClick={() =>
                              !dayObj.disabled && handleDateSelect(dayObj.date)
                            }
                            disabled={dayObj.disabled}
                            className={`w-full h-full rounded-xl text-sm font-medium transition-all duration-200 ${
                              dayObj.isSelected
                                ? "bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg scale-105"
                                : dayObj.isToday
                                ? "bg-pink-100 text-pink-600 border-2 border-pink-300"
                                : dayObj.disabled
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-700 hover:bg-pink-100 hover:text-pink-600 hover:scale-105"
                            }`}
                          >
                            {dayObj.day}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Display validation errors */}
            {errors.date && (
              <div className="lg:flex flex-row items-center gap-3">
                <div className="w-[160px]"></div>
                <p className="text-red-500 text-sm">{errors.date}</p>
              </div>
            )}
          </div>
        </div>

        {/* Time Picker */}
        <div className="lg:flex flex-row items-center gap-3">
          <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
            Select Time Slot
          </label>
          <div className="relative md:w-[60%] w-full" ref={timePickerRef}>
            <div
              onClick={() => setShowTimePicker(!showTimePicker)}
              className={`w-full custom-outline-input cursor-pointer ${
                showTimePicker ? "bg-white" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock
                    className={`w-6 h-6 transition-colors ${
                      showTimePicker ? "text-pink-500" : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-lg ${
                      selectedTime
                        ? "text-gray-800 font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {selectedTimeSlot
                      ? selectedTimeSlot.label
                      : "Choose your preferred time"}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    showTimePicker ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {showTimePicker && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-pink-200 rounded-2xl shadow-2xl z-40 overflow-hidden max-h-80 overflow-y-auto">
                <div className="py-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.value}
                      type="button"
                      onClick={() => handleTimeSelect(slot)}
                      disabled={!slot.available}
                      className={`w-full px-6 py-4 text-left transition-all duration-200 flex items-center justify-between ${
                        selectedTime === slot.value
                          ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white"
                          : slot.available
                          ? "hover:bg-pink-50 text-gray-700"
                          : "text-gray-400 cursor-not-allowed bg-gray-50"
                      }`}
                    >
                      <span className="font-medium">{slot.label}</span>
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          slot.available
                            ? selectedTime === slot.value
                              ? "bg-white bg-opacity-20 text-white"
                              : "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {slot.available ? "Available" : "Booked"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {errors.timeSlot && (
              <div className="lg:flex flex-row items-center gap-3">
                <div className="w-[160px]"></div>
                <p className="text-red-500 text-sm">
                  {errors.timeSlot}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
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

    const [dateTimeData, setDateTimeData] = useState({
      date: allFormData.date || "",
      timeSlot: allFormData.timeSlot || "",
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleDateTimeChange = (data) => {
      setDateTimeData(data);
      setValue("date", data.date);
      setValue("timeSlot", data.timeSlot);

      // Clear validation errors when data is selected
      if (data.date) {
        setValidationErrors((prev) => ({ ...prev, date: "" }));
      }
      if (data.timeSlot) {
        setValidationErrors((prev) => ({ ...prev, timeSlot: "" }));
      }
    };

    const onSubmit = (data) => {
      const newErrors = {};

      if (!dateTimeData.date) {
        newErrors.date = "Date is required";
      } else {
        // Validate not in past
        const selected = new Date(dateTimeData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) {
          newErrors.date = "Schedule date cannot be in the past";
        }
      }

      if (!dateTimeData.timeSlot) {
        newErrors.timeSlot = "Time slot is required";
      }

      setValidationErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const finalData = {
          ...data,
          date: dateTimeData.date,
          timeSlot: dateTimeData.timeSlot,
        };
        handleContinue(finalData);
      }
    };

    return (
      <div>
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

              {/* Professional Date Time Picker */}
              <ProfessionalDateTimePicker
                onDateTimeChange={handleDateTimeChange}
                initialDate={allFormData.date || ""}
                initialTime={allFormData.timeSlot || ""}
              />

              {/* Display validation errors */}
              {/* {validationErrors.date && (
                <div className="lg:flex flex-row items-center gap-3">
                  <div className="w-[160px]"></div>
                  <p className="text-red-500 text-sm">
                    {validationErrors.date}
                  </p>
                </div>
              )} */}
              {/* {validationErrors.timeSlot && (
                <div className="lg:flex flex-row items-center gap-3">
                  <div className="w-[160px]"></div>
                  <p className="text-red-500 text-sm">
                    {validationErrors.timeSlot}
                  </p>
                </div>
              )} */}
            </div>

            <div className="flex items-center lg:justify-start mt-6 lg:pl-[8px] cursor-pointer">
              <label className="hidden lg:block lg:w-[160px]"></label>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="w-[166px] __secondary-bg text-white text-[20px] lg:ml-2 font-bold py-3 px-6 rounded-lg"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Step3 = ({ handleContinue }) => {
    const testPackages = Array.isArray(servicesListData?.packages)
      ? servicesListData.packages
      : [];
    const selectedTestObj = testPackages.find(
      (t) => String(t.id) === String(allFormData.selectedTest)
    );
    const bookingData = useSelector((state) => state.booking?.data || {});
    const getBookingSummary = () => {
      return `Your booking for ${selectedTestObj ? selectedTestObj.name.replace(/<br\s*\/?>(\s*)?/gi, " ") : "the selected package"} is scheduled on ${allFormData.date || "[Select Date]"}.`;
    };

    const {
      register,
      setValue,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        ...allFormData,
        totalCost: allFormData.totalCost || bookingData.totalCost || "60",
        bookingSummary: getBookingSummary(),
      },
    });

    useEffect(() => {
      setValue("bookingSummary", getBookingSummary());
    }, [allFormData.selectedTest, allFormData.date, servicesListData]);
    const dispatch = useDispatch();
    const address_id = useSelector((state) => state.addressList?.data?.[0]?.id || null);

    const [dateError, setDateError] = useState("");
    const onSubmit = (data) => {
      setDateError("");
      // Validate not in past
      if (data.date) {
        const selected = new Date(data.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) {
          setDateError("Schedule date cannot be in the past");
          return;
        }
      }
      let schedule_time = "";
      if (data.timeSlot) {
        const start = data.timeSlot.split("-")[0];
        schedule_time = /^\d{2}:\d{2}$/.test(start) ? `${start}:00` : start;
      }
      const payload = {
        address_id,
        package_ids: [parseInt(data.selectedTest, 10)].filter(Number.isInteger),
        schedule_date: data.date,
        schedule_time,
        payment_method: data.paymentMode,
        terms_condition: data.agreeTerms,
        coupon_code: data.applyCode || "",
      };
      dispatch(createBooking(payload));
      handleContinue({ ...data, totalCost: bookingData.totalCost });
    };

    return (
      <div>
        <div className="rounded-lg px-4 lg:w-10/12 lg:mx-auto md:p-6 md:pt-0 flex items-center justify-between relative pt-[60px]">
          <div className="space-y-6 lg:ml-16 w-full">
            <h2 className="section__heading mb-8 hidden md:block">
              Review and Pay
            </h2>

            {dateError && (
              <div className="text-red-500 text-sm mb-2">{dateError}</div>
            )}

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
                    rows={5}
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
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="online_banking">Online Banking</option>
                    <option value="cash_on_delivery">Cash on Delivery</option>
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
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="w-[200px] __secondary-bg text-white text-[20px] py-3 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      </div>
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
            {/* <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Remarks
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.remarks || "Lorem ipsum dolor sit amet"}
              </span>
            </div> */}
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Selected Test
              </span>
              <span className="font-[600] text-[20px]">
                {
                  (() => {
                    const testPackages = Array.isArray(servicesListData?.packages)
                      ? servicesListData.packages
                      : [];
                    const selectedTestObj = testPackages.find(
                      (t) => String(t.id) === String(allFormData.selectedTest)
                    );
                    return selectedTestObj
                      ? selectedTestObj.name.replace(/<br\s*\/?>/gi, " ")
                      : "Complete Blood Count";
                  })()
                }
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
                  : bookingData.totalCost
                  ? `${bookingData.totalCost} RM (Including Tax)`
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
      <ProtectedRoute>
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
      </ProtectedRoute>
    </>
  );
};

export default TestBookingSystem;
