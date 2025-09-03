import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Circle as CircleX, Wrench, AlertCircle, X, Calendar, Clock, PlusCircle as CirclePlus, Eye, Download, FolderOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from 'react-hot-toast';
import { 
  fetchUpcomingBookings, 
  fetchPastBookings, 
  cancelBookingAction,
  rescheduleBookingAction
} from '../../../features/store/BookingList.js';
import ProfessionalDateTimePicker from "../../book-test/ProfessionalDateTimePicker";
import { MdOutlineBackspace } from "react-icons/md";

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  type,
  bookingDetails,
  loading,
  dateTimeData,
  setDateTimeData 
}) => {
  if (!isOpen) return null;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef(null);
  const timePickerRef = useRef(null);
  const [validationErrors, setValidationErrors] = useState({});

  const isCancel = type === 'cancel';
  const isReschedule = type === 'reschedule';

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[20px] max-w-md w-full mx-4 __cardShadow">
        {/* Header */}
        <div className={`${isCancel ? 'bg-[#ec098d]' : '__primary-bg'} text-white px-6 py-4 rounded-t-[20px] flex justify-between items-center`}>
          <div className="flex items-center gap-3">
            {isCancel ? (
              <MdOutlineBackspace className="w-5 h-5" />
            ) : (
              <Wrench className="w-5 h-5" />
            )}
            <h3 className="font-semibold">
              {isCancel ? 'Cancel Booking' : 'Reschedule Booking'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isCancel ? (
            <>
              {/* Warning Icon */}
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 rounded-full p-3">
                  <AlertCircle className="w-8 h-8 text-[#ec098d]" />
                </div>
              </div>

              {/* Message */}
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Are you sure you want to cancel this booking?
                </h4>
                <p className="text-gray-600 text-sm">
                  This action cannot be undone. You will need to book again if you change your mind.
                </p>
              </div>

              {/* Booking Details */}
              {bookingDetails && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h5 className="font-medium text-gray-900 mb-2">Booking Details:</h5>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{bookingDetails.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{bookingDetails.time}</span>
                    </div>
                    <div className="font-medium">
                      {bookingDetails.testName}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Title */}
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-gray-900">
                  Reschedule Booking
                </h4>
                {bookingDetails?.testName && (
                  <p className="text-gray-600 mt-1">
                    {bookingDetails.testName}
                  </p>
                )}
              </div>
              
              {/* Date Time Picker */}
              <div className="mb-6">
                <ProfessionalDateTimePicker
                  dateTimeData={dateTimeData}
                  setDateTimeData={setDateTimeData}
                  showDatePicker={showDatePicker}
                  setShowDatePicker={setShowDatePicker}
                  showTimePicker={showTimePicker}
                  setShowTimePicker={setShowTimePicker}
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                  datePickerRef={datePickerRef}
                  timePickerRef={timePickerRef}
                  validationErrors={validationErrors}
                  setValidationErrors={setValidationErrors}
                  isClient={true}
                />
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              Keep Booking
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className={`flex-1 px-4 py-3 text-white rounded-lg font-medium transition-colors disabled:opacity-50 ${
                isCancel 
                  ? 'bg-[#ec098d] hover:bg-[#d1077c]' 
                  : '__primary-bg hover:opacity-90'
              }`}
            >
              {loading ? 'Processing...' : isCancel ? 'Yes, Cancel' : 'Yes, Reschedule'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestsSection = () => {
  const dispatch = useDispatch();
  const { upcomingBookings, pastBookings, loading, error, data } = useSelector((state) => state.bookings);
  
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    bookingDetails: null,
    bookingId: null
  });

  const [modalDateTime, setModalDateTime] = useState({ date: "", timeSlot: "", timeDisplay: "" });

  // Separate pagination states for upcoming and past bookings
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);

  useEffect(() => {
    // Fetch both upcoming and past bookings on component mount
    dispatch(fetchUpcomingBookings({ page: upcomingPage, limit: 10 }));
    dispatch(fetchPastBookings({ page: pastPage, limit: 10 }));
  }, [dispatch, upcomingPage, pastPage]);

  const formatPackageNames = (packages) => {
    if (!packages || packages.length === 0) return "N/A";
    return packages.map(pkg => pkg.package_name).join(", ");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    // Convert HH:mm:ss to HH:mm for display
    const timeParts = timeString.split(':');
    const formattedTime = `${timeParts[0]}:${timeParts[1]}`;
    const time = new Date(`2000-01-01T${formattedTime}`);
    return time.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const openModal = (type, booking) => {
    // Initialize modalDateTime with current booking date and time for reschedule
    const dateTime = type === 'reschedule' ? {
      date: booking.schedule_date, // e.g., "2025-09-03"
      timeSlot: booking.schedule_time.slice(0, 5), // Convert "01:00:00" to "01:00"
      timeDisplay: formatTime(booking.schedule_time) // Formatted for display
    } : { date: "", timeSlot: "", timeDisplay: "" };

    setModalDateTime(dateTime);
    
    setModalState({
      isOpen: true,
      type: type,
      bookingId: booking.id,
      bookingDetails: {
        testName: formatPackageNames(booking.packages),
        date: formatDate(booking.schedule_date),
        time: formatTime(booking.schedule_time)
      }
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      bookingDetails: null,
      bookingId: null
    });
    setModalDateTime({ date: "", timeSlot: "", timeDisplay: "" });
  };

  const handleConfirm = async () => {
    if (modalState.type === 'cancel') {
      const reason = "Emergency came up, need to reschedule later";
      const result = await dispatch(cancelBookingAction(modalState.bookingId, reason));
      if (result.success) {
        toast.success('Booking cancelled successfully!');
        setUpcomingPage(1); // Reset to page 1
        dispatch(fetchUpcomingBookings({ page: 1, limit: 10 }));
        closeModal();
      } else {
        toast.error(`Failed to cancel booking: ${result.error || 'Unknown error'}`);
      }
    } else if (modalState.type === 'reschedule') {
      try {
        // Validate that date and time are selected
        if (!modalDateTime.date || !modalDateTime.timeSlot) {
          toast.error("Please select both date and time for rescheduling");
          return;
        }

        const schedule_date = modalDateTime.date;
        // Ensure time is in HH:mm:ss format
        const schedule_time = `${modalDateTime.timeSlot}:00`;
        const assigned_technician_id = 0; // Default technician ID if none selected

        const result = await dispatch(rescheduleBookingAction(
          modalState.bookingId,
          schedule_date,
          schedule_time,
          assigned_technician_id
        ));

        if (result.success) {
          toast.success('Booking rescheduled successfully!');
          setUpcomingPage(1); // Reset to page 1 to ensure updated data
          await dispatch(fetchUpcomingBookings({ page: 1, limit: 10 }));
          closeModal();
        } else {
          toast.error(`Failed to reschedule booking: ${result.error || 'Unknown error'}`);
        }
      } catch (error) {
        toast.error(`Error rescheduling booking: ${error.message}`);
      }
    }
  };

  const handleRefresh = (type) => {
    if (type === 'upcoming') {
      setUpcomingPage(1); // Reset to page 1
      dispatch(fetchUpcomingBookings({ page: 1, limit: 10 }));
    } else {
      setPastPage(1); // Reset to page 1
      dispatch(fetchPastBookings({ page: 1, limit: 10 }));
    }
  };

  const handlePageChange = (type, page) => {
    if (type === 'upcoming') {
      setUpcomingPage(page);
      dispatch(fetchUpcomingBookings({ page, limit: 10 }));
    } else {
      setPastPage(page);
      dispatch(fetchPastBookings({ page, limit: 10 }));
    }
  };

  // Render pagination controls
  const renderPagination = (type, currentPage, totalPages) => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(type, i)}
          className={`px-3 py-1 mx-1 rounded-full ${currentPage === i ? 'bg-[#ec098d] text-white' : 'bg-gray-200 text-gray-700'} hover:bg-[#d1077c] hover:text-white transition-colors`}
          disabled={loading}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center py-4">
        <button
          onClick={() => handlePageChange(type, currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="px-3 py-1 mx-1 rounded-full bg-gray-200 text-gray-700 hover:bg-[#d1077c] hover:text-white transition-colors disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(type, currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="px-3 py-1 mx-1 rounded-full bg-gray-200 text-gray-700 hover:bg-[#d1077c] hover:text-white transition-colors disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  // Get the current pagination data based on booking type
  const getPaginationData = (type) => {
    if (!data.pagination) return { currentPage: 1, totalPages: 1 };
    
    return {
      currentPage: type === 'upcoming' ? upcomingPage : pastPage,
      totalPages: data.pagination.totalPages || 1
    };
  };

  return (
    <div className="px-4 md:px-22 space-y-6 __poppins-font">
      {/* Upcoming Bookings */}
      <div className="rounded-[20px] overflow-x-auto __cardShadow">
        <div className="__primary-bg text-white px-4 md:px-6 py-3 flex justify-between items-center">
          <h3 className="font-semibold">Upcoming Bookings</h3>
          <button 
            className="text-white hover:text-gray-200"
            onClick={() => handleRefresh('upcoming')}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
        <div>
          {upcomingBookings && upcomingBookings.length > 0 ? (
            <table className="w-full text-xs md:text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                    Test Name
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                    Date & Time
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                    Location
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {upcomingBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {formatPackageNames(booking.packages)}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {formatDate(booking.schedule_date)} ({formatTime(booking.schedule_time)})
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {booking.address
                        ? `${booking.address.street || ''}, ${booking.address.city || ''}`
                        : "N/A"}
                    </td>
                    <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          booking.booking_status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.booking_status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.booking_status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <a href="#" className="text-gray-900 text-left flex items-center gap-1">
                          <CirclePlus className="inline w-3.5 h-3.5 mr-1" />
                          Add a New Test
                        </a>
                        <button 
                          onClick={() => openModal('cancel', booking)}
                          className="text-gray-900 text-left hover:text-red-600 transition-colors"
                        >
                          <MdOutlineBackspace className="inline w-3.5 h-3.5 mr-1" />
                          Cancel Booking
                        </button>
                        <button 
                          onClick={() => openModal('reschedule', booking)}
                          className="text-gray-900 text-left hover:text-blue-600 transition-colors"
                        >
                          <Wrench className="inline w-3.5 h-3.5 mr-1" />
                          Reschedule
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-500">
              {loading ? 'Loading bookings...' : 'No upcoming bookings found'}
            </div>
          )}
        </div>
        {/* Pagination for Upcoming Bookings */}
        {renderPagination('upcoming', getPaginationData('upcoming').currentPage, getPaginationData('upcoming').totalPages)}
      </div>

      {/* Past Bookings */}
      <div className="bg-white rounded-[20px] overflow-x-auto __cardShadow">
        <div className="__primary-bg text-white px-4 md:px-6 py-3 flex justify-between items-center">
          <h3 className="font-semibold">Past Bookings</h3>
          <button 
            className="text-white hover:text-gray-200"
            onClick={() => handleRefresh('past')}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
        <div className="overflow-x-auto">
          {pastBookings && pastBookings.length > 0 ? (
            <table className="w-full text-xs md:text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                    Test Name
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                    Date Completed
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                    Report
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left font-medium text-gray-900 uppercase whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {pastBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {formatPackageNames(booking.packages)}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {formatDate(booking.schedule_date)}
                    </td>
                    <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {booking.booking_status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                      <span className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-4 h-4">
                          <FolderOpen className="w-4 h-4" />
                        </span>
                        {booking.report_pdf ? 'Available' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <button 
                          className="text-gray-900 text-left flex items-center gap-1"
                          disabled={!booking.report_pdf}
                        >
                          <Eye className="w-3 h-3" />
                          View Report
                        </button>
                        <button 
                          className="text-gray-900 text-left flex items-center gap-1"
                          disabled={!booking.report_pdf}
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                        <button className="text-gray-900 text-left">
                          Book Again
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-500">
              {loading ? 'Loading bookings...' : 'No past bookings found'}
            </div>
          )}
        </div>
        {/* Pagination for Past Bookings */}
        {renderPagination('past', getPaginationData('past').currentPage, getPaginationData('past').totalPages)}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        type={modalState.type}
        bookingDetails={modalState.bookingDetails}
        loading={loading}
        dateTimeData={modalDateTime}
        setDateTimeData={setModalDateTime}
      />
    </div>
  );
};

export default TestsSection;