"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Star, CheckCircle, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import image from "../../app/assets/woman/shape.png";
import { useDispatch } from "react-redux";
import { getOTP, verifyOTP } from "@/features/store/authSlice";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";


const slide = {
  reviewAvatars: [
    { name: "AB", bg: "bg-pink-500" },
    { name: "CD", bg: "bg-blue-500" },
    { name: "EF", bg: "bg-green-500" },
    { image: "/profile-image.png", bg: "" },
  ],
  extra: "+5",
  patients: "2,500+",
  rating: "4.9",
  reviews: "(1.2k reviews)",
};

// Professional Date Picker Component
const ProfessionalDateTimePicker = ({
  dateTimeData,
  setDateTimeData,
  showDatePicker,
  setShowDatePicker,
  currentMonth,
  setCurrentMonth,
  datePickerRef
}) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateSelect = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    
    setDateTimeData(prev => ({
      ...prev,
      date: formattedDate,
      displayDate: selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }));
    setShowDatePicker(false);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const canNavigateForward = () => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);
    
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    return nextMonth <= maxDate;
  };

  const canNavigateBackward = () => {
    const minYear = 1900;
    const currentYear = currentMonth.getFullYear();
    const currentMonthNum = currentMonth.getMonth();
    
    return currentYear > minYear || (currentYear === minYear && currentMonthNum > 0);
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    const today = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const isDisabled = date > today || date > maxDate;
      const isSelected = dateTimeData.date === date.toISOString().split('T')[0];

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => !isDisabled && handleDateSelect(day)}
          disabled={isDisabled}
          className={`h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 ${
            isSelected
              ? 'bg-pink-500 text-white shadow-md hover:bg-pink-600'
              : isToday && !isDisabled
              ? 'bg-pink-100 text-pink-700 border border-pink-300'
              : isDisabled
              ? 'text-gray-300 cursor-not-allowed bg-gray-50'
              : 'hover:bg-pink-50 hover:text-pink-600 text-gray-700 hover:border hover:border-pink-200'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="relative">
      <label className="block text-[16px] font-[400] text-gray-700 mb-3">
        Date of Birth
      </label>
      
      <button
        type="button"
        onClick={() => setShowDatePicker(!showDatePicker)}
        className={`w-full px-4 py-3 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all text-left flex items-center justify-between ${
          showDatePicker 
            ? 'bg-white ring-2 ring-pink-500' 
            : 'bg-gray-100 hover:bg-gray-50'
        }`}
      >
        <span className={dateTimeData.displayDate ? 'text-gray-900 font-medium' : 'text-gray-500'}>
          {dateTimeData.displayDate || 'Select your date of birth'}
        </span>
        <Calendar className={`w-5 h-5 transition-colors ${showDatePicker ? 'text-pink-500' : 'text-gray-400'}`} />
      </button>

      {showDatePicker && (
        <div
          ref={datePickerRef}
          className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl p-6 z-50"
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={() => canNavigateBackward() && navigateMonth(-1)}
              disabled={!canNavigateBackward()}
              className={`p-2 rounded-lg transition-colors ${
                canNavigateBackward() 
                  ? 'hover:bg-pink-50 text-gray-600 hover:text-pink-600' 
                  : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-gray-800">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              type="button"
              onClick={() => canNavigateForward() && navigateMonth(1)}
              disabled={!canNavigateForward()}
              className={`p-2 rounded-lg transition-colors ${
                canNavigateForward() 
                  ? 'hover:bg-pink-50 text-gray-600 hover:text-pink-600' 
                  : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 mb-3">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="h-10 flex items-center justify-center text-sm font-semibold text-gray-500 uppercase tracking-wide">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
          
          {/* Footer info */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Select your date of birth (must be 18 years or older)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

function CompleteProfileContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const datePickerRef = useRef(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    addressLine: "",
    area: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const [dateTimeData, setDateTimeData] = useState({
    date: "",
    displayDate: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() - 25); // Default to 25 years ago
    return defaultDate;
  });

  const [verificationState, setVerificationState] = useState({
    mobileVerified: false,
    emailVerified: false,
    showEmailOtpField: false,
    emailOtp: "",
    loadingEmailOtp: false,
    verifyingEmailOtp: false,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const name = searchParams.get("name") || "";
    const verifiedMobile = searchParams.get("verifiedMobile") || "";
    const verifiedEmail = searchParams.get("verifiedEmail") || "";

    setFormData((prev) => ({
      ...prev,
      fullName: name,
      phoneNumber: verifiedMobile,
      email: verifiedEmail,
    }));

    // Set verification states
    setVerificationState(prev => ({
      ...prev,
      mobileVerified: !!verifiedMobile,
      emailVerified: !!verifiedEmail,
    }));
  }, [searchParams]);

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update dateOfBirth in formData when dateTimeData changes
  useEffect(() => {
    if (dateTimeData.date) {
      setFormData(prev => ({
        ...prev,
        dateOfBirth: dateTimeData.date
      }));
    }
  }, [dateTimeData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Reset email verification if email is changed
    if (name === 'email' && verificationState.emailVerified) {
      setVerificationState(prev => ({
        ...prev,
        emailVerified: false,
        showEmailOtpField: false,
        emailOtp: "",
      }));
    }
    
    if (error) setError("");
  };

  const handleEmailOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setVerificationState(prev => ({ ...prev, emailOtp: value }));
    if (error) setError("");
  };

  const handleSendEmailOtp = async () => {
    if (!formData.email) {
      setError("Please enter your email address");
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setVerificationState(prev => ({ ...prev, loadingEmailOtp: true }));
    
    const payload = {
      login_type: "email",
      email: formData.email,
      name: "",
      social_login_id: "",
    };

    dispatch(
      getOTP(payload, (success) => {
        setVerificationState(prev => ({ 
          ...prev, 
          loadingEmailOtp: false,
          showEmailOtpField: success 
        }));
        if (success) {
          toast.success("OTP sent to your email");
        }
      })
    );
  };

  const handleVerifyEmailOtp = async () => {
    if (verificationState.emailOtp.length !== 4) {
      setError("Please enter a 4-digit OTP");
      return;
    }

    setVerificationState(prev => ({ ...prev, verifyingEmailOtp: true }));

    const payload = {
      login_type: "email",
      email: formData.email,
      otp: verificationState.emailOtp,
    };

    dispatch(
      verifyOTP(payload, (success) => {
        setVerificationState(prev => ({ 
          ...prev, 
          verifyingEmailOtp: false,
          emailVerified: success,
          showEmailOtpField: false,
          emailOtp: "",
        }));
        if (success) {
          toast.success("Email verified successfully!");
        }
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = ['fullName', 'email', 'phoneNumber', 'gender', 'dateOfBirth', 'addressLine', 'area', 'city', 'country', 'zipCode'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      setError("Please fill in all fields");
      return;
    }

    if (!verificationState.mobileVerified) {
      setError("Mobile number must be verified");
      return;
    }

    if (!verificationState.emailVerified) {
      setError("Email must be verified");
      return;
    }

    // Submit profile data
    console.log("Profile completed:", formData);
    toast.success("Profile completed successfully!");
    
    // Redirect to dashboard or next step
    router.push("/user-dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-stretch justify-center bg-white">
      {/* Background shape (mobile only) */}
      <div className="absolute top-0 right-0 w-[300px] h-[280px] md:hidden pointer-events-none z-0">
        <Image
          src={image}
          alt="Texture"
          fill
          style={{ objectFit: "contain", objectPosition: "top right" }}
          className="opacity-70"
          priority
        />
      </div>

      {/* Form section */}
      <div className="order-2 lg:order-none flex-1 flex flex-col justify-center items-center px-4 py-12 lg:py-0">
        <div className="w-full max-w-md">
          <div className="mb-5 md:mb-8 flex flex-col items-start">
            <Image src="/sukaii-logo.png" alt="Sukaii Logo" width={150} height={50} />
          </div>

          <h2 className="text-3xl md:text-[56px] leading-[56px] font-[500] text-gray-900 mb-4">
            <span className="block">Complete Your</span> Profile
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                required
              />
            </div>

            {/* Phone Number - Auto populated and disabled if verified */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                Phone Number
                {verificationState.mobileVerified && (
                  <span className="ml-2 inline-flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </span>
                )}
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                  verificationState.mobileVerified 
                    ? 'bg-green-50 text-green-800 cursor-not-allowed' 
                    : 'bg-gray-100 focus:bg-white'
                }`}
                disabled={verificationState.mobileVerified}
                required
              />
            </div>

            {/* Email with verification */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                Email
                {verificationState.emailVerified && (
                  <span className="ml-2 inline-flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </span>
                )}
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`flex-1 px-4 py-3 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                    verificationState.emailVerified 
                      ? 'bg-green-50 text-green-800' 
                      : 'bg-gray-100 focus:bg-white'
                  }`}
                  disabled={verificationState.emailVerified}
                  required
                />
                {!verificationState.emailVerified && (
                  <button
                    type="button"
                    onClick={handleSendEmailOtp}
                    disabled={verificationState.loadingEmailOtp || !formData.email}
                    className="px-4 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {verificationState.loadingEmailOtp ? "Sending..." : "Verify"}
                  </button>
                )}
              </div>
            </div>

            {/* Email OTP Field */}
            {verificationState.showEmailOtpField && (
              <div>
                <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                  Enter Email OTP
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={verificationState.emailOtp}
                    onChange={handleEmailOtpChange}
                    className="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all text-left text-lg tracking-widest"
                    placeholder="0000"
                    maxLength={4}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyEmailOtp}
                    disabled={verificationState.verifyingEmailOtp || verificationState.emailOtp.length !== 4}
                    className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {verificationState.verifyingEmailOtp ? "Verifying..." : "Confirm"}
                  </button>
                </div>
              </div>
            )}

            {/* Gender */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Date of Birth with Professional Date Picker */}
            <ProfessionalDateTimePicker
              dateTimeData={dateTimeData}
              setDateTimeData={setDateTimeData}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              datePickerRef={datePickerRef}
            />

            {/* Address Line */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">Address Line</label>
              <input
                type="text"
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                placeholder="Street address, apartment, suite, etc."
                required
              />
            </div>

            {/* Area/Location */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">Area/Location</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                placeholder="Neighborhood, locality, area"
                required
              />
            </div>

            {/* City and Country - Side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[16px] font-[400] text-gray-700 mb-3">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <label className="block text-[16px] font-[400] text-gray-700 mb-3">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                  placeholder="Country"
                  required
                />
              </div>
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                placeholder="Postal/Zip code"
                required
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full cursor-pointer bg-pink-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-pink-600 mt-6 disabled:cursor-not-allowed transition-all"
              disabled={!verificationState.mobileVerified || !verificationState.emailVerified}
            >
              Complete Profile
            </Button>
          </form>
        </div>
      </div>

      {/* Image section (desktop only) */}
      <div className="order-1 lg:order-2 flex-1 hidden lg:flex items-center justify-center relative h-screen">
        <div className="w-full h-full max-w-3xl flex flex-col items-center justify-center relative p-5">
          <div className="relative w-full h-full rounded-[40px] overflow-hidden">
            <Image
              src="/login-banner/login-banner.jpg"
              alt="Sukaii Health"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-10 px-6 py-4 flex flex-col items-center justify-center gap-2 border-2 border-sky-500 rounded-lg bg-blue-50 shadow-2xl">
            <div className="flex -space-x-3">
              {slide.reviewAvatars.map((avatar, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-white ${avatar.bg} flex items-center justify-center text-white font-semibold text-xs shadow-sm`}
                >
                  {avatar.image ? (
                    <Image
                      src={avatar.image}
                      alt={`Avatar`}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    avatar.name
                  )}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center text-white font-semibold text-xs shadow-sm ml-0.5">
                {slide.extra}
              </div>
            </div>
            <div className="flex flex-col items-start mt-2">
              <div className="font-[600] text-gray-900 text-[18px] md:text-[20px]">
                {slide.patients}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900">{slide.rating}</span>
                <span className="text-xs text-gray-500">{slide.reviews}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompleteProfile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompleteProfileContent />
    </Suspense>
  );
}