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

 const profileData = {
    name: "Alex Herman",
    phoneNumber: "943252463",
    dob: "01/06/1999",
    gender: "Male",
    homeAddress: "11 Green Lane, MA, 05274",
    workAddress: "22 Crown Road, MA, 02732",
  };

const ProfileSection = () => (
  <div className={`md:px-22 p-4 md:p-0 __poppins-font`}>
    <div className="bg-white rounded-[20px] __cardShadow p-6">
      <div className="flex items-start">
        <div className="hidden md:flex items-center justify-center mr-6">
          <Image
            src="/profile-image.png"
            alt="User Avatar"
            width={88}
            height={88}
            className="w-18 h-18 rounded-full object-cover border-2 border-amber-100 "
          />
        </div>
        <div>
          <div className={`space-y-5 `}>
            {/* Name */}
            <div className={`flex items-center justify-between pb-2 `}>
              <label
                className={`text-[14px] font-medium text-gray-700 w-40 text-left`}
              >
                Name
              </label>
              <p className="text-gray-900 text-left flex-1 font-[550] text-[14px] leading-[135%]">
                {profileData.name}
              </p>
            </div>
            {/* Phone Number */}
            <div className="flex items-center justify-between pb-2">
              <label className="text-[14px] font-medium text-gray-700 w-40 text-left">
                Phone Number
              </label>
              <p className="text-gray-900 text-left flex-1 font-[550] text-[14px] leading-[135%]">
                {profileData.phoneNumber}
              </p>
            </div>
            {/* DOB */}
            <div className="flex items-center justify-between pb-2">
              <label className="text-[14px] font-medium text-gray-700 w-40 text-left">
                DOB
              </label>
              <p className="text-gray-900 text-left flex-1 font-[550] text-[14px] leading-[135%]">
                {profileData.dob}
              </p>
            </div>
            {/* Gender */}
            <div className="flex items-center justify-between pb-2">
              <label className="text-[14px] font-medium text-gray-700 w-40 text-left">
                Gender
              </label>
              <p className="text-gray-900 text-left flex-1 font-[550] text-[14px] leading-[135%]">
                {profileData.gender}
              </p>
            </div>
            {/* Home Address */}
            <div className="flex items-center justify-between pb-2">
              <label className="text-[14px] font-medium text-gray-700 w-40 text-left">
                Home Address
              </label>
              <p className="text-gray-900 text-left flex-1 font-[550] text-[14px] leading-[135%]">
                {profileData.homeAddress}
              </p>
            </div>
            {/* Work Address */}
            <div className="flex items-center justify-between">
              <label className="text-[14px] font-medium text-gray-700 w-40 text-left">
                Work Address
              </label>
              <p className="text-gray-900 text-left flex-1 font-[550] text-[14px] leading-[135%]">
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

export default ProfileSection;
