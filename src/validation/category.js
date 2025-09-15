import * as Yup from "yup";

export const CategoryValidationSchema = Yup.object().shape({
  image: Yup.mixed().required("Category image is required"),
  name: Yup.string().trim().required("Category name is required"),
  slug: Yup.string().trim(),
  description: Yup.string().trim(),
  availableItems: Yup.number()
    .min(0, "Available items must be 0 or greater")
    .default(0),
  sortOrder: Yup.number()
    .min(0, "Sort order must be 0 or greater")
    .default(0),
  ratingCount: Yup.number().min(0, "Rating count must be 0 or greater"),
  active: Yup.boolean().default(true),
});
