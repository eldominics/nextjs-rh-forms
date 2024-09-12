import { z } from "zod";

export const productSchema = z.object({
  productTitle: z
    .string()
    .min(3, {
      message: "Please write up to three characters for product Title",
    })
    .trim(),

  productDescription: z
    .string()
    .min(10, { message: "Please provide up to 10 characters for description" })
    .trim(),

  productPrice: z
    .string()
    .min(1, "Please provide a price")
    .max(9, "digits can't be more than 9 ")
    .refine((value) => !isNaN(Number(value)), {
      message: "The input must be a valid number string",
    })
    .transform((value) => Number(value)),

  productImage: z
    .any()
    .refine((file) => file instanceof File, "Image file is required")
    .refine(
      (file) => file?.size <= 4 * 1024 * 1024,
      "Provide an image File less than or equals 4MB"
    )
    .refine(
      (file) =>
        ["image/jpg", "image/jpeg", "image/gif", "image/png"].includes(
          file?.type
        ),
      "Image must be of type png, jpg,jpeg,gif"
    ),
});
