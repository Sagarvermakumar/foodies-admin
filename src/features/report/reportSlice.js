import { createSlice } from "@reduxjs/toolkit";
import { exportReportCSV, fetchOderReportApi, fetchStats, getCustomerReport, getDeliveryPerformanceReport, getSalesReport, getTopItemsReport } from "./reportAction";



const initialState = {
  reports: {
    sales: null,
    topItems: null,
    customers: null,
    deliveryPerformance: null,
    stats: null,
    orders: null,
    exportCSV:null
  },
  loading: {
    sales: false,
    topItems: false,
    customers: false,
    deliveryPerformance: false,
    stats: false,
    orders: false,
    exportCSV: false,
  },
  error: {
    sales: null,
    topItems: null,
    customers: null,
    deliveryPerformance: null,
    stats: null,
    orders: null,
    exportCSV: null,
  },
};


// -------------------- Slice -------------------- //
const reportsSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    clearReports: (state) => {
      state.reports = initialState.reports;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    // ---------- Sales Report ----------
    builder
      .addCase(getSalesReport.pending, (state) => {
        state.loading.sales = true;
        state.error.sales = null;
      })
      .addCase(getSalesReport.fulfilled, (state, action) => {
        state.loading.sales = false;
        state.reports.sales = action.payload;
      })
      .addCase(getSalesReport.rejected, (state, action) => {
        state.loading.sales = false;
        state.error.sales = action.payload;
      })

    // ---------- Top Items Report ----------
    
      .addCase(getTopItemsReport.pending, (state) => {
        state.loading.topItems = true;
        state.error.topItems = null;
      })
      .addCase(getTopItemsReport.fulfilled, (state, action) => {
        state.loading.topItems = false;
        state.reports.topItems = action.payload;
      })
      .addCase(getTopItemsReport.rejected, (state, action) => {
        state.loading.topItems = false;
        state.error.topItems = action.payload;
      })

    // ---------- Customers Report ----------
    
      .addCase(getCustomerReport.pending, (state) => {
        state.loading.customers = true;
        state.error.customers = null;
      })
      .addCase(getCustomerReport.fulfilled, (state, action) => {
        state.loading.customers = false;
        state.reports.customers = action.payload;
      })
      .addCase(getCustomerReport.rejected, (state, action) => {
        state.loading.customers = false;
        state.error.customers = action.payload;
      })

    // ---------- Get Delivery Performance Report ----------
    
      .addCase(getDeliveryPerformanceReport.pending, (state) => {
        state.loading.deliveryPerformance = true;
        state.error.deliveryPerformance = null;
      })
      .addCase(getDeliveryPerformanceReport.fulfilled, (state, action) => {
        state.loading.deliveryPerformance = false;
        state.reports.deliveryPerformance = action.payload;
      })
      .addCase(getDeliveryPerformanceReport.rejected, (state, action) => {
        state.loading.deliveryPerformance = false;
        state.error.deliveryPerformance = action.payload;
      })
   // ---------- CSV Export ----------
    builder
      .addCase(exportReportCSV.pending, (state) => {
        state.loading.exportCSV = true;
        state.error.exportCSV = null;
      })
      .addCase(exportReportCSV.fulfilled, (state, action) => {
        state.loading.exportCSV = false;
        state.reports.exportCSV = action.payload;
      })
      .addCase(exportReportCSV.rejected, (state, action) => {
        state.loading.exportCSV = false;
        state.error.exportCSV = action.payload;
      })  // ---------- Fetch  Stats  ----------
      .addCase(fetchStats.pending, (state) => {
        state.loading.stats = true;
        state.error.stats = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading.stats = false;
        state.reports.stats = action.payload.data;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading.stats = false;
        state.error.stats = action.payload.data;
      })
       // ---------- Order Report ----------
      .addCase(fetchOderReportApi.pending, (state) => {
        state.loading.orders = true;
        state.error.orders = null;
      })
      .addCase(fetchOderReportApi.fulfilled, (state, action) => {
        state.loading.orders = false;
        state.reports.orders = action.payload.data;
      })
      .addCase(fetchOderReportApi.rejected, (state, action) => {
        state.loading.orders = false;
        state.error.orders = action.payload;
      })

    // Add more builder cases for deliveryPerformance, stats, orders, exportCSV
  },
});

export const { clearReports } = reportsSlice.actions;

export default reportsSlice.reducer