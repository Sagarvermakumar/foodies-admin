import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOutletApi, getAllOutletsApi, getOutletConfigApi, getOutletDetailsApi, updateOutletApi } from "./api";



export const getAllOutlets = createAsyncThunk(
  "/outlet/all",
  async (filters, thunkAPI) => {
    try {
      const res = await getAllOutletsApi(filters);
      
      return res.data;
    } catch (error) {
      console.error(`Failed to fetch outlets ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to fetch Outlet : ${error.message}`
      );
    }
  }
);

export const createOutlet = createAsyncThunk(
  "/outlet/create",
  async (data, thunkAPI) => {
    try {
      const res = await createOutletApi(data);
      return res.data;
    } catch (error) {
      console.error(`Failed to create outlet ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to create : ${error.message}`
      );
    }
  }
);

export const updateOutlet = createAsyncThunk(
  "/outlet/update",
  async ({id,value}, thunkAPI) => {
    try {
      const res = await updateOutletApi(id,value);
      return res.data;
    } catch (error) {
      console.error(`Failed to update outlet ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to update : ${error.message}`
      );
    }
  }
);

export const getOutletConfig = createAsyncThunk(
  "/outlet/config",
  async (id, thunkAPI) => {
    try {
      const res = await getOutletConfigApi(id);
      return res.data;
    } catch (error) {
      console.error(`Failed to get outlet config ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to get outlet config : ${error.message}`
      );
    }
  }
);
export const getOutletDetails = createAsyncThunk(
  "/outlet/details",
  async (id, thunkAPI) => {
    try {
      const res = await getOutletDetailsApi(id);
      return res.data;
    } catch (error) {
      console.error(`Failed to get outlet Details :  ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to get outlet Details : ${error.message}`
      );
    }
  }
);