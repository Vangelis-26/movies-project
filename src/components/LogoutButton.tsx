'use client'

import { signOutAction } from '@/lib/actions/auth-actions'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border border-solid border-red-200 transition-colors flex items-center justify-center hover:bg-red-400 text-red-600 hover:text-white hover:cursor-pointer font-medium text-sm h-10 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Logging out...' : 'Log out'}
    </button>
  )
}

export default function LogoutButton() {
  return (
    <form action={signOutAction}>
      <SubmitButton />
    </form>
  )
}
