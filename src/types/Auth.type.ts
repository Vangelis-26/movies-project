import { z } from 'zod'
import type { signInSchema, signUpSchema } from '@/lib/validations/auth'
import type { User } from './User.type'

export type SignInParams = z.infer<typeof signInSchema>
export type SignUpParams = z.infer<typeof signUpSchema>

export interface SignInResponse {
  success: boolean
  error?: string
  user?: User
  token?: string
}
export interface SignUpResponse {
  success: boolean
  error?: string
  user?: User
  token?: string
}

export interface FieldError {
  [key: string]: string[]
}

export interface AuthFormState {
  error?: string
  fieldErrors?: FieldError
  success?: boolean
  message?: string
}

export type ActionResult<T = AuthFormState> = Promise<T>
