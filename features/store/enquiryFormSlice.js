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

const enquiryFormSlice = createSlice({
  name: "enquiryForm",
  initialState,
  reducers: {
    setEnquiryFormData(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.data = action.payload.data;
      state.error = null;
    },
    setEnquiryFormLoading(state, action) {
      state.status = action.payload; // usually `null` or `"loading"`
    },
    setEnquiryFormError(state, action) {
      state.status = 0;
      state.error = action.payload;
    },
    resetEnquiryFormState(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setEnquiryFormData,
  setEnquiryFormLoading,
  setEnquiryFormError,
  resetEnquiryFormState,
} = enquiryFormSlice.actions;

export default enquiryFormSlice.reducer;

export const submitEnquiryForm = (payload) => {
  return async (dispatch) => {
    dispatch(setEnquiryFormLoading(null));
    try {
      const response = await service.enquiryForm(payload);
      if (response) {
        dispatch(setEnquiryFormData(response.data));
      }
    } catch (error) {
      dispatch(
        setEnquiryFormError(error.response?.data?.message || error.message)
      );
    }
  };
};
