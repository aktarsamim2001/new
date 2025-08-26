import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { service } from "../shared/_services/api_service";
import toast from "react-hot-toast";

const initialState = {
  loadingStatus: false,
  uploadReportData: [],
  error: null,
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setLoadingStatus: (state, action) => {
      state.loadingStatus = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    setReport: (state, action) => {
      state.uploadReportData = action.payload;
    },
  },
});

export const { setLoadingStatus, setError, setReport } = reportSlice.actions;

export default reportSlice.reducer;
