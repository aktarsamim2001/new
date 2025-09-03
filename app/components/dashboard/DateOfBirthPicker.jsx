import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const DateOfBirthPicker = ({
  dateData = { date: "", displayDate: "" },
  setDateData = () => {},
  showDatePicker = false,
  setShowDatePicker = () => {},
  currentMonth = new Date(),
  setCurrentMonth = () => {},
  datePickerRef = null,
  isClient = true,
  validationErrors = {},
  setValidationErrors = () => {}
}) => {
  if (!isClient) return null;

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef?.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };

    if (showDatePicker) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDatePicker, datePickerRef, setShowDatePicker]);

  // Utility functions
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Only disable future dates (dates after today)
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to end of today

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const currentDateStr = currentDate.toISOString().split('T')[0];
      const isSelected = dateData.date === currentDateStr;
      
      // Only disable future dates
      const disabled = currentDate > today;
      
      days.push({
        day,
        date: currentDate,
        isSelected,
        disabled,
      });
    }

    return days;
  };

  const handleDateSelect = (date) => {
    if (!date) return;
    
    console.log("Selected date:", date);
    const formattedDate = formatDate(date);
    console.log("Formatted date:", formattedDate);
    const localDateString = date.toISOString().split('T')[0];
    console.log("Local date string:", localDateString);
    
    setDateData({
      date: localDateString,
      displayDate: formattedDate
    });
    setShowDatePicker(false);
    
    // Clear any validation errors
    if (setValidationErrors) {
      setValidationErrors(prev => ({ ...prev, date: "" }));
    }
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const navigateYear = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setFullYear(prev.getFullYear() + direction);
      return newMonth;
    });
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full">
      <div className="relative w-full" ref={datePickerRef}>
        <div
          onClick={() => setShowDatePicker(!showDatePicker)}
          className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus-within:ring-2 focus-within:ring-pink-500 cursor-pointer transition-all ${
            showDatePicker ? "bg-white ring-2 ring-pink-500" : "hover:bg-gray-50"
          } ${validationErrors.date ? "ring-2 ring-red-500" : ""}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar
                className={`w-5 h-5 transition-colors ${
                  showDatePicker ? "text-pink-500" : "text-gray-400"
                }`}
              />
              <span
                className={`text-base ${
                  dateData.displayDate ? "text-gray-900 font-medium" : "text-gray-500"
                }`}
              >
                {dateData.displayDate || "Select your date of birth"}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                showDatePicker ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {validationErrors.date && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.date}</p>
        )}

        {showDatePicker && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-pink-200 rounded-lg shadow-lg z-50 overflow-hidden w-80">
            {/* Header with navigation */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-4 py-3">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigateYear(-1)}
                  className="p-1 hover:bg-pink-400 rounded transition-colors"
                  title="Previous Year"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => navigateMonth(-1)}
                  className="p-1 hover:bg-pink-400 rounded transition-colors"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <h3 className="text-sm font-medium text-white min-w-0 text-center">
                  {monthYear}
                </h3>
                <button
                  type="button"
                  onClick={() => navigateMonth(1)}
                  className="p-1 hover:bg-pink-400 rounded transition-colors"
                  title="Next Month"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateYear(1)}
                  className="p-1 hover:bg-pink-400 rounded transition-colors"
                  title="Next Year"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Calendar grid */}
            <div className="p-3">
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-500 py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((dayObj, index) => (
                  <div key={index} className="flex justify-center">
                    {dayObj ? (
                      <button
                        type="button"
                        onClick={() => !dayObj.disabled && handleDateSelect(dayObj.date)}
                        disabled={dayObj.disabled}
                        className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                          dayObj.isSelected
                            ? "bg-pink-500 text-white shadow-md"
                            : dayObj.disabled
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-700 hover:bg-pink-50 hover:text-pink-600 hover:shadow-sm"
                        }`}
                      >
                        {dayObj.day}
                      </button>
                    ) : (
                      <div className="w-8 h-8" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with quick actions */}
            <div className="border-t border-gray-200 px-3 py-2 bg-gray-50">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => {
                    const pastDate = new Date();
                    pastDate.setFullYear(pastDate.getFullYear() - 25);
                    setCurrentMonth(new Date(pastDate.getFullYear(), pastDate.getMonth()));
                  }}
                  className="text-xs text-pink-600 hover:text-pink-700 font-medium"
                >
                  Go to 25 years ago
                </button>
                <button
                  type="button"
                  onClick={() => setShowDatePicker(false)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateOfBirthPicker;