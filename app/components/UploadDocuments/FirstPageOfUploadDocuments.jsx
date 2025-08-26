"use client";
import React, { useState } from "react";
import { X, Edit3, Star } from "lucide-react";
import Image from "next/image";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { useRouter } from "next/navigation";

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

const FirstPageOfUploadDocuments = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleNext = (data) => {
    console.log(data);
    if (data === "upload") {
      localStorage.removeItem('uploadedDocument');
      router.push("/document-scan?upload_documents=true");
    } else if (data === "manual-entry") {
      router.push("/manual-entry");
    }
    // Close the modal after navigation
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl md:max-w-[90%] mx-auto max-h-[95vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative md:pb-8 z-10">
          <button
            onClick={onClose}
            className="absolute cursor-pointer rounded-full p-1.5 top-6 right-6 transition-colors z-20"
            style={{ zIndex: 20 }}
          >
            <X size={24} className="__secondary-text" />
          </button>
        </div>

        {/* Content Area */}
        <div className="md:px-6 md:pb-6 flex items-center justify-center gap-4 md:gap-14 flex-col-reverse md:flex-row">
          <div className="w-ful h-full px-5">
            <div className="flex items-center md:mb-8 mb-4">
              <Image
                src="/sukaii-logo.png"
                alt="Sukai Logo"
                width={140}
                height={40}
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 md:mb-6 mb-2">
              Add an External Report
            </h2>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 md:mb-6 mb-4">
                Easily Add Reports from Anywhere
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Upload your health reports from other labs in just a few steps.
                Use our smart OCR technology to scan report data using OCR, or
                enter the details manually – whichever works best for you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Scan or Upload Report Option */}
              <div
                className={`relative p-3 rounded-2xl border-2 border-gray-300 cursor-pointer transition-all duration-200 hover:border-pink-500 hover:bg-pink-50`}
                onClick={() => {
                  handleNext("upload");
                }}
              >
                <div className="text-left">
                  <div className="w-12 md:h-12 md:bg-pink-100 rounded-full flex items-center md:justify-center md:mb-4 mb-2">
                    <MdOutlinePhotoCamera className="w-6 h-6 __secondary-text" />
                  </div>
                  <h4 className="font-semibold text-gray-900 md:mb-2">
                    Scan or Upload Report
                  </h4>
                  <GoArrowUpRight className="absolute top-3 right-3 w-6 h-6" />
                </div>
              </div>

              {/* Manual Entry Option */}
              <div
                className={`relative p-3 rounded-2xl border-2 border-gray-300 cursor-pointer transition-all duration-200 hover:border-pink-500 hover:bg-pink-50`}
                onClick={() => {
                  handleNext("manual-entry");
                }}
              >
                <div className="text-left">
                  <div className="w-12 md:h-12 md:bg-pink-100 rounded-full flex items-center md:justify-center md:mb-4 mb-2">
                    <MdOutlineEdit className="w-6 h-6 __secondary-text" />
                  </div>
                  <h4 className="font-semibold text-gray-900 md:mb-2">
                    Manual Entry
                  </h4>
                  <GoArrowUpRight className="absolute top-3 right-3 w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full relative h-[200px] md:h-[500px] ">
            <div className="absolute inset-0 h-full">
              <div className="h-full md:h-full flex items-center justify-center md:p-8">
                <Image
                  src="/login-banner/login-banner.jpg"
                  alt="Sukaii Health"
                  width={800}
                  height={1200}
                  className="md:rounded-[50px] md:shadow-lg object-cover h-full w-full"
                />
              </div>
              <div className="absolute bottom-20 -left-12 ml-3 px-8 hidden md:flex flex-col items-center justify-center gap-3 p-3 border-2 border-sky-500 rounded-lg bg-blue-50 shadow-2xl">
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
                    <span className="text-sm font-medium text-gray-900">
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

// Demo component to show the modal
const Demo = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="p-4">
      <div className="container mx-auto py-20">
        <div className="text-center text-white mb-8">
          <h1 className="text-3xl font-bold mb-4">Add External Report</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-12 py-5 __secondary-bg rounded-lg font-semibold course-pointer text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            Upload Your Documents
          </button>
        </div>
      </div>

      <FirstPageOfUploadDocuments
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Demo;