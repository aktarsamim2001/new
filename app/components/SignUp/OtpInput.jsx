import React from "react";

export default function OtpInput({ value, onChange, error }) {
  return (
    <div>
      <input
        type="text"
        name="otp"
        value={value}
        onChange={onChange}
        className="w-full px-5 py-4 bg-[#F2F2F2] border-0 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all placeholder-gray-400"
        maxLength={4}
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Enter 4-digit OTP"
      />
    </div>
  );
}
