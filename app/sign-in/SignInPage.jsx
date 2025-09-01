"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OtpInput from "../components/SignUp/OtpInput";
import { useDispatch, useSelector } from "react-redux";
import { getOTP, verifyOTP } from "@/features/store/authSlice";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import { Input } from "@/components/ui/input";

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

export default function SignInPage({ content }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    loadingStatus,
    isAuthenticated,
    error: authError,
  } = useSelector((state) => state.auth);

  const [otpField, setOtpField] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [verifiedContactInfo, setVerifiedContactInfo] = useState(null); // Store verified info

  useEffect(() => {
    if (isAuthenticated) {
      setModalOpen(true);
      setTimeout(() => {
        const queryParams = new URLSearchParams();
        if (verifiedContactInfo) {
          if (verifiedContactInfo.type === 'mobile') {
            queryParams.set('verifiedMobile', verifiedContactInfo.value);
          } else if (verifiedContactInfo.type === 'email') {
            queryParams.set('verifiedEmail', verifiedContactInfo.value);
          }
          queryParams.set('loginType', verifiedContactInfo.type); // Add login type to the URL
        }
        router.push(`/complete-profile?${queryParams.toString()}`);
      }, 2000);
    }
  }, [isAuthenticated, router, verifiedContactInfo]);

  useEffect(() => {
    if (authError) {
      setError(authError);
      toast.error(authError);
    }
  }, [authError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "phoneNumber" && value.length > 0 ? { email: "" } : {}),
      ...(name === "email" && value.length > 0 ? { phoneNumber: "" } : {}),
    }));
    if (error) setError("");
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, "").slice(0, 4);
    setFormData((prev) => ({ ...prev, otp: numericValue }));
    if (error) setError("");
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!termsChecked) {
      setError("You must agree to Terms & Conditions to continue.");
      return;
    }
    if (!formData.phoneNumber && !formData.email) {
      setError("Please enter either phone number or email");
      return;
    }
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    const payload = {
      login_type: formData.phoneNumber ? "mobile" : "email",
      [formData.phoneNumber ? "mobile" : "email"]:
        formData.phoneNumber || formData.email,
      name: "",
      social_login_id: "",
    };

    dispatch(
      getOTP(payload, (success) => {
        if (success) setOtpField(true);
      })
    );
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (formData.otp.length !== 4) {
      setError("Please enter a 4-digit OTP");
      return;
    }

    const payload = {
      login_type: formData.phoneNumber ? "mobile" : "email",
      [formData.phoneNumber ? "mobile" : "email"]:
        formData.phoneNumber || formData.email,
      otp: formData.otp,
    };

    dispatch(
      verifyOTP(payload, (success) => {
        if (success) {
          const loginType = formData.phoneNumber ? 'mobile' : 'email';
          setVerifiedContactInfo({
            type: loginType,
            value: formData.phoneNumber || formData.email
          });
          setModalOpen(true);
          setTimeout(() => {
            const queryParams = new URLSearchParams();
            if (formData.phoneNumber) {
              queryParams.set('verifiedMobile', formData.phoneNumber);
            } else if (formData.email) {
              queryParams.set('verifiedEmail', formData.email);
            }
            queryParams.set('loginType', loginType);
            router.push(`/complete-profile?${queryParams.toString()}`);
          }, 2000);
        }
      })
    );
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  if (otpField) {
    return (
      <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
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
                <span className="block">Verify Your</span>
                Identity
              </h1>
              <p className="block banner__description text-gray-700 mb-3">
                Enter OTP sent to {formData.phoneNumber || formData.email}
              </p>
            </div>

            {/* OTP Input */}
            <form onSubmit={handleVerifyOtp} className="mb-8 space-y-4">
              <OtpInput
                value={formData.otp}
                onChange={handleOtpChange}
                error={error}
              />
              <button
                className="w-[180px] cursor-pointer __secondary-bg text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl mb-4 mt-2"
                disabled={loadingStatus}
              >
                {loadingStatus ? "Verifying..." : "Confirm"}
              </button>
            </form>
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
              className="rounded-[40px] object-cover w-full h-[400px] lg:h-screen p-5"
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

  return (
    <div className="bg-gray-50 flex flex-col md:flex-row items-center justify-center min-h-screen relative overflow-hidden">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 py-16 md:py-20">
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
          <div className="mb-5 md:mb-8">
            <h1 className="text-3xl md:text-[56px] md:leading-[56px] font-[500] text-gray-900 mt-3 mb-2">
              <span className="block">{content?.title || "Welcome to"}</span>
              Better Health
            </h1>
            <p className="text-gray-600 banner__description">
              {content?.description ||
                "Create your Sukaii Health account to book tests, view your reports, manage prescriptions, and access your smart health dashboard — all in one place."}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-3">
            <form onSubmit={handleNext}>
              {/* Phone Number */}
              <div>
                <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your 10-digit phone number"
                  maxLength={10}
                  disabled={!!formData.email}
                />
              </div>

              <div className="flex items-center py-5">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-sm text-gray-500">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  disabled={!!formData.phoneNumber}
                />
              </div>

              <Button
                type="submit"
                variant="outline"
                disabled={loadingStatus}
                className="w-[180px] cursor-pointer __secondary-bg text-white mt-4"
              >
                {loadingStatus ? "Sending OTP..." : "Continue"}
              </Button>
            </form>

            <div className="flex items-center mb-2">
              <input
                id="terms"
                type="checkbox"
                className="form-checkbox h-4 w-4 text-pink-600 rounded focus:ring-pink-500 border-gray-300"
                required
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
              />
              <label htmlFor="terms" className="ml-2 text-xs text-gray-600">
                By signing up, you agree to our{" "}
                <a href="#" className="underline hover:text-pink-600">
                  Terms &amp; Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-pink-600">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Divider */}
            <div className="flex items-center py-3">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4 md:px-0 px-4">
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
      <div className="hidden lg:flex flex-1 items-center justify-center relative min-h-[400px] lg:min-h-screen py-8 lg:py-0">
        <div className="w-full max-w-3xl flex flex-col items-center justify-center relative">
          <Image
            src={
              content?.image
                ? `/login-banner/${content.image}`
                : "/login-banner/login-banner.jpg"
            }
            alt="Sukaii Health"
            width={800}
            height={1200}
            className="rounded-[40px] object-cover w-full h-[400px] lg:h-screen p-5"
            priority
          />
          <div className="absolute left-[4%] -translate-x-1/2 lg:-left-16 lg:translate-x-0 bottom-6 md:bottom-14 ml-3 px-6 flex flex-col items-center justify-center gap-2 p-3 border-2 border-sky-500 rounded-lg bg-blue-50 shadow-2xl">
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
                {content?.users_count
                  ? `${content.users_count} Users`
                  : slide.patients}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900">
                  {content?.rating || slide.rating}
                </span>
                <span className="text-xs text-gray-500">
                  {content?.total_reviews
                    ? `(${content.total_reviews} reviews)`
                    : slide.reviews}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}