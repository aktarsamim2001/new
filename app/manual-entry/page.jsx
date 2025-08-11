"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Calendar,
  X,
  Plus,
  Star,
  Eye,
  BadgePlus,
  Beaker,
} from "lucide-react";

import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import image from "../assets/woman/shape.png";

export default function AddReportManually() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    testName: "",
    dateOfReport: "",
    labName: "",
    parameters: [
      { name: "LDL", value: "130", unit: "mg/dl", normalRange: "<100" },
    ],
    remarks: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState({
    testName: false,
    labName: false,
  });

  const [reportAdded, setReportAdded] = useState(false);

  const testOptions = [
    "Lipid Profile",
    "Complete Blood Count",
    "Liver Function Test",
    "Kidney Function Test",
    "Thyroid Function Test",
  ];

  const labOptions = [
    "ABC Diagnostics",
    "HealthLab Center",
    "MediTest Labs",
    "Precision Diagnostics",
    "CareFirst Laboratory",
  ];

  const unitOptions = ["mg/dl", "g/dl", "mmol/L", "IU/L", "ng/ml", "pg/ml"];

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleParameterChange = (index, field, value) => {
    const newParameters = [...formData.parameters];
    newParameters[index][field] = value;
    setFormData((prev) => ({ ...prev, parameters: newParameters }));
  };

  const addParameter = () => {
    setFormData((prev) => ({
      ...prev,
      parameters: [
        ...prev.parameters,
        { name: "", value: "", unit: "mg/dl", normalRange: "" },
      ],
    }));
  };

  const removeParameter = (index) => {
    setFormData((prev) => ({
      ...prev,
      parameters: prev.parameters.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    setReportAdded(true);
    console.log("Saving report:", formData);
    // Handle save logic here
  };

  const toggleDropdown = (field) => {
    setDropdownOpen((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const selectOption = (field, value) => {
    handleInputChange(field, value);
    setDropdownOpen((prev) => ({ ...prev, [field]: false }));
  };

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="container mx-auto __gapTop">
      {/* Banner and Title always on top */}
      <div className="flex gap-4 md:flex-row flex-col item-center justify-start md:items-center md:gap-20">
        <Image
          src="/reports-upload/report-banner.jpg"
          alt="People Consulting"
          width={600}
          height={150}
          className="md:rounded-2xl h-[250px] object-cover"
        />

        <h1 className="px-4 md:px-0 text-[28px] leading-[1] md:leading-[1.5] md:text-[45px] font-[600] ">
          Upload Report<span className="ml-2 md:ml-0 md:block">Manually</span>
        </h1>
      </div>

      {/* Success Modal Section */}

      {reportAdded && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-3xl w-[90%] md:w-[1300px] mx-auto max-h-[90vh] md:max-h-[600px] overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative z-10">
              <button
                onClick={() => setReportAdded(false)}
                className="absolute bg-gray-200 cursor-pointer rounded-full p-1.5 top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-20"
                style={{ zIndex: 20 }}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col-reverse items-center justify-center gap-4 md:gap-14 md:flex-row pb-[30px] md:pb-0">
              <div className="w-full h-full px-[10px] md:pl-[3rem] md:pr-[2rem] md:pb-[4rem]">
                <div className="flex items-center mb-8">
                  <Image
                    src="/sukaii-logo.png"
                    alt="Sukai Logo"
                    width={155}
                    height={40}
                  />
                </div>
                <h2 className="text-[30px] md:text-[40px] font-[500] text-gray-900 mb-6">
                  Your report has been added successfully!
                </h2>
                {/* Add the two cards below the success message */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-[20px] md:px-0">
                  {/* Scan or Upload Report Option */}
                  <div
                    className={`relative p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                      selectedOption === "upload"
                        ? "__secondary-bg"
                        : "bg-white ____shadow-card"
                    }`}
                    onClick={() => setSelectedOption("upload")}
                  >
                    <div className="text-left">
                      <div className="h-12 flex items-center ">
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
                  {/* Manual Entry Option */}
                  <div
                    className={`relative p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                      selectedOption === "manual"
                        ? "__secondary-bg"
                        : "bg-white ____shadow-card"
                    }`}
                    onClick={() => setSelectedOption("manual")}
                  >
                    <div className="text-left flex flex-col items-start relative">
                      <div className=" h-12 flex items-center justify-center">
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
                </div>
              </div>

              <div className="w-full relative h-[200px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
                <div className="absolute inset-0 h-full">
                  <div className="h-full flex items-center justify-center">
                    <Image
                      src="/login-banner/login-banner.jpg"
                      alt="Sukaii Health"
                      width={800}
                      height={1200}
                      className="md:rounded-l-[32px] md:shadow-lg object-cover h-full w-full"
                    />
                  </div>

                  <div className="hidden md:block absolute bottom-50 -left-12 ml-3 px-8 flex flex-col items-center justify-center gap-3 p-3 border-2 border-sky-500 rounded-lg bg-blue-50 shadow-2xl">
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
                        <span className="text-sm font-medium text-gray-900">
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
      {/* Main Form Section */}
      {!reportAdded && (
        <div className="max-w-7xl mx-auto __gapTop">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[24px] md:text-3xl font-bold text-pink-600 md:mb-2 mb-1">
              Add Report Manually
            </h1>
            <p className="text-gray-600">
              Enter your test report details manually and keep everything in one
              place.
            </p>
          </div>

          <div className="rounded-lg flex items-center justify-between">
            {/* Left Section - Increased width and margin */}
            <div className="space-y-6 md:w-[80%]">
              <h2 className="text-[30px] font-[600] mb-6">
                Basic Report Details
              </h2>

              <div className="space-y-4 md:mb-10">
                <div className="md:flex items-center">
                  <label className="md:min-w-[110px] block text-[18px] font-medium text-gray-700 mb-2">
                    Test Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter Test Name"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                  />
                </div>
                <div className="grid gap-4">
                  <div className="md:flex items-center">
                    <label className="md:min-w-[110px] block text-[18px] font-medium text-gray-700 mb-2">
                      Date of Report
                    </label>
                    <div className="relative w-full">
                      {" "}
                      <select
                        value={formData.gender}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                        className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all appearance-none"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <Calendar className="w-5" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:flex items-center w-full">
                  <label className="md:min-w-[110px] block text-[18px] font-medium text-gray-700 mb-2">
                    Lab Name
                  </label>
                  <div className="relative w-full">
                    <select
                      value={formData.labName}
                      onChange={(e) =>
                        handleInputChange("labName", e.target.value)
                      }
                      className="w-full p-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all appearance-none"
                    >
                      <option value="">Select Lab</option>
                      <option value="lab1">Lab 1</option>
                      <option value="lipid-profile">Lipid Profile</option>
                      <option value="diabetes-screening">
                        Diabetes Screening
                      </option>
                      <option value="thyroid-function">
                        Thyroid Function Test
                      </option>
                    </select>

                    <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <Beaker className="w-5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Add Test Parameters */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Add Test Parameters
                </h2>

                <div className="overflow-x-auto w-[93vw] md:w-full">
                  <table className="w-[600px] md:w-full text-sm text-left text-gray-700 border border-gray-200">
                    <thead className="text-xs text-gray-600 uppercase bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 w-1/4">Parameter Name</th>
                        <th className="px-3 py-2 w-1/4">Value</th>
                        <th className="px-3 py-2 w-1/5">Unit</th>
                        <th className="px-3 py-2 w-1/4">Normal Range</th>
                        <th className="px-3 py-2 w-12">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {formData.parameters.map((param, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={param.name}
                              onChange={(e) =>
                                handleParameterChange(
                                  index,
                                  "name",
                                  e.target.value,
                                )
                              }
                              placeholder="Parameter name"
                              className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={param.value}
                              onChange={(e) =>
                                handleParameterChange(
                                  index,
                                  "value",
                                  e.target.value,
                                )
                              }
                              placeholder="Value"
                              className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <select
                              value={param.unit}
                              onChange={(e) =>
                                handleParameterChange(
                                  index,
                                  "unit",
                                  e.target.value,
                                )
                              }
                              className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                            >
                              {unitOptions.map((unit, unitIndex) => (
                                <option key={unitIndex} value={unit}>
                                  {unit}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={param.normalRange}
                              onChange={(e) =>
                                handleParameterChange(
                                  index,
                                  "normalRange",
                                  e.target.value,
                                )
                              }
                              placeholder="Normal range"
                              className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                          </td>
                          <td className="px-3 py-2 text-start">
                            <button
                              disabled={formData.parameters.length <= 1}
                              onClick={() => removeParameter(index)}
                              className={`text-gray-400 hover:text-red-500 transition-colors ${
                                formData.parameters.length <= 1
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add Another Parameter Button */}
                <button
                  onClick={addParameter}
                  className="cursor-pointer flex items-center gap-2 mt-4 bg-[#eee] p-3 rounded-[8px] font-medium transition-colors"
                >
                  <BadgePlus className="w-4 h-4" />
                  Add Another Parameter
                </button>
              </div>

              {/* Remarks */}
              <div className="mb-10 md:flex items-start w-full">
                <label className="md:min-w-[110px] block text-[18px] font-medium text-gray-700 mb-2">
                  Remarks
                </label>
                <div className="flex flex-col w-full gap-8">
                
                  <textarea
                    value={formData.remarks}
                    onChange={(e) =>
                      handleInputChange("remarks", e.target.value)
                    }
                    placeholder="Add any additional notes or remarks..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  />

                  <div className="text-left">
                    <button
                      onClick={handleSave}
                      className="__secondary-bg text-white font-semibold px-8 py-4 rounded-xl shadow-lg"
                    >
                      Save Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Image flush right */}
            <div className="flex justify-end items-end w-[40%] absolute right-0 top-30 h-full">
              <Image
                src={image}
                width={400}
                height={300}
                alt="Sukaii Logo"
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
