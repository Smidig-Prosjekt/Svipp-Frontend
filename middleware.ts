import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function validateSessionToken(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("session_token");
  let isAuthenticated = false;
  if (sessionCookie?.value) {
    isAuthenticated = await validateSessionToken(sessionCookie.value);
  }
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  if (isAuthRoute && isAuthenticated) {
    const redirectParam = request.nextUrl.searchParams.get("redirect");
    const targetPath = redirectParam || "/user";
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = targetPath;
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};

