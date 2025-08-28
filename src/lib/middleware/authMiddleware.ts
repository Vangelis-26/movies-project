import { NextRequest, NextResponse } from 'next/server'
import { MiddlewareFunction } from '../../types/Middleware.types'
import { verifyToken } from '@/utils/auth/auth-utils'

export const authMiddleware: MiddlewareFunction = async (
  request: NextRequest
) => {
  // Retrieve the token from cookies
  const token = request.cookies.get('auth-token')?.value

  // Check if the user is logged in
  const user = token ? await verifyToken(token) : null

  // Public pages that do not require authentication
  const publicPaths = ['/signin', '/signup']
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname)

  // Public API routes
  const isApiAuth = request.nextUrl.pathname.startsWith('/api/auth')

  // If the user is not logged in and tries to access a protected page
  if (!user && !isPublicPath && !isApiAuth) {
    const url = request.nextUrl.clone()
    url.pathname = '/signin'
    return NextResponse.redirect(url)
  }

  // If the user is logged in and tries to access the auth pages
  if (
    user &&
    (request.nextUrl.pathname === '/signin' ||
      request.nextUrl.pathname === '/signup')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
