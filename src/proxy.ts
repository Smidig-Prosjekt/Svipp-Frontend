import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const token = req.cookies.get('session_token'); // or whatever your cookie is

  const isProtected =
    req.nextUrl.pathname.startsWith('/user')

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*'],
};
