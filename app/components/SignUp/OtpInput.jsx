import React from "react";

export default function OtpInput({ value, onChange, error }) {
  return (
    <div>
      <label className="block text-[16px] font-[400] text-gray-700 mb-3">
        Enter OTP
      </label>
      <input
        type="text"
        name="otp"
        value={value}
        onChange={onChange}
        className="w-full px-5 py-4 bg-[#F2F2F2] border-0 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all placeholder-gray-400"
        maxLength={6}
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Enter 6-digit OTP"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
