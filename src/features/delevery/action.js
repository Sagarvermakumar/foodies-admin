import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAssignedOrdersApi, markOrderDeliveredApi, markOrderPickedApi, updateLocationApi } from "./api";


// get all delivery of items
export const getAssignedOrders = createAsyncThunk(
  "/delivery/assigned",
  async (_, thunkAPI) => {
    try {
      const res = await getAssignedOrdersApi();
      return res.data;
    } catch (error) {
      console.error(`Failed to fetch categories ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to fetch assigned delivery `
      );
    }
  }
);

//mark order as pick from delivery agent
export const markOrderPicked = createAsyncThunk(
  "/delivery/update",
  async (id, thunkAPI) => {
    try {
      const res = await markOrderPickedApi(id);
      return res.data;
    } catch (error) {
      console.error(`Failed to mark order as pick ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to update delivery `
      );
    }
  }
);

//mark order as pick from delivery agent
export const markOrderDelivered = createAsyncThunk(
  "/delivery/delivered",
  async (id, thunkAPI) => {
    try {
      const res = await markOrderDeliveredApi(id);
      return res.data;
    } catch (error) {
      console.error(`Failed to mark order as delivered ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to mark order as delivered `
      );
    }
  }
);
// update user current location from delivery agent
export const updateLocation = createAsyncThunk(
  "/delivery/location",
  async ({ orderId, coordinates }, thunkAPI) => {
    try {
      const res = await updateLocationApi({ orderId, coordinates });
      return res.data;
    } catch (error) {
      console.error(`Failed to update  customer location ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to update customer location `
      );
    }
  }
);