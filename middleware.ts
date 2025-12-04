// middleware.ts

import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const protectedPaths = ['/dashboard', '/admin'];
  const isProtected = protectedPaths. some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // If accessing protected route without auth, redirect to login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If accessing admin without admin role
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    token?. role !== 'ADMIN'
  ) {
    return NextResponse. redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/shadow-realm/:path*'],
};
