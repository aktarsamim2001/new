import { createSlice } from "@reduxjs/toolkit";
import { service } from "../shared/_services/api_service";
import toast from "react-hot-toast";

const initialState = {
  loadingStatus: false,
  error: null,
};

export const otpVerificationSlice = createSlice({
  name: "otpVerification",
  initialState,
  reducers: {
    setLoadingStatus: (state, action) => {
      state.loadingStatus = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoadingStatus, setError, clearError } = otpVerificationSlice.actions;

export default otpVerificationSlice.reducer;

// Thunk for verifying or resending OTP
export function verifyOrResendOtp(value, type, otp = "") {
  return async function verifyOrResendThunk(dispatch) {
    try {
      dispatch(setLoadingStatus(true));
      dispatch(clearError());

      const payload = {
        login_type: type,
        value: value,
        otp: otp
      };

      const response = await service.verifyOrResendOtp(payload);

      if (response && response.data.status === 1) {
        toast.success(response.data.message);
        return response.data;
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error.message || "An error occurred";
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
      throw error;
    } finally {
      dispatch(setLoadingStatus(false));
    }
  };
}
