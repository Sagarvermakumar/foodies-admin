
import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  emailOrPhone: Yup.string()
    .test("emailOrPhone", "Valid email or phone is required", function (value) {
      if (!value) return false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10}$/; // adjust length for your use case
      return emailRegex.test(value) || phoneRegex.test(value);
    })
    .required("Email or phone is required"),
  role: Yup.string()
    .oneOf(['SUPER_ADMIN', 'MANAGER', 'STAFF', 'DELIVERY'], "Invalid role")
    .required("Role is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
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


export const emailValidator = Yup.object({
    email: Yup.string()
      .trim()
      .required("Email zaroori hai")
      .email("Valid email address dalein"),
  });