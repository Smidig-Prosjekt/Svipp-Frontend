import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("session_token");
  const isAuthenticated = Boolean(sessionCookie?.value);
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  if (isAuthRoute && isAuthenticated) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/user";
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};

