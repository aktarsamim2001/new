"use client";

import React, { useState } from 'react';
import { ChevronDown, Calendar, X, Plus, Star } from 'lucide-react';
import Image from 'next/image';
import { MdOutlinePhotoCamera, MdOutlineEdit } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";

export default function AddReportManually() {
  const [formData, setFormData] = useState({
    testName: '',
    dateOfReport: '',
    labName: '',
    parameters: [
      { name: 'LDL', value: '130', unit: 'mg/dl', normalRange: '<100' }
    ],
    remarks: ''
  });

  const [dropdownOpen, setDropdownOpen] = useState({
    testName: false,
    labName: false
  });

  const [reportAdded, setReportAdded] = useState(false);

  const testOptions = [
    'Lipid Profile',
    'Complete Blood Count',
    'Liver Function Test',
    'Kidney Function Test',
    'Thyroid Function Test'
  ];

  const labOptions = [
    'ABC Diagnostics',
    'HealthLab Center',
    'MediTest Labs',
    'Precision Diagnostics',
    'CareFirst Laboratory'
  ];

  const unitOptions = ['mg/dl', 'g/dl', 'mmol/L', 'IU/L', 'ng/ml', 'pg/ml'];

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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleParameterChange = (index, field, value) => {
    const newParameters = [...formData.parameters];
    newParameters[index][field] = value;
    setFormData(prev => ({ ...prev, parameters: newParameters }));
  };

  const addParameter = () => {
    setFormData(prev => ({
      ...prev,
      parameters: [...prev.parameters, { name: '', value: '', unit: 'mg/dl', normalRange: '' }]
    }));
  };

  const removeParameter = (index) => {
    setFormData(prev => ({
      ...prev,
      parameters: prev.parameters.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    setReportAdded(true);
    console.log('Saving report:', formData);
    // Handle save logic here
  };

  const toggleDropdown = (field) => {
    setDropdownOpen(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const selectOption = (field, value) => {
    handleInputChange(field, value);
    setDropdownOpen(prev => ({ ...prev, [field]: false }));
  };

  return (
    <div className="container mx-auto p-5">
      {/* Banner and Title always on top */}
     <div className="flex item-center justify-center relative">
            <div className="h-full w-full rounded-2xl">
              <Image
                src="/reports-upload/report-banner.jpg"
                alt="People Consulting"
                width={600}
                height={150}
                className="rounded-2xl h-[250px] object-cover"
              />
            </div>
            <div className='flex items-center justify-center absolute bottom-14 left-4/9'>
              <h1 className="text-[45px] font-[600] ">Upload Report<span className='block'>Manually</span></h1>
            </div>
          </div>
      {/* Conditional Sections Below */}
      {/* Success Modal Section */}
      {reportAdded && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-[90%] mx-auto max-h-[90vh] overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="relative pb-8 z-10">
              <button
                onClick={() => setReportAdded(false)}
                className="absolute bg-gray-200 cursor-pointer rounded-full p-1.5 top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-20"
                style={{ zIndex: 20 }}
              >
                <X size={24} />
              </button>
            </div>
            {/* Content Area */}
            <div className="px-6 pb-6 flex items-center justify-center gap-14 flex-col md:flex-row">
              <div className="w-full px-5">
                <div className="flex items-center mb-8">
                  <Image
                    src="/sukaii-logo.png"
                    alt="Sukai Logo"
                    width={140}
                    height={40}
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Report Added Successfully!
                </h2>
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-6 text-center">
                    Your report has been added and is now available for review in your dashboard.
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed text-center">
                    Thank you for using Sukaii Health. You can add more reports or return to your dashboard.
                  </p>
                </div>
                {/* Add the two cards below the success message */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Scan or Upload Report Option */}
                  <div
                    className="relative p-3 rounded-2xl border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-gray-300"
                  >
                    <div className="text-left">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                        <MdOutlinePhotoCamera className="w-6 h-6 __secondary-text" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Scan or Upload Report
                      </h4>
                      <GoArrowUpRight className="absolute top-3 right-3 w-6 h-6" />
                    </div>
                  </div>
                  {/* Manual Entry Option */}
                  <div
                    className="relative p-3 rounded-2xl border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-gray-300"
                  >
                    <div className="text-left">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                        <MdOutlineEdit className="w-6 h-6 __secondary-text" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Manual Entry
                      </h4>
                      <GoArrowUpRight className="absolute top-3 right-3 w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setReportAdded(false)}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="w-full relative h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
                <div className="absolute inset-0 h-full">
                  <div className="h-full flex items-center justify-center p-8">
                    <Image
                      src="/login-banner/login-banner.jpg"
                      alt="Sukaii Health"
                      width={800}
                      height={1200}
                      className="rounded-[50px] shadow-lg object-cover h-full w-full"
                    />
                  </div>
                  <div className="absolute bottom-20 -left-12 ml-3 px-8 flex flex-col items-center justify-center gap-3 p-3 border-2 border-sky-500 rounded-lg bg-blue-50 shadow-2xl">
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-pink-600 mb-2">
              Add Report Manually
            </h1>
            <p className="text-gray-600">
              Enter your test report details manually and keep everything in 
              one place.
            </p>
          </div>

          <div className="">
            {/* Basic Report Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Basic Report Details
              </h2>
              
              <div className="space-y-6">
                {/* Test Name Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Name
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown('testName')}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                    >
                      <span className={formData.testName ? 'text-gray-800' : 'text-gray-400'}>
                        {formData.testName || 'Select test name'}
                      </span>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </button>
                    {dropdownOpen.testName && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                        {testOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => selectOption('testName', option)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Date of Report */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Report
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.dateOfReport}
                      onChange={(e) => handleInputChange('dateOfReport', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Lab Name Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lab Name
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown('labName')}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                    >
                      <span className={formData.labName ? 'text-gray-800' : 'text-gray-400'}>
                        {formData.labName || 'Select lab name'}
                      </span>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </button>
                    {dropdownOpen.labName && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                        {labOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => selectOption('labName', option)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Add Test Parameters */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Add Test Parameters
              </h2>
              
              {/* Parameters Header */}
              <div className="grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-600">
                <div className="col-span-3">Parameter Name</div>
                <div className="col-span-2">Value</div>
                <div className="col-span-2">Unit</div>
                <div className="col-span-4">Normal Range</div>
                <div className="col-span-1"></div>
              </div>

              {/* Parameters List */}
              <div className="space-y-3">
                {formData.parameters.map((param, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-3">
                      <input
                        type="text"
                        value={param.name}
                        onChange={(e) => handleParameterChange(index, 'name', e.target.value)}
                        placeholder="Parameter name"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        value={param.value}
                        onChange={(e) => handleParameterChange(index, 'value', e.target.value)}
                        placeholder="Value"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <select
                        value={param.unit}
                        onChange={(e) => handleParameterChange(index, 'unit', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                      >
                        {unitOptions.map((unit, unitIndex) => (
                          <option key={unitIndex} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-4">
                      <input
                        type="text"
                        value={param.normalRange}
                        onChange={(e) => handleParameterChange(index, 'normalRange', e.target.value)}
                        placeholder="Normal range"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    <div className="col-span-1">
                      {formData.parameters.length > 1 && (
                        <button
                          onClick={() => removeParameter(index)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Another Parameter Button */}
              <button
                onClick={addParameter}
                className="flex items-center gap-2 mt-4 text-pink-500 hover:text-pink-600 font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Another Parameter
              </button>
            </div>

            {/* Remarks */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remarks
              </label>
              <textarea
                value={formData.remarks}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
                placeholder="Add any additional notes or remarks..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Save Button */}
            <div className="text-center">
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Save Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}