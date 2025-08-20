import { createSlice } from "@reduxjs/toolkit";
import { service } from "../shared/_services/api_service";

const initialState = {
	status: null,
	message: '',
	data: [],
	error: null,
};

const addressListSlice = createSlice({
	name: 'addressList',
	initialState,
	reducers: {
		setAddressListData(state, action) {
			state.status = action.payload.status;
			state.message = action.payload.message;
			state.data = action.payload.data;
			state.error = null;
		},
		setAddressListLoading(state, action) {
			state.status = action.payload;
		},
		setAddressListError(state, action) {
			state.status = 0;
			state.error = action.payload;
		},
		resetAddressListState(state) {
			Object.assign(state, initialState);
		},
	},
});

export const { setAddressListData, setAddressListLoading, setAddressListError, resetAddressListState } = addressListSlice.actions;
export default addressListSlice.reducer;

// Thunk for fetching address list
export const fetchAddressList = () => {
	return async (dispatch) => {
		dispatch(setAddressListLoading(null));
		try {
			const response = await service.addressDetails();
			if (response) {
				dispatch(setAddressListData(response.data));
			}
		} catch (error) {
			dispatch(setAddressListError(error.response?.data?.message || error.message || "Something went wrong"));
		}
	};
};
