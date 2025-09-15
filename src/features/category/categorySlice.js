import { createSlice } from "@reduxjs/toolkit";
import {
  createItemCategory,
  deleteCategory,
  getAllItemCategories,
  getItemCategory,
  updateCategory,
} from "./categoryAction";

const initialState = {
  categoryList: null,
  category: null,
  error: null,
  loading: {
    get: false,
    create: false,
    update: false,
    delete: false,
    getDetails: false,
  },
      pagination: {
      total:0,
      page:1,
      limit:10,
      pages: 0,
      hasNextPage: false,
      hasPrevPage: false > 1,
    },
  newCategory: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
        setCategoryPage : (state,action)=>{
      state.pagination.page = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // get all category of items
      .addCase(getAllItemCategories.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getAllItemCategories.fulfilled, (state, action) => {
        state.loading.get = false;
        state.categoryList = action.payload.data;
        state.pagination = action.payload.pagination
      })
      .addCase(getAllItemCategories.rejected, (state, action) => {
        state.loading.get = false;
        state.error = action.payload;
        state.categoryList = null;
      })
      // create a category
      .addCase(createItemCategory.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createItemCategory.fulfilled, (state,) => {
        state.loading.create = false;
      })
      .addCase(createItemCategory.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
      })
      // update category details
      .addCase(updateCategory.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading.update = false;
        const updatedCategory = action.payload.data;
        state.newCategory = updatedCategory;
        state.categoryList = state.categoryList.map((cat) =>
          cat._id === updatedCategory._id ? updatedCategory : cat
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload || "Failed to update category";
        state.newCategory = null;
      })
      // delete
      .addCase(deleteCategory.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.categoryList = state.categoryList.filter(
          (category) => category._id !== action.payload.data._id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
        state.newCategory = null;
      })
      // get a single category
      .addCase(getItemCategory.pending, (state) => {
        state.loading.getDetails = true;
      })
      .addCase(getItemCategory.fulfilled, (state, action) => {
        state.loading.getDetails = false;
        state.category = action.payload.data;
      })
      .addCase(getItemCategory.rejected, (state, action) => {
        state.loading.getDetails = false;
        state.error = action.payload;
        state.category = null;
      });
  },
});

export const {setCategoryPage} = categorySlice.reducer
export default categorySlice.reducer;