'use client'

import { useActionState } from 'react'
import { signInAction } from '@/lib/actions/auth-actions'
import { FieldError } from '@/components/FieldError'
import type { AuthFormState } from '@/types/Auth.type'
import Link from 'next/link'
import AuthButton from '@/components/AuthButton'

const initialState: AuthFormState = {
  error: undefined,
  fieldErrors: undefined,
  success: false,
  message: undefined,
}

export default function SignInPage() {
  const [signInState, signInFormAction] = useActionState(
    signInAction,
    initialState
  )

  const getFieldError = (fieldName: string) => {
    return signInState?.fieldErrors?.[fieldName]
  }

  const hasFieldError = (fieldName: string) => {
    return getFieldError(fieldName) !== undefined
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </Link>
          </p>
        </div>

        <form action={signInFormAction} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  hasFieldError('email')
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:z-10 sm:text-sm`}
                placeholder="Email address"
              />
              <FieldError errors={getFieldError('email')} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500
                 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          {signInState?.error && (
            <div className="text-sm text-center text-red-600">
              {signInState.error}
            </div>
          )}

          <div>
            <AuthButton>Sign in</AuthButton>
          </div>
        </form>
      </div>
    </div>
  )
}
