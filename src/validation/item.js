import * as Yup from "yup";


export const itemValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .min(0, "Price must be positive")
    .required("Price is required"),
  image: Yup.mixed().required("Image is required"),
  isVeg: Yup.boolean(),
  variations: Yup.array().of(
    Yup.object({
      name: Yup.string(),
      price: Yup.number()
        .min(0, "Price must be positive")
        .required("Variation price required"),
      maxAddons: Yup.number().min(0),
    })
  ),
  addons: Yup.array().of(
    Yup.object({
      name: Yup.string(),
      price: Yup.number().min(0),
      type: Yup.string().oneOf(["TOPPING", "OPTION", "SPICE"]),
    })
  ),
  discount: Yup.number().min(0).max(100),
  lowStockThreshold: Yup.number().min(0),
  outlet: Yup.string().required(
    " Please select an outlet for this item before continuing."
  ),
  category: Yup.string().required(
    " Please select a category for this item before continuing."
  ),
});