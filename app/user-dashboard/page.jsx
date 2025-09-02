"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileDetails } from "@/features/store/profileSlice";
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
import SmartHealthFirstPreview from "../components/dashboard/SmartHealthFirstPreview";
import HealthDashboard from "../components/dashboard/HealthDashboard";
import ProfileSection from "../components/dashboard/ProfileSection";
import TestsSection from "../components/dashboard/TestSection";
import ReportsSection from "../components/dashboard/ReportsSection"


// Move font configuration to a separate file or layout.jsx to avoid client-side loading issues

const UserDashboard = ({ initialTab = "profile" }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [localProfileData, setLocalProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState(initialTab);
  const dispatch = useDispatch();

  // Handle direct navigation and tab changes
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    router.push(`/user-dashboard/${tabId}`);
  };
  
  // Get profile data from Redux
  const { profileData: reduxProfileData, loadingStatus, error } = useSelector((state) => state.profile);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch profile data when component mounts
  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);

  // Update localProfileData when Redux data changes
  useEffect(() => {
    console.log("Redux Profile Data:", reduxProfileData);
    if (reduxProfileData) {
      const formattedData = {
        name: reduxProfileData.name || "",
        phoneNumber: reduxProfileData.mobile || "",
        dob: reduxProfileData.dob || "",
        gender: reduxProfileData.gender || "",
        profileImage: reduxProfileData.profile_photo_path || null,
        // Add any other fields you need
      };
      setLocalProfileData(formattedData);
    }
  }, [reduxProfileData]);

  if (!isMounted) {
    return null; 
  }

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
                Welcome Back {localProfileData?.name}!
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
                  onClick={() => handleTabChange(tab.id)}
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
          {activeTab === "profile" && <ProfileSection />}
          {activeTab === "tests" && <TestsSection />}
          {activeTab === "reports" && <ReportsSection />}
          {activeTab === "health" && <SmartHealthFirstPreview />}
        </div>
      </div>
    </div>
  );
};

import { withClientSideRendering } from "../utils/withClientSideRendering";
import ProtectedRoute from "@/features/Routes/ProtectedRoute";

const ProtectedUserDashboard = () => {
  return (
    <ProtectedRoute>
      <UserDashboard />
    </ProtectedRoute>
  );
};

export default withClientSideRendering(ProtectedUserDashboard);
