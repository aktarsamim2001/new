import React, { useState } from 'react';
import { X, Upload, Edit3 } from 'lucide-react';

const FirstPageOfUploadDocuments = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
          
          {/* Sukai Logo */}
          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-2xl font-bold text-pink-500">sukai</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Add an External Report
          </h2>
          
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Easily Add Reports from Anywhere
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Upload your health reports from other labs in just a few steps. Use our 
              smart OCR technology to scan report data using OCR, or enter the 
              details manually – whichever works best for you.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Scan or Upload Report Option */}
            <div 
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                selectedOption === 'upload' 
                  ? 'border-pink-500 bg-pink-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedOption('upload')}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-pink-500" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Scan or Upload Report
                </h4>
                <p className="text-sm text-gray-600">
                  Upload your report image or PDF
                </p>
              </div>
            </div>

            {/* Manual Entry Option */}
            <div 
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                selectedOption === 'manual' 
                  ? 'border-pink-500 bg-pink-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedOption('manual')}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Edit3 className="w-6 h-6 text-pink-500" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Manual Entry
                </h4>
                <p className="text-sm text-gray-600">
                  Enter report details manually
                </p>
              </div>
            </div>
          </div>

          {/* Patient Image and Reviews */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {/* Reviews Section */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="flex -space-x-1">
                    <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white"></div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">120+ patients</div>
                  <div className="flex items-center text-yellow-500">
                    <span className="text-sm">★ 4.9(450k reviews)</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                className={`px-8 py-3 rounded-full font-semibold text-white transition-all duration-200 ${
                  selectedOption 
                    ? 'bg-pink-500 hover:bg-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={!selectedOption}
              >
                {selectedOption === 'upload' ? 'Upload Report' : selectedOption === 'manual' ? 'Enter Manually' : 'Select an Option'}
              </button>
            </div>

            {/* Patient Image */}
            <div className="hidden md:block ml-6">
              <div className="relative">
                <div className="w-48 h-48 rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
                    alt="Happy patient"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo component to show the modal
const Demo = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-4">
      <div className="container mx-auto py-20">
        <div className="text-center text-white mb-8">
          <h1 className="text-3xl font-bold mb-4">Add External Report Modal Demo</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Open Modal
          </button>
        </div>
      </div>
      
      <FirstPageOfUploadDocuments 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Demo;