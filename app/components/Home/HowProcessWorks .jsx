"use client";

import Image from "next/image";
import React, { useState } from "react";
import shapeImage from "../../assets/home/Shape.png";
import image from "../../../public/texture-bg.png";
import { IoMdArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const HowProcessWorks = ({dataItem}) => {
  const [expandedStep, setExpandedStep] = useState(0);
  const steps = dataItem?.content?.home_page?.how_it_works_content_items || [];

  const toggleStep = (stepId) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <div className="container __gapTop2 mx-auto ">
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

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative w-full max-w-md "
              >
                <div
                  className="absolute w-[320px] h-[200px] md:h-[320px] md:left-[-90px] left-[-70px] top-[-20px] md:top-[-28px] pointer-events-none z-0"
                >
                  <Image
                    src={image}
                    alt="Decorative texture"
                    width={320}
                    height={120}
                    className="absolute top-[-16] -left-10 filter brightness-0 invert opacity-50 select-none"
                  />
                  <Image
                    src={image}
                    alt="Decorative texture"
                    width={320}
                    height={120}
                    className="absolute top-14 -left-10 filter brightness-0 invert opacity-50 select-none"
                  />
                </div>
              </motion.div>
            </div>

            <div className=" relative z-10 space-y-2 mt-[40px] lg:mt-[150px]">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="section__heading text-[#222222]"
              >
                How it Works
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-gray-500 text-lg leading-[25px] font-[400]"
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
            {steps?.map((step,index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="cursor-pointer duration-300 overflow-hidden"
              >
                {/* Step Header with icon and smooth hover effects */}
                <button
                  onClick={() => toggleStep(index)}
                  className={`w-full flex items-center justify-between text-left transition-all duration-300 ${
                    expandedStep === index ? "" : ""
                  }`}
                >
                  <div className="flex items-center justify-between space-x-4 border-b w-full pb-5">
                    <span className="text-[18px] lg:text-2xl font-extrabold text-gray-800">
                      {index + 1}. {step.title}
                    </span>
                    <div
                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 border`}
                    >
                      <IoMdArrowDown
                        className={`transition-transform duration-300 ${
                          expandedStep === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Animated content with smooth reveal */}
                <AnimatePresence>
                  {expandedStep === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 lg:px-6 md:pb-8 lg:py-4 ">
                        <p className="text-gray-500 leading-relaxed text-[18px] mt-3 md:mt-0">
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
