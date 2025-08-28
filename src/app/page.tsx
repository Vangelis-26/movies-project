import LogoutButton from '@/components/LogoutButton'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome!
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            You have successfully logged in to your movie application.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex justify-center">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}
