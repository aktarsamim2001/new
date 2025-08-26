import { createSlice } from "@reduxjs/toolkit";
import { service } from "../shared/_services/api_service";

const initialState = {
  status: null,
  message: "",
  data: {
    id: "",
    title: "",
    slug: "",
    template: "",
    meta: {
      meta_title: "",
      meta_author: "",
      meta_description: "",
      meta_keywords: "",
      meta_feature_image: "",
    },
    content: {
      privacy_policy_page: {
        main_title: "",
        main_description: "",
        items: [],
        short_note: "",
      },
    },
  },
  error: null,
};

const privacyPolicySlice = createSlice({
  name: "privacyPolicy",
  initialState,
  reducers: {
    setPrivacyPolicyData(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.data = action.payload.data;
    },
    setPrivacyPolicyLoading(state, action) {
      state.status = action.payload;
    },
    setPrivacyPolicyError(state, action) {
      state.status = 0;
      state.error = action.payload;
    },
  },
});

export const {
  setPrivacyPolicyData,
  setPrivacyPolicyLoading,
  setPrivacyPolicyError,
} = privacyPolicySlice.actions;
export default privacyPolicySlice.reducer;

// Thunk
export const fetchPrivacyPolicyData = ({ slug }) => {
  return async (dispatch) => {
    dispatch(setPrivacyPolicyLoading(null));
    try {
      const response = await service.homepage({ slug });
      if (response && response.data) {
        dispatch(setPrivacyPolicyData(response.data));
      }
    } catch (error) {
      dispatch(setPrivacyPolicyError(error.message || "Something went wrong"));
    }
  };
};
