"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import Image from "next/image";
import icon from "../../../public/user-dashboard/icon2 (3).png";
import SmartHealthFirstPreview from "./SmartHealthFirstPreview";
import HealthDashboard from "./HealthDashboard";

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

const ReportsSection = () => (
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
        <div className="px-6 py-3">
          <button className="cursor-pointer __secondary-bg text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 ">
            <Upload className="w-4 h-4" />
            Upload External Report
          </button>
        </div>
      </div>
    </div>
  );

  export default ReportsSection;