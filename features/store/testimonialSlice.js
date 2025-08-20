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
			review_testimonial: {
				reviews: []
			}
		}
	},
	error: null,
};

const testimonialSlice = createSlice({
	name: 'testimonial',
	initialState,
	reducers: {
		setTestimonialData(state, action) {
			state.status = action.payload.status;
			state.message = action.payload.message;
			state.data = action.payload.data;
		},
		setTestimonialLoading(state, action) {
			state.status = action.payload;
		},
		setTestimonialError(state, action) {
			state.status = 0;
			state.error = action.payload;
		},
	},
});

export const { setTestimonialData, setTestimonialLoading, setTestimonialError } = testimonialSlice.actions;
export default testimonialSlice.reducer;

// Thunk
export const fetchTestimonialData = ({ slug }) => {
	return async (dispatch) => {
		dispatch(setTestimonialLoading(null));
		try {
			const response = await service.homepage({ slug });
			if (response && response.data) {
				dispatch(setTestimonialData(response.data));
			}
		} catch (error) {
			dispatch(setTestimonialError(error.message || 'Something went wrong'));
		}
	};
};
