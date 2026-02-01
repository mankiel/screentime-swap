import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Make all routes public - no authentication required
const isPublicRoute = createRouteMatcher(['(.*)'])

export default clerkMiddleware(async (auth, request) => {
  // All routes are public, no protection needed
  return
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
