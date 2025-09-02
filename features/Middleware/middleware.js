// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  const protectedRoutes = ["/profile", "/book-test", "/buy", "/faq", "/user-dashboard"];
  const path = request.nextUrl.pathname;

  // Check protected
  const isProtected = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  if (!token && isProtected) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// only these routes will trigger middleware
export const config = {
  matcher: [
    "/profile/:path*",
    "/book-test/:path*",
    "/buy/:path*",
    "/faq/:path*",
    "/user-dashboard/:path*",
  ],
};
