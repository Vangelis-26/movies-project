interface FieldErrorProps {
  errors?: string[]
}

export function FieldError({ errors }: FieldErrorProps) {
  if (!errors || errors.length === 0) {
    return null
  }

  return (
    <div className="mt-1 text-sm text-red-600">
      {errors.map((error, index) => (
        <div key={index}>{error}</div>
      ))}
    </div>
  )
}
