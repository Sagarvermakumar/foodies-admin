import { createSlice } from "@reduxjs/toolkit";
import { changePassword, fetchProfile, forgetPassword, login, loginWithOtp, logoutUser, otpVerification, resetPassword } from "./authAction";


// Initial State
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: {
    login: false,
    profile: false,
    otpLogin: false,
    verifyOtp: false,
    changePassword: false,
    forgetPassword: false,
    resetPassword: false,
    logout: false,
  },
  isOtpSend:false,
  isPasswordResetSuccess:false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    clearError: (state) => {
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setOtpSend : (state, action)=>{
      state.isOtpSend = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading.login = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading.login = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading.login = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading.profile = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading.profile = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading.profile = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })
      // logout
      .addCase(logoutUser.pending, (state) => {
        state.loading.logout = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading.logout = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading.logout = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // change password
      .addCase(changePassword.pending, (state) => {
        state.loading.changePassword = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading.changePassword = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading.changePassword = false;
        state.error = action.payload;
      })
      // login with otp
      .addCase(loginWithOtp.pending, (state) => {
        state.loading.otpLogin = true;
        state.error = null;
      })
      .addCase(loginWithOtp.fulfilled, (state) => {
        state.loading.otpLogin = false;
        state.isOtpSend=true
      })
      .addCase(loginWithOtp.rejected, (state, action) => {
        state.loading.otpLogin = false;
        state.error = action.payload;
      })
      // otp verification
      .addCase(otpVerification.pending, (state) => {
        state.loading.verifyOtp = true;
        state.error = null;
      })
      .addCase(otpVerification.fulfilled, (state) => {
        state.loading.verifyOtp = false;
        state.isAuthenticated = true
      })
      .addCase(otpVerification.rejected, (state, action) => {
        state.loading.verifyOtp = false;
        state.error = action.payload;
      })
      // forget password
      .addCase(forgetPassword.pending, (state) => {
        state.loading.forgetPassword = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading.forgetPassword = false;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading.forgetPassword = false;
        state.error = action.payload;
      })
      //reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading.resetPassword = true;
        state.error = null;
        state.isPasswordResetSuccess=false
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading.resetPassword = false;
        state.isPasswordResetSuccess=true
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading.resetPassword = false;
        state.error = action.payload;
        state.isPasswordResetSuccess-false
      });
  },
});

export const { logout, clearError, clearUser, updateUserAvatar, setOtpSend } =
  authSlice.actions;
export default authSlice.reducer;
