"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { BiCloudUpload } from "react-icons/bi";
import shapeImage from "../assets/home/shape2.png";
import { Poppins } from "next/font/google";
import SuccessModal from "../components/DocumentScan/SuccessModal";
import ReviewDetailSection from "../components/DocumentScan/ReviewDetailSection";
import { useDispatch, useSelector } from "react-redux";

import {
  setLoadingStatus,
  setError,
  setReport,
} from "../../features/store/reportSlice";
import { processDocumentWithOCR } from "@/app/utils/ocrUtils";

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
  const { uploadReportData } = useSelector((store) => store.report);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState({});
  const [reportAdded, setReportAdded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [toast, setToast] = useState("");

  const [hasUploadedDocument, setHasUploadedDocument] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setShowProgress(true);
    setReview(false);
    setProgress(0);
    dispatch(setLoadingStatus(true));

    try {
      // Start progress simulation
      let prog = 0;
      const progressInterval = setInterval(() => {
        prog += 5;
        if (prog >= 95) clearInterval(progressInterval);
        setProgress(prog);
      }, 200);

      // Process with OCR
      const result = await processDocumentWithOCR(file);
      setOcrResult(result);

      // Store in Redux
      dispatch(setReport(result.data));

      // Complete progress
      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        setShowProgress(false);
        setReview(true);
        setHasUploadedDocument(true);
        dispatch(setLoadingStatus(false));
      }, 500);
    } catch (error) {
      console.error("File processing error:", error);
      setToast(`Error: ${error.message}`);
      setTimeout(() => setToast(""), 3000);
      setShowProgress(false);
      dispatch(setLoadingStatus(false));
      dispatch(setError(error.message));
    }
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
              Upload <span className="md:block">Your Report</span>
            </h1>
          </div>
        </div>

        {/* Conditional Sections Below */}

        {/* Upload Method Section - Only show if no document uploaded */}
        {!hasUploadedDocument && !showProgress && !review && (
          <div className="container mx-auto __gapTop px-4 md:px-0">
            <h2 className="section__heading __secondary-text mb-2">
              Upload Your Report
            </h2>
            <p className="text-[18px] text-gray-600 mb-5">
              Ensure the report is clear and well-lit for accurate extraction.
            </p>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 md:px-14 pt-6 md:pt-10 justify-center">
              <button
                onClick={handleFileUploadClick}
                className="max-w-md p-6 bg-white rounded-[20px] ____shadow-card flex flex-col items-center justify-center gap-4 hover:shadow-lg transition-shadow"
              >
                <div>
                  <BiCloudUpload size={60} className="__secondary-text" />
                </div>
                <div
                  className={`text-[18px] font-[500] cursor-pointer text-center ${poppins.className}`}
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
            </div>

            {/* Supported formats info */}
            <div className="mt-8 text-center text-gray-500">
              <p>Supported formats: JPG, PNG, TIFF, PDF (max 5MB)</p>
            </div>
          </div>
        )}

        {/* Progress Bar Section */}
        {showProgress && (
          <div className="container mx-auto __gapTop px-4 md:px-0">
            <h2 className="section__heading __secondary-text mb-2 text-left">
              {progress < 100
                ? "Processing Your Report"
                : "Finalizing Extraction"}
            </h2>
            <p className="text-[18px] text-gray-600 mb-5 text-left">
              {progress < 100
                ? "Analyzing your document and extracting medical information..."
                : "Almost done! Review your extracted data below."}
            </p>

            {/* Show processing percentage above progress bar */}
            <div className="w-full flex justify-center mb-1">
              <span className="text-[18px] font-semibold __secondary-text">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="__secondary-bg h-4 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Progress stages */}
            <div className="grid grid-cols-4 gap-2 text-xs text-gray-500 mt-2">
              <div
                className={`text-center ${
                  progress > 10 ? "text-pink-600 font-medium" : ""
                }`}
              >
                Uploading
              </div>
              <div
                className={`text-center ${
                  progress > 30 ? "text-pink-600 font-medium" : ""
                }`}
              >
                Processing
              </div>
              <div
                className={`text-center ${
                  progress > 60 ? "text-pink-600 font-medium" : ""
                }`}
              >
                Extracting
              </div>
              <div
                className={`text-center ${
                  progress > 90 ? "text-pink-600 font-medium" : ""
                }`}
              >
                Finalizing
              </div>
            </div>
          </div>
        )}

        {/* Review Message Section */}
        {review && uploadReportData && (
          <ReviewDetailSection
            reportData={uploadReportData}
            onConfirm={() => setReportAdded(true)}
            onEdit={(field, value) => {
              const updatedData = { ...uploadReportData };
              if (field.includes(".")) {
                const [parent, child] = field.split(".");
                updatedData[parent][child] = value;
              } else {
                updatedData[field] = value;
              }
              dispatch(setReport(updatedData));
            }}
          />
        )}

        {/* Success Modal Section */}
        {reportAdded && (
          <SuccessModal
            isOpen={reportAdded}
            onClose={() => setReportAdded(false)}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        )}
      </div>
    </div>
  );
};

export default UploadReport;
