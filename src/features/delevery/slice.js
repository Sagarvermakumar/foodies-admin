import { createSlice } from "@reduxjs/toolkit";
import { getAssignedOrders, markOrderDelivered, markOrderPicked } from "./action";

const initialState = {
  assignedOrdersList: null,
   pagination: {
      total:0,
      page:1,
      limit:10,
      pages: 0,
      hasNextPage: false,
      hasPrevPage: false > 1,
    },
  error: null,
  loading: {
    getAssignedOrders: false,
    markOrderPicked: false,
    markOrderDelivered: false,
    updateLocation: false,
  },
};

export const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get all assigned orders
      .addCase(getAssignedOrders.pending, (state) => {
        state.loading.getAssignedOrders = true;
      })
      .addCase(getAssignedOrders.fulfilled, (state, action) => {
        state.loading.getAssignedOrders = false;
        state.assignedOrdersList = action.payload.data;
        state.pagination = action.payload.pagination;
         console.log(action.payload)
      })
      .addCase(getAssignedOrders.rejected, (state, action) => {
        state.loading.getAssignedOrders = false;
        state.error = action.payload;
        console.log(action.payload)
      })
      // Mark order as picked
      .addCase(markOrderPicked.pending, (state) => {
        state.loading.markOrderPicked = true;
        state.error= null;
      })
      .addCase(markOrderPicked.fulfilled, (state, action) => {
        state.loading.markOrderPicked = false;
        const updated = action.payload.data;
        state.deliveryList = state.deliveryList.map((item) =>
          item._id === updated._id ? updated : item
        );
      })
      .addCase(markOrderPicked.rejected, (state, action) => {
        state.loading.markOrderPicked = false;
        state.error = action.payload || "Failed to Mark order as picked";
      })
      // Mark order as delivered
      .addCase(markOrderDelivered.pending, (state) => {
        state.loading.markOrderDelivered = true;
        state.error= null;
      })
      .addCase(markOrderDelivered.fulfilled, (state, action) => {
        state.loading.markOrderDelivered = false;
        const updated = action.payload.data;
        state.deliveryList = state.deliveryList.map((item) =>
          item._id === updated._id ? updated : item
        );
      })
      .addCase(markOrderDelivered.rejected, (state, action) => {
        state.loading.markOrderDelivered = false;
        state.error = action.payload || "Failed to mark order as delivered";
      })
     
  },
});



export default deliverySlice.reducer;