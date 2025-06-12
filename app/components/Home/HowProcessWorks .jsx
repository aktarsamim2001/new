"use client";

import Image from "next/image";
import React, { useState } from "react";
import shapeImage from "../../assets/home/Shape.png";
import { FaArrowUpLong } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const HowProcessWorks = () => {
  const [expandedStep, setExpandedStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Sign Up",
      description:
        "Create your Sukla Health account in just a few clicks. Your information is encrypted and stored securely — your health data stays private and protected.",
      icon: "🔐",
    },
    {
      id: 2,
      title: "Book a Test in Seconds",
      description:
        "Browse our comprehensive test catalog and book your preferred tests instantly. Choose from hundreds of diagnostic options with transparent pricing.",
      icon: "⏱️",
    },
    {
      id: 3,
      title: "Get Tested",
      description:
        "Visit our partner labs or schedule home collection. Our certified professionals ensure accurate sample collection with minimal discomfort.",
      icon: "🏥",
    },
    {
      id: 4,
      title: "Track Your Test Status",
      description:
        "Monitor your test progress in real-time through our dashboard. Get notifications at every stage from sample collection to report generation.",
      icon: "📊",
    },
    {
      id: 5,
      title: "Access Reports Instantly",
      description:
        "Receive your reports digitally as soon as they're ready. Download, share, or consult with doctors directly through our platform.",
      icon: "📲",
    },
    {
      id: 6,
      title: "Monitor Your Health Over Time",
      description:
        "Track trends, set health goals, and get personalized insights. Our AI-powered analytics help you understand your health journey better.",
      icon: "🧠",
    },
  ];

  const toggleStep = (stepId) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      {/* Premium gradient background with subtle noise texture */}
      <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200 rounded-full filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-200 rounded-full filter blur-3xl opacity-20 -ml-24 -mb-24"></div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Content with elegant typography */}
          <div className="flex flex-col justify-around">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block mb-8"
              >
                <span className="bg-gradient-to-r from-[black] to-[black] text-white px-6 py-2 rounded-full text-sm font-medium tracking-wider shadow-lg shadow-indigo-100">
                  HOW IT WORKS
                </span>
              </motion.div>

              {/* Texture background area - more premium implementation */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative left-[-68px] top-0 w-full max-w-md opacity-20"
              >
                <Image
                  src={shapeImage}
                  alt="Decorative texture"
                  width={600}
                  height={600}
                  className=""
                />
              </motion.div>
            </div>

            <div className="space-y-6 mt-0">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              >
                How Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#000] to-[#000]">
                  Process
                </span>{" "}
                Works
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-gray-600 text-lg leading-relaxed"
              >
                Discover our seamless healthcare journey designed with your
                convenience in mind. From signup to long-term health tracking,
                we've crafted each step for maximum comfort and clarity.
              </motion.p>
            </div>
          </div>

          {/* Right Side - Premium Steps with enhanced interactions */}
          <div className="space-y-2">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * step.id }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                {/* Step Header with icon and smooth hover effects */}
                <button
                  onClick={() => toggleStep(step.id)}
                  className={`w-full flex items-center justify-between p-5 lg:p-6 text-left transition-all duration-300 ${
                    expandedStep === step.id
                      ? "bg-gradient-to-r from-indigo-50 to-purple-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 text-lg">
                      {step.icon}
                    </div> */}
                    <span className="text-lg font-semibold text-gray-800">
                      {step.id}. {step.title}
                    </span>
                  </div>
                  <div
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                      expandedStep === step.id
                        ? "bg-gradient-to-br from-[#00b8c1] to-[#00b8c1] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <FaArrowUpLong
                      className={`transition-transform duration-300 ${
                        expandedStep === step.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Animated content with smooth reveal */}
                <AnimatePresence>
                  {expandedStep === step.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 lg:px-6 pb-5 lg:py-4">
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowProcessWorks;
