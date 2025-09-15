import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    changePasswordApi,
    forgetPasswordApi,
    getProfileApi,
    loginApi,
    loginWithOtpApi,
    logoutUserApi,
    otpVerificationApi,
    resetPasswordApi,
} from "./authApi";

// login as admin
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await loginApi(data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed"
    );
  }
});
// Fetch user profile
export const fetchProfile = createAsyncThunk(
  "auth/profile",
  async (_, thunkAPI) => {
    try {
      const response = await getProfileApi();
      return response.data.user;
    } catch (error) {
      if (!navigator.onLine) {
        return thunkAPI.rejectWithValue(
          "Unable to connect. Please check your internet connection."
        );
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);
// Logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await logoutUserApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);
// change Password
export const changePassword = createAsyncThunk(
  "auth/change-password",
  async (passwordData, thunkAPI) => {
    try {
      const { data } = await changePasswordApi(passwordData);
      return data;
    } catch (error) {
      console.error("Error changing password:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to change password"
      );
    }
  }
);
// login with otp
export const loginWithOtp = createAsyncThunk(
  "auth/login-with-otp",
  async (data, thunkAPI) => {
    try {
      return ({ data } = await loginWithOtpApi(data));
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to change password"
      );
    }
  }
);
// verify otp
export const otpVerification = createAsyncThunk(
  "auth/verify-otp",
  async (data, thunkAPI) => {
    try {
      console.log("verify Data : ", data)
      const res = await otpVerificationApi(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to Verify"
      );
    }
  }
);
// forget Password
export const forgetPassword = createAsyncThunk(
  "auth/forget-password",
  async (data, thunkAPI) => {
    try {
      const res = await forgetPasswordApi(data);
      console.log("Forgot res : ", res.data)
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to Send Reset Link"
      );
    }
  }
);
// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data, thunkAPI) => {
    try {
      const res =  await resetPasswordApi(data);
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to Verify"
      );
    }
  }
);