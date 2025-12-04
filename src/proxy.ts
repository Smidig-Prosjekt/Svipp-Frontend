import { NextRequest, NextResponse } from 'next/server';

// Beskyttede ruter som krever autentisering
const protectedRoutes = ["/user"];

// Offentlige ruter som ikke krever autentisering
const publicRoutes = ["/login", "/register", "/"];

async function validateSession(
  sessionToken: string,
  request: NextRequest
): Promise<boolean> {
  try {
    // Bruk absolutt URL for backend API
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5087";
    const apiUrl = `${apiBaseUrl}/api/auth/session`;

    // Send request med cookie header
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session_token=${sessionToken}`,
        // Forward original headers for bedre kompatibilitet
        "User-Agent": request.headers.get("user-agent") || "",
      },
      cache: "no-store",
    });

    return response.ok;
  } catch (error) {
    console.error("Session validation error in proxy:", error);
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("session_token")?.value;

  // Sjekk om ruten er beskyttet
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Hvis ruten er beskyttet, valider session
  if (isProtectedRoute) {
    if (!sessionToken) {
      // Ingen token, redirect til login
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Valider token mot backend
    const isValid = await validateSession(sessionToken, request);
    if (!isValid) {
      // Ugyldig token, redirect til login
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      const response = NextResponse.redirect(loginUrl);
      // Fjern ugyldig cookie
      response.cookies.delete("session_token");
      return response;
    }
  }

  // Hvis brukeren er logget inn og prøver å gå til login/register, redirect til /user
  if (sessionToken && publicRoutes.includes(pathname)) {
    // Valider at tokenet faktisk er gyldig før redirect
    const isValid = await validateSession(sessionToken, request);
    if (isValid) {
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
