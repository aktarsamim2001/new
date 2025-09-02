import { NextResponse } from 'next/server'

export function middleware(request) {
  // Get the path
  const path = request.nextUrl.pathname

  // Define protected routes
  const protectedRoutes = ['/user-dashboard', '/book-test']

  // Check if the current path starts with any protected route
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))

  // Get the token from cookies
  const token = request.cookies.get('authToken')?.value

  // If it's a protected route and there's no token
  if (isProtectedRoute && !token) {
    // Redirect to login page with callback URL
    const callbackUrl = encodeURIComponent(path)
    return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${callbackUrl}`, request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/user-dashboard/:path*',
    '/book-test/:path*',
  ]
}
