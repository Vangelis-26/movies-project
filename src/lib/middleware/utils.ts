import { NextRequest, NextResponse } from 'next/server'
import { MiddlewareFunction } from '../../types/Middleware.types'

/**
 * Utility to combine multiple middlewares into a single function
 * @param middlewares - Array of middlewares to execute in sequence
 * @returns Combined middleware function
 */
export function chain(middlewares: MiddlewareFunction[]): MiddlewareFunction {
  return async (request: NextRequest, response?: NextResponse) => {
    let currentResponse = response || NextResponse.next()

    for (const middleware of middlewares) {
      const result = await middleware(request, currentResponse)

      if (result instanceof NextResponse || result instanceof Response) {
        currentResponse = result as NextResponse
      }

      // If the middleware returns a response that ends the chain
      if (currentResponse.status >= 300 && currentResponse.status < 400) {
        break // Redirect
      }
      if (currentResponse.status >= 400) {
        break // Error
      }
    }

    return currentResponse
  }
}
