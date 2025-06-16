import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingStatus: false,
  token: localStorage.getItem("accessToken") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  profileData: JSON.parse(localStorage.getItem("profileData") || "[]"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logoutUser: (state) => {
      state.token = "";
      state.isAuthenticated = false;
      state.profileData = [];
      state.token = null;
    },
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
