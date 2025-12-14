import { auth } from "@/src/auth"; 
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !isLoggedIn) {
    // If trying to access dashboard without login, kick them to login page
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
});

// Paths where middleware should run
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};