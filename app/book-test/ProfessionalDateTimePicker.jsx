import { Calendar, Clock, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const ProfessionalDateTimePicker = ({
  dateTimeData = { date: "", timeSlot: "" },
  setDateTimeData = () => {},
  showDatePicker = false,
  setShowDatePicker = () => {},
  showTimePicker = false,
  setShowTimePicker = () => {},
  currentMonth = new Date(),
  setCurrentMonth = () => {},
  datePickerRef = null,
  timePickerRef = null,
  isClient = true,
  validationErrors = {},
  setValidationErrors = () => {}
}) => {
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [isAM, setIsAM] = useState(true);

  if (!isClient) return null;

  // Utility functions
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  const formatTime = (hour, minute, isAM) => {
    const displayHour = hour === 0 ? 12 : hour;
    const period = isAM ? 'AM' : 'PM';
    return `${displayHour}:${String(minute).padStart(2, '0')} ${period}`;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const currentDateMidnight = new Date(currentDate);
      currentDateMidnight.setHours(0, 0, 0, 0);
      const isToday = currentDateMidnight.getTime() === todayMidnight.getTime();
      const isPast = currentDateMidnight.getTime() < todayMidnight.getTime();
      const isSelected = dateTimeData.date === currentDate.toISOString().split("T")[0];

      days.push({
        day,
        date: currentDate,
        isToday,
        isPast,
        isSelected,
        disabled: isPast,
      });
    }

    return days;
  };

  const handleDateSelect = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const localDateString = `${year}-${month}-${day}`;
    
    setDateTimeData(prev => ({ ...prev, date: localDateString }));
    setShowDatePicker(false);
    setValidationErrors(prev => ({ ...prev, date: "" }));
  };

  const handleTimeConfirm = () => {
    const hour24 = isAM ? (selectedHour === 12 ? 0 : selectedHour) : (selectedHour === 12 ? 12 : selectedHour + 12);
    const timeValue = `${String(hour24).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')}`;
    const displayTime = formatTime(selectedHour, selectedMinute, isAM);
    
    setDateTimeData(prev => ({ 
      ...prev, 
      timeSlot: timeValue,
      timeDisplay: displayTime 
    }));
    setShowTimePicker(false);
    setValidationErrors(prev => ({ ...prev, timeSlot: "" }));
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  // Generate clock positions for hours
  const getClockPosition = (value, total, radius) => {
    const angle = (value * 360 / total) - 90; // Start from top (12 o'clock)
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { x, y };
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Date Picker */}
      <div className="lg:flex flex-row items-center gap-3">
        <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
          Schedule Date
        </label>
        <div className="relative lg:w-[60%] w-full" ref={datePickerRef}>
          <div
            onClick={() => setShowDatePicker(!showDatePicker)}
            className={`w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus-within:ring-2 focus-within:ring-pink-500 cursor-pointer transition-all ${
              showDatePicker ? "bg-white ring-2 ring-pink-500" : "hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar
                  className={`w-6 h-6 transition-colors ${
                    showDatePicker ? "text-pink-500" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-base ${
                    dateTimeData.date
                      ? "text-gray-800"
                      : "text-gray-500"
                  }`}
                >
                  {dateTimeData.date
                    ? formatDate(new Date(dateTimeData.date))
                    : "Choose your preferred date"}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  showDatePicker ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          {showDatePicker && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-pink-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-pink-400 rounded-xl transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <h3 className="text-xl font-semibold text-white">
                    {monthYear}
                  </h3>
                  <button
                    type="button"
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-pink-400 rounded-xl transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="p-2 text-center text-sm font-medium text-gray-500"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {days.map((dayObj, index) => (
                    <div key={index} className="aspect-square">
                      {dayObj && (
                        <button
                          type="button"
                          onClick={() =>
                            !dayObj.disabled && handleDateSelect(dayObj.date)
                          }
                          disabled={dayObj.disabled}
                          className={`w-full h-full rounded-xl text-sm font-medium transition-all duration-200 ${
                            dayObj.isSelected
                              ? "bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg scale-105"
                              : dayObj.isToday
                              ? "bg-pink-100 text-pink-600 border-2 border-pink-300"
                              : dayObj.disabled
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-700 hover:bg-pink-100 hover:text-pink-600 hover:scale-105"
                          }`}
                        >
                          {dayObj.day}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Clock-style Time Picker */}
      <div className="lg:flex flex-row items-center gap-3">
        <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
          Select Time
        </label>
        <div className="relative lg:w-[60%] w-full" ref={timePickerRef}>
          <div
            onClick={() => setShowTimePicker(!showTimePicker)}
            className={`w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus-within:ring-2 focus-within:ring-pink-500 cursor-pointer transition-all ${
              showTimePicker ? "bg-white ring-2 ring-pink-500" : "hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock
                  className={`w-6 h-6 transition-colors ${
                    showTimePicker ? "text-pink-500" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-base ${
                    dateTimeData.timeSlot || dateTimeData.timeDisplay
                      ? "text-gray-800"
                      : "text-gray-500"
                  }`}
                >
                  {dateTimeData.timeDisplay || 
                   (dateTimeData.timeSlot ? `${dateTimeData.timeSlot}` : "Choose your preferred time")}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  showTimePicker ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          {showTimePicker && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-pink-200 rounded-2xl shadow-2xl z-40 overflow-hidden">
              {/* Clock Header */}
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">Select Time</h3>
                  <div className="text-2xl font-bold text-white">
                    {formatTime(selectedHour, selectedMinute, isAM)}
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Clock Face */}
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative w-64 h-64">
                    {/* Clock Circle */}
                    <div className="absolute inset-0 rounded-full border-4 border-pink-100 bg-gradient-to-br from-pink-50 to-white"></div>
                    
                    {/* Center Dot */}
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-pink-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20"></div>
                    
                    {/* Hour Numbers */}
                    {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((hour) => {
                      const pos = getClockPosition(hour === 12 ? 0 : hour, 12, 100);
                      return (
                        <button
                          key={hour}
                          type="button"
                          onClick={() => setSelectedHour(hour)}
                          className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 transform -translate-x-1/2 -translate-y-1/2 ${
                            selectedHour === hour
                              ? "bg-pink-500 text-white scale-110 shadow-lg"
                              : "bg-white text-gray-700 hover:bg-pink-100 hover:scale-105 border-2 border-pink-200"
                          }`}
                          style={{
                            left: `calc(50% + ${pos.x}px)`,
                            top: `calc(50% + ${pos.y}px)`,
                          }}
                        >
                          {hour}
                        </button>
                      );
                    })}

                    {/* Hour Hand */}
                    <div
                      className="absolute top-1/2 left-1/2 origin-bottom bg-pink-500 rounded-full z-10"
                      style={{
                        width: '3px',
                        height: '60px',
                        transform: `translate(-50%, -100%) rotate(${(selectedHour % 12) * 30}deg)`,
                      }}
                    ></div>

                    {/* Minute Markers */}
                    {[0, 15, 30, 45].map((minute) => {
                      const pos = getClockPosition(minute / 5, 12, 80);
                      return (
                        <button
                          key={minute}
                          type="button"
                          onClick={() => setSelectedMinute(minute)}
                          className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 transform -translate-x-1/2 -translate-y-1/2 ${
                            selectedMinute === minute
                              ? "bg-blue-500 text-white scale-110"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:scale-105"
                          }`}
                          style={{
                            left: `calc(50% + ${pos.x}px)`,
                            top: `calc(50% + ${pos.y}px)`,
                          }}
                        >
                          {String(minute).padStart(2, '0')}
                        </button>
                      );
                    })}

                    {/* Minute Hand */}
                    <div
                      className="absolute top-1/2 left-1/2 origin-bottom bg-[#00b8c1] rounded-full z-15"
                      style={{
                        width: '2px',
                        height: '80px',
                        transform: `translate(-50%, -100%) rotate(${selectedMinute * 6}deg)`,
                      }}
                    ></div>
                  </div>

                  {/* Minute Selector */}
                  <div className="w-full max-w-[400px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fine-tune Minutes</label>
                    <div className="grid grid-cols-12 gap-1">
                      {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                        <button
                          key={minute}
                          type="button"
                          onClick={() => setSelectedMinute(minute)}
                          className={`w-full py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                            selectedMinute === minute
                              ? "bg-[#00b8c1] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                          }`}
                        >
                          {String(minute).padStart(2, '0')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Confirm Button */}
                  <button
                    type="button"
                    onClick={handleTimeConfirm}
                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-6 rounded-xl font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Confirm Time
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDateTimePicker;