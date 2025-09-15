import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createItemApi,
  deleteItemApi,
  editItemApi,
  getAllItemsApi,
  getItemDetailsApi,
  toggleItemAvailabilityApi,
  updateStockThresholdApi,
} from "./ItemApi";

// create a new  item
export const getItemDetails = createAsyncThunk(
  "/item/details",
  async (id, thunkAPI) => {
    try {
      const res = await getItemDetailsApi(id);
      return res.data;
    } catch (error) {
      console.error(`Failed to fetch item details ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed To fetch item details"
      );
    }
  }
);
export const createItem = createAsyncThunk(
  "/item/create",
  async (data, thunkAPI) => {
    try {
      const res = await createItemApi(data);
      return res.data;
    } catch (error) {
      console.error(`Failed to Create s Items ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed To Create  Items"
      );
    }
  }
);

// get all  items
export const getAllItems = createAsyncThunk(
  "/item/all",
  async (query, thunkAPI) => {
    try {
      console.log({query})
      const res = await getAllItemsApi(query);
      return res.data;
    } catch (error) {
      console.error(`Failed to fetch s Items ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed To Fetch  Items"
      );
    }
  }
);

// edit a  item
export const editItem = createAsyncThunk(
  "/item/edit",
  async ({ itemId, data }, { dispatch, getState, rejectWithValue }) => {
    try {

      // API call for update
      const res = await editItemApi(itemId, data);

      // Get current page from state
      const { page } = getState().item.pagination;

      //  Reload current page items
      dispatch(getAllItems({ page }));

      return res.data;
    } catch (error) {
      console.error(`Failed to Edit Item ${error.message}`);
      return rejectWithValue(
        error.response?.data.message || "Failed To Edit Item"
      );
    }
  }
);


// toggle  item availability
export const toggleItemAvailability = createAsyncThunk(
  "/item/toggle",
  async (itemId, thunkAPI) => {
    try {
      console.log("Toggling item availability:", itemId);
      const res = await toggleItemAvailabilityApi(itemId);
      return res.data;
    } catch (error) {
      console.error(
        `Failed to Toggle  Item Availability ${error.response.data.message}`
      );
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed To Toggle  Item Availability"
      );
    }
  }
);
// toggle  item availability
export const updateStockThreshold = createAsyncThunk(
  "/item/update-stock",
  async (itemId, thunkAPI) => {
    try {
      const res = await updateStockThresholdApi(itemId);
      return res.data;
    } catch (error) {
      console.error(
        `Failed to Toggle  Item Availability ${error.response.data.message}`
      );
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed To Toggle  Item Availability"
      );
    }
  }
);

// delete a  item
export const deleteItem = createAsyncThunk(
  "/item/delete",
  async (id, thunkAPI) => {
    try {
      const res = await deleteItemApi(id);
      return res.data;
    } catch (error) {
      console.error(`Failed to Delete s Items ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed To Delete Items"
      );
    }
  }
);
