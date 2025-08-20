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
			how_it_works: {
				title: '',
				description: '',
				image: '',
				banner_items: [],
				button_name: ''
			}
		}
	},
	error: null,
};

const howItWorkSlice = createSlice({
	name: 'howItWork',
	initialState,
	reducers: {
		setHowItWorkData(state, action) {
			state.status = action.payload.status;
			state.message = action.payload.message;
			state.data = action.payload.data;
		},
		setHowItWorkLoading(state, action) {
			state.status = action.payload;
		},
		setHowItWorkError(state, action) {
			state.status = 0;
			state.error = action.payload;
		},
	},
});

export const { setHowItWorkData, setHowItWorkLoading, setHowItWorkError } = howItWorkSlice.actions;
export default howItWorkSlice.reducer;

// Thunk
export const fetchHowItWorkData = ({ slug }) => {
	return async (dispatch) => {
		dispatch(setHowItWorkLoading(null));
		try {
			const response = await service.homepage({ slug });
			if (response && response.data) {
				dispatch(setHowItWorkData(response.data));
			}
		} catch (error) {
			dispatch(setHowItWorkError(error.message || 'Something went wrong'));
		}
	};
};
