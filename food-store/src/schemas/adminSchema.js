import { z } from "zod";

export const adminSchema = z.object({
    username: z.string().min(3, 'Username should be at least 3 characters long').max(20, 'Username should be at most 20 characters long').regex(/^[a-zA-Z0-9]+$/, 'Username should only contain letters and numbers'),
    password: z.string().min(8, 'Password should be at least 8 characters long'),
})