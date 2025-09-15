


export const selectAuthUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// Loading states
export const selectAuthLoading = (state) => state.auth.loading; // full object
export const selectLoginLoading = (state) => state.auth.loading.login;
export const selectProfileLoading = (state) => state.auth.loading.profile;
export const selectOtpLoginLoading = (state) => state.auth.loading.otpLogin;
export const selectVerifyOtpLoading = (state) => state.auth.loading.verifyOtp;
export const selectChangePasswordLoading = (state) =>
  state.auth.loading.changePassword;
export const selectForgetPasswordLoading = (state) =>
  state.auth.loading.forgetPassword;
export const selectResetPasswordLoading = (state) =>
  state.auth.loading.resetPassword;
export const selectLogoutLoading = (state) => state.auth.loading.logout;

// Flags
export const selectIsOtpSend = (state) => state.auth.isOtpSend;
export const selectIsPasswordResetSuccess = (state) =>
  state.auth.isPasswordResetSuccess;

// Error
export const selectAuthError = (state) => state.auth.error;
