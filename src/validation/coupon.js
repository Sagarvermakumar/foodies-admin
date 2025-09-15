import * as Yup from "yup";

export const CouponSchema = Yup.object().shape({
  code: Yup.string()
    .trim()
    .required("Coupon code is required")
    .max(20, "Coupon code must be at most 20 characters"),

  title: Yup.string()
    .trim()
    .required("Title is required")
    .max(50, "Title must be at most 50 characters"),

  description: Yup.string()
    .trim()
    .required("Description is required")
    .max(200, "Description must be at most 200 characters"),

  type: Yup.string()
    .oneOf(["PERCENT", "FLAT"], "Type must be PERCENT or FLAT")
    .required("Type is required"),

  value: Yup.number()
    .required("Value is required")
    .positive("Value must be greater than 0")
    .when("type", {
      is: "PERCENT",
      then: (schema) => schema.max(100, "Percent value cannot exceed 100"),
    }),

  minOrder: Yup.number()
    .required("Minimum order is required")
    .min(0, "Minimum order cannot be negative"),

  maxDiscount: Yup.number()
    .required("Max discount is required")
    .min(0, "Max discount cannot be negative"),

  startAt: Yup.date()
    .required("Start date is required")
    .typeError("Invalid start date"),

  endAt: Yup.date()
    .required("End date is required")
    .typeError("Invalid end date")
    .min(Yup.ref("startAt"), "End date cannot be before start date"),

  usageLimit: Yup.number()
    .required("Usage limit is required")
    .min(1, "Usage limit must be at least 1"),

  perUserLimit: Yup.number()
    .required("Per-user limit is required")
    .min(1, "Per-user limit must be at least 1"),
});
