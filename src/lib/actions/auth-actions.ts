'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AuthService } from '@/utils/auth/auth-service'
import { getRememberMeTime } from '@/utils/auth/auth-utils'
import { signInSchema, signUpSchema } from '@/lib/validations/auth'
import {
  validateFormData,
  createFormErrorResponse,
  createFieldErrorResponse,
} from '@/lib/validations/utils'
import type { ActionResult, AuthFormState } from '@/types/Auth.type'

export async function signInAction(
  _: AuthFormState,
  formData: FormData
): Promise<ActionResult> {
  const validation = validateFormData(signInSchema, formData)

  if (!validation.success) {
    return createFieldErrorResponse(validation.fieldErrors)
  }

  const { email, password, rememberMe } = validation.data

  try {
    const result = await AuthService.signIn({ email, password, rememberMe })

    if (!result.success) {
      return createFormErrorResponse(result.error!)
    }

    const cookieStore = await cookies()
    cookieStore.set('auth-token', result.token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: getRememberMeTime(rememberMe).number,
    })
  } catch (error) {
    console.error('Sign in error:', error)
    return createFormErrorResponse('An unexpected error occurred')
  }

  // Keep redirect outside of try-catch, NEXT_REDIRECT throws an exception (see https://nextjs.org/docs/app/getting-started/updating-data#redirecting)
  redirect('/')
}

export async function signUpAction(
  _: AuthFormState,
  formData: FormData
): Promise<ActionResult> {
  const validation = validateFormData(signUpSchema, formData)

  if (!validation.success) {
    return createFieldErrorResponse(validation.fieldErrors)
  }

  const { email, password } = validation.data

  try {
    const result = await AuthService.signUp({ email, password })

    if (!result.success) {
      return createFormErrorResponse(result.error!)
    }

    return {
      success: true,
      message: 'Account created successfully! You can now log in.',
    }
  } catch (error) {
    console.error('Sign up error:', error)
    return createFormErrorResponse('An unexpected error occurred')
  }
}

export async function signOutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
  redirect('/signin')
}
