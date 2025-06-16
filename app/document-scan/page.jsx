"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Eye, Edit3, X, Star, BadgePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { MdOutlinePhotoCamera, MdOutlineEdit, MdAddCircle } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { BiCloudUpload } from "react-icons/bi";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";

const UploadReport = () => {
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [review, setReview] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [reportData, setReportData] = useState({
    testName: "Lipid Profile",
    dateOfReport: "15 May 2025",
    labName: "ABC Diagnostics",
    parameters: [
      { name: "HDL", value: "35", unit: "mg/dl" },
      { name: "LDL", value: "150", unit: "mg/dl" },
      { name: "Triglycerides", value: "340", unit: "mg/dl" },
    ],
  });
  const [isEditing, setIsEditing] = useState({});
  const [reportAdded, setReportAdded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

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

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setShowProgress(true);
      setReview(false);
      setProgress(0);
      // Simulate progress
      let prog = 0;
      const interval = setInterval(() => {
        prog += 10;
        setProgress(prog);
        if (prog >= 100) {
          clearInterval(interval);
          setShowProgress(false);
          setReview(true);
        }
      }, 200);
    }
  };

  const handleCameraScanClick = () => {
    console.log("Camera scan clicked");
  };

  const handleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleParameterEdit = (index, field, value) => {
    const newParameters = [...reportData.parameters];
    newParameters[index][field] = value;
    setReportData((prev) => ({ ...prev, parameters: newParameters }));
  };

  const handleConfirm = () => {
    setReportAdded(true);
  };

  return (
    <div className="container mx-auto __gapTop px-10">
      {/* Banner and Title always on top */}
      <div className="flex item-center justify-center relative">
        <div className="h-full w-full rounded-2xl">
          <Image
            src="/reports-upload/report-banner.jpg"
            alt="People Consulting"
            width={600}
            height={150}
            className="rounded-2xl h-[250px] object-cover"
          />
        </div>
        <div className="flex items-center justify-center absolute bottom-14 left-4/9">
          <h1 className="text-[45px] font-[600] ">
            Scan or Upload <span className="block">Your Report</span>
          </h1>
        </div>
      </div>
      {/* Conditional Sections Below */}
      {/* Upload Method Section */}
      {!showProgress && !review && (
        <div className="max-w-7xl mx-auto __gapTop">
          <h2 className="text-[30px] font-semibold __secondary-text mb-2">
            CHOOSE UPLOAD METHOD
          </h2>
          <p className="text-[18px] text-gray-600 mb-5">
            Ensure the report is clear and well-lit.
          </p>
          <div className="flex gap-4 px-14 pt-10">
            <button
              onClick={handleFileUploadClick}
              className="flex-1 p-4 bg-white  rounded-lg shadow-xl flex flex-col items-start justify-center gap-2"
            >
              <div>
                <BiCloudUpload size={35} className=" __secondary-text" />
              </div>
              <div className="text-[16px] font-medium">
                Upload a PDF/Image file
              </div>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={handleCameraScanClick}
              className="flex-1 p-4 bg-white  rounded-lg shadow-xl flex flex-col items-start justify-center gap-2"
            >
              <MdOutlinePhotoCamera size={35} className="__secondary-text" />
              <span className="text-[16px] font-medium">
                Use the camera to scan
              </span>
            </button>
          </div>
        </div>
      )}
      {/* Progress Bar Section */}
      {showProgress && (
        <div className="max-w-7xl mx-auto __gapTop">
          <h2 className="text-[30px] font-semibold __secondary-text mb-2 text-left">
            Uploading Your Report
          </h2>
          <p className="text-[18px] text-gray-600 mb-5 text-left">
            Please wait while we process your document. This may take a few
            moments.
          </p>
          {/* Show processing percentage above progress bar */}
          <div className="w-full flex justify-center mb-1">
            <span className="text-[18px] font-semibold __secondary-text">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
            <div
              className="__secondary-bg h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      {/* Review Message Section */}
      {review && (
        <div className="">
          <div className="max-w-7xl mx-auto __gapTop">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Review & Confirm Your Report
              </h1>
              <p className="text-gray-600">
                Here's what we found from your uploaded report. Please review
                and make corrections if needed before saving.
              </p>
            </div>
            <div className="space-y-6 px-14 pt-10">
              {/* Section 01: File Preview */}
              <div className="flex items-start justify-between gap-8 w-full mb-8">
                <div className="flex items-center gap-3 min-w-fit">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    01
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Uploaded File Preview
                  </h2>
                </div>
                <div className="bg-white shadow-lg rounded-xl p-8 text-center text-[16px] font-bold cursor-pointer flex-1">
                  <button className="flex items-center gap-2 font-[500px] leading-[135%] cursor-pointe text-[18px] mx-auto px-4 py-6 text-gray-600 hover:__secondary-text transition-colors">
                    <MdOutlineZoomOutMap className="w-5 h-5" />
                    View Uploaded File
                  </button>
                </div>
              </div>
              {/* Section 02: Auto-Extracted Info */}
              <div className="flex items-start justify-between gap-8 w-full mb-8">
                <div className="flex items-center gap-3 min-w-fit">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    02
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Auto-Extracted Info
                  </h2>
                </div>
                <div className="space-y-4 flex-1 px-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 gap-4 bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center p-3 ">
                      <span className="text-gray-600 font-medium">
                        Test Name
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-800 text-[16px] font-bold">
                          {reportData.testName}
                        </span>
                      </div>
                      <button
                        onClick={() => handleEdit("testName")}
                        className="text-gray-400 underline cursor-pointer hover:text-pink-500 transition-colors"
                      >
                       Edit
                      </button>
                    </div>
                    <div className="flex justify-between items-center p-3 ">
                      <span className="text-gray-600 font-medium">
                        Date of Report
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-800 text-[16px] font-bold">
                          {reportData.dateOfReport}
                        </span>
                      </div>
                      <button
                        onClick={() => handleEdit("dateOfReport")}
                        className="text-gray-400 underline cursor-pointer hover:text-pink-500 transition-colors"
                      >
                       Edit
                      </button>
                    </div>
                    <div className="flex justify-between items-center p-3 ">
                      <span className="text-gray-600 font-medium">
                        Lab Name
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-800 text-[16px] font-bold">
                          {reportData.labName}
                        </span>
                      </div>
                      <button
                        onClick={() => handleEdit("labName")}
                        className="text-gray-400 underline cursor-pointer hover:text-pink-500 transition-colors"
                      >
                       Edit
                      </button>
                    </div>
                  </div>
                  {/* Detailed Parameters */}
                  <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Detailed Parameters
                    </h3>
                    <div className="space-y-3">
                      {reportData.parameters.map((param, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3"
                        >
                          <span className=" font-medium">
                            {param.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className=" text-[16px] font-bold">
                              {param.value}
                            </span>
                            <span className=" text-[15px] font-semibold">
                              {param.unit}
                            </span>
                          </div>
                           <button
                              onClick={() => handleEdit(`param-${index}`)}
                              className="text-gray-400 underline cursor-pointer hover:text-pink-500 transition-colors ml-2"
                            >
                              Edit
                            </button>
                         
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 flex items-center gap-2 text-gray-500 hover:text-gray-600 cursor-pointer font-medium transition-colors">
                      <BadgePlus />
                      <span>
                        Add Another Parameter
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Confirm Button */}
              <div className="text-right">
                <button
                  onClick={handleConfirm}
                  className="__secondary-bg px-5 py-3 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition-colors __heading"
                >
                  Confirm & Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Success Modal Section */}
      {reportAdded && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-3xl w-[90%] mx-auto max-h-[90vh] overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative pb-8 z-10">
              <button
                onClick={() => setReportAdded(false)}
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                 Your report has been added successfully!
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Scan or Upload Report Option */}
                  <div
                    className={`relative p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                      selectedOption === "upload"
                        ? "__secondary-bg"
                        : "bg-white shadow-lg "
                    }`}
                    onClick={() => setSelectedOption("upload")}
                  >
                    <div className="text-left">
                      <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <Eye className={`w-6 h-6 ${selectedOption === "upload" ? "text-white" : "__secondary-text"}`} />
                      </div>
                      <h4 className={`font-[500] mb-2 ${selectedOption === "upload" ? "text-white" : "text-gray-900"}`}>
                        View in Dashboard
                      </h4>
                      <GoArrowUpRight className={`absolute top-3 right-3 w-6 h-6 ${selectedOption === "upload" ? "text-white" : "text-black"}`} />
                    </div>
                  </div>
                  {/* Manual Entry Option */}
                  <div
                    className={`relative p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                      selectedOption === "manual"
                        ? "__secondary-bg"
                        : "bg-white shadow-lg"
                    }`}
                    onClick={() => setSelectedOption("manual")}
                  >
                    <div className="text-left flex flex-col items-start relative">
                      <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <IoMdAddCircleOutline  className={`w-6 h-6 ${selectedOption === "manual" ? "text-white" : "__secondary-text"}`} />
                      </div>
                      <h4 className={`font-semibold text-gray-900 mb-2 ${selectedOption === "manual" ? "text-white" : "text-gray-900"}`}>
                        Upload Another Report
                      </h4>
                      <GoArrowUpRight className={`absolute top-3 right-3 w-6 h-6 ${selectedOption === "manual" ? "text-white" : "text-black"}`} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setReportAdded(false)}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-colors"
                  >
                    Close
                  </button>
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
      )}
    </div>
  );
};

export default UploadReport;
