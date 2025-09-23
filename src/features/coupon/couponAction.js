import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createCouponApi,
  deleteCouponApi,
  getAllCouponsApi,
  getCouponByIdApi,
  updateCouponApi,
} from './couponApi';

// get all coupon of items
export const getAllCoupons = createAsyncThunk(
  '/coupon/all',
  async ({ query, page, limit }, thunkAPI) => {
    try {
      const res = await getAllCouponsApi(query, page, limit );
      return res.data
    } catch (error) {
      console.error(`Failed to fetch coupons ${error.message}`)
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to fetch coupons `
      )
    }
  }
)
// create coupon
export const createCoupon = createAsyncThunk(
  '/coupon/create',
  async (data, thunkAPI) => {
    try {
      const res = await createCouponApi(data)
      return res.data
    } catch (error) {
      console.error(`Failed to create coupon ${error.message}`)
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to create coupon `
      )
    }
  }
)
//update coupon details
export const updateCoupon = createAsyncThunk(
  '/coupon/update',
  async (data, thunkAPI) => {
    const { couponId, ...couponData } = data

    try {
      const res = await updateCouponApi(couponId, couponData)
      return res.data
    } catch (error) {
      console.error(`Failed to update coupon ${error.message}`)
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to update coupon `
      )
    }
  }
)
// get all coupon of items
export const deleteCoupon = createAsyncThunk(
  '/coupon/delete',
  async (id, thunkAPI) => {
    try {
      const res = await deleteCouponApi(id)
      return res.data
    } catch (error) {
      console.error(`Failed to deleted coupon ${error.message}`)
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to delete coupon `
      )
    }
  }
)

export const getCouponById = createAsyncThunk(
  '/coupon/getById',
  async (id, thunkAPI) => {
    try {
      const res = await getCouponByIdApi(id)
      return res.data
    } catch (error) {
      console.error(`Failed to fetch coupon ${error.message}`)
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to fetch coupon `
      )
    }
  }
)
