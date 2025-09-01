import React, { useState } from "react";
import {
  CircleX,
  Wrench,
  AlertCircle,
  CheckCircle,
  X,
  Calendar,
  Clock,
  CirclePlus,
  Eye,
  Download,
  FolderOpen,
} from "lucide-react";

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  type, // 'cancel' or 'reschedule'
  bookingDetails 
}) => {
  if (!isOpen) return null;

  const isCancel = type === 'cancel';
  const isReschedule = type === 'reschedule';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[20px] max-w-md w-full mx-4 __cardShadow">
        {/* Header */}
        <div className={`${isCancel ? 'bg-[#ec098d]' : '__primary-bg'} text-white px-6 py-4 rounded-t-[20px] flex justify-between items-center`}>
          <div className="flex items-center gap-3">
            {isCancel ? (
              <CircleX className="w-5 h-5" />
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
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Warning Icon */}
          <div className="flex justify-center mb-4">
            <div className={`${isCancel ? 'bg-red-100' : 'bg-blue-100'} rounded-full p-3`}>
              <AlertCircle className={`w-8 h-8 ${isCancel ? 'text-[#ec098d]' : 'text-blue-600'}`} />
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {isCancel 
                ? 'Are you sure you want to cancel this booking?' 
                : 'Are you sure you want to reschedule this booking?'
              }
            </h4>
            <p className="text-gray-600 text-sm">
              {isCancel 
                ? 'This action cannot be undone. You will need to book again if you change your mind.'
                : 'You will be redirected to select a new date and time for your appointment.'
              }
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

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Keep Booking
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-3 text-white rounded-lg font-medium transition-colors ${
                isCancel 
                  ? 'bg-[#ec098d]' 
                  : '__primary-bg hover:opacity-90'
              }`}
            >
              {isCancel ? 'Yes, Cancel' : 'Yes, Reschedule'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Updated TestsSection with modal integration
const TestsSection = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'cancel' or 'reschedule'
    bookingDetails: null
  });

  // Mock data for demonstration
  const upcomingBookings = [
    {
      id: 1,
      packages: [{ package_name: "Complete Blood Count Test" }],
      schedule_date: "2025-09-15",
      schedule_time: "10:30 AM",
      address: { street: "123 Health St", city: "Kolkata" },
      booking_status: "Confirmed"
    },
    {
      id: 2,
      packages: [{ package_name: "Lipid Profile Test<br/>Thyroid Function Test" }],
      schedule_date: "2025-09-20",
      schedule_time: "2:00 PM",
      address: { street: "456 Medical Ave", city: "Kolkata" },
      booking_status: "Pending"
    }
  ];

  const pastBookings = [
    {
      id: 3,
      testName: "Diabetes Panel",
      dateCompleted: "2025-08-15",
      status: "Completed",
      report: "Available"
    },
    {
      id: 4,
      testName: "Vitamin D Test",
      dateCompleted: "2025-07-20",
      status: "Completed",
      report: "Available"
    }
  ];

  const openModal = (type, booking) => {
    setModalState({
      isOpen: true,
      type: type,
      bookingDetails: booking ? {
        testName: booking.packages?.[0]?.package_name?.replace(/<br\s*\/?>(\s*)?/gi, " ") || "N/A",
        date: booking.schedule_date,
        time: booking.schedule_time
      } : null
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      bookingDetails: null
    });
  };

  const handleConfirm = () => {
    if (modalState.type === 'cancel') {
      // Handle cancellation logic here
      console.log('Booking cancelled');
    } else if (modalState.type === 'reschedule') {
      // Handle reschedule logic here - redirect to booking page
      console.log('Redirecting to reschedule');
    }
    closeModal();
  };

  return (
    <div className="px-4 md:px-22 space-y-6 __poppins-font">
      {/* Upcoming Bookings */}
      <div className="bg-white rounded-[20px] overflow-x-auto __cardShadow">
        <div className="__primary-bg text-white px-4 md:px-6 py-3 flex justify-between items-center">
          <h3 className="font-semibold">Upcoming Bookings</h3>
          <button className="text-white hover:text-gray-200">
            Refresh
          </button>
        </div>
        <div className="overflow-x-auto w-full">
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
                      {booking.packages && booking.packages.length > 0
                        ? booking.packages[0].package_name.replace(/<br\s*\/?>(\s*)?/gi, " ")
                        : "N/A"}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {booking.schedule_date} ({booking.schedule_time})
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {booking.address
                        ? `${booking.address.street || ''}, ${booking.address.city || ''}`
                        : "N/A"}
                    </td>
                    <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          booking.booking_status === "Confirmed" || booking.booking_status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.booking_status === "Pending" || booking.booking_status === "pending"
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
                          <CircleX className="inline w-3.5 h-3.5 mr-1" />
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
              No upcoming bookings found
            </div>
          )}
        </div>
      </div>

      {/* Past Bookings */}
      <div className="bg-white rounded-[20px] overflow-x-auto __cardShadow">
        <div className="__primary-bg text-white px-4 md:px-6 py-3 flex justify-between items-center">
          <h3 className="font-semibold">Past Bookings</h3>
          <button className="text-white hover:text-gray-200">
            Refresh
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
                      {booking.testName}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {booking.dateCompleted}
                    </td>
                    <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                      <span className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-4 h-4">
                          <FolderOpen className="w-4 h-4" />
                        </span>
                        {booking.report}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <button className="text-gray-900 text-left flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          View Report
                        </button>
                        <button className="text-gray-900 text-left flex items-center gap-1">
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
              No past bookings found
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        type={modalState.type}
        bookingDetails={modalState.bookingDetails}
      />
    </div>
  );
};

// Demo Component with modal functionality
const TestsSectionDemo = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    bookingDetails: null
  });

  const upcomingBookings = [
    {
      id: 1,
      packages: [{ package_name: "Complete Blood Count Test" }],
      schedule_date: "2025-09-15",
      schedule_time: "10:30 AM",
      address: { street: "123 Health St", city: "Kolkata" },
      booking_status: "Confirmed"
    },
    {
      id: 2,
      packages: [{ package_name: "Lipid Profile Test<br/>Thyroid Function Test" }],
      schedule_date: "2025-09-20",
      schedule_time: "2:00 PM",
      address: { street: "456 Medical Ave", city: "Kolkata" },
      booking_status: "Pending"
    }
  ];

  const openModal = (type, booking) => {
    setModalState({
      isOpen: true,
      type: type,
      bookingDetails: booking ? {
        testName: booking.packages?.[0]?.package_name?.replace(/<br\s*\/?>(\s*)?/gi, " ") || "N/A",
        date: booking.schedule_date,
        time: booking.schedule_time
      } : null
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      bookingDetails: null
    });
  };

  const handleConfirm = () => {
    if (modalState.type === 'cancel') {
      alert('Booking cancelled successfully!');
    } else if (modalState.type === 'reschedule') {
      alert('Redirecting to reschedule page...');
    }
    closeModal();
  };

  return (
    <>
      <style>{`
        .__primary-bg {
          background: #00b8c1;
        }
        .__cardShadow {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .__poppins-font {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      
      <div className="px-4 md:px-22 space-y-6 __poppins-font bg-gray-50 min-h-screen py-8">

        {/* Upcoming Bookings */}
        <div className="bg-white rounded-[20px] overflow-x-auto __cardShadow">
          <div className="__primary-bg text-white px-4 md:px-6 py-3 flex justify-between items-center">
            <h3 className="font-semibold">Upcoming Bookings</h3>
            <button className="text-white hover:text-gray-200">
              Refresh
            </button>
          </div>
          <div className="overflow-x-auto w-full">
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
                      {booking.packages && booking.packages.length > 0
                        ? booking.packages[0].package_name.replace(/<br\s*\/?>(\s*)?/gi, " ")
                        : "N/A"}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {booking.schedule_date} ({booking.schedule_time})
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {booking.address
                        ? `${booking.address.street || ''}, ${booking.address.city || ''}`
                        : "N/A"}
                    </td>
                    <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          booking.booking_status === "Confirmed" || booking.booking_status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.booking_status === "Pending" || booking.booking_status === "pending"
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
                          <CircleX className="inline w-3.5 h-3.5 mr-1" />
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
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        type={modalState.type}
        bookingDetails={modalState.bookingDetails}
      />
    </>
  );
};

export default TestsSectionDemo;