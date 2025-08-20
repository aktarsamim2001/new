import { createSlice } from '@reduxjs/toolkit';
import { service } from '../shared/_services/api_service';

const initialState = {
	status: null,
	message: '',
	data: {
		id: '',
		customer_id: '',
		name: '',
		email: '',
		email_verified_at: '',
		mobile: '',
		mobile_verified_at: '',
		profile_photo_path: '',
		is_verified: '',
		gender: '',
		dob: '',
		medical_history: '',
	},
	error: null,
};

const userProfileSlice = createSlice({
	name: 'userProfile',
	initialState,
	reducers: {
		setUserProfile(state, action) {
			state.status = action.payload.status;
			state.message = action.payload.message;
			state.data = action.payload.data;
		},
		setUserProfileLoading(state, action) {
			state.status = action.payload;
		},
		setUserProfileError(state, action) {
			state.status = 0;
			state.error = action.payload;
		},
	},
});

export const { setUserProfile, setUserProfileLoading, setUserProfileError } = userProfileSlice.actions;
export default userProfileSlice.reducer;

// Thunk for fetching user profile
export const fetchUserProfile = (payload) => async (dispatch) => {
	dispatch(setUserProfileLoading(null));
	try {
		// You need to implement the actual API call in api_service.js, e.g. service.userProfile(payload)
		const response = await service.userProfile(payload);
		if (response && response.data) {
			dispatch(setUserProfile(response.data));
		}
	} catch (error) {
		dispatch(setUserProfileError(error.message || 'Something went wrong'));
	}
};
