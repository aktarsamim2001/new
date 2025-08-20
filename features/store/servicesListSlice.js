import { createSlice } from '@reduxjs/toolkit';
import { service } from '../shared/_services/api_service';

const initialState = {
  status: null,
  message: '',
  data: {
    currentPage: 1,
    perPage: 10,
    total: 0,
    totalPages: 0,
    packages: [],
    packageCategories: [],
  },
  error: null,
};

const servicesListSlice = createSlice({
  name: 'servicesList',
  initialState,
  reducers: {
    setServicesListData(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message || '';
      state.data = {
        currentPage: action.payload.currentPage,
        perPage: action.payload.perPage,
        total: action.payload.total,
        totalPages: action.payload.totalPages,
        packages: action.payload.packages,
        packageCategories: action.payload.packageCategories || [],
      };
    },
    setServicesListLoading(state, action) {
      state.status = action.payload;
    },
    setServicesListError(state, action) {
      state.status = 0;
      state.error = action.payload;
    },
  },
});

export const { setServicesListData, setServicesListLoading, setServicesListError } = servicesListSlice.actions;
export default servicesListSlice.reducer;

// Thunk
export const fetchServicesList = (payload) => {
  return async (dispatch) => {
    dispatch(setServicesListLoading(null));
    try {
      const response = await service.serviceList(payload);
      if (response && response.data) {
        dispatch(setServicesListData(response.data));
      }
    } catch (error) {
      dispatch(setServicesListError(error.message || 'Something went wrong'));
    }
  };
};
