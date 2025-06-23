"use client";
import React from "react";
import Link from "next/link";

export default function Terms() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full container mx-auto px-6 __gapTop">
        <h1 className="text-3xl font-bold __secondary-text mb-6">Terms & Conditions</h1>
        <p className="text-gray-700 mb-4">
          Welcome to Sukaii Health. By accessing or using our services, you agree to be bound by these Terms & Conditions. Please read them carefully.
        </p>
        <h2 className="text-xl font-semibold __secondary-text mt-6 mb-3">Use of Service</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>You must provide accurate and complete information during registration.</li>
          <li>Do not misuse our services or attempt to access them using a method other than the interface provided.</li>
          <li>All content and data are for personal, non-commercial use unless otherwise agreed.</li>
        </ul>
        <h2 className="text-xl font-semibold __secondary-text mt-6 mb-3">User Responsibilities</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>You are responsible for maintaining the confidentiality of your account and password.</li>
          <li>Notify us immediately of any unauthorized use of your account.</li>
        </ul>
        <h2 className="text-xl font-semibold __secondary-text mt-6 mb-3">Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          Sukaii Health is not liable for any indirect, incidental, or consequential damages arising from your use of our services.
        </p>
        <h2 className="text-xl font-semibold __secondary-text mt-6 mb-3">Changes to Terms</h2>
        <p className="text-gray-700 mb-4">
          We may update these Terms & Conditions from time to time. Continued use of the service means you accept the new terms.
        </p>
      </div>
    </div>
  );
}
