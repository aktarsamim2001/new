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
			our_partner: {
				partners: []
			}
		}
	},
	error: null,
};

const brandSlice = createSlice({
	name: 'brand',
	initialState,
	reducers: {
		setBrandData(state, action) {
			state.status = action.payload.status;
			state.message = action.payload.message;
			state.data = action.payload.data;
		},
		setBrandLoading(state, action) {
			state.status = action.payload;
		},
		setBrandError(state, action) {
			state.status = 0;
			state.error = action.payload;
		},
	},
});

export const { setBrandData, setBrandLoading, setBrandError } = brandSlice.actions;
export default brandSlice.reducer;

// Thunk
export const fetchBrandData = ({ slug }) => {
	return async (dispatch) => {
		dispatch(setBrandLoading(null));
		try {
			const response = await service.homepage({ slug });
			if (response && response.data) {
				dispatch(setBrandData(response.data));
			}
		} catch (error) {
			dispatch(setBrandError(error.message || 'Something went wrong'));
		}
	};
};
