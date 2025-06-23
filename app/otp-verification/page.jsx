"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Star } from "lucide-react";

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
    <div className="min-h-screen flex items-start justify-center">
      <SuccessModal open={modalOpen} onClose={() => { setModalOpen(false); router.push("/sign-in"); }} />
      <div className="w-full max-w-md lg:w-1/2 p-8">
        <div className="mb-8 flex flex-col items-start">
          <Image
            src="/sukaii-logo.png"
            alt="Sukaii Logo"
            width={120}
            height={40}
          />
          <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
            Verify Your Identity
          </h2>
          <p className="text-gray-600 text-center">
            Enter the OTP sent to your mobile number or email.
          </p>
        </div>
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="mb-4">
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
             className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              maxLength={6}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="w-[150px] __secondary-bg text-white font-semibold py-4 rounded-xl"
          >
            Confirm
          </button>
        </form>
      </div>
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

export default function OtpVerification() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpVerificationContent />
    </Suspense>
  );
}