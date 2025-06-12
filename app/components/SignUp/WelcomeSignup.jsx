"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { Facebook } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';

export default function WelcomeSignup() {
  const [currentStep, setCurrentStep] = useState('login'); // 'login' or 'otp'
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    username: '',
    otp: ['', '', '', '', '', '']
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    
    setFormData(prev => ({
      ...prev,
      otp: newOtp
    }));

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleNext = () => {
    if (formData.phoneNumber && formData.username) {
      setCurrentStep('otp');
    }
  };

  const handleVerifyOtp = () => {
    const otpString = formData.otp.join('');
    if (otpString.length === 6) {
      console.log('OTP Verified:', otpString);
      // Handle OTP verification logic here
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Handle social login logic here
  };

  if (currentStep === 'otp') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-8">
              <div className="flex items-center space-x-2">
                <Image
                  src="/sukaii-logo.png"
                  alt="Sukaii Health Logo"
                  width={150}
                  height={50}
                />
              </div>
            </div>

            {/* Title */}
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Verify Your<br />Identity
              </h1>
              <p className="text-gray-600">
                Enter OTP sent to your Mobile Number
              </p>
            </div>

            {/* OTP Input */}
            <div className="mb-8">
              <div className="flex space-x-3 justify-center">
                {formData.otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl mb-6"
            >
              Verify
            </button>

            {/* Back to Login */}
            <div className="text-center">
              <button
                onClick={() => setCurrentStep('login')}
                className="text-pink-500 hover:text-pink-600 font-medium"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block lg:w-1/2 relative h-screen">
          <div className="absolute inset-0 h-full">
            <div className="h-full flex items-center justify-center p-8">
              <Image
                src="/login-banner/login-banner.jpg"
                alt="Sukaii Health"
                width={800}
                height={1200}
                className="rounded-2xl shadow-lg object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 flex items-center justify-center min-h-screen">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center space-x-2">
               <Image src="/sukaii-logo.png" alt="Sukaii Logo" width={150} height={50} />
            </div>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Welcome to<br />Better Health
            </h1>
            <p className="text-gray-600">
              Create your Sukaii Health account to book tests, view your reports, manage prescriptions, and access your smart health dashboard — all in one place.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                placeholder="Enter your name"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
               Enter Your Mobile Number / Email
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                placeholder="Enter your mobile number or email"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className=" bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold cursor-pointer w-[180px] py-4 rounded-xl shadow-lg hover:shadow-xl"
            >
              Next
            </button>

            {/* Divider */}
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <FcGoogle className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700 font-medium">Google</span>
              </button>
              
              <button
                onClick={() => handleSocialLogin('Facebook')}
                className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <BsFacebook className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700 font-medium">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
       <div className="hidden lg:block lg:w-1/2 relative h-screen">
          <div className="absolute inset-0 h-full">
            <div className="h-full flex items-center justify-center p-8">
              <Image
                src="/login-banner/login-banner.jpg"
                alt="Sukaii Health"
                width={800}
                height={1200}
                className="rounded-2xl shadow-lg object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
  );
}