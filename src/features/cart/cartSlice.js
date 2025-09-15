import { createSlice } from "@reduxjs/toolkit";
import { getUserCart } from "./cartAction";

const initialState = {
  cart: null,
  isCartLoading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCart.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.cart = action.payload.data;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        (state.isCartLoading = false), (state.error = action.payload);
        state.cart = null;
      });
  },
});
