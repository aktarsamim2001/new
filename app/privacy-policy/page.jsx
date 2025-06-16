"use client";
import React from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full container mx-auto p-6">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          Your privacy is important to us. This Privacy Policy explains how Sukaii Health collects, uses, and protects your personal information when you use our services.
        </p>
        <h2 className="text-xl font-semibold text-pink-500 mt-6 mb-2">Information We Collect</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Personal details (name, phone, email, etc.) provided during registration.</li>
          <li>Health and medical data you choose to share.</li>
          <li>Usage data and cookies for improving our services.</li>
        </ul>
        <h2 className="text-xl font-semibold text-pink-500 mt-6 mb-2">How We Use Your Information</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>To provide and improve our health services.</li>
          <li>To communicate with you about your account and updates.</li>
          <li>To ensure security and prevent fraud.</li>
        </ul>
        <h2 className="text-xl font-semibold text-pink-500 mt-6 mb-2">Your Rights</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>You can access, update, or delete your personal information at any time.</li>
          <li>You can opt out of marketing communications.</li>
        </ul>
        <p className="text-gray-700 mb-4">
          We do not share your personal information with third parties except as required by law or to provide our services.
        </p>
        <p className="text-gray-700 mb-4">
          For any questions about our privacy practices, please contact us at <span className="text-pink-600">support@sukaii.com</span>.
        </p>
        <div className="mt-8 text-center">
          <Link href="/" className="text-pink-500 hover:underline font-medium">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
