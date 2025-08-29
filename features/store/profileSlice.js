import { createSlice } from "@reduxjs/toolkit";
import { service } from "../shared/_services/api_service";
import toast from "react-hot-toast";

const initialState = {
  loadingStatus: false,
  error: null,
  profileData: null,
  message: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setLoadingStatus: (state, action) => {
      state.loadingStatus = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },

    resetProfile: (state) => {
      state.loadingStatus = false;
      state.error = null;
      state.profileData = null;
      state.message = "";
    },
  },
});

export const { setLoadingStatus, setError, setProfileData, resetProfile } = profileSlice.actions;

// Async Actions
export const fetchProfileDetails = () => async (dispatch) => {
  try {
    dispatch(setLoadingStatus(true));
    const response = await service.userProfile();
    
    if (response.data.status === 1) {
      dispatch(setProfileData(response.data.data));
    } else {
      dispatch(setError(response.data.message));
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch(setError(error.message));
    toast.error(error.message);
  } finally {
    dispatch(setLoadingStatus(false));
  }
};

export const updateProfile = (payload) => async (dispatch) => {
  try {
    dispatch(setLoadingStatus(true));
    const response = await service.updateProfile(payload);
    
    if (response.data.status === 1) {
      dispatch(setProfileData(response.data.data));
      toast.success(response.data.message);
    } else {
      dispatch(setError(response.data.message));
      toast.error(response.data.message);
    }
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(setError(message));
    toast.error(message);
  } finally {
    dispatch(setLoadingStatus(false));
  }
};

export default profileSlice.reducer;
