"use client";

import React, { useState } from 'react';

const HowProcessWorks = () => {
  const [expandedStep, setExpandedStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: 'Sign Up',
      description: "Create your Sukla Health account in just a few clicks. Your information is encrypted and stored securely — your health data stays private and protected."
    },
    {
      id: 2,
      title: 'Book a Test in Seconds',
      description: "Browse our comprehensive test catalog and book your preferred tests instantly. Choose from hundreds of diagnostic options with transparent pricing."
    },
    {
      id: 3,
      title: 'Get Tested',
      description: "Visit our partner labs or schedule home collection. Our certified professionals ensure accurate sample collection with minimal discomfort."
    },
    {
      id: 4,
      title: 'Track Your Test Status',
      description: "Monitor your test progress in real-time through our dashboard. Get notifications at every stage from sample collection to report generation."
    },
    {
      id: 5,
      title: 'Access Reports Instantly',
      description: "Receive your reports digitally as soon as they're ready. Download, share, or consult with doctors directly through our platform."
    },
    {
      id: 6,
      title: 'Monitor Your Health Over Time',
      description: "Track trends, set health goals, and get personalized insights. Our AI-powered analytics help you understand your health journey better."
    }
  ];

  const toggleStep = (stepId) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <div className="container mx-auto __gapTop px-4 lg:px-0">
      {/* How It Works badge at the top */}
      <div className="bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {/* Left Side - Badge at top, heading/desc at bottom */}
          <div className="flex flex-col justify-between h-full">
            <div className="inline-block mb-4">
              <span className="bg-gray-800 text-white px-6 sm:px-8 lg:px-10 py-2 rounded-full text-sm sm:text-base font-medium">
                # How It Works
              </span>
            </div>
            {/* Texture background area */}
            <div className="my-4 bg-texture rounded-xl min-h-[60px] w-full"></div>
            <div className="space-y-4 sm:space-y-6 mt-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 leading-tight">
                How Our<span className='block'>Process Works</span>
              </h2>
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                Explore our diverse services designed to nurture your mental health. 
                From online counselling to self-care tools, we offer a holistic approach 
                to help you achieve the emotional balance and strength you deserve.
              </p>
            </div>
          </div>

          {/* Right Side - Steps */}
          <div className="space-y-3 sm:space-y-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Step Header */}
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 lg:p-6 text-left cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-semibold text-gray-800 pr-2">
                    {step.id}. {step.title}
                  </span>
                  <div className={`transform transition-transform duration-300 flex-shrink-0 ${expandedStep === step.id ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Step Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedStep === step.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6">
                    <hr className="border-gray-200 mb-3 sm:mb-4" />
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowProcessWorks;