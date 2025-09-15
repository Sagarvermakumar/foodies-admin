import { createAsyncThunk } from "@reduxjs/toolkit";
import { pushNotificationApi, sendOrderNotificationApi } from "./api";


// get all category of items
export const pushNotification = createAsyncThunk(
  "/notification/push",
  async (data, thunkAPI) => {
    try {
      const res = await pushNotificationApi(data);
      return res.data;
    } catch (error) {
      console.error(`Failed to push notification ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to push notification `
      );
    }
  }
);
export const sendOrderNotification = createAsyncThunk(
  "/notification/order",
  async ({id,data}, thunkAPI) => {
    try {
      const res = await sendOrderNotificationApi(id,data);
      return res.data;
    } catch (error) {
      console.error(`Failed to send  ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to send! `
      );
    }
  }
);