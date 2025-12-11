import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  blockUserApi,
  deleteUserProfileApi,
  getAllUsersApi,
  getDeliveryPersonsApi,
  getUserByIdApi,
  unblockUserApi,
  updateAvatarApi,
  updateProfileApi,
  updateUserRoleApi,
} from "./userApi";

// Update Profile Details
export const updateProfileDetails = createAsyncThunk(
  "user/update-details",
  async (_, thunkAPI) => {
    try {
      const response = await updateProfileApi();
      return response.data;
    } catch (error) {
      console.error("Error logging out:", error);
  
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Update Profile Details Failed"
      );
    }
  }
);

// update avatar
export const updateAvatar = createAsyncThunk(
  "user/update-avatar",
  async (imageFile, thunkAPI) => {
    try {
      const { data } = await updateAvatarApi(imageFile);


      return data;
    } catch (error) {
      console.error("Error updating avatar:", error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to update avatar"
      );
    }
  }
);
//get all users
export const getAllUsers = createAsyncThunk(
  "user/user-list",
  async (
    {
      query,
      page,
      limit = 10,
      role = "",
      sortBy = "createdAt",
      sortOrder = "desc",
    },
    thunkAPI
  ) => {
    try {
      const { data } = await getAllUsersApi(
        query,
        page,
        limit,
        role,
        sortBy,
        sortOrder
      );
      return data;
    } catch (error) {
      console.error("Error fetching all users:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to fetch all users"
      );
    }
  }
);

//get users by Id
export const getUserById = createAsyncThunk(
  "user/details",
  async (id, thunkAPI) => {
    try {
      const { data } = await getUserByIdApi(id);
      return data;
    } catch (error) {
      console.error("Error fetching user details  :", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to fetch user details"
      );
    }
  }
);

// Block User
export const blockUser = createAsyncThunk(
  "user/block",
  async (id, thunkAPI) => {
    try {
      // Call the block user API
     
      const { data } = await blockUserApi(id);

      return data;
    } catch (error) {
      console.error("Error blocking user:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to block user"
      );
    }
  }
);

// Unblock User
export const unblockUser = createAsyncThunk(
  "user/unblock",
  async (id, thunkAPI) => {
    try {
       console.log("Blocking user with ID:", id);
      const { data } = await unblockUserApi(id);
  
      return data;
    } catch (error) {
      console.error("Error unblocking user:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to unblock user"
      );
    }
  }
);

// update user role
export const updateUserRole = createAsyncThunk(
  "user/update-role",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await updateUserRoleApi(id, data);
  
      return res.data;
    } catch (error) {
      console.error("Error updating user role:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to update user role"
      );
    }
  }
);

// delete user profile
export const deleteUserProfile = createAsyncThunk(
  "user/delete-profile",
  async (id, thunkAPI) => {
    try {
      const { data } = await deleteUserProfileApi(id);
  
      return data;
    } catch (error) {
      console.error(
        "Error deleting user profile:",
        error.response?.data?.message
      );
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getDeliveryPersons = createAsyncThunk(
  "user/get-delivery-persons",
  async (_, thunkAPI) => {
    try {
      const res = await getDeliveryPersonsApi();
      return res.data;
    } catch (error) {
    console.error("Error fetching delivery persons:", error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || " Failed to fetch delivery persons"
    );
  }
});
