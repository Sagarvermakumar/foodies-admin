import { createSlice } from "@reduxjs/toolkit";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
} from "./couponAction";

const initialState = {
  couponList: null,
  error: null,
  currentCoupon: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
    hasNextPage: false,
    hasPrevPage: false > 1,
  },
  loading: {
    get: false,
    create: false,
    update: false,
    delete: false,
    getById: false,
  },
};

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
        setCouponPage : (state,action)=>{
          state.pagination.page = action.payload
        }
  },
  extraReducers: (builder) => {
    builder
      // get all category of items
      .addCase(getAllCoupons.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.loading.get = false;
        state.couponList = action.payload.data;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.loading.get = false;
        state.error = action.payload;
      })
      // create a category
      .addCase(createCoupon.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading.create = false;
        state.couponList = [action.payload.data, ...(state.couponList || [])];
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
      })
      // update category details
      .addCase(updateCoupon.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.loading.update = false;
        state.couponList = state.couponList?.map((coupon) =>
          coupon._id === action.payload.data._id
            ? action.payload.data
            : coupon
        );
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload || "Failed to update Coupon";
      })
      // delete
      .addCase(deleteCoupon.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.couponList = state.couponList.filter(
          (category) => category._id !== action.payload.data._id
        );
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
      })
      .addCase(getCouponById.pending, (state) => {
        state.loading.getById = true;
      })
      .addCase(getCouponById.fulfilled, (state, action) => {
        state.loading.getById = false;
        state.currentCoupon = action.payload.data;
      })
      .addCase(getCouponById.rejected, (state, action) => {
        state.loading.getById = false;
        state.error = action.payload;
      });
  },
});

export const {setCouponPage} = couponSlice.reducer
export default couponSlice.reducer;
