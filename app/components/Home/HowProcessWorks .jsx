"use client";

import Image from "next/image";
import React, { useState } from "react";
import shapeImage from "../../assets/home/Shape.png";
import { IoMdArrowUp } from "react-icons/io";

import { motion, AnimatePresence } from "framer-motion";

const HowProcessWorks = () => {
  const [expandedStep, setExpandedStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Sign Up",
      description:
        "Create your Sukaii Health account in just a few clicks.  Your information is encrypted and stored securely.  All your health data stays private and protected - accessible only by you.",
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
    // {
    //   id: 5,
    //   title: "Access Reports Instantly",
    //   description:
    //     "Receive your reports digitally as soon as they're ready. Download, share, or consult with doctors directly through our platform.",
    //   icon: "📲",
    // },
    // {
    //   id: 6,
    //   title: "Monitor Your Health Over Time",
    //   description:
    //     "Track trends, set health goals, and get personalized insights. Our AI-powered analytics help you understand your health journey better.",
    //   icon: "🧠",
    // },
  ];

  const toggleStep = (stepId) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <div className="container pt-10 mx-auto lg:px-4 ">
      <div className="relative bg-[#EC098D2E] lg:rounded-3xl p-6 py-12 pb-16 lg:py-16 sm:p-12 lg:p-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200 rounded-full filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-200 rounded-full filter blur-3xl opacity-20 -ml-24 -mb-24"></div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col justify-around">
            <div className="">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block mb-8"
              >
                <span className="bg-gradient-to-r from-[black] to-[black] text-white px-6 py-2 rounded-full text-sm font-medium tracking-wider">
                  # HOW IT WORKS
                </span>
              </motion.div>

              {/* Texture background area - more premium implementation */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative w-full max-w-md opacity-20"
              >
                <Image
                  src={shapeImage}
                  alt="Decorative texture"
                  className="w-[340px] h-[220px] absolute top-[-90px] lg:top-[-15px] left-[-65px] z-[-1]"
                />
              </motion.div>
            </div>

            <div className="space-y-2 mt-[40px] lg:mt-[150px]">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-[56px] font-semibold text-[#222222] leading-tight"
              >
                How it Works
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-gray-500 text-lg leading-relaxed font-[400]"
              >
                Explore our diverse services designed to nurture your mental
                health. From online counseling to self-care tools, we offer a
                holistic approach to help you achieve the emotional balance and
                strength you deserve.
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
                className="cursor-pointer duration-300 overflow-hidden border-b"
              >
                {/* Step Header with icon and smooth hover effects */}
                <button
                  onClick={() => toggleStep(step.id)}
                  className={`w-full flex items-center justify-between p-5 !pt-0 !pb-3 lg:!pb-5 lg:p-6 text-left transition-all duration-300 ${
                    expandedStep === step.id ? "" : ""
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-[18px] lg:text-2xl font-extrabold text-gray-800">
                      {step.id}. {step.title}
                    </span>
                  </div>
                  <div
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 border`}
                  >
                    <IoMdArrowUp
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
                        <p className="text-gray-500 leading-relaxed text-[18px]">
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
