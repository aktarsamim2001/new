import { createSlice } from "@reduxjs/toolkit";
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
export const fetchUserProfile = () => async (dispatch) => {
	dispatch(setUserProfileLoading(null));
	try {
		const response = await service.userProfile();
		console.log("API response from service.userProfile:", response);
		if (response) {
			dispatch(setUserProfile(response.data));
		}
	} catch (error) {
		console.log("fetchUserProfile error:", error);
		dispatch(setUserProfileError(error.message || 'Something went wrong'));
	}
};
