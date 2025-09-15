
import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  emailOrPhone: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
export const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});



  export const LoginWithOtpSchema = Yup.object({
    emailOrPhone: Yup.string()
      .required("Email or Phone is required")
      .test(
        "is-valid",
        "Enter a valid email or 10 digit phone",
        (value) =>
          /^\S+@\S+\.\S+$/.test(value) || /^[0-9]{10}$/.test(value)
      ),
    otp: Yup.string().when("otpSent", {
      is: true,
      then: (schema) =>
        schema
          .required("OTP is required")
          .length(6, "OTP must be 6 digits"),
    }),
  });


  export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});