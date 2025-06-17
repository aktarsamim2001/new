"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Star } from "lucide-react";

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

function CompleteProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Prefill from query params
    const name = searchParams.get("name") || "";
    const username = searchParams.get("username") || "";
    setFormData((prev) => ({
      ...prev,
      fullName: name,
      username: username,
      phone: username.match(/^[0-9+]+$/) ? username : "",
    }));
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    // After successful profile completion, go to OTP verification
    router.push("/otp-verification");
  };

  return (
    <div className="min-h-screen flex items-center justify-evenly">
      <div className="">
        <div className="mb-8 flex flex-col items-center">
          <Image src="/sukaii-logo.png" alt="Sukaii Logo" width={120} height={40} />
          <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">Complete Your Profile</h2>
          <p className="text-gray-600 text-center">Please provide your details to finish setting up your account.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email or Phone Number</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              placeholder="Enter your email or phone number"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all pr-12"
                placeholder="Create a password"
                required
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all pr-12"
                placeholder="Confirm your password"
                required
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Continue to OTP Verification
          </button>
        </form>
      </div>
      <div className="hidden lg:block lg:w-1/2 relative h-screen">
        <div className="absolute inset-0 h-full">
          <div className="h-full flex items-center justify-center p-8">
            <Image
              src="/login-banner/login-banner.jpg"
              alt="Sukaii Health"
              width={800}
              height={1200}
              className="rounded-[50px] shadow-lg object-cover h-full w-full"
            />
          </div>
          <div className="absolute bottom-20 -left-12 ml-3 px-8 flex flex-col items-center justify-center gap-3 p-3 border-2 border-sky-500 rounded-lg bg-blue-50 shadow-2xl">
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

export default function CompleteProfile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompleteProfileContent />
    </Suspense>
  );
}
