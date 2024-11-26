import { z } from "zod";

export const restaurantSchema = z.object({
    name: z.string().min(1,'Name must be at least 1 characters').max(20,''),
    email: z.string().email('Invalid email'),
    minOrderPrice: z.coerce.number('Order price must be a number').min(1,'Order price must be greater than 1'),
    phone: z.string().length(11,'Phone number muat be 11 characters long'),
    profileImage: z.instanceof(File,'Profile Image is required').refine(file => file.size < 1024 * 1024 && file.type.startsWith('image/'), 'Image size must be less than 1MB'),
})

export const restaurantAddressSchema = z.object({
    city: z.string().min(3,'City must be at least 3 characters').max(20,'City must be at most 20 characters'),
    state: z.string().min(3,'State must be at least 3 characters').max(20,'State must be at most 20 characters'),
    zipCode: z.string().min(3,'Zip Code must be at least 3 characters').max(20,'Zip Code must be at most 20 characters'),
    street: z.string().min(3,'Street must be at least 3 characters').max(100,'Street must be at most 100 characters'),
})