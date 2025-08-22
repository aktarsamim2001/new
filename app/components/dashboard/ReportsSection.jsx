"use client";

import React, { useState, useRef } from "react";
import {
  FileText,
  Activity,
  Heart,
  Calendar,
  Download,
  Eye,
  Upload,
  Wrench,
  CirclePlus,
  BadgePlus,
  FolderOpen,
  CircleX,
  SquareUser,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const reports = [
  {
    testName: "Complete Blood Count (CBC)",
    dateTaken: "15 May 2025",
    status: "Ready",
    id: 1,
  },
  {
    testName: "Thyroid Function Test",
    dateTaken: "10 May 2025",
    status: "Processing",
    id: 2,
  },
  {
    testName: "Lipid Profile",
    dateTaken: "14 Apr 2025",
    status: "Ready",
    id: 3,
  },
  {
    testName: "Vitamin D Test",
    dateTaken: "12 Apr 2025",
    status: "Ready",
    id: 4,
  },
];

const ReportsSection = () => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setIsUploading(true);
      setUploadStatus("uploading");

      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        setUploadStatus("success");
        
        // Store document data in localStorage (you can modify this data as needed)
        const documentData = {
          testName: "Complete Blood Count (CBC)", // You can extract this from file name or use AI
          dateOfReport: new Date().toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
          }),
          labName: "External Lab", // Default or extract from document
          parameters: [
            { name: "WBC", value: "7.2", unit: "x10³/μL" },
            { name: "RBC", value: "4.8", unit: "x10⁶/μL" },
            { name: "Hemoglobin", value: "14.5", unit: "g/dL" },
          ],
          fileName: file.name
        };
        
        localStorage.setItem('uploadedDocument', JSON.stringify(documentData));
        
        setTimeout(() => {
          router.push("/document-scan?from_upload=true");
        }, 1000);
      }, 1000);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getUploadStatusContent = () => {
    switch (uploadStatus) {
      case "uploading":
        return (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Uploading {uploadedFile?.name}...</span>
          </div>
        );
      case "success":
        return (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Upload successful! Redirecting...</span>
          </div>
        );
      case "error":
        return (
          <div className="flex items-center gap-2 text-red-600">
            <CircleX className="w-4 h-4" />
            <span className="text-sm">Please upload PDF files only</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-4 md:px-22 container mx-auto">
      <div className="bg-white rounded-[20px] overflow-x-auto __cardShadow">
        <div className="__primary-bg text-white px-4 md:px-6 py-3">
          <h3 className="font-semibold">Your Reports</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-xs md:text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                  Test Name
                </th>
                <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                  Date Taken
                </th>
                <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                  Report Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="">
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {report.testName}
                  </td>
                  <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {report.dateTaken}
                  </td>
                  <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        report.status === "Ready"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 text-sm whitespace-nowrap">
                    {report.status === "Ready" ? (
                      <div className="flex flex-col gap-1">
                        <button className="text-gray-900 text-left flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          View Report
                        </button>
                        <button className="text-gray-900 text-left flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-900">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Upload Section */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex flex-col gap-3">
            {/* Upload Button */}
            <button 
              onClick={triggerFileInput}
              disabled={isUploading}
              className={`cursor-pointer __secondary-bg text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-opacity ${
                isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
              } max-w-[220px] w-full`}
            >
              <Upload className="w-4 h-4" />
              {isUploading ? 'Uploading...' : 'Upload External Report'}
            </button>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Upload Status */}
            {uploadStatus && (
              <div className="bg-gray-50 rounded-lg p-3">
                {getUploadStatusContent()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;