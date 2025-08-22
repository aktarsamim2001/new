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

 const upcomingBookings = [
    {
      testName: "Lipid Profile Test",
      dateTime: "Tomorrow 9:00AM - 3:00PM",
      location: "Home Collection",
      status: "Confirmed",
      id: 1,
    },
    {
      testName: "Thyroid Function",
      dateTime: "30 May 2025, 9:30",
      location: "Salukek Health Centre, FL",
      status: "Pending",
      id: 2,
    },
  ];

  const pastBookings = [
    {
      testName: "Lipid Profile Test",
      dateCompleted: "23 Mar 2025",
      status: "Completed",
      report: "Ready",
      id: 1,
    },
    {
      testName: "Vitamin D Test",
      dateCompleted: "12 Feb 2025",
      status: "Completed",
      report: "Ready",
      id: 2,
    },
    {
      testName: "Lipid Profile Test",
      dateCompleted: "28 Mar 2025",
      status: "Completed",
      report: "Ready",
      id: 3,
    },
    {
      testName: "Vitamin D Test",
      dateCompleted: "17 Feb 2025",
      status: "Completed",
      report: "Ready",
      id: 4,
    },
  ];

const TestsSection = () => (
    <div className="px-4 md:px-22 space-y-6 __poppins-font">
      {/* Upcoming Bookings */}
      <div className="bg-white rounded-[20px] overflow-x-auto __cardShadow">
        <div className="__primary-bg text-white px-4 md:px-6 py-3">
          <h3 className="font-semibold">Upcoming Bookings</h3>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-xs md:text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="">
                <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                  Test Name
                </th>
                <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                  Date & Time
                </th>
                <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                  Location
                </th>
                <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="">
              {upcomingBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {booking.testName}
                  </td>
                  <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {booking.dateTime}
                  </td>
                  <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {booking.location}
                  </td>
                  <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 text-sm whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <button className="text-gray-900 text-left flex items-center gap-1">
                        <CirclePlus className="inline w-3.5 h-3.5 mr-1" />
                        Add a New Test
                      </button>
                      <button className="text-gray-900 text-left">
                        <CircleX className="inline w-3.5 h-3.5 mr-1" />
                        Cancel Booking
                      </button>
                      <button className="text-gray-900 text-left">
                        <Wrench className="inline w-3.5 h-3.5 mr-1" />
                        Reschedule
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Past Bookings */}
      <div className="bg-white rounded-[20px] overflow-x-auto __cardShadow">
        <div className="__primary-bg text-white px-4 md:px-6 py-3">
          <h3 className="font-semibold">Past Bookings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                  Test Name
                </th>
                <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                  Date Completed
                </th>
                <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                  Report
                </th>
                <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="">
              {pastBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {booking.testName}
                  </td>
                  <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {booking.dateCompleted}
                  </td>
                  <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                    <span className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-4 h-4">
                        <FolderOpen className="w-4 h-4" />
                      </span>
                      Ready
                    </span>
                  </td>

                  <td className="px-4 md:px-6 py-3 text-sm whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <button className="text-gray-900 text-left flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        View Report
                      </button>
                      <button className="text-gray-900 text-left flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                      <button className="text-gray-900 text-left">
                        Book Again
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

export default TestsSection;