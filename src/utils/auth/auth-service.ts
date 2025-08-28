import { createServiceClient } from '@/utils/supabase/service'
import { hashPassword, verifyPassword, generateToken } from './auth-utils'
import type {
  SignInParams,
  SignInResponse,
  SignUpParams,
  SignUpResponse,
} from '@/types/Auth.type'

export class AuthService {
  static async signUp({
    email,
    password,
  }: SignUpParams): Promise<SignUpResponse> {
    try {
      const supabase = createServiceClient()

      // Check if the user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', email.toLowerCase())
        .single()

      if (existingUser) {
        return {
          success: false,
          error: 'An account with this email already exists',
        }
      }

      const passwordHash = await hashPassword(password)

      // Create the user
      const { data: newUser, error } = await supabase
        .from('users')
        .insert([
          {
            email: email.toLowerCase(),
            password_hash: passwordHash,
          },
        ])
        .select('id, email, created_at, updated_at')
        .single()

      if (error) {
        return { success: false, error: 'Error creating account' }
      }

      // Generate the token
      const token = await generateToken({
        id: newUser.id,
        email: newUser.email,
      })

      return {
        success: true,
        user: newUser,
        token,
      }
    } catch (error) {
      console.error('Error in signUp:', error)
      return { success: false, error: 'Internal server error' }
    }
  }

  static async signIn({
    email,
    password,
    rememberMe,
  }: SignInParams): Promise<SignInResponse> {
    try {
      const supabase = createServiceClient()

      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single()

      if (error || !user) {
        return { success: false, error: 'Invalid email or password' }
      }

      const isPasswordValid = await verifyPassword(password, user.password_hash)
      if (!isPasswordValid) {
        return { success: false, error: 'Invalid email or password' }
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash, ...userWithoutPassword } = user

      const token = await generateToken(userWithoutPassword, rememberMe)

      return {
        success: true,
        user: userWithoutPassword,
        token,
      }
    } catch (error) {
      console.error('signIn failed:', error)
      return { success: false, error: 'Internal server error' }
    }
  }
}
