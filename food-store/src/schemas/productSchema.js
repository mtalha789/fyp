import { z } from "zod";

export const imageSchema = z.object({ 
  image: z
  .instanceof(File,'Product Image is required')
  .refine((file) => file.size <= 5 * 1024 * 1024 || file.type.startsWith('image/'), 'Product Image size should be less than 5MB')
})

export const productSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  price: z.coerce.number().min(300, { message: "Price must be greater than 300" }),
  cacategory_id: z.string().trim().min(1, { message: "Category is required" }),
  productImage: z.instanceof(File,'Product Image is required').refine((file) => file.size <= 5 * 1024 * 1024 || file.type.startsWith('image/'), 'Product Image size should be less than 5MB'),
})

export const updateProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  price: z.coerce.number().min(300, { message: "Price must be greater than 300" }),
  cacategory_id: z.string().trim().min(1, { message: "Category is required" }),
})