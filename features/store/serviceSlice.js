import { createSlice } from '@reduxjs/toolkit'
import { service } from '../shared/_services/api_service'

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
      our_services: {
        title: '',
        description: '',
        Image: '',
        title_two: '',
        description_two: '',
        button_name: '',
        image_two: ''
      }
    }
  },
  error: null,
}

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setServiceData(state, action) {
      state.status = action.payload.status
      state.message = action.payload.message
      state.data = action.payload.data
    },
    setServiceLoading(state, action) {
      state.status = action.payload
    },
    setServiceError(state, action) {
      state.status = 0
      state.error = action.payload
    },
  },
})

export const { setServiceData, setServiceLoading, setServiceError } = serviceSlice.actions
export default serviceSlice.reducer

// Thunk
export const fetchServiceData = ({ slug }) => {
  return async (dispatch) => {
    dispatch(setServiceLoading(null))
    try {
      const response = await service.homepage({ slug })
      if (response && response.data) {
        dispatch(setServiceData(response.data))
      }
    } catch (error) {
      dispatch(setServiceError(error.message || 'Something went wrong'))
    }
  }
}
