import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
const image = "/user-dashboard/health-care-icon/banner.jpg";
const icons2 = "/user-dashboard/health-care-icon/health-care.png";
const icons3 = "/user-dashboard/health-care-icon/organs-2.png";
const icons4 = "/user-dashboard/health-care-icon/organs-3.png";
const icons5 = "/user-dashboard/health-care-icon/organs-4.png";
const icons6 = "/user-dashboard/health-care-icon/organs-5.png";
const icons7 = "/user-dashboard/health-care-icon/organs-6.png";
const icons8 = "/user-dashboard/health-care-icon/organs-7.png";
const icons9 = "/user-dashboard/health-care-icon/organs-8.png";
import HealthAnalytics from "./HealthAnalytics";

const HealthDashboard = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const healthMarkers = [
    { name: "Pancreas", icon: icons2, color: "text-green-600", borderColor: "border-[#3CE81A]" },
    { name: "Cholesterol", icon: icons3, color: "text-blue-600", borderColor: "border-[#3CE81A]" },
    { name: "Cardiac Markers", icon: icons4, color: "text-red-500", borderColor: "border-[#E81A1D]" },
    { name: "Thyroid Profile", icon: icons5, color: "text-emerald-600", borderColor: "border-[#3CE81A]" },
    { name: "Hematology", icon: icons6, color: "text-red-600", borderColor: "border-[#E81A1D]" },
    { name: "Kidney Function", icon: icons7, color: "text-blue-500", borderColor: "border-[#3CE81A]" },
    { name: "Liver Function", icon: icons8, color: "text-orange-600", borderColor: "border-[#3CE81A]" },
    { name: "Glucose", icon: icons9, color: "text-purple-600", borderColor: "border-[#3CE81A]" },
  ];

  const healthData = {
    Glucose: {
      title: "Random Blood Sugar",
      value: "140",
      unit: "mg/dL",
      status: "Normal",
      ranges: {
        Normal: "70 - 140",
        "Borderline High": "140 - 199",
        High: "200 or higher",
      },
      interpretation:
        "Unit: mg/dL\nNormal\nBorderline High\nHigh\n\nLast Done: 14th\nLast Value: 140 - 199",
    },
    Cholesterol: {
      title: "Total Cholesterol",
      value: "180",
      unit: "mg/dL",
      status: "Normal",
      ranges: {
        Normal: "< 200",
        "Borderline High": "200 - 239",
        High: "≥ 240",
      },
      interpretation: "Your cholesterol levels are within normal range.",
    },
    "Cardiac Markers": {
      title: "Troponin I",
      value: "0.03",
      unit: "ng/mL",
      status: "Normal",
      ranges: {
        Normal: "< 0.04",
        Elevated: "≥ 0.04",
      },
      interpretation: "No signs of cardiac damage detected.",
    },
    "Thyroid Profile": {
      title: "TSH",
      value: "2.5",
      unit: "mIU/L",
      status: "Normal",
      ranges: {
        Normal: "0.4 - 4.0",
        Low: "< 0.4",
        High: "> 4.0",
      },
      interpretation: "Thyroid function is normal.",
    },
    Hematology: {
      title: "Hemoglobin",
      value: "14.2",
      unit: "g/dL",
      status: "Normal",
      ranges: {
        "Normal (Men)": "13.8 - 17.2",
        "Normal (Women)": "12.1 - 15.1",
      },
      interpretation: "Blood count is within normal limits.",
    },
    "Kidney Function": {
      title: "Creatinine",
      value: "1.0",
      unit: "mg/dL",
      status: "Normal",
      ranges: {
        "Normal (Men)": "0.7 - 1.3",
        "Normal (Women)": "0.6 - 1.1",
      },
      interpretation: "Kidney function is normal.",
    },
    "Liver Function": {
      title: "ALT",
      value: "28",
      unit: "U/L",
      status: "Normal",
      ranges: {
        Normal: "7 - 56",
        Elevated: "> 56",
      },
      interpretation: "Liver function is normal.",
    },
    Pancreas: {
      title: "Amylase",
      value: "85",
      unit: "U/L",
      status: "Normal",
      ranges: {
        Normal: "30 - 110",
        Elevated: "> 110",
      },
      interpretation: "Pancreatic function is normal.",
    },
  };

  return (
    <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden cardShadow2">
      <div className="__primary-bg px-4 md:px-6 py-3">
        <h3 className="text-white font-semibold">Overview</h3>
      </div>

      <div className="h-50 overflow-hidden">
        <Image
          src={image}
          alt="Healthcare professionals"
          width={800}
          height={250}
          className="w-full h-full object-cover object-center"
          priority
        />
      </div>

      <div className="px-12 py-8">
        <div className="flex flex-col items-start gap-4 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-25 h-25 flex items-center justify-center cardShadow2 rounded-full">
              <Image src={icons2} alt="Health Icon" width={56} height={56} />
            </div>
            <div>
              <h1 className="text-[45px] leading-[135%] font-[700] __secondary-text">
                Your health, decoded.
              </h1>
            </div>
          </div>
          <div>
            <p className="text-gray-600 font-[400] text-[18px] leading-relaxed max-w-[540px]">
              See your test results and progress like never before – visual,
              bite-sized, and made just for you. No more complicated reports.
              Just clarity, confidence, and control.
            </p>
          </div>
        </div>
        <div className="flex gap-8 items-start pt-5">
          <div className="flex-1">
            <div className="grid grid-cols-4 gap-6">
              {healthMarkers.map((marker) => {
                const isSelected = selectedMarker === marker.name;
                const noSelected = selectedMarker === null;
                return (
                  <button
                    key={marker.name}
                    className={`flex flex-col items-center gap-2 p-1 group transition-opacity ${noSelected ? "opacity-100" : isSelected ? "opacity-100" : "opacity-40 hover:opacity-80"}`}
                  >
                    <div
                      onClick={() => setSelectedMarker(marker.name)}
                      className={`w-25 h-17 rounded-full border-[2px] flex items-center justify-center transition-color ${marker.borderColor}`}
                    >
                      <Image
                        src={marker.icon}
                        alt={marker.name}
                        width={56}
                        height={56}
                        className={marker.color}
                      />
                    </div>
                    <span className="text-[18px] text-gray-600 text-center font-[400] leading-tight">
                      {marker.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="w-100 relative">
            {!selectedMarker ? (
              <div className="cardShadow2 flex items-center justify-center h-full min-h-[180px] rounded-2xl">
                <p className="text-gray-400 font-[600] text-[16px] leading-[120%] text-center p-4 flex items-start">
                  Select any one of the health markers on the left to find out
                  more about them.
                </p>
              </div>
            ) : (
              <div className="bg-white border-2 rounded-2xl p-6 shadow-lg" style={{ borderColor: '#e11d48' }}>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-1 w-full">
                    {selectedMarker}
                  </h2>
                  <button
                    onClick={() => setSelectedMarker(null)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors ml-2"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                {healthData[selectedMarker] && (
                  <div className="pt-2">
                    <div className="text-[16px] font-semibold text-gray-700 mb-1">
                      {healthData[selectedMarker].title}
                    </div>
                    {/* Status badge */}
                    <div className="mb-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${healthData[selectedMarker].status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-red-500 text-white'}`}>
                        {healthData[selectedMarker].status === 'Normal' ? 'Normal' : 'Abnormal'}
                      </span>
                    </div>
                    {/* Results row */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500">Result</span>
                        <span className="font-bold text-lg text-gray-800">{healthData[selectedMarker].value}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500">Ref. Range</span>
                        <span className="font-bold text-lg text-gray-800">{Object.values(healthData[selectedMarker].ranges)[0]}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500">Unit</span>
                        <span className="font-bold text-lg text-gray-800">{healthData[selectedMarker].unit}</span>
                      </div>
                    </div>
                    {/* Interpretation section */}
                    <div className="mt-3">
                      <div className="font-semibold text-gray-800 mb-1">Interpretation</div>
                      <div className="border-b border-gray-300 mb-2"></div>
                      <div className="text-xs text-end text-gray-700 mb-1 font-bold">Unit - {healthData[selectedMarker].unit}</div>
                      {/* Reference table */}
                      <div className="mb-2">
                        {Object.entries(healthData[selectedMarker].ranges).map(([range, value]) => (
                          <div key={range} className="flex justify-between text-xs py-1">
                            <span>{range}</span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2">
                        <a href="#" className="text-blue-600 text-xs font-semibold underline">View Report</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
         <div className="flex flex-col md:flex-row justify-between items-start pt-10">
        <div className="w-full md:w-auto">
          <div className=" p-3 md:p-8">
            <h3 className="text-[18px] font-[400] text-gray-800 mb-3">What are Calcium Meds</h3>
            <div className="flex flex-col items-start gap-2 md:gap-3">
              <div className="flex items-center gap-1 md:gap-2">
                <div className="w-5 h-5 rounded-full bg-[#E81A1D]"></div>
                <span className="text-[18px] font-[400] text-gray-600">Normal</span>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <div className="w-5 h-5 rounded-full bg-[#3CE81A]"></div>
                <span className="text-[18px] font-[400] text-gray-600">Abnormal</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-auto">
          <h3 className="text-[18px] font-[800] text-gray-800 mb-3">Go Through Your Report</h3>
          <button className="cursor-pointer __secondary-bg text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 leading-[100%] font-[700]">
            View Here
          </button>
        </div>
      </div>
      </div>
      <HealthAnalytics />
    </div>
  );
};

export default HealthDashboard;
