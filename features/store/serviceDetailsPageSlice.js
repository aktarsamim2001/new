import { createSlice } from '@reduxjs/toolkit';
import { service } from '../shared/_services/api_service';

const initialState = {
  status: null,
  message: '',
  data: {
    id: '',
    name: '',
    description: '',
    image: '',
    test_measures: [],
    why_you_should_take_it: [],
    meta_title: '',
    meta_keywords: '',
    meta_description: '',
  },
  error: null,
};

const serviceDetailsPageSlice = createSlice({
  name: 'serviceDetailsPage',
  initialState,
  reducers: {
    setServiceDetailsPageData(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.data = action.payload.data;
    },
    setServiceDetailsPageLoading(state, action) {
      state.status = action.payload;
    },
    setServiceDetailsPageError(state, action) {
      state.status = 0;
      state.error = action.payload;
    },
  },
});

export const { setServiceDetailsPageData, setServiceDetailsPageLoading, setServiceDetailsPageError } = serviceDetailsPageSlice.actions;
export default serviceDetailsPageSlice.reducer;

// Thunk
export const fetchServiceDetailsPageData = (payload) => {
  return async (dispatch) => {
    dispatch(setServiceDetailsPageLoading(null));
    try {
      const response = await service.serviceDetails(payload);
      if (response && response.data) {
        dispatch(setServiceDetailsPageData(response.data));
      }
    } catch (error) {
      dispatch(setServiceDetailsPageError(error.message || 'Something went wrong'));
    }
  };
};
