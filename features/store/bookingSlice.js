
import { createSlice } from "@reduxjs/toolkit";
import { service } from "../shared/_services/api_service";

const initialState = {
	status: null,
	message: "",
	data: {
		address_id: null,
		package_ids: [],
		schedule_date: "",
		schedule_time: "",
		payment_method: "",
		terms_condition: false,
		coupon_code: "",
		remarks: ""  // optional
	},
	error: null,
};

const bookingSlice = createSlice({
	name: "booking",
	initialState,
	reducers: {
		setBookingData(state, action) {
			state.status = action.payload.status;
			state.message = action.payload.message;
			state.data = action.payload.data;
			state.error = null;
		},
		setBookingLoading(state, action) {
			state.status = action.payload;
		},
		setBookingError(state, action) {
			state.status = 0;
			state.error = action.payload;
		},
		resetBookingState(state) {
			Object.assign(state, initialState);
		},
	},
});

export const { setBookingData, setBookingLoading, setBookingError, resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;

// Thunk for booking creation
export const createBooking = (payload) => {
	return async (dispatch) => {
		dispatch(setBookingLoading(null));
		try {
			const response = await service.bookingForm(payload);
			if (response && response.data) {
				dispatch(setBookingData(response.data));
			}
		} catch (error) {
			dispatch(setBookingError(error.response?.data?.message || error.message || "Something went wrong"));
		}
	};
};
