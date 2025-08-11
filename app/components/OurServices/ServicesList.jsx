"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  CircleArrowLeft,
  CircleArrowRight,
  ArrowUpRight,
} from "lucide-react";
import image1 from "../../assets/service/Cardiology.png";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

const categories = [
  "Full Body Checkup",
  "Blood Tests",
  "Hormonal Health",
  "Organ Function",
  "Women's Health",
  "Senior Citizen Packages",
];

const availability = [
  "Home Sample Collection",
  "Lab Visit Required",
  "Same - Day Results",
];

const services = [
  { id: 1, title: "Service One", image: image1 },
  { id: 2, title: "Service Two", image: image1 },
  { id: 3, title: "Service Three", image: image1 },
  { id: 4, title: "Service Four", image: image1 },
  { id: 5, title: "Service Five", image: image1 },
  { id: 6, title: "Service Six", image: image1 },
  { id: 7, title: "Service Seven", image: image1 },
  { id: 8, title: "Service Eight", image: image1 },
];

export default function ServicesList() {
  const [activeCategory, setActiveCategory] = useState("");
  const [activeAvailability, setActiveAvailability] = useState("");
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] =
    useState(false);
  const [isAvailabilityDropdownOpen, setIsAvailabilityDropdownOpen] =
    useState(false);

  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[35%_65%] gap-12 overflow-hidden __gapTop">
      {/* FILTER HEADER */}
      <div className="py-5 px-4 md:px-0">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 pb-2 border-b-[3px] border-[#EC098D]">
            Filter
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-0 md:mb-8">
          {/* ===== DESKTOP CATEGORIES ===== */}
          <div className="hidden lg:block">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2">
              Categories
            </h3>
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`grid grid-cols-1 w-[200px] text-left px-4 py-3 font-light cursor-pointer rounded-lg text-sm __cardShadow transition-all duration-200 ${
                    activeCategory === cat
                      ? "border-2 border-[#EC098D] bg-white text-[#EC098D] font-semibold"
                      : "border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ===== MOBILE CATEGORIES ===== */}
          <div className="lg:hidden">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Categories
            </h3>
            <div className="relative">
              <button
                onClick={() =>
                  setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)
                }
                className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-[#EC098D] rounded-lg text-[#EC098D] font-semibold __cardShadow hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-sm">
                  {activeCategory || "Select Category"}
                </span>
                {isCategoriesDropdownOpen ? (
                  <ChevronUp className="h-5 w-5 text-[#EC098D]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#EC098D]" />
                )}
              </button>

              {isCategoriesDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsCategoriesDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 ${
                        activeCategory === cat
                          ? "bg-[#EC098D] text-white font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ===== DESKTOP AVAILABILITY ===== */}
          <div className="hidden lg:block">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2">
              Availability
            </h3>
            <div className="space-y-3">
              {availability.map((av) => (
                <button
                  key={av}
                  onClick={() => setActiveAvailability(av)}
                  className={`grid grid-cols-1 w-[200px] text-left px-4 py-3 font-light cursor-pointer rounded-lg text-sm __cardShadow transition-all duration-200 ${
                    activeAvailability === av
                      ? "border-2 border-[#EC098D] bg-white text-[#EC098D] font-semibold"
                      : "border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* ===== MOBILE AVAILABILITY ===== */}
          <div className="lg:hidden">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Availability
            </h3>
            <div className="relative">
              <button
                onClick={() =>
                  setIsAvailabilityDropdownOpen(!isAvailabilityDropdownOpen)
                }
                className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-[#EC098D] rounded-lg text-[#EC098D] font-semibold __cardShadow hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-sm">
                  {activeAvailability || "Select Availability"}
                </span>
                {isAvailabilityDropdownOpen ? (
                  <ChevronUp className="h-5 w-5 text-[#EC098D]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#EC098D]" />
                )}
              </button>

              {isAvailabilityDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  {availability.map((av) => (
                    <button
                      key={av}
                      onClick={() => {
                        setActiveAvailability(av);
                        setIsAvailabilityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 ${
                        activeAvailability === av
                          ? "bg-[#EC098D] text-white font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="block md:hidden px-4 md:px-0">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {services.map((pkg) => (
              <Link
                href="/service-details"
                target="_blank"
                key={pkg.id}
                className="cursor-pointer relative"
              >
                <div className="rounded-lg bg-gray-100 h-[160px] flex flex-col justify-between shadow-md">
                  <div className="w-16 h-14 mx-auto mt-5">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="bg-[#00BFD6] p-4 rounded-lg">
                    <span className="text-white text-sm font-semibold text-center mt-2">
                      {pkg.title}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white absolute bottom-8 right-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-5">
            <Button
              variant="outline"
              className="cursor-pointer __secondary-bg text-white font-bold text-base w-full max-w-[187px] py-3 rounded-[10px]"
            >
              <Link href="/our-services">View More</Link>
            </Button>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-2 gap-12 p-12">
          {services.map((service) => (
            <Link
              href="/service-details"
              target="_blank"
              key={service.id}
              className="relative flex items-center justify-start gap-4 rounded-2xl overflow-hidden shadow-sm bg-gradient-to-br from-white from-12% via-[#00b8c1]/90 to-[#00b8c1] p-6"
            >
              {/* Icon Left */}
              <div className="flex-shrink-0 w-[100px] h-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={80}
                  height={80}
                  className="object-cover rounded-full mx-auto"
                />
              </div>

              {/* Text Right */}
              <div className="flex-1 flex flex-col justify-center gap-2.5">
                <h3 className="text-[20px] leading-[100%] font-semibold text-white">
                  {service.title}
                </h3>
                <p className="text-[15px] leading-[110%] text-white">
                  Report in 3 days <span className="block">Test for XYZ</span>
                </p>
              </div>

              {/* Arrow Icon */}
              <ArrowUpRight className="w-5 h-5 absolute top-4 right-4 text-white" />
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="md:flex justify-center mt-8 hidden">
          <nav className="flex items-center space-x-2">
            <button className="w-8 h-8 flex items-center justify-center cursor-pointer">
              <CircleArrowLeft />
            </button>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`w-8 h-8 flex items-center justify-center cursor-pointer ${
                  num === 3
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {String(num).padStart(2, "0")}
              </button>
            ))}
            <button className="w-8 h-8 flex items-center justify-center cursor-pointer">
              <CircleArrowRight />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
