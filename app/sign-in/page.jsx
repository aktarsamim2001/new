"use client";
import Image from "next/image";
import React, { useState } from "react";
import image from "../../public/login-banner/login-banner.jpg";
import { Star } from "lucide-react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

// Modal component
function SuccessModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
        <Image src="/sukaii-logo.png" alt="Sukaii Logo" width={80} height={30} />
        <h3 className="text-xl font-bold mt-4 mb-2 text-center">OTP Verified!</h3>
        <p className="text-gray-600 mb-6 text-center">Signup Complete. You can now log in.</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-pink-500 text-white rounded-lg font-semibold shadow hover:bg-pink-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function LoginComponent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("login"); // 'login' or 'otp'
  const [formData, setFormData] = useState({
    phoneNumber: "",
    username: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 6 digits
    const numericValue = value.replace(/\D/g, "").slice(0, 6);
    setFormData((prev) => ({
      ...prev,
      otp: numericValue,
    }));
    if (error) setError("");
  };

  const handleNext = () => {
    if (formData.phoneNumber && formData.username) {
      setCurrentStep("otp");
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (formData.otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    setError("");
    setModalOpen(true);
    setShouldRedirect(true);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Handle social login logic here
  };

  if (currentStep === "otp") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SuccessModal open={modalOpen} onClose={() => {
          setModalOpen(false);
          if (shouldRedirect) {
            router.push("/user-dashboard");
            setShouldRedirect(false);
          } else {
            setCurrentStep("login");
          }
        }} />
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
                Verify Your
                <br />
                Identity
              </h1>
              <p className="text-gray-600">
                Enter OTP sent to your Mobile Number
              </p>
            </div>

            {/* OTP Input */}
            <form onSubmit={handleVerifyOtp} className="mb-8">
              <div className="mb-4">
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleOtpChange}
                  className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl mb-6"
              >
                Verify
              </button>
            </form>

            {/* Back to Login */}
            <div className="text-center">
              <button
                onClick={() => setCurrentStep("login")}
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
    <div className="bg-gray-50 flex flex-col md:flex-row items-center justify-center min-h-screen">
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
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                placeholder="Enter your username"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-[180px] cursor-pointer __secondary-bg text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl"
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
                <FcGoogle className="w-5 h-5" />
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
      <div className="w-full md:w-1/2 md:h-screen relative order-1 md:order-2">
        <div className="md:absolute inset-0 h-full">
          <div className="h-full flex items-center justify-start md:justify-center md:p-8">
            <Image
              src="/login-banner/login-banner.jpg"
              alt="Sukaii Health"
              width={800}
              height={1200}
              className="md:rounded-[50px] shadow-lg object-cover md:h-full w-full"
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
