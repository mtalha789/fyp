import { z} from 'zod'

export const signupSchema = z.object({
    fullname: z
        .string()
        .min(3, 'Fullname should be at least 3 characters long')
        .max(20, 'Fullname should be at most 20 characters long')
        .regex(/^[a-zA-Z ]+$/, 'Fullname should only contain letters and spaces'),
    username: z
        .string()
        .min(3, 'Username should be at least 3 characters long')
        .max(20, 'Username should be at most 20 characters long')
        .regex(/^[a-zA-Z0-9]+$/, 'Username should only contain letters and numbers'),
    email: z
        .string()
        .email('Invalid email'),
    password: z
        .string()
        .min(8, 'Password should be at least 8 characters long'),
    avatar: z
        .instanceof(File, {message: 'Avatar is required'})
        .refine((file) => file.size <= 5 * 1024 * 1024 || file.type.startsWith('image/'), 'Avatar size should be less than 5MB'),
})

export const coverImageSchema = z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024 || file.type.startsWith('image/'), 'Cover Image size should be less than 5MB')


export const loginSchema = z.object({
    username: z
        .string('Username is required')
        .min(3, 'Username should be at least 3 characters long'),
    password: z
        .string('Password is required')
        .min(8, 'Password should be at least 8 characters long')
})