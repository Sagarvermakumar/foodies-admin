import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCustomerReportApi, getDeliveryPerformanceReportApi, getSalesReportApi, getTopItemsReportApi, orderReportApi, statsApi } from "./reportApi";



export const getSalesReport = createAsyncThunk(
  "/report/sales",
  async (range, thunkAPI) => {
    try {
      const res = await getSalesReportApi(range);
      return res.data;
    } catch (error) {
      console.error(`Failed to fetch sales report ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to fetch sales report ${error.message}`
      );
    }
  }
);

export const getTopItemsReport = createAsyncThunk(
  "/report/top-items",
  async (limit, thunkAPI) => {
    try {
      const res = await getTopItemsReportApi(limit);
      return res.data;
    } catch (error) {
      console.error(`Failed to fetch top items report ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to fetch top items report ${error.message}`
      );
    }
  }
);

export const getCustomerReport = createAsyncThunk(
  "/report/customer",
  async (xDaysAgo, thunkAPI) => {
    try {
      const res = await getCustomerReportApi(xDaysAgo);
      return res.data;
    } catch (error) {
      console.error(`Failed to fetch Customer report ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to fetch customer report ${error.message}`
      );
    }
  }
);

export const getDeliveryPerformanceReport = createAsyncThunk(
  "/report/delivery-performance",
  async (_, thunkAPI) => {
    try {
      const res = await getDeliveryPerformanceReportApi();
      return res.data;
    } catch (error) {
      console.error(`Failed to fetch delivery report ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to fetch delivery report ${error.message}`
      );
    }
  }
);

export const exportReportCSV = createAsyncThunk(
  "/report/export",
  async (_, thunkAPI) => {
    try {
      const res = await exportReportCSV();
      return res.data;
    } catch (error) {
      console.error(`Failed to export report ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to export report ${error.message}`
      );
    }
  }
);

export const fetchStats = createAsyncThunk(
  "/report/stats",
  async (_, thunkAPI) => {
    try {
      const res = await statsApi();
      return res.data;
    } catch (error) {
      console.error(`Failed to fetch stat ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to fetch stat ${error.message}`
      );
    }
  }
);
export const fetchOderReportApi = createAsyncThunk(
  "/report/order",
  async (lastXDaysAgo, thunkAPI) => {
    try {
      const res = await orderReportApi(lastXDaysAgo);
      return res.data;
    } catch (error) {
      console.error(`Failed to fetch stat ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to fetch stat ${error.message}`
      );
    }
  }
);