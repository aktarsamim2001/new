"use client";
import Image from 'next/image';
import React, { useRef } from 'react';

const UploadReport = () => {
  const fileInputRef = useRef(null);

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
    }
  };

  const handleCameraScanClick = () => {
    console.log('Camera scan clicked');
  };

  return (
    <div className="container mx-auto p-5">
      <div className="flex item-center justify-center w-full mb-5">
        <div
          className="h-full w-full rounded-2xl"
        >
            <Image
              src="/reports-upload/report-banner.jpg"
              alt="People Consulting"
             width={600}
                height={150}
              className="rounded-2xl h-[250px] w-1/2 object-cover"
            />
        </div>
         <h1 className="text-2xl font-bold mb-2 w-1/2">Scan or Upload Your Report</h1>
      </div>

      {/* Upload Method Section */}
      <div className='max-w-6xl mx-auto p-6'>
        <h2 className="text-lg font-semibold text-pink-500 mb-2">CHOOSE UPLOAD METHOD</h2>
        <p className="text-sm text-gray-600 mb-5">
          Ensure the report is clear and well-lit.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 px-14">
          <button
            onClick={handleFileUploadClick}
            className="flex-1 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            <svg
              className="w-6 h-6 text-pink-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <span className="text-sm font-medium">Upload a PDF/Image file</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Camera Scan Button */}
          <button
            onClick={handleCameraScanClick}
            className="flex-1 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            <svg
              className="w-6 h-6 text-pink-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <span className="text-sm font-medium">Use the camera to scan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadReport;