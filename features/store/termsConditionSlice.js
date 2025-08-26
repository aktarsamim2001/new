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
      terms_condition_page: {
        main_title: "",
        main_description: "",
        items: [],
      },
    },
  },
  error: null,
};

const termsConditionSlice = createSlice({
  name: "termsCondition",
  initialState,
  reducers: {
    setTermsConditionData(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.data = action.payload.data;
    },
    setTermsConditionLoading(state, action) {
      state.status = action.payload;
    },
    setTermsConditionError(state, action) {
      state.status = 0;
      state.error = action.payload;
    },
  },
});

export const {
  setTermsConditionData,
  setTermsConditionLoading,
  setTermsConditionError,
} = termsConditionSlice.actions;
export default termsConditionSlice.reducer;

// Thunk
export const fetchTermsConditionData = ({ slug }) => {
  return async (dispatch) => {
    dispatch(setTermsConditionLoading(null));
    try {
      const response = await service.homepage({slug});
      if (response && response.data) {
        dispatch(setTermsConditionData(response.data));
      }
    } catch (error) {
      dispatch(setTermsConditionError(error.message || "Something went wrong"));
    }
  };
};
