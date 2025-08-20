// src/store/slice/faqSlice.js
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
      faq_page: {
        title: "",
        description: "",
        image: "",
        button_name: "",
        categories: [],
        image_two: "",
        title_two: "",
        description_two: "",
        button_name_two: "",
      },
    },
  },
  error: null,
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    setFaqData(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.data = action.payload.data;
    },
    setFaqLoading(state, action) {
      state.status = action.payload;
    },
    setFaqError(state, action) {
      state.status = 0;
      state.error = action.payload;
    },
  },
});

export const { setFaqData, setFaqLoading, setFaqError } = faqSlice.actions;
export default faqSlice.reducer;

// Thunk
export const fetchFaqData = ({ slug }) => {
  return async (dispatch) => {
    dispatch(setFaqLoading(null));
    try {
      const response = await service.homepage({ slug }); // same endpoint you’re using
      if (response) {
        dispatch(setFaqData(response.data));
      }
    } catch (error) {
      dispatch(setFaqError(error.message || "Something went wrong"));
    }
  };
};
