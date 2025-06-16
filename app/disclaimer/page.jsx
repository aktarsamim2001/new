"use client";
import React from "react";
import Link from "next/link";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">Disclaimer</h1>
        <p className="text-gray-700 mb-4">
          The information provided by Sukaii Health is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind regarding the accuracy, adequacy, validity, reliability, or completeness of any information on the site.
        </p>
        <h2 className="text-xl font-semibold text-pink-500 mt-6 mb-2">Medical Disclaimer</h2>
        <p className="text-gray-700 mb-4">
          The content on this site is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
        <h2 className="text-xl font-semibold text-pink-500 mt-6 mb-2">Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          Under no circumstance shall Sukaii Health be liable for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site.
        </p>
        <p className="text-gray-700 mb-4">
          Your use of the site and your reliance on any information on the site is solely at your own risk.
        </p>
        <div className="mt-8 text-center">
          <Link href="/" className="text-pink-500 hover:underline font-medium">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
