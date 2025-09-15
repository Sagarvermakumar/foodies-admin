import { createSlice } from "@reduxjs/toolkit";
import { pushNotification, sendOrderNotification } from "./action";

const initialState = {
  loading: {
    notifyAll: false,
    notifyOrderStatus: false,
  },
  error: null,
};

export const cartSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // notify all users
      .addCase(pushNotification.pending, (state) => {
        state.loading.notifyAll = true;
      })
      .addCase(pushNotification.fulfilled, (state) => {
        state.loading.notifyAll = false;
      })
      .addCase(pushNotification.rejected, (state, action) => {
        (state.loading.notifyAll = false), (state.error = action.payload);
      })
    // notify user - Status
      .addCase(sendOrderNotification.pending, (state) => {
        state.loading.notifyOrderStatus = true;
      })
      .addCase(sendOrderNotification.fulfilled, (state) => {
        state.loading.notifyOrderStatus = false;
      })
      .addCase(sendOrderNotification.rejected, (state, action) => {
        (state.loading.notifyOrderStatus = false), (state.error = action.payload);
      })
  },
});
