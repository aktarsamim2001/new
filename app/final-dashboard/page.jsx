"use client"

import React from 'react'
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
import icon from "../../public/user-dashboard/icon2 (3).png";
import { useState } from "react";
import HealthDashboard from "../components/dashboard/HealthDashboard";

function page() {
      const [activeTab, setActiveTab] = useState("health");
      const tabs = [
    {
      id: "profile",
      label: "My Profile",
      icon: SquareUser,
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
    <div>
        <div className="min-h-screen __gapTop __poppins-font">
      <div className="container mx-auto">
        {/* Header */}
        <div className=" rounded-lg px-3 md:px-2">
          <div className="md:flex flex-row items-center">
            <div className="flex items-center justify-start md:justify-center mr-4">
              <Image
                src="/profile-image.png"
                alt="User Avatar"
                width={88}
                height={88}
                className="w-18 border-2 border-amber-100 h-18 rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Welcome Back Alex!
              </h1>
              <p className="text-gray-600">
                Manage appointments, test results, personal details, and
                more—all from your account.
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4 max-w-7xl mx-auto px-2 __gapTop __poppins-font">
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
                      activeTab === tab.id ? "text-white" : "text-gray-900"
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
        <div className="transition-all duration-300 __gapTop">
          {activeTab === "health" && <HealthDashboard />}
        </div>
      </div>
    </div>
    </div>
  )
}

import { withClientSideRendering } from "../utils/withClientSideRendering";

export default withClientSideRendering(page);