import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: null,
    message: "",
    data: {
        coupons: [],
        selectedCoupon: null
    },
    loading: false,
    error: null
};

const couponSlice = createSlice({
    name: "coupons",
    initialState,
    reducers: {
        setCouponLoading(state, action) {
            state.loading = action.payload;
        },
        setCouponData(state, action) {
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.data.coupons = action.payload.data;
            state.loading = false;
            state.error = null;
        },
        setSelectedCoupon(state, action) {
            state.data.selectedCoupon = action.payload;
        },
        setCouponError(state, action) {
            state.status = 0;
            state.error = action.payload;
            state.loading = false;
        },
        clearCouponData(state) {
            return initialState;
        }
    }
});

export const {
    setCouponLoading,
    setCouponData,
    setSelectedCoupon,
    setCouponError,
    clearCouponData
} = couponSlice.actions;

export default couponSlice.reducer;

// Thunk for fetching coupons
export const fetchCoupons = () => {
    return async (dispatch) => {
        dispatch(setCouponLoading(true));
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}api/web/coupons/list`
            );
            if (response.data.status === 1) {
                dispatch(setCouponData(response.data));
            } else {
                dispatch(setCouponError(response.data.message));
            }
        } catch (error) {
            dispatch(setCouponError(error.response?.data?.message || 'Failed to fetch coupons'));
        }
    };
};
