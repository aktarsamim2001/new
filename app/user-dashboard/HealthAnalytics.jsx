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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";
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
            <h2 className="text-base md:text-lg font-semibold text-gray-800">
              Recent Activity
            </h2>
            <button
              className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
              aria-label="Close Recent Activity"
              onClick={() => setShowRecentActivity(false)}
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
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
        <button
          className="fixed bottom-8 right-8 z-50 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition"
          aria-label="Open Recent Activity"
          onClick={() => setShowRecentActivity(true)}
        >
          {/* Bell Icon */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 2C8.13 2 5 5.13 5 9v5c0 .55-.45 1-1 1H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1h-1c-.55 0-1-.45-1-1V9c0-3.87-3.13-7-7-7zm0 18c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" />
          </svg>
        </button>
      )}

      {/* Health Score Banner Section */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: 220 }}>
        <div className="bg-pink-600 flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-white text-xl font-bold leading-tight">Your Health Score</h2>
            <p className="text-white text-sm opacity-90">One Glance, All Answers</p>
          </div>
          <div className="flex flex-col items-end gap-2 mt-6 md:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-white text-3xl font-bold">--</span>
              <span className="text-white text-lg font-semibold">– –</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white text-xs">Out of 100</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="14" fill="#fff">i</text></svg>
              <span className="text-white text-xs">not enough data</span>
            </div>
          </div>
        </div>
        <div className="w-full h-[180px] md:h-[220px] relative">
          <Image
            src={image}
            alt="Healthcare professionals"
            fill
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            className="w-full h-full"
            priority
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="rounded-2xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3">
          <h2 className="text-2xl font-semibold text-gray-900">
            Your Body’s Journey, Visualized Over Time
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chart Card Example - repeat for each metric */}
          {[
            {
              title: "Calcium Total, Serum",
              color: "text-pink-600",
              data: calciumData,
              latest: "7.0",
              unit: "mg/dl",
              date: "14 May, 2025",
              min: 6.6,
              max: 10.3,
              value: 7.0,
            },
            {
              title: "Glycated Haemoglobin (HbA1C)",
              color: "text-pink-600",
              data: calciumData,
              latest: "7.0",
              unit: "mg/dl",
              date: "14 May, 2025",
              min: 6.6,
              max: 10.3,
              value: 7.0,
            },
            {
              title: "Vitamin B12",
              color: "text-pink-600",
              data: calciumData,
              latest: "7.0",
              unit: "mg/dl",
              date: "14 May, 2025",
              min: 6.6,
              max: 10.3,
              value: 7.0,
            },
            {
              title: "Calcium Total, Serum",
              color: "text-pink-600",
              data: calciumData,
              latest: "7.0",
              unit: "mg/dl",
              date: "14 May, 2025",
              min: 6.6,
              max: 10.3,
              value: 7.0,
            },
          ].map((chart, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-6 flex flex-col"
            >
              <div className="h-32 mb-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chart.data}
                    margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                  >
                    {/* Highlight band for normal range */}
                    <rect
                      x="0"
                      y="25"
                      width="100%"
                      height="30"
                      fill="#d1fae5"
                      rx="6"
                    />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis
                      domain={[6, 9]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10 }}
                    />
                    <Line
                      type="linear"
                      dataKey="value"
                      stroke="#ec4899"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <h3
                className={`mt-2 mb-1 font-semibold text-base ${chart.color}`}
              >
                {chart.title}
              </h3>
              <div className="text-xs text-gray-600 mb-1">
                Your Latest Result
              </div>
              <div className="font-bold text-lg text-gray-900 mb-1">
                {chart.latest}{" "}
                <span className="font-normal text-sm">{chart.unit}</span>
              </div>
              <div className="text-xs text-gray-400 mb-2">{chart.date}</div>
              {/* Range Bar */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 rounded-full bg-red-200 relative flex">
                  <div
                    className="absolute left-1/4 top-0 h-2 w-2 bg-pink-600 rounded-full"
                    style={{
                      left: `${
                        ((chart.value - chart.min) / (chart.max - chart.min)) *
                        100
                      }%`,
                    }}
                  ></div>
                  <div
                    className="absolute left-0 top-0 h-2"
                    style={{
                      width: "25%",
                      background: "#f87171",
                      borderRadius: "9999px 0 0 9999px",
                    }}
                  ></div>
                  <div
                    className="absolute left-1/4 top-0 h-2"
                    style={{ width: "50%", left: "25%", background: "#34d399" }}
                  ></div>
                  <div
                    className="absolute right-0 top-0 h-2"
                    style={{
                      width: "25%",
                      background: "#f87171",
                      borderRadius: "0 9999px 9999px 0",
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{chart.min}</span>
                <span className="text-xs text-gray-500">{chart.max}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-full text-base shadow transition">
            Load More
          </button>
        </div>
      </div>

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
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight">Still Have Questions?<br />Let's Talk.</h3>
          <p className="text-gray-600 mb-4 text-base">Our team is just a message away. Whether you're stuck with a booking, confused about a report, or need help navigating your dashboard—support is standing by.</p>
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded-lg text-base shadow transition">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default HealthAnalytics;
