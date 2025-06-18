"use client";

import React, { useState } from "react";
import {
  User,
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
} from "lucide-react";
import Image from "next/image";
import icon from "../../public/user-dashboard/icon2 (3).png";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const profileData = {
    name: "Alex Herman",
    phoneNumber: "943252463",
    dob: "01/06/1999",
    gender: "Male",
    homeAddress: "11 Green Lane, MA, 05274",
    workAddress: "22 Crown Road, MA, 02732",
  };

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

  const ProfileSection = () => (
    <div className="md:px-22 p-4 md:p-0">
      <div className="bg-white rounded-[20px] __cardShadow p-6">
        <div className="flex items-start mb-6">
          <div className="hidden md:flex items-center justify-center mr-4">
            <Image
              src="/profile-image.png"
              alt="User Avatar"
              width={88}
              height={88}
              className="w-18 h-18 rounded-full object-cover"
            />
          </div>
          <div>
            <div className="space-y-4">
              {/* Name */}
              <div className="flex items-center justify-between pb-2">
                <label className="text-sm font-medium text-gray-700 w-40 text-left">
                  Name
                </label>
                <p className="text-gray-900 text-left flex-1 font-bold text-[12px] leading-[135%]">
                  {profileData.name}
                </p>
              </div>
              {/* Phone Number */}
              <div className="flex items-center justify-between pb-2">
                <label className="text-sm font-medium text-gray-700 w-40 text-left">
                  Phone Number
                </label>
                <p className="text-gray-900 text-left flex-1 font-bold text-[12px] leading-[135%]">
                  {profileData.phoneNumber}
                </p>
              </div>
              {/* DOB */}
              <div className="flex items-center justify-between pb-2">
                <label className="text-sm font-medium text-gray-700 w-40 text-left">
                  DOB
                </label>
                <p className="text-gray-900 text-left flex-1 font-bold text-[12px] leading-[135%]">
                  {profileData.dob}
                </p>
              </div>
              {/* Gender */}
              <div className="flex items-center justify-between pb-2">
                <label className="text-sm font-medium text-gray-700 w-40 text-left">
                  Gender
                </label>
                <p className="text-gray-900 text-left flex-1 font-bold text-[12px] leading-[135%]">
                  {profileData.gender}
                </p>
              </div>
              {/* Home Address */}
              <div className="flex items-center justify-between pb-2">
                <label className="text-sm font-medium text-gray-700 w-40 text-left">
                  Home Address
                </label>
                <p className="text-gray-900 text-left flex-1 font-bold text-[12px] leading-[135%]">
                  {profileData.homeAddress}
                </p>
              </div>
              {/* Work Address */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 w-40 text-left">
                  Work Address
                </label>
                <p className="text-gray-900 text-left flex-1 font-bold text-[12px] leading-[135%]">
                  {profileData.workAddress}
                </p>
              </div>
            </div>

            <div className="flex lg:flex-row flex-col gap-4 mt-6">
              <button className="flex items-center gap-2 bg-gray-200 p-3 rounded-lg hover:text-gray-800">
                <Image
                  src={icon}
                  alt="Wp-Icon"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span className="text-sm">Turn on WhatsApp Notifications</span>
              </button>
              <button className="flex items-center gap-2 bg-gray-200 p-3 rounded-lg hover:text-gray-800">
                <BadgePlus />
                <span className="text-sm">Edit Personal Information</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TestsSection = () => (
    <div className="px-4 md:px-22 space-y-6">
      {/* Upcoming Bookings */}
      <div className="bg-white rounded-[20px] overflow-x-auto __cardShadow">
        <div className="bg-teal-500 text-white px-4 md:px-6 py-3">
          <h3 className="font-semibold">Upcoming Bookings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="  w-full text-xs md:text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
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
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {booking.testName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {booking.dateTime}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {booking.location}
                  </td>
                  <td className="px-6 py-4">
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
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-col flex-1 gap-1">
                      <button className="text-gray-900 text-left">
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
        <div className="bg-teal-500 text-white px-4 md:px-6 py-3">
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
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {booking.testName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {booking.dateCompleted}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <span className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-4 h-4">
                        <FolderOpen className="w-4 h-4" />
                      </span>
                      Ready
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm">
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
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {report.testName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {report.dateTaken}
                  </td>
                  <td className="px-6 py-4">
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
                  <td className="px-6 py-4 text-sm">
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
          <button className="cursor-pointer __secondary-bg hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload External Report
          </button>
        </div>
      </div>
    </div>
  );

  const SmartHealthSection = () => (
    <div className="px-22">
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Smart Health
        </h3>
        <p className="text-gray-600 mb-6">
          View transactions and download receipts
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <Activity className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-medium text-gray-800">Health Metrics</h4>
            <p className="text-sm text-gray-600 mt-1">
              Track your vital statistics
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
            <Heart className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="font-medium text-gray-800">Wellness Score</h4>
            <p className="text-sm text-gray-600 mt-1">
              Monitor your overall health
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <Calendar className="w-8 h-8 text-purple-600 mb-3" />
            <h4 className="font-medium text-gray-800">Health Calendar</h4>
            <p className="text-sm text-gray-600 mt-1">
              Schedule regular checkups
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    {
      id: "profile",
      label: "My Profile",
      icon: User,
      description: "Manage your account",
    },
    {
      id: "tests",
      label: "My Tests",
      icon: FileText,
      description: "View upcoming and past test bookings",
    },
    {
      id: "reports",
      label: "Reports",
      icon: Activity,
      description: "Access and download your test reports",
    },
    {
      id: "health",
      label: "Smart Health",
      icon: Heart,
      description: "View transactions and download receipts",
    },
  ];

  return (
    <div className="min-h-screen md:p-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className=" rounded-lg px-6">
          <div className="md:flex flex-rowitems-center">
            <div className="flex items-center justify-start md:justify-center mr-4">
              <Image
                src="/profile-image.png"
                alt="User Avatar"
                width={88}
                height={88}
                className="w-18 h-18 rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome Back Alex!
              </h1>
              <p className="text-gray-600">
                Manage appointments, test results, personal details, and
                more—all from your account.
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:px-17 mt-[60px]">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-3.5 rounded-[22px] text-left transition-all duration-200 cursor-pointer ${
                    activeTab === tab.id
                      ? "__primary-bg text-white shadow-lg transform scale-105"
                      : "__cardShadow"
                  }`}
                >
                  <IconComponent
                    className={`w-6 h-6 mb-2 ${
                      activeTab === tab.id ? "text-white" : ""
                    }`}
                  />
                  <h3
                    className={`font-semibold text-[20px] leading-[135%]  ${
                      activeTab === tab.id ? "" : "__secondary-text"
                    }`}
                  >
                    {tab.label}
                  </h3>
                  <p
                    className={`text-xs mt-1 ${
                      activeTab === tab.id ? "text-teal-100" : "text-gray-900"
                    }`}
                  >
                    {tab.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300 mt-[60px]">
          {activeTab === "profile" && <ProfileSection />}
          {activeTab === "tests" && <TestsSection />}
          {activeTab === "reports" && <ReportsSection />}
          {activeTab === "health" && <SmartHealthSection />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
