"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Eye, X, Star, BadgePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  MdOutlinePhotoCamera,
  MdOutlineEdit,
  MdAddCircle,
} from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { BiCloudUpload } from "react-icons/bi";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import shapeImage from "../assets/home/shape2.png";

import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [toast, setToast] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

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

  const handleCameraScanClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setShowCamera(true);
      // Attach stream to video element after modal is open
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      setToast("Could not access camera. Please allow camera permissions.");
      setTimeout(() => setToast(""), 3000);
    }
  };

  const handleCloseCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }
    setShowCamera(false);
    setCameraStream(null);
    setCapturedImage(null);
  };

  const handleCapture = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setCapturedImage(dataUrl);

    // Simulate upload progress and review using the captured image
    setShowCamera(false);
    setShowProgress(true);
    setReview(false);
    setProgress(0);
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
    <div className={`relative ${poppins.className}`}>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] text-lg animate-fade-in">
          {toast}
        </div>
      )}
      <Image
        src={shapeImage}
        alt="People Consulting"
        width={400}
        height={150}
        className="h-[250px] absolute top-90 right-[0%]"
      />
      <div className="container mx-auto __gapTop">
        {/* Banner and Title always on top */}
        <div className="flex flex-col item-center justify-center relative">
          <div className="h-full w-full rounded-2xl">
            <Image
              src="/reports-upload/report-banner.jpg"
              alt="People Consulting"
              width={600}
              height={150}
              className="md:rounded-4xl h-[250px] object-cover"
            />
          </div>
          <div className="mt- flex items-center justify-center md:absolute bottom-14  md:left-4/9 py-5 md:p-4">
            <h1 className="text-[30px] md:text-[45px] font-[600] md:leading-[1.5] leading-[1.2]">
              Scan or Upload <span className="md:block">Your Report</span>
            </h1>
          </div>
        </div>

        {/* Conditional Sections Below */}
        {/* Upload Method Section */}

  {!showProgress && !review && (
          <div className="container mx-auto __gapTop px-4 md:px-0">
            <h2 className="section__heading __secondary-text mb-2">
              Choose Upload Method
            </h2>
            <p className="text-[18px] text-gray-600 mb-5">
              Ensure the report is clear and well-lit.
            </p>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 md:px-14 pt-6 md:pt-10">
              <button
                onClick={handleFileUploadClick}
                className="flex-1 p-6 bg-white rounded-[20px] ____shadow-card flex flex-col items-start justify-center gap-2"
              >
                <div>
                  <BiCloudUpload size={40} className=" __secondary-text" />
                </div>
                <div
                  className={`text-[16px] font-[500] cursor-pointer ${poppins.className}`}
                >
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
                className="flex-1 p-6 bg-white  rounded-[20px] ____shadow-card flex flex-col items-start justify-center gap-2"
              >
                <MdOutlinePhotoCamera size={40} className="__secondary-text" />
                <span
                  className={`text-[16px] font-[500] cursor-pointer ${poppins.className}`}
                >
                  Use the camera to scan
                </span>
              </button>
        {/* Camera Modal */}
        {showCamera && (
          <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-4 shadow-2xl relative flex flex-col items-center w-[100vw] max-w-3xl">
              {/* <button
                onClick={handleCloseCamera}
                className="absolute top-3 right-3 bg-gray-200 rounded-full p-2 text-gray-600 hover:text-pink-500"
                aria-label="Close camera"
              >
                <X size={24} />
              </button> */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-[800px] h-[400px] rounded-lg object-cover border-2 border-pink-400"
              />
              <button
                onClick={handleCapture}
                className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-lg font-semibold shadow hover:bg-pink-600 transition-colors"
              >
                Capture
              </button>
            </div>
          </div>
        )}
            </div>
          </div>
        )}
        {/* Progress Bar Section */}
        {showProgress && (
          <div className="container mx-auto __gapTop px-4 md:px-0">
            <h2 className="section__heading __secondary-text mb-2 text-left">
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
          <>
            <div className="container mx-auto __gapTop">
              {/* Header */}

              <div className="mb-8">
                <h2 className="section__heading text-[#EC098D] mb-4">
                  Review & Confirm Your Report
                </h2>
                <p className="text-gray-600">
                  Here's what we found from your uploaded report. Please review
                  and make corrections if needed before saving.
                </p>
              </div>

              <div className="space-y-6 __gapTop">
                {/* Section 01: File Preview */}

                <div className="flex flex-col md:flex-row items-start justify-between gap-5 md:gap-16 w-full md:w-[90%] mb-8">
                  <div className="flex items-center gap-3 min-w-fit">
                    <div className="text-black font-[550] text-[20px]">01</div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Uploaded File Preview
                    </h2>
                  </div>
                  <div className="bg-white ____shadow-card w-full rounded-xl p-4 text-center text-[16px] font-[550] cursor-pointer flex-1">
                    {capturedImage ? (
                      <img
                        src={capturedImage}
                        alt="Captured Preview"
                        className="w-full h-[600px] object-center rounded-lg object-cover"
                      />
                    ) : (
                      <button className="flex items-center gap-2 font-[500px] leading-[135%] cursor-pointe text-[18px] mx-auto px-4 py-6 text-gray-600 hover:__secondary-text transition-colors">
                        <MdOutlineZoomOutMap className="w-5 h-5" />
                        View Uploaded File
                      </button>
                    )}
                  </div>
                </div>

                {/* Section 02: Auto-Extracted Info */}

                <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-20 md:w-[90%] mb-8">
                  <div className="flex items-center gap-3 min-w-fit">
                    <div className="text-black font-[550] text-[20px]">02</div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Auto-Extracted Info
                    </h2>
                  </div>

                  <div className="space-y-4 w-full flex-1">
                    {/* Basic Info */}
                    <div className="w-full grid grid-cols-1 gap-4 bg-white p-4 md:p-6 rounded-lg ____shadow-card">
                      <div className="flex justify-between items-center md:grid grid-cols-3 md:p-3">
                        <span className="text-gray-600 font-[400]">
                          Test Name
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-800 text-[16px] font-[550]">
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
                      <div className="flex justify-between items-center md:grid grid-cols-3 md:p-3">
                        <span className="text-gray-600 font-[400]">
                          Date of Report
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-800 text-[16px] font-[550]">
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
                      <div className="flex justify-between items-center md:grid grid-cols-3 md:p-3 ">
                        <span className="text-gray-600 font-[400]">
                          Lab Name
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-800 text-[16px] font-[550]">
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
                    <div className="mt-8 bg-white p-4 md:p-6 rounded-lg ____shadow-card">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Detailed Parameters
                      </h3>
                      <div className="space-y-3">
                        {reportData.parameters.map((param, index) => (
                          <div key={index} className=" flex justify-between items-center md:grid grid-cols-3 p-3">
                            <span className="font-[400]">{param.name}</span>
                            <div className="flex items-center gap-2">
                              <span className=" text-[16px] font-[550]">
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
                      <button className="mt-4 md:mt-10 bg-[#eee] p-3 rounded-[4px] flex items-center gap-2 text-gray-500 hover:text-gray-600 cursor-pointer font-[400] transition-colors">
                        <BadgePlus />
                        <span>Add Another Parameter</span>
                      </button>
                    </div>

                    {/* Confirm Button */}
                    <div className="text-left mt-10">
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
            </div>
          </>
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
                  <h2 className="text-2xl font-[550] text-gray-900 mb-6">
                    Your report has been added successfully!
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Scan or Upload Report Option */}
                  <Link href="/user-dashboard" passHref>
                    <div
                      className={`relative p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                        selectedOption === "upload"
                          ? "__secondary-bg"
                          : "bg-white shadow-xl "
                      }`}
                      onClick={() => setSelectedOption("upload")}
                    >
                      <div className="text-left">
                        <div className="w-12 h-12 flex items-center justify-center mb-4">
                          <Eye
                            className={`w-6 h-6 ${
                              selectedOption === "upload"
                                ? "text-white"
                                : "__secondary-text"
                            }`}
                          />
                        </div>
                        <h4
                          className={`font-[500] mb-2 ${
                            selectedOption === "upload"
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          View in Dashboard
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
                    {/* Manual Entry Option */}
                    <Link href="/upload-documents" passHref>
                    <div
                      className={`relative p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                        selectedOption === "manual"
                          ? "__secondary-bg"
                          : "bg-white shadow-xl"
                      }`}
                      onClick={() => setSelectedOption("manual")}
                    >
                      <div className="text-left flex flex-col items-start relative">
                        <div className="w-12 h-12 flex items-center justify-center mb-4">
                          <IoMdAddCircleOutline
                            className={`w-6 h-6 ${
                              selectedOption === "manual"
                                ? "text-white"
                                : "__secondary-text"
                            }`}
                          />
                        </div>
                        <h4
                          className={`font-semibold text-gray-900 mb-2 ${
                            selectedOption === "manual"
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          Upload Another Report
                        </h4>
                        <GoArrowUpRight
                          className={`absolute top-3 right-3 w-6 h-6 ${
                            selectedOption === "manual"
                              ? "text-white"
                              : "text-black"
                          }`}
                        />
                      </div>
                    </div>
                    </Link>
                  </div>
                  {/* <div className="flex justify-center mt-4">
                    <button
                      onClick={() => setReportAdded(false)}
                      className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-colors"
                    >
                      Close
                    </button>
                  </div> */}
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
        )}
      </div>
    </div>
  );
};

export default UploadReport;
