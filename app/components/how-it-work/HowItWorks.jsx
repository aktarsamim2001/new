import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Book Tests Online, Anytime",
      description:
        "No queues. No calls. Just a few clicks. Search and book lab tests or health packages from home.",
      note1: "Choose from a wide range of tests",
      note2: "Transparent pricing",
      note3: "Book for yourself or family",
      image: "/how-it-work/image (1).jpg",
      alt: "Person using laptop for online booking",
    },
    {
      number: "02",
      title: "One-of-a-kind health experience",
      description: "Not just a booking site—it's your digital health home.",
      note1: "Built for individuals & families",
      note2: "Location-smart suggestions",
      note3: " Support that cares",
      image: "/how-it-work/image (2).jpg",
      alt: "Healthcare professional in lab",
    },
    {
      number: "03",
      title: "Tests, packages, or answers—right at your fingertips",
      description: "Search and compare based on what you need.",
      note1: "Smart filters by symptom or type",
      note2: "Nearest available lab slots",
      note3: " Curated health packages",
      image: "/how-it-work/image (3).jpg",
      alt: "Healthcare professional collecting samples",
    },
    {
      number: "04",
      title: "Get Tested, Hassle-Free",
      description: "Choose a lab visit or home sample collection.",
      note1: "Timely appointment updates",
      note2: "Certified lab partners",
      note3: "Hygienic, quality-tested processes",
      image: "/how-it-work/image (4).jpg",
      alt: "Advanced laboratory equipment",
    },
    {
      number: "05",
      title: "Your health. Visualized clearly",
      description: "Monitor everything in one place after your test.",
      note1: "Visual trend reports",
      note2: "Add and manage family profiles",
      note3: "Secure access anytime",
      image: "/how-it-work/image (5).jpg",
      alt: "Healthcare professionals reviewing results",
    },
  ];

  return (
    <div className=" __gapTop">
      <section className=" bg-[#FCD3EA]">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`grid grid-cols-1 lg:grid-cols-2 mb-4 md:mb-8 items-center container mx-auto ${poppins.className}`}
          >
            {/* Text Content - Always left */}
            <div className="space-y-4 p-4 md:px-20 text-left ">
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900">
                  {step.number}.
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 leading-tight mb-4">
                  {step.title.split(" ").map((word, i) => (
                    <React.Fragment key={i}>
                      {word}
                      {/* Add line breaks at strategic points for better mobile display */}
                      {i === 1 && step.title.includes("Online") && (
                        <br className="hidden sm:block" />
                      )}
                      {i === 0 && step.title.includes("One-of-a-kind") && (
                        <br className="hidden sm:block" />
                      )}
                      {i === 1 && step.title.includes("Sample") && (
                        <br className="hidden sm:block" />
                      )}
                      {i === 1 && step.title.includes("Lab") && (
                        <br className="hidden sm:block" />
                      )}
                      {i === 2 && step.title.includes("packages") && (
                        <br className="hidden sm:block" />
                      )}
                      {i < step.title.split(" ").length - 1 && " "}
                    </React.Fragment>
                  ))}
                </h2>
                <p className="text-sm md:text-[18px] text-gray-600 leading-relaxed md:max-w-lg mb-4">
                  {step.description}
                </p>
                <p className="text-xs sm:text-[16px] text-gray-500   flex items-center gap-1.5">
                  <MoveRight size={15} />
                  {step.note1}
                </p>
                <p className="text-xs sm:text-[16px] text-gray-500  not-[]: flex items-center gap-1.5">
                  <MoveRight size={15} />
                  {step.note2}
                </p>
                <p className="text-xs sm:text-[16px] text-gray-500   flex items-center gap-1.5">
                  <MoveRight size={15} />
                  {step.note3}
                </p>
              </div>

              {/* Show button only for the last step (05) */}
              {step.number === "05" && (
                <div className="pt-4">
                  <button className="cursor-pointer __secondary-bg text-white px-8 py-2 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
                    <Link href="/sign-up" className="text-white">
                      Find Out More
                    </Link>
                  </button>
                </div>
              )}
            </div>

            {/* Image Content - Always right */}
            <div className="relative flex justify-center lg:justify-end w-full">
              <div className="relative group w-full">
                {/* Main image container */}
                <div className="relative z-10 overflow-hidden w-full">
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="w-full h-64 sm:h-80 lg:h-96 xl:h-[38rem] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Overlay gradient for better text readability if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
