import { NextRequest } from 'next/server'
import { chain } from './lib/middleware/utils'
import { authMiddleware } from './lib/middleware/authMiddleware'

export function middleware(request: NextRequest) {
  return chain([authMiddleware])(request)
}

export const config = {
  matcher: [
    /*
     * Run the middleware on all routes except:
     * - /api/auth (authentication routes)
     * - /_next/static (static files)
     * - /_next/image (image optimization)
     * - /favicon.ico
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
