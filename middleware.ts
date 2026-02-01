import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware does nothing - all routes are public
// Clerk env vars exist but are not being used
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
