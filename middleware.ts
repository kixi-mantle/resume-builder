import { NextRequest, NextResponse } from "next/server"
import { verifyJWT } from "./src/server/safety"

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/signin",
    "/signup",
  ]
}

const ROUTE_CONFIG = {
    public: [
        '/signin',
        '/signup',
        '/',
    ],
    private: [
        '/dashboard'
    ],
    authRoutes: ['/signin', '/signup'] // Fixed: Added missing slash before 'signup'
}

export async function middleware(request: NextRequest) {
     console.log('Middleware triggered for:', request.nextUrl.pathname) 
    const { pathname } = request.nextUrl
    const token = request.cookies.get('session')?.value

    const isPrivate = ROUTE_CONFIG.private.some(path => pathname.startsWith(path))
    const isAuthRoute = ROUTE_CONFIG.authRoutes.includes(pathname)
    const isVerified = token ? !!(await verifyJWT(token)) : false

    // 1. Handle invalid tokens
    if (token && !isVerified) {
        const response = NextResponse.redirect(new URL('/signin', request.url))
        response.cookies.delete('session')
        return response
    }

    // 2. Handle private routes without token
    if (isPrivate && !isVerified) {
        const signInUrl = new URL('/signin', request.url)
        signInUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(signInUrl)
    }

    // 3. Prevent authenticated users from accessing auth routes
    if (isAuthRoute && isVerified) {
        const redirectUrl = request.nextUrl.searchParams.get('redirect') || '/dashboard'
        return NextResponse.redirect(new URL(redirectUrl, request.url))
    }

    // 4. Handle missing token for private routes (redundant but safe)
    if (isPrivate && !token) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    return NextResponse.next()
}