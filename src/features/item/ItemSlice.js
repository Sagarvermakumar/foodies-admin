import { createSlice } from "@reduxjs/toolkit";
import {
  createItem,
  deleteItem,
  editItem,
  getAllItems,
  getItemDetails,
  toggleItemAvailability,
  updateStockThreshold,
} from "./ItemAction";

// initial state
const initialState = {
  itemList: null,
  itemDetails: null,
  pagination: {
      total: 0,
      page: 1,
      limit: 8,
      pages: 0,
    hasNextPage: false,
    hasPrevPage: false > 1,
  },
  loading: {
    addItem: false,
    details: false,
    getAll: false,
    editItem: false,
    toggle: false,
    delete: false,
    stock: false,
  },
  error: null,
};

const ItemsSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItemPage : (state,action)=>{
      state.pagination.page = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      //========================================================
      // ----------- fetch item details ------------------------
      //========================================================
      .addCase(getItemDetails.pending, (state) => {
        state.loading.details = true;
        state.error = null;
      })
      .addCase(getItemDetails.fulfilled, (state, action) => {
        state.loading.details = false;
        state.itemDetails = action.payload.data;
      })
      .addCase(getItemDetails.rejected, (state, action) => {
        state.loading.details = false;
        state.error = action.payload;
        state.itemDetails = null;
      })
      //========================================================
      //------------- create a new  item -----------------------
      //========================================================
      .addCase(createItem.pending, (state) => {
        state.loading.addItem = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading.addItem = false;
        console.log(action.payload)
        // state.itemList = state.itemList.push(action.payload.data)
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading.addItem = false;
        state.error = action.payload;
      })
      //get all items
      .addCase(getAllItems.pending, (state) => {
        state.loading.getAll = true;
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.loading.getAll = false;
        state.itemList = action.payload.data;
        state.pagination= action.payload.pagination
      })
      .addCase(getAllItems.rejected, (state, action) => {
        state.loading.getAll = false;
        state.error = action.payload;
      })
      // edit  item
      .addCase(editItem.pending, (state) => {
        state.loading.edit = true;
        state.error = null;
      })
      .addCase(editItem.fulfilled, (state, action) => {
        state.loading.edit = false;
        const updatedItem = action.payload.data;
        state.itemList = state.itemList.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        );
      })
      .addCase(editItem.rejected, (state, action) => {
        state.loading.edit = false;
        state.error = action.payload;
        state.newItem = null;
      })
      // toggle  item availability
      .addCase(toggleItemAvailability.pending, (state) => {
        state.loading.toggle = true;
        state.error = null;
      })
      .addCase(toggleItemAvailability.fulfilled, (state, action) => {
        state.loading.toggle = false;
        const updatedItem = action.payload.data;
        console.log(updatedItem)
        state.itemList = state.itemList.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        );
      })
      .addCase(toggleItemAvailability.rejected, (state, action) => {
        state.loading.toggle = false;
        state.error = action.payload;
      })
      // update item stock
      .addCase(updateStockThreshold.pending, (state) => {
        state.loading.stock = true;
        state.error = null;
      })
      .addCase(updateStockThreshold.fulfilled, (state, action) => {
        state.loading.stock = false;
        const updatedStock = action.payload.data;
        state.itemList = state.itemList.map((item) =>
          item._id === updatedStock._id ? updatedStock : item
        );
      })
      .addCase(updateStockThreshold.rejected, (state, action) => {
        state.loading.stock = false;
        state.error = action.payload;
      })
      // delete  item
      .addCase(deleteItem.pending, (state) => {
        state.loading.delete = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.itemList = state.itemList.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
      });
  },
});
export const {setItemPage} = ItemsSlice.actions;
export default ItemsSlice.reducer;
