import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: null,
	message: '',
	data: {
		created_at: '',
		updated_at: '',
		id: '',
		full_name: '',
		gender: '',
		age: '',
		contact: '',
		address: '',
		remarks: '',
		deleted_at: null,
	},
};

const enquiryFormSlice = createSlice({
	name: 'enquiryForm',
	initialState,
	reducers: {
		setEnquiryFormData: (state, action) => {
			state.status = action.payload.status;
			state.message = action.payload.message;
			state.data = action.payload.data;
		},
		clearEnquiryFormData: (state) => {
			state.status = null;
			state.message = '';
			state.data = initialState.data;
		},
	},
});

export const { setEnquiryFormData, clearEnquiryFormData } = enquiryFormSlice.actions;
export default enquiryFormSlice.reducer;