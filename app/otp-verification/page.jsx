"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Star } from "lucide-react";
import image from "../.././app/assets/woman/shape.png";


// Modal component
function SuccessModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
        <Image src="/sukaii-logo.png" alt="Sukaii Logo" width={80} height={30} />
        <h3 className="text-xl font-bold mt-4 mb-2 text-center">OTP Verified!</h3>
        <p className="text-gray-600 mb-6 text-center">Signup Complete. You will be redirected to sign in.</p>
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

function OtpVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 6 digits
    const numericValue = value.replace(/\D/g, "").slice(0, 6);
    setOtp(numericValue);
    if (error) setError(""); // Clear error when user starts typing
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }
    setError("");
    // Show modal instead of alert
    setModalOpen(true);
    // Removed auto-close and redirect
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-stretch justify-center bg-white">
      <SuccessModal open={modalOpen} onClose={() => { setModalOpen(false); router.push("/sign-in"); }} />
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
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 lg:py-0">
        <div className="w-full max-w-md">
          <div className="mb-4 flex flex-col items-start">
            <Image src="/sukaii-logo.png" alt="Sukaii Logo" width={150} height={50} className="mb-3" />
            <h2 className="text-3xl md:text-[56px] leading-[56px] font-[500] text-gray-900 mt-3 mb-2"><span className="block">Verify Your</span> Identity</h2>
            <p className="text-gray-600 text-center mt-3">
              Enter the OTP sent to your mobile number or email.
            </p>
          </div>
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all text-center text-2xl tracking-widest"
                maxLength={6}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            {error && (
              <div className="text-red-500 text-center text-sm">{error}</div>
            )}
             <button
              className="w-[180px] cursor-pointer __secondary-bg text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl mb-4 mt-2"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
      {/* Image section (hidden on mobile, visible on desktop) */}
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

export default function OtpVerification() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpVerificationContent />
    </Suspense>
  );
}