import { Calendar, Clock, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const ProfessionalDateTimePicker = ({
  dateTimeData,
  setDateTimeData,
  showDatePicker,
  setShowDatePicker,
  showTimePicker,
  setShowTimePicker,
  currentMonth,
  setCurrentMonth,
  datePickerRef,
  timePickerRef,
  isClient,
  validationErrors,
  setValidationErrors
}) => {
  if (!isClient) return null;

  // Time slots data
  const timeSlots = [
    { value: "09:00-10:00", label: "09:00 - 10:00 AM", available: true },
    { value: "10:00-11:00", label: "10:00 - 11:00 AM", available: true },
    { value: "11:00-12:00", label: "11:00 - 12:00 PM", available: false },
    { value: "12:00-13:00", label: "12:00 - 01:00 PM", available: true },
    { value: "14:00-15:00", label: "02:00 - 03:00 PM", available: true },
    { value: "15:00-16:00", label: "03:00 - 04:00 PM", available: true },
    { value: "16:00-17:00", label: "04:00 - 05:00 PM", available: false },
    { value: "17:00-18:00", label: "05:00 - 06:00 PM", available: true },
  ];

  // Utility functions
  // Format date as 'DD / MM / YYYY'
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
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

    // Get today's date at midnight
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    // Add all days of the month
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

  const handleTimeSelect = (timeSlot) => {
    if (timeSlot.available) {
      setDateTimeData(prev => ({ ...prev, timeSlot: timeSlot.value }));
      setShowTimePicker(false);
      setValidationErrors(prev => ({ ...prev, timeSlot: "" }));
    }
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const selectedTimeSlot = timeSlots.find(slot => slot.value === dateTimeData.timeSlot);

  return (
    <div className="space-y-6">
      {/* Date Picker */}
      <div className="lg:flex flex-row items-center gap-3">
        <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
          Date Schedule
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
              {/* Calendar Header */}
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

              {/* Calendar Grid */}
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

      {/* Time Picker */}
      <div className="lg:flex flex-row items-center gap-3">
        <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
          Select Time Slot
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
                    dateTimeData.timeSlot
                      ? "text-gray-800"
                      : "text-gray-500"
                  }`}
                >
                  {selectedTimeSlot
                    ? selectedTimeSlot.label
                    : "Choose your preferred time"}
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
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-pink-200 rounded-2xl shadow-2xl z-40 overflow-hidden max-h-80 overflow-y-auto">
              <div className="py-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.value}
                    type="button"
                    onClick={() => handleTimeSelect(slot)}
                    disabled={!slot.available}
                    className={`w-full px-6 py-4 text-left transition-all duration-200 flex items-center justify-between ${
                      dateTimeData.timeSlot === slot.value
                        ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white"
                        : slot.available
                        ? "hover:bg-pink-50 text-gray-700"
                        : "text-gray-400 cursor-not-allowed bg-gray-50"
                    }`}
                  >
                    <span className="font-medium">{slot.label}</span>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        slot.available
                          ? dateTimeData.timeSlot === slot.value
                            ? "bg-white bg-opacity-20 text-white"
                            : "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {slot.available ? "Available" : "Booked"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDateTimePicker;