import { z } from 'zod'
import type { AuthFormState, FieldError } from '@/types/Auth.type'

export function validateFormData<T>(
  schema: z.ZodSchema<T>,
  formData: FormData
): { success: true; data: T } | { success: false; fieldErrors: FieldError } {
  try {
    const rawData = Object.fromEntries(formData.entries())
    const validatedData = schema.parse(rawData)

    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: FieldError = {}

      error.issues.forEach((issue) => {
        const fieldName = issue.path.join('.')
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = []
        }
        fieldErrors[fieldName].push(issue.message)
      })

      return { success: false, fieldErrors }
    }
    return {
      success: false,
      fieldErrors: { general: ['Unexpected validation error'] },
    }
  }
}

export function createFormErrorResponse(error: string): AuthFormState {
  return { error, success: false }
}

export function createFieldErrorResponse(
  fieldErrors: FieldError
): AuthFormState {
  return { fieldErrors, success: false }
}
