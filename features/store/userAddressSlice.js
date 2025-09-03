import { createSlice } from "@reduxjs/toolkit";
import { service } from "../shared/_services/api_service";
import toast from "react-hot-toast";

const initialState = {
  status: null,
  message: "",
  data: {
    id: "",
    address_type: "",
    other_address_title: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  },
  loadingStatus: false,
  error: null,
};

export const userAddressSlice = createSlice({
  name: "userAddress",
  initialState,
  reducers: {
    setLoadingStatus: (state, action) => {
      state.loadingStatus = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.status = 0;
    },

    setAddressData: (state, action) => {
      state.data = action.payload.data;
      state.status = action.payload.status;
      state.message = action.payload.message;
    },

    resetAddress: (state) => {
      state.loadingStatus = false;
      state.error = null;
      state.data = initialState.data;
      state.status = null;
      state.message = "";
    },
  },
});

export const {
  setLoadingStatus,
  setError,
  setAddressData,
  resetAddress,
} = userAddressSlice.actions;

// Async Actions
export const createUserAddress = (addressData) => async (dispatch) => {
  dispatch(setLoadingStatus(true));
  try {
    const response = await service.createAddress(addressData);
    if (response.status === 1) {
      dispatch(setAddressData(response));
      toast.success(response.message);
      return response;
    }
  } catch (error) {
    dispatch(setError(error.message || "Something went wrong"));
    toast.error(error.message || "Something went wrong");
  } finally {
    dispatch(setLoadingStatus(false));
  }
};

export const updateUserAddress = (addressData) => async (dispatch) => {
  dispatch(setLoadingStatus(true));
  try {
    const response = await service.updateAddress(addressData);
    if (response.status === 1) {
      dispatch(setAddressData(response));
      toast.success(response.message);
      return response;
    }
  } catch (error) {
    dispatch(setError(error.message || "Something went wrong"));
    toast.error(error.message || "Something went wrong");
  } finally {
    dispatch(setLoadingStatus(false));
  }
};

export default userAddressSlice.reducer;
