import { createSlice } from "@reduxjs/toolkit";
import { service } from "../shared/_services/api_service";

const initialState = {
  status: null,
  message: "",
  data: {
    bookings: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      limit: 10,
      totalCount: 0,
    },
  },
  upcomingBookings: [],
  pastBookings: [],
  currentBookingType: "past",
  loading: false,
  error: null,
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookingsData(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.data = action.payload.data;
      state.currentBookingType = action.payload.booking_type || state.currentBookingType;

      // Always update both arrays if data present
      if (action.payload.booking_type === "upcoming" || !action.payload.booking_type) {
        state.upcomingBookings = action.payload.data.bookings || [];
      }
      if (action.payload.booking_type === "past" || !action.payload.booking_type) {
        state.pastBookings = action.payload.data.bookings || [];
      }
      // Always update pagination if present
      if (action.payload.data && action.payload.data.pagination) {
        state.data.pagination = action.payload.data.pagination;
      }
      state.loading = false;
      state.error = null;
    },
    setBookingsLoading(state, action) {
      state.loading = action.payload;
      state.status = null;
      state.error = null;
    },
    setBookingsError(state, action) {
      state.status = 0;
      state.error = action.payload;
      state.loading = false;
    },
    appendBookingsData(state, action) {
      // For pagination - append new bookings to existing ones
      const bookingType = action.payload.booking_type;
      const newBookings = action.payload.data.bookings || [];
      
      if (bookingType === "upcoming") {
        state.upcomingBookings = [...state.upcomingBookings, ...newBookings];
      } else if (bookingType === "past") {
        state.pastBookings = [...state.pastBookings, ...newBookings];
      }
      
      state.data.pagination = action.payload.data.pagination;
      state.loading = false;
    },
    clearBookingsData(state, action) {
      const bookingType = action.payload;
      if (bookingType === "upcoming") {
        state.upcomingBookings = [];
      } else if (bookingType === "past") {
        state.pastBookings = [];
      } else {
        // Clear all
        state.upcomingBookings = [];
        state.pastBookings = [];
      }
      state.data.pagination = {
        currentPage: 1,
        totalPages: 1,
        limit: 10,
        totalCount: 0,
      };
    },
    removeBookingFromState(state, action) {
      const { bookingId, bookingType } = action.payload;
      if (bookingType === "upcoming") {
        state.upcomingBookings = state.upcomingBookings.filter(booking => booking.id !== bookingId);
      } else if (bookingType === "past") {
        state.pastBookings = state.pastBookings.filter(booking => booking.id !== bookingId);
      }
    }
  },
});

export const {
  setBookingsData,
  setBookingsLoading,
  setBookingsError,
  appendBookingsData,
  clearBookingsData,
  removeBookingFromState,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;

// Thunks
export const fetchBookingsData = ({ page = 1, limit = 10, booking_type = "past" }) => {
  return async (dispatch) => {
    dispatch(setBookingsLoading(true));
    try {
      const response = await service.bookings({ page, limit, booking_type });
      if (response && response.data) {
        dispatch(setBookingsData({
          ...response.data,
          booking_type
        }));
      }
    } catch (error) {
      dispatch(setBookingsError(error.message || "Something went wrong"));
    }
  };
};

export const fetchUpcomingBookings = ({ page = 1, limit = 10 }) => {
  return fetchBookingsData({ page, limit, booking_type: "upcoming" });
};

export const fetchPastBookings = ({ page = 1, limit = 10 }) => {
  return fetchBookingsData({ page, limit, booking_type: "past" });
};

export const loadMoreBookings = ({ page, limit = 10, booking_type = "past" }) => {
  return async (dispatch) => {
    dispatch(setBookingsLoading(true));
    try {
      const response = await service.bookings({ page, limit, booking_type });
      if (response && response.data) {
        dispatch(appendBookingsData({
          ...response.data,
          booking_type
        }));
      }
    } catch (error) {
      dispatch(setBookingsError(error.message || "Something went wrong"));
    }
  };
};

export const cancelBookingAction = (bookingId, reason = "Emergency came up, need to reschedule later") => {
  return async (dispatch) => {
    dispatch(setBookingsLoading(true));
    try {
      await service.cancelBooking(bookingId, reason);
      // Remove from upcoming and add to past bookings
      dispatch(removeBookingFromState({ bookingId, bookingType: "upcoming" }));
      // Refresh both lists to ensure proper state
      dispatch(fetchUpcomingBookings({ page: 1, limit: 10 }));
      dispatch(fetchPastBookings({ page: 1, limit: 10 }));
      dispatch(setBookingsLoading(false));
      return { success: true };
    } catch (error) {
      dispatch(setBookingsError(error?.response?.data?.message || error.message || "Failed to cancel booking"));
      return { success: false, error: error?.response?.data?.message || error.message };
    }
  };
};

export const rescheduleBookingAction = (bookingId, schedule_date, schedule_time, assigned_technician_id = 0) => {
  return async (dispatch) => {
    dispatch(setBookingsLoading(true));
    try {
      await service.rescheduleBooking(bookingId, schedule_date, schedule_time, Number(assigned_technician_id));
      dispatch(setBookingsLoading(false));
      // Refresh bookings after reschedule to get updated lists
      dispatch(fetchUpcomingBookings({ page: 1, limit: 10 }));
      dispatch(fetchPastBookings({ page: 1, limit: 10 }));
      return { success: true };
    } catch (error) {
      dispatch(setBookingsError(error?.response?.data?.message || error.message || "Failed to reschedule booking"));
      return { success: false, error: error?.response?.data?.message || error.message };
    }
  };
};