import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserCartApi } from "./cartApi";



export const getUserCart = createAsyncThunk(
  "/cart/user/all",
  async (_, thunkAPI) => {
    try {
      const res = await getUserCartApi();
      return res.data;
    } catch (error) {
      console.error(`Failed to fetch user's Items ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to fetch user's Items ${error.message}`
      );
    }
  }
);