import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { service } from "../shared/_services/api_service";

const initialState = {
  loadingStatus: false,
  token:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  isAuthenticated:
    typeof window !== "undefined" && !!localStorage.getItem("accessToken"),
  profileData:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("profileData") || "null")
      : null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setLoadingStatus: (state, action) => {
      state.loadingStatus = action.payload;
    },

    setUser: (state, action) => {
      const { token, profileData } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.profileData = profileData;

      Cookies.set("token", token, { expires: 7 });
      localStorage.setItem("accessToken", token);
      localStorage.setItem("profileData", JSON.stringify(profileData));
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    logoutUser: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("profileData");
      state.token = null;
      state.isAuthenticated = false;
      state.profileData = null;
      state.error = null;
    },
  },
});

export const { setLoadingStatus, setUser, setError, logoutUser } =
  authSlice.actions;

export default authSlice.reducer;

export function login(payload) {
  return async function loginThunk(dispatch) {
    try {
      dispatch(setLoadingStatus(true));

      const response = await service.signin(payload);

      if (response?.token && response?.profileData) {
        dispatch(
          setUser({
            token: response.token,
            profileData: response.profileData,
          }),
        );
      }
      dispatch(setLoadingStatus(false));
    } catch (error) {
      dispatch(setLoadingStatus(false));
      dispatch(setError(error.message || "Login failed"));
    }
  };
}
