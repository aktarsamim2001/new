"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Star, Eye } from "lucide-react";
import { GoArrowUpRight } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";

const SuccessModal = ({
  isOpen,
  onClose,
  selectedOption,
  setSelectedOption,
}) => {
  if (!isOpen) return null;

  const slide = {
    reviewAvatars: [
      { name: "AB", bg: "bg-pink-500" },
      { name: "CD", bg: "bg-blue-500" },
      { name: "EF", bg: "bg-green-500" },
      { image: "/profile-image.png", bg: "" },
    ],
    extra: "+5",
    patients: "2,500+",
    rating: "4.9",
    reviews: "(1.2k reviews)",
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-3xl w-[90%] mx-auto max-h-[90vh] overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative pb-8 z-10">
          <button
            onClick={onClose}
            className="absolute bg-gray-200 cursor-pointer rounded-full p-1.5 top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-20"
            style={{ zIndex: 20 }}
          >
            <X size={24} />
          </button>
        </div>
        {/* Content Area */}
        <div className="px-6 pb-6 flex items-center justify-center gap-14 flex-col md:flex-row">
          <div className="w-full px-5">
            <div className="flex items-center mb-8">
              <Image
                src="/sukaii-logo.png"
                alt="Sukai Logo"
                width={140}
                height={50}
              />
            </div>
            <h2 className="text-2xl font-[550] text-gray-900 mb-6">
              Your report has been added successfully!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* View in Dashboard Option */}
              <Link href="/user-dashboard" passHref>
                <div
                  className={`relative p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                    selectedOption === "dashboard"
                      ? "__secondary-bg"
                      : "bg-white shadow-xl "
                  }`}
                  onClick={() => setSelectedOption("dashboard")}
                >
                  <div className="text-left">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                      <Eye
                        className={`w-6 h-6 ${
                          selectedOption === "dashboard"
                            ? "text-white"
                            : "__secondary-text"
                        }`}
                      />
                    </div>
                    <h4
                      className={`font-[500] mb-2 ${
                        selectedOption === "dashboard"
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      View in Dashboard
                    </h4>
                    <GoArrowUpRight
                      className={`absolute top-3 right-3 w-6 h-6 ${
                        selectedOption === "dashboard"
                          ? "text-white"
                          : "text-black"
                      }`}
                    />
                  </div>
                </div>
              </Link>
              {/* Upload Another Report Option */}
              <Link href="/upload-documents" passHref>
                <div
                  className={`relative p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                    selectedOption === "upload"
                      ? "__secondary-bg"
                      : "bg-white shadow-xl"
                  }`}
                  onClick={() => setSelectedOption("upload")}
                >
                  <div className="text-left flex flex-col items-start relative">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                      <IoMdAddCircleOutline
                        className={`w-6 h-6 ${
                          selectedOption === "upload"
                            ? "text-white"
                            : "__secondary-text"
                        }`}
                      />
                    </div>
                    <h4
                      className={`font-semibold text-gray-900 mb-2 ${
                        selectedOption === "upload"
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      Upload Another Report
                    </h4>
                    <GoArrowUpRight
                      className={`absolute top-3 right-3 w-6 h-6 ${
                        selectedOption === "upload"
                          ? "text-white"
                          : "text-black"
                      }`}
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="w-full relative h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
            <div className="absolute inset-0 h-full">
              <div className="h-full flex items-center justify-center p-8">
                <Image
                  src="/login-banner/login-banner.jpg"
                  alt="Sukaii Health"
                  width={800}
                  height={1200}
                  className="rounded-[50px] shadow-lg object-cover h-full w-full"
                />
              </div>
              <div className="absolute bottom-20 -left-12 ml-3 px-8 flex flex-col items-center justify-center gap-3 p-3 border-2 border-sky-500 rounded-lg bg-blue-50 shadow-2xl">
                <div className="flex -space-x-3">
                  {slide.reviewAvatars.map((avatar, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-white ${avatar.bg} flex items-center justify-center text-white font-semibold text-xs shadow-sm`}
                    >
                      {avatar.image ? (
                        <Image
                          src={avatar.image}
                          alt={`Avatar`}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        avatar.name
                      )}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center text-white font-semibold text-xs shadow-sm ml-0.5">
                    {slide.extra}
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="font-[600] text-gray-900 text-[20px]">
                    {slide.patients}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-[400] text-gray-900">
                      {slide.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      {slide.reviews}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
