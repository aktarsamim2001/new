import { createSlice } from '@reduxjs/toolkit'
import { service } from '../shared/_services/api_service'


const initialState = {
  data: null,
  isLoading: false,
};

const dynamicPageSlice = createSlice({
  name: 'dynamicPage',
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

export const { setPageData, setPageLoading, clearPageData } = dynamicPageSlice.actions
export default dynamicPageSlice.reducer

export const fetchPageData = ({slug}) => async (dispatch) => {
  dispatch(setPageLoading(true))
  try {
    const response = await service.homepage({slug})
    if (response) {
        console.log('Response:', response.data)
      dispatch(setPageData(response.data.data))
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    } else {
      console.log('Something went wrong')
    }
  } finally {
    dispatch(setPageLoading(false))
  }
}
