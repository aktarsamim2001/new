"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Star } from "lucide-react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Review/avatars data array
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

export default function WelcomeSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (formData.name && formData.username) {
      router.push(
        `/complete-profile?name=${encodeURIComponent(
          formData.name
        )}&username=${encodeURIComponent(formData.username)}`
      );
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Handle social login logic here
  };

  return (
    <div className=" flex items-center flex-col md:flex-row justify-center min-h-screen">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 order-2 md:order-1">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center space-x-2">
              <Link href="/">
                <span>
                  <Image
                    src="/sukaii-logo.png"
                    alt="Sukai Logo"
                    width={150}
                    height={50}
                  />
                </span>
              </Link>
            </div>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Welcome to
              <br />
              Better Health
            </h1>
            <p className="text-gray-600">
              Create your Sukaii Health account to book tests, view your
              reports, manage prescriptions, and access your smart health
              dashboard — all in one place.
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
                type="tel"
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
                placeholder="Enter your mobile number / email"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-[180px] cursor-pointer __secondary-bg text-white font-semibold py-4 rounded-xl  shadow-lg hover:shadow-xl"
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
                onClick={() => handleSocialLogin("Google")}
                className="flex cursor-pointer items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <FcGoogle className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700 font-medium">Google</span>
              </button>

              <button
                onClick={() => handleSocialLogin("Facebook")}
                className="flex cursor-pointer items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <BsFacebook className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700 font-medium">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full lg:w-1/2 relative md:h-screen order-1 md:order-2">
        <div className="md:absolute inset-0 h-full">
          <div className="h-full flex items-center justify-center md:p-8">
            <Image
              src="/login-banner/login-banner.jpg"
              alt="Sukaii Health"
              width={800}
              height={1200}
              className="md:rounded-[50px] shadow-lg object-cover h-full w-full"
            />
          </div>
          <div className="hidden absolute bottom-20 -left-12 ml-3 px-8 md:flex flex-col items-center justify-center gap-3 p-3 border-2 border-sky-500 rounded-lg bg-blue-50 shadow-2xl">
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

            <div className="flex flex-col items-start">
              <div className="font-[600] text-gray-900 text-[20px]">
                {slide.patients}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900">
                  {slide.rating}
                </span>
                <span className="text-xs text-gray-500">{slide.reviews}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
