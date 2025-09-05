import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const isCompleted = request.cookies.get("is_completed")?.value === "true";
  const path = request.nextUrl.pathname;

  const protectedRoutes = ["/complete-profile", "/book-test", "/buy", "/faq", "/user-dashboard"];

  if (!token) {
    // Login নাই → sign-in এ redirect
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(signInUrl);
  }

  // token আছে → কিন্তু profile complete না
  if (!isCompleted && path !== "/complete-profile") {
    return NextResponse.redirect(new URL("/complete-profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/complete-profile/:path*",
    "/book-test/:path*",
    "/buy/:path*",
    "/faq/:path*",
    "/user-dashboard/:path*",
  ],
};
