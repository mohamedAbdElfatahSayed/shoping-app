import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name is too long"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  discountPrice: z
    .number()
    .positive("Discount price must be greater than 0")
    .optional(),

  images: z
    .array(
      z.object({
        url: z.string().url("Invalid image URL"),
        publicId: z.string(),
      })
    )
    .min(1, "At least one image is required"),

  category: z
    .string()
    .min(2, "Category is required"),

  brand: z
    .string()
    .optional(),

  sizes: z
    .array(z.string())
    .optional(),

  colors: z
    .array(z.string())
    .optional(),

  countInStock: z
    .number()
    .int()
    .min(0, "Stock cannot be negative"),

  isFeatured: z
    .boolean()
    .optional(),
}).refine(
    (data) =>
      !data.discountPrice ||
      data.discountPrice < data.price,
    {
      message: "Discount price must be less than price",
      path: ["discountPrice"],
    }
  );




export const updateProductSchema = z
  .object({
    name: z.string().min(3).max(100).optional(),
    description: z.string().min(10).optional(),
    price: z.number().positive().optional(),
    discountPrice: z.number().positive().optional(),

    images: z
      .array(
        z.object({
          url: z.string().url(),
          publicId: z.string(),
        })
      )
      .optional()
      .refine((val) => !val || val.length > 0, {
        message: "Images cannot be empty",
      }),

    category: z.string().optional(),
    brand: z.string().optional(),
    sizes: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    countInStock: z.number().int().min(0).optional(),
    isFeatured: z.boolean().optional(),
  })
  .refine(
    (data) => Object.values(data).some((v) => v !== undefined),
    {
      message: "At least one field must be provided",
    }
  );
