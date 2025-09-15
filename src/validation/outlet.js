import * as Yup from "yup";

// --- Helpers ---
const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/; // India GSTIN format
const phoneRegex = /^(\+?91[- ]?)?[6-9]\d{9}$/; // Indian mobile number validation
const codeRegex = /^[A-Z0-9_-]{2,10}$/;

export const OutLetValidationSchema = Yup.object({
  name: Yup.string().trim().min(3).max(60).required("Name is required"),
  code: Yup.string()
    .transform((v) => (v || "").toUpperCase())
    .matches(codeRegex, "2–10 chars, A-Z, 0-9, _ or -")
    .required("Code is required"),
  phone: Yup.string()
    .matches(phoneRegex, "Enter a valid Indian mobile number")
    .required("Phone is required"),
  gstIN: Yup.string()
    .transform((v) => (v || "").toUpperCase())
    .matches(gstinRegex, "Invalid GSTIN format")
    .required("GSTIN is required"),
  openingHours: Yup.object({
    open: Yup.string().required("Open time is required"),
    close: Yup.string()
      .required("Close time is required")
      .test("is-after", "Close must be after open", function (value) {
        const { open } = this.parent;
        if (!open || !value) return true;
        // compare HH:MM strings
        return value > open;
      }),
    
  }),
  deliveryCharges: Yup.string()
    .oneOf(["FIXED", "PER_KM", "FREE_ABOVE"], "Invalid delivery charge type")
    .required("Delivery charge type is required"),

  deliveryConfig: Yup.object({
    fixed: Yup.number()
      .typeError("Fixed delivery charge must be a number")
      .when("..deliveryCharges", {
        is: "FIXED",
        then: (schema) => schema.required("Fixed delivery charge is required"),
        otherwise: (schema) => schema.nullable(),
      }),

    perKm: Yup.number()
      .typeError("Per km delivery charge must be a number")
      .when("..deliveryCharges", {
        is: "PER_KM",
        then: (schema) => schema.required("Per km charge is required"),
        otherwise: (schema) => schema.nullable(),
      }),

    freeAbove: Yup.number()
      .typeError("Free above amount must be a number")
      .when("..deliveryCharges", {
        is: "FREE_ABOVE",
        then: (schema) => schema.required("Free above amount is required"),
        otherwise: (schema) => schema.nullable(),
      }),
  }),
  active: Yup.boolean().required(),
  address: Yup.object({
    label: Yup.string()
      .oneOf(["Home", "Work", "Other"])
      .required("Label is required"),
    addressLine: Yup.string()
      .trim()
      .min(5)
      .max(120)
      .required("Address line is required"),
    location: Yup.object({
      type: Yup.string().oneOf(["Point"]).required("Location type required"),
      coordinates: Yup.array()
        .of(Yup.number().required())
        .length(2, "Coordinates must be [lng, lat]")
        .required("Coordinates are required"),
    }),
    isDefaultAddress: Yup.boolean().required(),
  }),
});
