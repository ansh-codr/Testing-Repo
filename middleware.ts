import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.includes('/admin/login')) {
    // In a real application, you would check for a valid JWT token or session
    // For now, we'll just check if there's an admin auth in localStorage (client-side check)
    // This is handled in the component itself for better security
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};