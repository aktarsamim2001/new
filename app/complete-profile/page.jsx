"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Star } from "lucide-react";
import image from "../../app/assets/woman/shape.png";

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
    <div className="min-h-screen flex flex-col lg:flex-row items-stretch justify-center bg-white">
      {/* Form section */}
      <div className="absolute top-0 right-0 w-[300px] h-[280px] md:hidden pointer-events-none z-0">
        <Image
          src={image}
          alt="Texture"
          fill
          style={{ objectFit: 'contain', objectPosition: 'top right' }}
          className="opacity-70"
          priority
        />
      </div>
      <div className="order-2 lg:order-none flex-1 flex flex-col justify-center items-center px-4 py-12 lg:py-0">
        <div className="w-full max-w-md">
          <div className="mb-5 md:mb-8 flex flex-col items-start">
            <Image src="/sukaii-logo.png" alt="Sukaii Logo" width={150} height={50} />
          </div>
          <h2 className="text-3xl md:text-[56px] leading-[56px] font-[500] text-gray-900 mb-4"><span className="block">Submit Your</span> Details</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
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
          <div>
            <label className="block text-[16px] font-[400] text-gray-700 mb-3">Email or Phone Number</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-[16px] font-[400] text-gray-700 mb-3">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all pr-12"
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
            <label className="block text-[16px] font-[400] text-gray-700 mb-3">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all pr-12"
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
              className="w-[180px] cursor-pointer __secondary-bg text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl mt-2 mb-4"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
      {/* Image section (visible on all screens, below form on mobile, right on desktop) */}
      <div className="hidden lg:flex order-1 lg:order-none flex-1 items-center justify-center relative min-h-[320px] md:min-h-[400px] lg:min-h-screen py-8 lg:py-0">
        <div className="w-full max-w-3xl flex flex-col items-center justify-center relative">
          <Image
            src="/login-banner/login-banner.jpg"
            alt="Sukaii Health"
            width={800}
            height={800}
            className="rounded-[40px] object-cover w-full h-[320px] md:h-[400px] lg:h-screen p-5"
            priority
          />
          <div className="absolute left-1/2 -translate-x-1/2 lg:-left-16 lg:translate-x-0 bottom-6 md:bottom-10 ml-3 px-6 flex flex-col items-center justify-center gap-2 p-3 border-2 border-sky-500 rounded-lg bg-blue-50 shadow-2xl">
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
              <div className="font-[600] text-gray-900 text-[18px] md:text-[20px]">
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
