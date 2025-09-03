import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { service } from "../shared/_services/api_service";
import toast from "react-hot-toast";

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

export function getOTP(payload, callback) {
  return async function loginThunk(dispatch) {
    try {
      dispatch(setLoadingStatus(true));
      dispatch(setError(null));

      const response = await service.signin(payload);

      if (response) {
        toast.success(response.data.message);
        callback(true, response.data.message);
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error.message || "An error occurred";
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
      callback(false, errorMsg);
    } finally {
      dispatch(setLoadingStatus(false));
    }
  };
}

export function verifyOTP(payload, callback) {
  return async function loginThunk(dispatch) {
    try {
      dispatch(setLoadingStatus(true));
      dispatch(setError(null));

      const response = await service.verifyOTP(payload);

      if (response) {
        dispatch(
          setUser({
            token: response.data.token,
            profileData: response.data.data,
          })
        );

        callback(true, response.data);

        toast.success("OTP verified successfully!");
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error.message || "An error occurred";
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
    } finally {
      dispatch(setLoadingStatus(false));
    }
  };
}
