import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import textureImage from "../../../public/texture-bg.png";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const HowItWorks = ({ data }) => {
  const fallbackSteps = [
    {
      number: "01",
      title: "Book Tests Online, Anytime",
      description:
        "No queues. No calls. Just a few clicks. Search and book lab tests or health packages from home.",
      note1: "Choose from a wide range of tests",
      note2: "Transparent pricing",
      note3: "Book for yourself or family",
      image: "/how-it-work/image (3).jpg",
      alt: "Person using laptop for online booking",
    },
    {
      number: "02",
      title: "One-of-a-kind <br/> health experience",
      description: "Not just a booking site—it's your digital health home.",
      note1: "Built for individuals & families",
      note2: "Location-smart suggestions",
      note3: "Support that cares",
      image: "/how-it-work/image (1).jpg",
      alt: "Healthcare professional in lab",
    },
    {
      number: "03",
      title: "Tests, packages, or answers—right at your fingertips",
      description: "Search and compare based on what you need.",
      note1: "Smart filters by symptom or type",
      note2: "Nearest available lab slots",
      note3: "Curated health packages",
      image: "/how-it-work/image (5).jpg",
      alt: "Healthcare professional collecting samples",
    },
    {
      number: "04",
      title: "Get Tested, <br/> Hassle-Free",
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
      image: "/how-it-work/image (2).jpg",
      alt: "Healthcare professionals reviewing results",
    },
  ];

  // Map API data.banner_items to steps, fallback to static if not present
  const steps = Array.isArray(data?.banner_items) && data.banner_items.length
    ? data.banner_items.map((item, idx) => {
        // If banner is a full URL, use as is. If not, prefix with /assets/how-it-work/
        let imgSrc = '';
        if (item.banner) {
          imgSrc = item.banner.startsWith('http')
            ? item.banner
            : `/assets/${item.banner}`;
        }
        return {
          number: String(idx + 1).padStart(2, '0'),
          title: item.title,
          description: item.description,
          notes: Array.isArray(item.short_notes) ? item.short_notes.map(n => n.text) : [],
          image: imgSrc,
          alt: item.title,
        };
      })
    : fallbackSteps;

  return (
    <div className="__gapTop">
      <div className="bg-[#FCD3EA] pt-16 md:pt-10 flex justify-end md:px-10">
        <div className="md:w-[95%]">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 mt-4 md:mt-0 md:mb-8 items-center md:container mx-auto relative ${poppins.className}`}
            >
              {/* Decorative texture positions */}
              {index === 0 && (
                <div className="absolute -top-22 md:-top-18 md:left-[-140px] -left-28 w-full max-w-[381px] opacity-50 z-0 flex flex-col pointer-events-none">
                  <Image
                    src={textureImage}
                    alt="Decorative texture"
                    width={600}
                    height={800}
                    className="filter h-[177px] w-[400px] brightness-0 invert"
                  />
                  <Image
                    src={textureImage}
                    alt="Decorative texture"
                    width={600}
                    height={800}
                    className="filter h-[177px] w-[400px] brightness-0 invert -mt-22"
                  />
                </div>
              )}
              {index === 2 && (
                <div className="absolute -top-20 md:left-[-140px] hidden md:block w-full max-w-[381px] opacity-50 z-0 flex flex-col pointer-events-none">
                  <Image
                    src={textureImage}
                    alt="Decorative texture"
                    width={600}
                    height={600}
                    className="filter brightness-0 invert"
                  />
                  <Image
                    src={textureImage}
                    alt="Decorative texture"
                    width={600}
                    height={600}
                    className="filter brightness-0 invert -mt-24"
                  />
                </div>
              )}
              {index === 4 && (
                <div className="absolute -top-14 md:left-[-140px] hidden md:block w-full max-w-[381px] opacity-50 z-0 flex flex-col pointer-events-none">
                  <Image
                    src={textureImage}
                    alt="Decorative texture"
                    width={600}
                    height={600}
                    className="filter brightness-0 invert"
                  />
                  <Image
                    src={textureImage}
                    alt="Decorative texture"
                    width={600}
                    height={600}
                    className="filter brightness-0 invert -mt-24"
                  />
                </div>
              )}

              {/* Text */}
              <div className="z-10 px-8 mb-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900">
                  {step.number || index + 1}.
                </h1>
                <h2
                  className="text-[26px] sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-[56px] xl:leading-14 font-bold text-gray-900 leading-tight mb-4"
                  dangerouslySetInnerHTML={{
                    __html: step.title || "",
                  }}
                />
                <p className="text-[14px] leading-4 md:leading-6 md:text-[18px] text-[#000000] md:max-w-lg">
                  {step.description}
                </p>
                {Array.isArray(step.notes) && step.notes.map((note, i) => (
                  <p key={i} className="text-xs sm:text-[16px] text-[#000000] flex items-center gap-1.5">
                    <MoveRight size={15} /> {note}
                  </p>
                ))}
                {index === steps.length - 1 && (
                  <div className="pt-4">
                    <button className="cursor-pointer __secondary-bg text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
                      <Link href="/sign-up" className="text-white">
                        Find Out More
                      </Link>
                    </button>
                  </div>
                )}
              </div>

              {/* Image */}
              <div className="flex justify-end">
                <img
                  src={step.image}
                  alt={step.alt || ""}
                  className="w-full h-[165px] md:w-[586px] md:h-[454px] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
