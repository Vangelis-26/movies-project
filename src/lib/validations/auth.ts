import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .email('Invalid email format')
    .min(1, 'Email required')
    .toLowerCase()
    .trim(),
  password: z.string().min(1, 'Password required'),
  rememberMe: z.boolean().optional().default(false),
})

export const signUpSchema = z.object({
  email: z
    .email('Invalid email format')
    .min(1, 'Email required')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/(?=.*[a-z])/, 'At least one lowercase letter required')
    .regex(/(?=.*[A-Z])/, 'At least one uppercase letter required')
    .regex(/(?=.*\d)/, 'At least one number required'),
})
