import { createSlice } from '@reduxjs/toolkit';
import { service } from '../shared/_services/api_service';

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
			meta_feature_image: ''
		},
		content: {
			about_page: {
				title: '',
				description: '',
				button_name: '',
				image: '',
				featured_items: [],
				status: '',
				descriptions: [],
				image_two: '',
				image_three: '',
				image_four: '',
				image_five: '',
				title_two: '',
				description_two: '',
				title_three: '',
				description_three: '',
				button_name_three: '',
				title_four: '',
				title_five: '',
				description_five: '',
				button_name_five: ''
			}
		}
	},
	error: null,
};

const aboutSlice = createSlice({
	name: 'about',
	initialState,
	reducers: {
		setAboutData(state, action) {
			state.status = action.payload.status;
			state.message = action.payload.message;
			state.data = action.payload.data;
		},
		setAboutLoading(state, action) {
			state.status = action.payload;
		},
		setAboutError(state, action) {
			state.status = 0;
			state.error = action.payload;
		},
	},
});

export const { setAboutData, setAboutLoading, setAboutError } = aboutSlice.actions;
export default aboutSlice.reducer;

// Thunk
export const fetchAboutData = ({ slug }) => {
	return async (dispatch) => {
		dispatch(setAboutLoading(null));
		try {
			const response = await service.homepage({ slug });
			if (response && response.data) {
				dispatch(setAboutData(response.data));
			}
		} catch (error) {
			dispatch(setAboutError(error.message || 'Something went wrong'));
		}
	};
};
