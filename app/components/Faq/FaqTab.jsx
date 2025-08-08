import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function FAQTabs() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [expandedItems, setExpandedItems] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleExpanded = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
    setIsDropdownOpen(false);
  };

  const faqData = {
    bookings: {
      title: "Bookings & Appointments",
      questions: [
        {
          id: "b1",
          question: "How do I book a test on Sukuk Health?",
          answer:
            "You can book a test through our mobile app or website by selecting your preferred test, choosing a convenient time slot, and completing the booking process.",
        },
        {
          id: "b2",
          question: "Can I change or cancel my booking after confirming?",
          answer:
            "Yes, you can change or cancel your booking up to 2 hours before your scheduled appointment through the app or by calling our customer service.",
        },
        {
          id: "b3",
          question: "What should I expect during a home sample collection?",
          answer:
            "Our trained phlebotomist will arrive at your scheduled time, verify your identity, collect the required samples using sterile equipment, and provide you with collection confirmation.",
        },
        {
          id: "b4",
          question: "How do I know if my appointment is confirmed?",
          answer:
            "You will receive a confirmation SMS and email immediately after booking, along with appointment details and preparation instructions if required.",
        },
      ],
    },
    health: {
      title: "Test Info & Health Education",
      questions: [
        {
          id: "h1",
          question: "What is a CBC test and why do I need it?",
          answer:
            "Complete Blood Count (CBC) is a comprehensive blood test that evaluates your overall health and detects various disorders including anemia, infection, and leukemia.",
        },
        {
          id: "h2",
          question: "How do I interpret my blood test results?",
          answer:
            "Your test results will include reference ranges. Values outside these ranges will be highlighted. We recommend consulting with a healthcare provider for proper interpretation.",
        },
        {
          id: "h3",
          question: "What tests should I take annually to monitor my health?",
          answer:
            "Annual health screenings typically include CBC, lipid profile, blood glucose, liver function tests, kidney function tests, and vitamin levels based on your age and risk factors.",
        },
        {
          id: "h4",
          question: "How long does it take to get my test results?",
          answer:
            "Most routine tests are available within 24-48 hours. Specialized tests may take 3-7 days. You'll receive notifications once results are ready.",
        },
      ],
    },
    dashboard: {
      title: "Sukuk Health Dashboard Tips",
      questions: [
        {
          id: "d1",
          question: "How do I access my Sukuk Health dashboard?",
          answer:
            "Log into your account on our website or mobile app using your registered email and password. Your dashboard will display all your health information.",
        },
        {
          id: "d2",
          question:
            "Can I view and track previous test results on the dashboard?",
          answer:
            "Yes, all your historical test results are stored securely and can be accessed anytime through your dashboard with trend analysis and comparison features.",
        },
        {
          id: "d3",
          question: "How do I upload my past medical history?",
          answer:
            "Use the 'Medical History' section in your dashboard to upload documents, enter previous test results, and maintain a comprehensive health record.",
        },
        {
          id: "d4",
          question: "How can I add family members to my Sukuk Health account?",
          answer:
            "Go to 'Family Members' section in your dashboard, click 'Add Member', and fill in their details. You can manage bookings and view results for all family members.",
        },
      ],
    },
    payments: {
      title: "Payments & Packages",
      questions: [
        {
          id: "p1",
          question: "What payment methods does Sukuk Health accept?",
          answer:
            "We accept all major credit/debit cards, UPI payments, net banking, digital wallets, and cash payments for home collection services.",
        },
        {
          id: "p2",
          question: "Can I use a promo code when booking a test?",
          answer:
            "Yes, enter your promo code during checkout. The discount will be applied automatically if the code is valid and applicable to your selected tests.",
        },
        {
          id: "p3",
          question: "What's included in the health test packages?",
          answer:
            "Our packages include multiple related tests at discounted rates, free home collection, digital reports, and consultation with healthcare experts.",
        },
        {
          id: "p4",
          question: "How do I apply for a refund if I cancel my test?",
          answer:
            "Refunds are processed automatically for cancellations made 2+ hours before appointment. For other cases, contact customer service for assistance.",
        },
      ],
    },
    privacy: {
      title: "Privacy, Certification & Safety",
      questions: [
        {
          id: "pr1",
          question:
            "Are Sukuk Health's labs and healthcare providers certified?",
          answer:
            "Yes, all our partner laboratories are NABL accredited and ISO certified. Our healthcare providers are licensed professionals with verified credentials.",
        },
        {
          id: "pr2",
          question: "How is my personal health information protected?",
          answer:
            "We use advanced encryption, secure servers, and strict access controls. Your data is protected according to HIPAA guidelines and local privacy regulations.",
        },
        {
          id: "pr3",
          question:
            "Are the sample and staff certified for home sample collection?",
          answer:
            "All our phlebotomists are certified professionals who undergo regular training. We use sterile, single-use collection kits following strict safety protocols.",
        },
        {
          id: "pr4",
          question:
            "What safety measures are in place during sample collection?",
          answer:
            "Our staff follows strict hygiene protocols including sanitization, use of PPE, contactless procedures where possible, and safe disposal of medical waste.",
        },
      ],
    },
  };

  const tabs = [
    { id: "bookings", label: "Bookings & Appointments" },
    { id: "health", label: "Test Info & Health Education" },
    { id: "dashboard", label: "Sukuk Health Dashboard Tips" },
    { id: "payments", label: "Payments & Packages" },
    { id: "privacy", label: "Privacy, Certification & Safety" },
  ];

  const activeTabLabel =
    tabs.find((tab) => tab.id === activeTab)?.label ||
    "Bookings & Appointments";

  return (
    <div className={`container mx-auto __gapTop relative ${poppins.className}`}>
      <div className="overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Desktop Categories Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:w-1/4 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-[#EC098D] inline-block w-full">
              Categories
            </h3>
            <div className="space-y-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 font-light cursor-pointer rounded-lg text-sm __cardShadow transition-all duration-200 ${
                    activeTab === tab.id
                      ? "border-2 border-[#EC098D] bg-white text-[#EC098D] font-semibold"
                      : "border-2  border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Categories Dropdown - Visible only on mobile */}
          <div className="lg:hidden w-full p-6 pb-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-[#EC098D] inline-block">
              Categories
            </h3>

            <div className="relative w-full mb-6">
              {/* Dropdown Button */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-[#EC098D] rounded-lg text-[#EC098D] font-semibold __cardShadow hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-sm">{activeTabLabel}</span>
                {isDropdownOpen ? (
                  <ChevronUp className="h-5 w-5 text-[#EC098D]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#EC098D]" />
                )}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabSelect(tab.id)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                        activeTab === tab.id
                          ? "bg-[#EC098D] text-white font-semibold"
                          : "text-gray-600 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Backdrop to close dropdown */}
              {isDropdownOpen && (
                <div
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setIsDropdownOpen(false)}
                />
              )}
            </div>
          </div>

          {/* Right Content - FAQ */}
          <div className="lg:w-3/4 p-6 lg:p-8">
            <div className="space-y-4">
              <span className="__secondary-text  font-[600] text-[26px] leading-[26px]">
                Search Result!
              </span>
              <div className="flex items-center bg-gray-100 rounded-[10px] p-1 mt-4 w-full max-w-xl">
                <input
                  type="text"
                  placeholder="Type Here"
                  className="flex-grow bg-transparent outline-none px-4 py-2 text-gray-600 placeholder-gray-400"
                />
                <button className="flex items-center gap-1 __secondary-bg text-white px-4 py-2 rounded-[6px] cursor-pointer text-sm">
                  Search
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                </button>
              </div>

              <h2 className="text-2xl font-bold text-pink-500 mt-6">
                {faqData[activeTab].title}
              </h2>
            </div>

            <div className="space-y-4 mt-2.5">
              {faqData[activeTab].questions.map((item, index) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400 font-medium text-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-gray-800 font-medium">
                        {item.question}
                      </span>
                    </div>
                    {expandedItems[item.id] ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {expandedItems[item.id] && (
                    <div className="px-6 pb-4 pt-2 bg-gray-50">
                      <div className="ml-8">
                        <p className="text-gray-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-100 to-transparent rounded-full -z-10 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-100 to-transparent rounded-full -z-10 opacity-30"></div>
    </div>
  );
}
