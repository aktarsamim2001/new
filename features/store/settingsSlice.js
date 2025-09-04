import { createSlice } from '@reduxjs/toolkit';
import { service } from '../shared/_services/api_service';

const initialState = {
  status: null,
  message: '',
  data: {
    booking_taxes: [],
    footer_social_icon: [],
    id: '',
    logo: '',
    'fav-icon': '',
    phone: '',
    email: '',
    receiver_email: '',
    currency: '',
    head_scripts: null,
    body_scripts: null,
    footer_scripts: null,
    footer_description: '',
    copy_right: '',
    created_at: null,
    updated_at: null,
    deleted_at: null,
  },
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettingsData(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.data = action.payload.data;
    },
    setSettingsLoading(state, action) {
      state.status = action.payload;
    },
    setSettingsError(state, action) {
      state.status = 0;
      state.error = action.payload;
    },
  },
});

export const { setSettingsData, setSettingsLoading, setSettingsError } = settingsSlice.actions;
export default settingsSlice.reducer;

// Thunk
export const fetchSettings = () => async (dispatch) => {
  try {
    dispatch(setSettingsLoading(1));
    const response = await service.fetchSettings();
    dispatch(setSettingsData(response.data));
  } catch (error) {
    dispatch(setSettingsError(error.message));
  }
};
