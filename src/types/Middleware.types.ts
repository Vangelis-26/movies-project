import { NextRequest, NextResponse } from 'next/server'

export type MiddlewareFunction = (
  request: NextRequest,
  response?: NextResponse
) => NextResponse | Response | void | Promise<NextResponse | Response | void>
