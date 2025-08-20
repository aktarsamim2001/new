import { createSlice } from "@reduxjs/toolkit";
import { service } from "../shared/_services/api_service";

const initialState = {
  status: null,
  message: "",
  data: {
    id: "",
    full_name: "",
    gender: "",
    age: null,
    contact: "",
    address: "",
    remarks: "",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  error: null,
};

const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {
    setEnquiryData(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.data = action.payload.data;
      state.error = null;
    },
    setEnquiryLoading(state, action) {
      state.status = action.payload;
    },
    setEnquiryError(state, action) {
      state.status = 0;
      state.error = action.payload;
    },
    resetEnquiryState(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setEnquiryData,
  setEnquiryLoading,
  setEnquiryError,
  resetEnquiryState,
} = enquirySlice.actions;

export default enquirySlice.reducer;

// Thunk for submitting enquiry
export const submitEnquiry = ({ slug }) => {
  return async (dispatch) => {
    dispatch(setEnquiryLoading(null));
    try {
      const response = await service.homepage({ slug });
      if (response) {
        dispatch(setEnquiryData(response.data));
      }
    } catch (error) {
      dispatch(setEnquiryError(error.message || "Something went wrong"));
    }
  };
};
