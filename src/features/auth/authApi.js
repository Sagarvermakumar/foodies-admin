import API from "../../utils/axiosClient";

// login
export const loginApi = (data) => API.post("/auth/login", data);

// get profile
export const getProfileApi = (role) => API.get(`/auth/me?role=${role}`);

// login with otp from email
export const loginWithOtpApi = (data) => API.post("/auth/otp-login", data);

// for login otp verification
export const otpVerificationApi = (data) =>
  API.post("/auth/otp-verification", data);

// change password
export const changePasswordApi = (data) =>
  API.put("/auth/change-password", data);

// for send reset token in email
export const forgetPasswordApi = (data) =>
  API.post("/auth/forget-password", data);

// for login otp verification
export const resetPasswordApi = (data) =>
  API.post("/auth/reset-password", data);

// logout user
export const logoutUserApi = () => API.post("/auth/logout");
