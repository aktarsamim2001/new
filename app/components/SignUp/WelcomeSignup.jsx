"use client";
import Image from "next/image";
import React, { useState,useEffect } from "react";
import { Star } from "lucide-react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Link from "next/link";
import image from "../../../app/assets/woman/shape.png";
import WelcomeVideoModal from "./WelcomeVideoModal";

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
  const [showModal, setShowModal] = useState(false); 
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
  });

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setShowModal(true);
    }
  }, []);

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
   <>
    {/* Modal shown on mount */}
      {showModal && <WelcomeVideoModal onClose={() => setShowModal(false)} />}

    <div className="min-h-screen flex flex-col lg:flex-row items-stretch justify-center bg-white relative overflow-hidden">
      {/* Mobile Texture Background */}
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
      {/* Left Side - Form */}
      <div className="order-2 lg:order-none flex-1 flex flex-col justify-center items-center px-4 py-12 lg:py-0 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-5 md:mb-8 flex flex-col items-start">
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

          {/* Title */}
          <div className="mb-4 md:mb-8">
            <h1 className="text-3xl md:text-[56px] md:leading-[56px] font-[500] text-gray-900 mb-4">
              <span className="block">Welcome to</span>
              Better Health
            </h1>
            <p className="text-gray-600 hidden md:block">
              Create your Sukaii Health account to book tests, view your
              reports, manage prescriptions, and access your smart health
              dashboard — all in one place.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-3">
            {/* Phone Number */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                Your Name
              </label>
              <input
                type="tel"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                Enter Your Mobile Number / Email
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              />
            </div>

            {/* Next Button */}

            <button
              onClick={handleNext}
              className="w-[180px] cursor-pointer __secondary-bg text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl mb-4 mt-2"
            >
              Continue
            </button>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center mb-2">
              <input
                id="terms"
                type="checkbox"
                className="form-checkbox h-4 w-4 text-pink-600 rounded focus:ring-pink-500 border-gray-300"
                required
              />
              <label htmlFor="terms" className="ml-2 text-xs text-gray-600">
                By signing up, you agree to our{' '}
                <a href="#" className="underline hover:text-pink-600">Terms &amp; Conditions</a> and{' '}
                <a href="#" className="underline hover:text-pink-600">Privacy Policy</a>.
              </label>
            </div>

            {/* Divider */}
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4 px-4 md:px-0">
              <button
                onClick={() => handleSocialLogin("Google")}
                className="flex cursor-pointer items-center justify-center space-x-2 py-2 px-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <FcGoogle className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700 font-medium">Google</span>
              </button>

              <button
                onClick={() => handleSocialLogin("Facebook")}
                className="flex cursor-pointer items-center justify-center space-x-2 py-2 px-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <BsFacebook className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700 font-medium">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative min-h-[400px] lg:min-h-screen py-8 lg:py-0">
        <div className="w-full max-w-3xl flex flex-col items-center justify-center relative">
          <Image
            src="/login-banner/login-banner.jpg"
            alt="Sukaii Health"
            width={800}
            height={1200}
            className="rounded-[40px] object-cover w-full xl:w-[800px] h-[400px] lg:h-screen p-5"
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
   </>
  );
}
