"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function FAQTabs({ data }) {
  const categories = data?.content?.faq_page?.categories || [];

  // start with no active tab
  const [activeTab, setActiveTab] = useState("");
  const [expandedItems, setExpandedItems] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // when categories load, select the first one automatically
  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0].category_name);
    }
  }, [categories, activeTab]);

  const toggleExpanded = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleTabSelect = (tabName) => {
    setActiveTab(tabName);
    setIsDropdownOpen(false);
  };

  // Transform API data for easier rendering
  const faqData = {};
  const tabs = [];

  categories.forEach((category, catIndex) => {
    const tabId = category.category_name; // use real name as id
    tabs.push({ id: tabId, label: category.category_name });
    faqData[tabId] = {
      title: category.category_name,
      questions: category.items.map((item, index) => ({
        id: `${catIndex}-q${index}`,
        question: item.title,
        answer: item.description,
      })),
    };
  });

  const activeTabLabel =
    tabs.find((tab) => tab.id === activeTab)?.label || tabs?.[0]?.label;

  return (
    <div className={`container mx-auto __gapTop relative ${poppins.className}`}>
      <div className="overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Desktop Categories Sidebar */}
          <div className="hidden lg:block lg:w-1/4">
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
                      : "border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Categories Dropdown */}
          <div className="lg:hidden w-full p-6 pb-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-[#EC098D] inline-block">
              Categories
            </h3>

            <div className="relative w-full mb-6">
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
              <span className="__secondary-text font-[600] text-[26px] leading-[26px]">
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
                {faqData[activeTab]?.title}
              </h2>
            </div>

            <div className="space-y-4 mt-2.5">
              {faqData[activeTab]?.questions.map((item, index) => (
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
