import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createItemCategoryApi, deleteCategoryApi, getAllItemCategoriesApi, getItemCategoryApi, updateCategoryApi } from "./categoryApi";


// get all category of items
export const getAllItemCategories = createAsyncThunk(
  "/category/all",
  async (_, thunkAPI) => {
    try {
      const res = await getAllItemCategoriesApi();
      return res.data;
    } catch (error) {
      console.error(`Failed to fetch categories ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to fetch category `
      );
    }
  }
);
// create category 
export const createItemCategory = createAsyncThunk(
  "/category/create",
  async (data, thunkAPI) => {
    try {
      const res = await createItemCategoryApi(data);
      toast.success(res.data?.message || "Created!")
      return res.data;
    } catch (error) {
      console.error(`Failed to create category ${error.message}`);
      toast.error(error.response?.data.message || `Failed to create category `)
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to create category `
      );
    }
  }
);
//update category details
export const updateCategory = createAsyncThunk(
  "/category/update",
  async (data, thunkAPI) => {
    const { id, ...rest } = data;
    try {
      const res = await updateCategoryApi(id, rest);
      toast.success(res.data.message || "Updated!")
      return res.data;

    } catch (error) {
      console.error(`Failed to update category ${error.message}`);
      toast.error(error.response?.data.message || `Failed to create category `)
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to update category `
      );
    }
  }
);
// get all category of items
export const deleteCategory = createAsyncThunk(
  "/category/delete",
  async (id, thunkAPI) => {
    try {
      const res = await deleteCategoryApi(id);
      return res.data;
    } catch (error) {
      console.error(`Failed to deleted category ${error.message}`);
      toast.error(  error.response?.data.message || `Failed to delete category `)
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to delete category `
      );
    }
  }
);

// get a single category
export const getItemCategory = createAsyncThunk(
  "/category/details",
  async (id, thunkAPI) => {
    try {
      const res = await getItemCategoryApi(id);
      return res.data;
    } catch (error) {
      console.error(`Failed to fetch category ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || `Failed to fetch category `
      );
    }
  }
);