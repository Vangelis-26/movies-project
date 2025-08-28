'use client'

import { useState, useActionState } from 'react'
import { signUpAction } from '@/lib/actions/auth-actions'
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

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [signUpState, signUpFormAction] = useActionState(
    signUpAction,
    initialState
  )

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
  }

  const getFieldError = (fieldName: string) => {
    return signUpState?.fieldErrors?.[fieldName]
  }

  const hasFieldError = (fieldName: string) => {
    return getFieldError(fieldName) !== undefined
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form action={signUpFormAction} className="mt-8 space-y-6">
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
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
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
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  hasFieldError('password')
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
              <FieldError errors={getFieldError('password')} />
            </div>
          </div>

          {signUpState?.error && (
            <div className="text-sm text-center text-red-600">
              {signUpState.error}
            </div>
          )}

          {signUpState?.success && signUpState?.message ? (
            <div className="text-sm text-center text-green-600">
              {signUpState.message}
              <div className="mt-2">
                <Link
                  href="/signin"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in now
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <AuthButton>Create account</AuthButton>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
