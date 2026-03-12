import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define paths that are always accessible
const publicPaths = ["/login", "/register", "/forgot-password"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Check if the user is authenticated via cookie
    const sessionToken = request.cookies.get("session_token")?.value;

    // 1. If user is logged in and trying to access auth pages, redirect to dashboard
    if (sessionToken && publicPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // 2. If user is NOT logged in and trying to access protected pages, redirect to login
    // We assume anything not in publicPaths and not static files/api is protected
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
    const isStaticAsset = pathname.match(/\.(.*)$/) || pathname.startsWith("/_next") || pathname === "/favicon.ico";

    if (!sessionToken && !isPublicPath && !isStaticAsset) {
        // Option to keep the original URL to redirect back after login
        const loginUrl = new URL("/login", request.url);
        // loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
