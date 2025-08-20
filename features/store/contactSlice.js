
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: null,
	message: '',
	data: {
		id: '',
		title: '',
		slug: '',
		template: '',
		meta: {
			meta_title: '',
			meta_author: '',
			meta_description: '',
			meta_keywords: '',
			meta_feature_image: '',
		},
		content: {
			contact_us_page: {
				title: '',
				description: '',
				image: '',
				quick_help: [],
				side_banner: '',
				title_two: '',
				description_two: '',
				button_name: '',
			},
		},
	},
};

const contactSlice = createSlice({
	name: 'contact',
	initialState,
	reducers: {
		setContactData: (state, action) => {
			state.status = action.payload.status;
			state.message = action.payload.message;
			state.data = action.payload.data;
		},
		clearContactData: (state) => {
			state.status = null;
			state.message = '';
			state.data = initialState.data;
		},
	},
});

export const { setContactData, clearContactData } = contactSlice.actions;
export default contactSlice.reducer;
