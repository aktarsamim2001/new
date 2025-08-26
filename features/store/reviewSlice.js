import { createSlice } from "@reduxjs/toolkit";
import { service } from "../shared/_services/api_service";

const initialState = {
	status: null,
	message: "",
	data: {
		packages: [],
		pricing: null,
		coupon: null,
		summary: null,
	},
	loading: false,
	error: null,
};

const payReviewSlice = createSlice({
	name: "payment",
	initialState,
	reducers: {
		setPaymentLoading(state, action) {
			state.loading = action.payload;
		},
		setPaymentDetails(state, action) {
			state.status = action.payload.status;
			state.message = action.payload.message;
			state.data = action.payload.data;
			state.loading = false;
			state.error = null;
		},
		setPaymentError(state, action) {
			state.status = 0;
			state.error = action.payload;
			state.loading = false;
		},
		clearPaymentDetails(state) {
			return initialState;
		},
	},
});

export const {
	setPaymentLoading,
	setPaymentDetails,
	setPaymentError,
	clearPaymentDetails,
} = payReviewSlice.actions;

export default payReviewSlice.reducer;

// Thunk for fetching payment details
export const fetchPaymentDetails = (payload) => async (dispatch) => {
	try {
		dispatch(setPaymentLoading(true));
		const response = await service.paymentDetails(payload);
		if (response) {
			console.log("Payment details fetched successfully:", response);
			dispatch(setPaymentDetails(response.data));
		} else {
			dispatch(setPaymentError("No data in response"));
		}
	} catch (error) {
		dispatch(setPaymentError(error.message || "Something went wrong"));
	}
};
