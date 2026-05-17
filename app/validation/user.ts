// app/validation/user.ts
import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(40, "Username is too long"),

  email: z.string().email("Invalid email format"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),

  password: z.string()
    .min(6, "Password must be at least 6 characters"),
});

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(40)
    .optional(),

  email: z
    .email("Invalid email")
    .optional(),
  password: z
    .string()
    .min(6, "Current password is required")
    .optional(),
    image: z
  .object({
    url: z.string(),
    publicId: z.string(),
  })
  .optional(),

});