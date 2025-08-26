// store/slice/cmsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { service } from "../../features/shared/_services/api_service";

const initialState = {
  data: null,
  isLoading: false,
};

const cmsSlice = createSlice({
  name: "cms",
  initialState,
  reducers: {
    setPageData(state, action) {
      state.data = action.payload;
    },
    setPageLoading(state, action) {
      state.isLoading = action.payload;
    },
    clearPageData(state) {
      state.data = null;
      state.isLoading = true;
    },
  },
});

export const { setPageData, setPageLoading, clearPageData } = cmsSlice.actions;
export default cmsSlice.reducer;

export const fetchPageDataThunk = ({ slug }) => async (dispatch) => {
  dispatch(setPageLoading(true));
  try {
    const response = await service.homepage({ slug });
    if (response?.data?.data) {
      dispatch(setPageData(response.data.data));
    }
  } catch (error) {
    console.error(error.message || "Something went wrong");
  } finally {
    dispatch(setPageLoading(false));
  }
};