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
      home_page: {
        slides: [],
        title: '',
        description: '',
        image: '',
        title_two: '',
        description_two: '',
        button_name: '',
        button_url: '',
        what_you_can_do_items: [],
        button_name_three: null,
        title_three: '',
        description_three: '',
        how_it_works_content_items: [],
        title_four: '',
        description_four: '',
        button_name_four: '',
        image_four: ''
      },
      selected_packages_details: []
    }
  },
  error: null,
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setHomeData(state, action) {
      state.status = action.payload.status
      state.message = action.payload.message
      state.data = action.payload.data
    },
    setHomeLoading(state, action) {
      state.status = action.payload
    },
    setHomeError(state, action) {
      state.status = 0
      state.error = action.payload
    },
  },
})

export const { setHomeData, setHomeLoading, setHomeError } = homeSlice.actions
export default homeSlice.reducer

// Thunk
export const fetchHomeData = ({ slug }) => {
  return async (dispatch) => {
    dispatch(setHomeLoading(null))
    try {
      const response = await service.homepage({ slug })
      console.log(response.data)
      if (response && response.data) {
        dispatch(setHomeData(response.data))
      }
    } catch (error) {
      dispatch(setHomeError(error.message || 'Something went wrong'))
    }
  }
}
