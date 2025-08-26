"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FileText,
  Activity,
  Heart,
  Calendar,
  Download,
  Eye,
  Upload,
  Wrench,
  CirclePlus,
  BadgePlus,
  FolderOpen,
  CircleX,
  SquareUser,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import icon from "../../../public/user-dashboard/icon2 (3).png";
import SmartHealthFirstPreview from "./SmartHealthFirstPreview";
import HealthDashboard from "./HealthDashboard";
import {
  fetchUpcomingBookings,
  fetchPastBookings,
  loadMoreBookings,
} from "../../../features/store/BookingList.js";

const TestsSection = () => {
  const dispatch = useDispatch();
  const { upcomingBookings, pastBookings, loading, error, status, data } = useSelector((state) => state?.bookings);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  console.log("Bookings State:", { upcomingBookings,pagination: data.pagination });

  useEffect(() => {
    // Fetch both upcoming and past bookings on component mount
    dispatch(fetchUpcomingBookings({ page: 1, limit: 10 }));
    dispatch(fetchPastBookings({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleLoadMore = async (booking_type) => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    let nextPage;
    
    if (booking_type === "upcoming") {
      nextPage = upcomingPage + 1;
      await dispatch(loadMoreBookings({ 
        page: nextPage, 
        limit: 10, 
        booking_type: "upcoming" 
      }));
      setUpcomingPage(nextPage);
    } else {
      nextPage = pastPage + 1;
      await dispatch(loadMoreBookings({ 
        page: nextPage, 
        limit: 10, 
        booking_type: "past" 
      }));
      setPastPage(nextPage);
    }
    
    setLoadingMore(false);
  };

  const handleRefresh = () => {
    setUpcomingPage(1);
    setPastPage(1);
    dispatch(fetchUpcomingBookings({ page: 1, limit: 10 }));
    dispatch(fetchPastBookings({ page: 1, limit: 10 }));
  };
  
  return (
    <div className="px-4 md:px-22 space-y-6 __poppins-font">
      {/* Upcoming Bookings */}
      <div className="bg-white rounded-[20px] overflow-x-auto __cardShadow">
        <div className="__primary-bg text-white px-4 md:px-6 py-3 flex justify-between items-center">
          <h3 className="font-semibold">Upcoming Bookings</h3>
          <button
            onClick={() => dispatch(fetchUpcomingBookings({ page: 1, limit: 10 }))}
            className="text-white hover:text-gray-200"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Refresh"
            )}
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
                      {/* Show first package name, replace <br/> with space */}
                      {booking.packages && booking.packages.length > 0
                        ? booking.packages[0].package_name.replace(/<br\s*\/?>(\s*)?/gi, " ")
                        : "N/A"}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {/* Show schedule date and time */}
                      {booking.schedule_date} ({booking.schedule_time})
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {/* Show address */}
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
                        <button className="text-gray-900 text-left flex items-center gap-1">
                          <CirclePlus className="inline w-3.5 h-3.5 mr-1" />
                          Add a New Test
                        </button>
                        <button className="text-gray-900 text-left">
                          <CircleX className="inline w-3.5 h-3.5 mr-1" />
                          Cancel Booking
                        </button>
                        <button className="text-gray-900 text-left">
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
          <button
            onClick={() => dispatch(fetchPastBookings({ page: 1, limit: 10 }))}
            className="text-white hover:text-gray-200"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Refresh"
            )}
          </button>
        </div>
        <div className="overflow-x-auto">
          {pastBookings && pastBookings.length > 0 ? (
            <>
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
                        {booking.testName || booking.test_name || booking.name}
                      </td>
                      <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {booking.dateCompleted || booking.date_completed || booking.completed_at}
                      </td>
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {booking.status || "Completed"}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                        <span className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-4 h-4">
                            <FolderOpen className="w-4 h-4" />
                          </span>
                          {booking.report || "Ready"}
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
              
              {/* Load More Button */}
              {data.pagination && 
               data.pagination.currentPage < data.pagination.totalPages && (
                <div className="p-4 text-center border-t">
                  <button
                    onClick={() => handleLoadMore("past")}
                    disabled={loadingMore}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load More"
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No past bookings found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestsSection;