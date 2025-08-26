"use client";

import React from "react";
import { Download, Eye, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ReportsSection = () => {
  const router = useRouter();

  // Safe destructuring with default value
  const { uploadReportData = [] } = useSelector((state) => state.report) || {};

  const triggerFileInput = () => {
    router.push("/document-scan");
  };

  const sampleReports = [
    {
      id: 1,
      testName: "Complete Blood Count",
      dateTaken: "2024-01-15",
      status: "Ready",
    },
    {
      id: 2,
      testName: "Lipid Profile",
      dateTaken: "2024-01-10",
      status: "Ready",
    },
    {
      id: 3,
      testName: "Thyroid Function Test",
      dateTaken: "2024-01-05",
      status: "Processing",
    },
  ];

  // Combine existing reports with uploaded reports from Redux store
  const allReports = [...sampleReports, ...uploadReportData];

  const handleViewReport = (report) => {
    if (report.extractedText) {
      // This is an uploaded report with OCR data
      localStorage.setItem("selectedReport", JSON.stringify(report));
      router.push(`/report-details/${report.id}`);
    } else {
      // This is a sample report
      console.log("View report:", report);
      // You can implement navigation to a different view for sample reports
    }
  };

  const handleDownloadReport = (report) => {
    if (report.extractedText) {
      // Download OCR report data
      const dataStr = JSON.stringify(report, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
      const exportFileDefaultName = `medical_report_${report.id}.json`;

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
    } else {
      // Handle sample report download
      console.log("Download report:", report);
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
              {allReports.map((report) => (
                <tr key={report.id}>
                  <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {report.testName}
                  </td>
                  <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {report.dateTaken || report.reportDate || "N/A"}
                  </td>
                  <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        report.status === "Ready"
                          ? "bg-green-100 text-green-800"
                          : report.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {report.status || "Processed"}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 text-sm whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <button
                        className="text-gray-900 text-left flex items-center gap-1 hover:text-blue-600 transition-colors"
                        onClick={() => handleViewReport(report)}
                      >
                        <Eye className="w-3 h-3" />
                        View Report
                      </button>
                      <button
                        className="text-gray-900 text-left flex items-center gap-1 hover:text-blue-600 transition-colors"
                        onClick={() => handleDownloadReport(report)}
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Upload Section */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex flex-col gap-3">
            <button
              onClick={triggerFileInput}
              className={`cursor-pointer __secondary-bg text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 max-w-[220px] w-full`}
            >
              <Upload className="w-4 h-4" />
              Upload External Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;
