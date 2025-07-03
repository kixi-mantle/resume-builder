import { NextRequest, NextResponse } from "next/server"
import { verifyJWT } from "./server/safety";



export const config = {
    matcher : [
    '/((?!_next/static|_next/image|favicon.ico|$).*)', 
    ]
}


const ROUTE_CONFIG = {
    public: [
        '/signin',
        '/signup',
        '/',
    ],
    private : [
        '/dashboard'
    ],
    authRoutes : ['/signin' , 'signup']
}


export async function middleware(request : NextRequest){

    const {pathname} = request.nextUrl
    const token = request.cookies.get('session')?.value;

    
    const isPrivate = ROUTE_CONFIG.private.some(path => pathname.startsWith(path))
    

    const isAuthRoute = ROUTE_CONFIG.authRoutes.includes(pathname)
    const isVerified = token ? !!(await verifyJWT(token)) : false
    
    
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

  return NextResponse.next()

}
