import axiosClient from "../../utils/axiosClient";

// login
export const loginApi = (data) => axiosClient.post("/auth/login", data);

// get profile
export const getProfileApi = (role) => axiosClient.get(`/auth/me?role=${role}`);

// login with otp from email
export const loginWithOtpApi = (data) => axiosClient.post("/auth/otp-login", data);

// for login otp verification
export const otpVerificationApi = (data) =>
  axiosClient.post("/auth/otp-verification", data);

// change password
export const changePasswordApi = (data) =>
  axiosClient.put("/auth/change-password", data);

// for send reset token in email
export const forgetPasswordApi = (data) =>
  axiosClient.post("/auth/forget-password", data);

// for login otp verification
export const resetPasswordApi = (data) =>
  axiosClient.post("/auth/reset-password", data);

// logout user
export const logoutUserApi = () => axiosClient.post("/auth/logout");
