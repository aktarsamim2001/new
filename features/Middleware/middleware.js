import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  const protectedRoutes = ["/profile", "/book-test", "/buy", "/faq"];
  const path = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`),
  );

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/(profile|cart|faq|buy|book-test)(.*)?", // covers both base and nested routes, now includes book-test
    "/products/:path*",
  ],
};
