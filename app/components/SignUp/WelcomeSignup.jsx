 "use client";

 import React, { useState } from 'react';

export const WelcomeSignup = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-pink-500">sukai</h1>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">
              Welcome to<br />
              Better Health
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sign Up to your Sukai Health account to book tests, view your
              reports, manage prescriptions, and access your smart health
              dashboard - all in one place.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm text-gray-700">Your Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 bg-gray-100 border-0"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="contact" className="text-sm text-gray-700">Enter Your Mobile Number / Email</label>
              <input
                id="contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="mt-1 bg-gray-100 border-0"
                placeholder="Mobile number or email"
              />
            </div>

            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-medium">
              Continue
            </button>

            {/* Terms */}
            <div className="flex items-start space-x-2 text-xs text-gray-500">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5"
              />
              <label htmlFor="terms">
                By signing up, you agree to our Terms & Conditions and Privacy Policy.
              </label>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button variant="outline" className="w-full py-3 flex items-center justify-center space-x-2">
                <span className="text-red-500 font-bold">G</span>
                <span>Google</span>
              </button>
              <button variant="outline" className="w-full py-3 flex items-center justify-center space-x-2">
                <span className="text-blue-600 font-bold">f</span>
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="flex-1 relative">
        <img 
          src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=800&fit=crop" 
          alt="Healthcare professional"
          className="w-full h-full object-cover"
        />
        
        {/* Trust badge */}
        <div className="absolute bottom-8 left-8 bg-white rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1">
              <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-sm">
              <div className="font-semibold">120+ patients</div>
              <div className="text-gray-500 text-xs">★ 4.9 (2635 reviews)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
