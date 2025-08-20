import { createSlice } from '@reduxjs/toolkit';
import { service } from '../shared/_services/api_service';

const initialState = {
  status: null,
  message: '',
  data: {
    id: '',
    title: '',
    slug: '',
    template: '',
    meta: {
      meta_title: '',
      meta_author: '',
      meta_description: '',
      meta_keywords: '',
      meta_feature_image: ''
    },
    content: {
      service_details: {
        title: '',
        description: '',
        button_name: '',
        button_name_two: '',
        title_two: '',
        description_two: '',
        how_it_works_content_items: [],
        slide_title: '',
        slide_description: '',
        button_name_three: '',
        image: ''
      }
    }
  },
  error: null,
};

const serviceDetailsSlice = createSlice({
  name: 'serviceDetails',
  initialState,
  reducers: {
    setServiceDetailsData(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.data = action.payload.data;
    },
    setServiceDetailsLoading(state, action) {
      state.status = action.payload;
    },
    setServiceDetailsError(state, action) {
      state.status = 0;
      state.error = action.payload;
    },
  },
});

export const { setServiceDetailsData, setServiceDetailsLoading, setServiceDetailsError } = serviceDetailsSlice.actions;
export default serviceDetailsSlice.reducer;

// Thunk
export const fetchServiceDetailsData = ({ slug }) => {
  return async (dispatch) => {
    dispatch(setServiceDetailsLoading(null));
    try {
      const response = await service.homepage({ slug });
      if (response && response.data) {
        dispatch(setServiceDetailsData(response.data));
      }
    } catch (error) {
      dispatch(setServiceDetailsError(error.message || 'Something went wrong'));
    }
  };
};
