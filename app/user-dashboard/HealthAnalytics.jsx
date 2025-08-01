import React from "react";
import {
  Activity,
  Calendar,
  FileText,
  TrendingUp,
  User,
  AlertCircle,
  CheckCircle2,
  TriangleAlert,
} from "lucide-react";
// Chart.js imports for new chart section
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import icon from "../../public/user-dashboard/health-care-icon/smart-health-1 (1).png";
import icon2 from "../../public/user-dashboard/health-care-icon/smart-health-1 (2).png";
import icon3 from "../../public/user-dashboard/health-care-icon/smart-health-1 (3).png";
import icon4 from "../../public/user-dashboard/health-care-icon/smart-health-1 (4).png";
import image from "../../public/user-dashboard/health-care-icon/cta-banner.jpg";
import Image from "next/image";

const HealthAnalytics = () => {
  const [showRecentActivity, setShowRecentActivity] = React.useState(true);
  const calciumData = [
    { month: "Jan", value: 8.5 },
    { month: "Feb", value: 9.2 },
    { month: "Mar", value: 8.8 },
    { month: "Apr", value: 9.5 },
    { month: "May", value: 9.1 },
    { month: "Jun", value: 8.9 },
  ];

  const glucoseData = [
    { month: "Jan", value: 110 },
    { month: "Feb", value: 125 },
    { month: "Mar", value: 118 },
    { month: "Apr", value: 132 },
    { month: "May", value: 128 },
    { month: "Jun", value: 120 },
  ];

  const vitaminData = [
    { month: "Jan", value: 250 },
    { month: "Feb", value: 280 },
    { month: "Mar", value: 320 },
    { month: "Apr", value: 290 },
    { month: "May", value: 340 },
    { month: "Jun", value: 380 },
  ];

  const calciumSerumData = [
    { month: "Jan", value: 9.2 },
    { month: "Feb", value: 8.8 },
    { month: "Mar", value: 9.0 },
    { month: "Apr", value: 8.6 },
    { month: "May", value: 9.3 },
    { month: "Jun", value: 9.1 },
  ];

  return (
    <div className="space-y-4 md:space-y-6 relative">
      {showRecentActivity && (
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center w-full gap-2">
              <span className="text-lg font-semibold text-gray-800 whitespace-nowrap">Recent Activity</span>
              <div className="flex-1 border-b border-gray-300 mx-3" />
              <button
                className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                aria-label="Close Recent Activity"
                onClick={() => setShowRecentActivity(false)}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-4 h-4 text-gray-400"
                >
                  <path d="M6 10l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* High Parameters Card */}
            <div className="bg-white border-[4px] border-[#D2020259] rounded-xl shadow-sm flex flex-col p-4 relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-14 h-14 flex items-center justify-center">
                  <Image
                    src={icon2}
                    alt="High Parameters Icon"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <h1 className="flex items-center gap-1">
                    <span className="text-[18px] font-[900] bg-red-500 text-white px-8 py-1 rounded-full flex items-start">
                      High Parameters
                    </span>
                    <span className="bg-red-500 p-2 rounded-full text-white">
                      <TriangleAlert />
                    </span>
                  </h1>
                  <div className="text-[16px] text-gray-700 mt-3 mb-2">
                    LDL, TSH
                  </div>
                </div>
              </div>
              <button className="mt-auto self-end border font-medium px-4 py-1.5 rounded-[10px] text-xs ">
                View More
              </button>
            </div>
            {/* Low Parameters Card */}
            <div className="bg-white border-[4px] border-[#D2020259] rounded-xl shadow-sm flex flex-col p-4 relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-14 h-14 flex items-center justify-center">
                  <Image
                    src={icon}
                    alt="Low Parameters Icon"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <h1 className="flex items-center gap-1">
                    <span className="text-[18px] font-[900] bg-red-500 text-white px-8 py-1 rounded-full flex items-center">
                      Low Parameters
                    </span>
                    <span className="bg-red-500 p-2 rounded-full text-white">
                      <TriangleAlert />
                    </span>
                  </h1>
                  <div className="text-[16px] text-gray-700 mt-3 mb-2">
                    Vitamin D, B12
                  </div>
                </div>
              </div>
              <button className="mt-auto self-end bg-white border font-medium px-4 py-1.5 rounded-[10px] text-xs shadow">
                View More
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Last Test Taken Card */}
            <div className="cardShadow2 rounded-xl flex flex-col p-4 relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-14 h-14 flex items-center justify-center">
                  <Image
                    src={icon3}
                    alt="Last Test Taken Icon"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <span className="text-[18px] font-[900] text-pink-600">
                  Last Test Taken
                </span>
                <div className="text-[16px] text-gray-700 mb-1">
                  <p>Lipid Profile</p>
                  <span className="text-gray-400">
                    Last taken on 10/05/2025
                  </span>
                </div>
              </div>
              <button className="mt-auto self-end bg-white border font-medium px-4 py-1.5 rounded-[10px] text-xs shadow">
                View More
              </button>
            </div>

            <div className="cardShadow2 rounded-xl flex flex-col p-4 relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-14 h-14 flex items-center justify-center bg-gray-50">
                  <Image
                    src={icon4}
                    alt="Suggested Follow-up Icon"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-[18px] font-[900] text-pink-600">
                    Suggested Follow-up
                  </h1>
                  <span className="text-[16px] text-gray-700 mb-1">
                    Repeat Lipid Profile in 30 days
                  </span>
                </div>
              </div>

              <button className="mt-auto self-end bg-white border font-medium px-4 py-1.5 rounded-[10px] text-xs shadow">
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating reopen button for Recent Activity */}
      {!showRecentActivity && (
        <div className="relative w-full">
          <button
            className="absolute top-0 right-0 z-50 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg p-3 flex items-center justify-center transition"
            aria-label="Open Recent Activity"
            onClick={() => setShowRecentActivity(true)}
          >
          </button>
        </div>
      )}

      {/* Health Score Banner Section */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: 220 }}
      >
        <div className="bg-pink-600 flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-white text-xl font-bold leading-tight">
              Your Health Score
            </h2>
            <p className="text-white text-sm opacity-90">
              One Glance, All Answers
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 mt-6 md:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-white text-3xl font-bold">--</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white text-xs">Out of 100</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
                <text
                  x="12"
                  y="16"
                  textAnchor="middle"
                  fontSize="18"
                  fill="#fff"
                >
                  i
                </text>
              </svg>
              <span className="text-white text-[18px]">not enough data</span>
            </div>
          </div>
        </div>
        <div className="w-full h-[180px] md:h-[220px] relative">
          <Image
            src={image}
            alt="Healthcare professionals"
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            className="w-full h-full"
            priority
          />
        </div>
      </div>

      {(() => {
        ChartJS.register(
          CategoryScale,
          LinearScale,
          PointElement,
          LineElement,
          ChartTitle,
          Tooltip,
          Legend,
          Filler
        );
        const calciumData = [7.2, 6.8, 6.9, 7.1, 6.7, 7.3, 8.1, 7.8, 6.9, 7.0];
        const hba1cData = [7.8, 7.5, 8.0, 7.9, 7.7, 7.8, 6.5, 6.2, 8.2, 7.8];
        const vitaminB12Data = [
          6.8, 6.9, 8.2, 6.8, 6.5, 7.0, 6.8, 6.9, 7.5, 6.8,
        ];
        const calcium2Data = [7.2, 6.8, 6.7, 6.9, 7.0, 6.8, 7.8, 8.1, 6.9, 7.0];

        function ChartCard({
          title,
          data,
          latest,
          unit,
          date,
          minRange,
          maxRange,
          value,
          normalMin,
          normalMax,
        }) {
          const totalRange = maxRange - minRange;
          const normalStart = ((normalMin - minRange) / totalRange) * 100;
          const normalWidth = ((normalMax - normalMin) / totalRange) * 100;
          const valuePosition = ((value - minRange) / totalRange) * 100;

          const chartData = {
            labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            datasets: [
              {
                label: title,
                data: data,
                borderColor: "#ec4899",
                backgroundColor: "transparent",
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 4,
                tension: 0,
              },
              {
                label: "Normal Range",
                data: Array(10).fill(normalMax),
                borderColor: "transparent",
                backgroundColor: "rgba(187, 247, 208, 0.4)",
                fill: "+1",
                pointRadius: 0,
                pointHoverRadius: 0,
                tension: 0,
              },
              {
                label: "Normal Range Bottom",
                data: Array(10).fill(normalMin),
                borderColor: "transparent",
                backgroundColor: "transparent",
                pointRadius: 0,
                pointHoverRadius: 0,
                tension: 0,
              },
            ],
          };

          const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                border: {
                  display: true,
                  color: "#000000",
                  width: 1,
                  skip: false,
                },
                ticks: {
                  color: "#6b7280",
                  font: {
                    size: 10,
                  },
                  drawTicks: true,
                  tickLength: 8,  
                },
              },
              y: {
                min: 0,
                max: 9,
                grid: {
                  display: false, 
                },
                border: {
                  display: true,
                  color: "#000000",
                  width: 1,
                  skip: false,
                },
                ticks: {
                  stepSize: 3,
                  color: "#6b7280",
                  font: {
                    size: 10,
                  },
                  drawTicks: true,
                  tickLength: 8,
                },
              },
            },
            interaction: {
              intersect: false,
            },
            elements: {
              point: {
                radius: 0,
              },
            },
          };

          return (
            <div className="bg-white rounded-lg p-4">
              <div className="h-32 mb-3 relative">
                <Line data={chartData} options={options} />
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-pink-600 mb-2">
                {title}
              </h3>

              <div className="flex items-center gap-8 justify-between">
                <div>
                  <div className="text-xs text-gray-500 mb-1">
                    Your Latest Result
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {latest}{" "}
                    <span className="text-sm font-normal text-gray-600">
                      {unit}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mb-3">{date}</div>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <div className="flex-1 max-w-[400px] flex flex-col items-stretch">
                    {/* Range bar on top */}
                    <div className="h-2 bg-gray-200 rounded-full relative overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-red-400"
                        style={{ width: `${normalStart}%` }}
                      />
                      <div
                        className="absolute top-0 h-full bg-green-400"
                        style={{
                          left: `${normalStart}%`,
                          width: `${normalWidth}%`,
                        }}
                      />
                      <div
                        className="absolute right-0 top-0 h-full bg-red-400"
                        style={{ width: `${100 - normalStart - normalWidth}%` }}
                      />
                      <div
                        className="absolute top-0 w-0.5 h-full bg-blue-500"
                        style={{ left: `${valuePosition}%` }}
                      />
                    </div>
                    {/* Min/Max labels below the bar */}
                    <div className="flex justify-center gap-6 mt-1">
                      <span className="text-xs text-gray-500">{minRange}</span>
                      <span className="text-xs text-gray-500">{maxRange}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        const charts = [
          {
            title: "Calcium Total, Serum",
            data: calciumData,
            latest: "7.0",
            unit: "mg/dl",
            date: "14 May, 2025",
            minRange: 6.6,
            maxRange: 10.3,
            value: 7.0,
            normalMin: 8.5,
            normalMax: 10.1,
          },
          {
            title: "Glycated Haemoglobin (HbA1C)",
            data: hba1cData,
            latest: "7.0",
            unit: "mg/dl",
            date: "14 May, 2025",
            minRange: 6.6,
            maxRange: 10.3,
            value: 7.0,
            normalMin: 8.5,
            normalMax: 10.1,
          },
          {
            title: "Vitamin B12",
            data: vitaminB12Data,
            latest: "7.0",
            unit: "mg/dl",
            date: "14 May, 2025",
            minRange: 6.6,
            maxRange: 10.3,
            value: 7.0,
            normalMin: 8.5,
            normalMax: 10.1,
          },
          {
            title: "Calcium Total, Serum",
            data: calcium2Data,
            latest: "7.0",
            unit: "mg/dl",
            date: "14 May, 2025",
            minRange: 6.6,
            maxRange: 10.3,
            value: 7.0,
            normalMin: 8.5,
            normalMax: 10.1,
          },
        ];

        return (
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3">
              <h2 className="text-2xl font-semibold text-gray-900">
                Your Body's Journey, Visualized Over Time
              </h2>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path d="M19 13H5v-2h14v2z" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {charts.map((chart, idx) => (
                <ChartCard key={idx} {...chart} />
              ))}
            </div>

            <div className="mt-8 flex justify-start">
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-[10px] text-base shadow transition">
                Load More
              </button>
            </div>
          </div>
        );
      })()}

      {/* Support/CTA Section */}
      <div className="my-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 p-4 md:p-6 max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 flex-shrink-0">
          <Image
            src={require("../../public/user-dashboard/health-care-icon/cta-banner.jpg")}
            alt="Support Lab"
            className="rounded-xl object-cover object-top w-full h-40 md:h-[280px]"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight">
            Still Have Questions?
            <br />
            Let's Talk.
          </h3>
          <p className="text-gray-600 mb-4 text-base">
            Our team is just a message away. Whether you're stuck with a
            booking, confused about a report, or need help navigating your
            dashboard—support is standing by.
          </p>
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded-lg text-base shadow transition">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthAnalytics;
