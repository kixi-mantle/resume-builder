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
    authRoutes : ['/signin' , 'singup']
}


export async function middleware(request : NextRequest){

    const {pathname} = request.nextUrl
    const token = request.cookies.get('session')?.value;

    
    const isPrivate = ROUTE_CONFIG.private.some(path => pathname.startsWith(path))
    

    const isAuthRoute = ROUTE_CONFIG.authRoutes.includes(pathname)

    if(!token && isPrivate ){
         const signInUrl = new URL('/signin', request.url)
    signInUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(signInUrl)
    }

    const isVerified = token ? !!(await verifyJWT(token)) : false
    if (!isVerified) request.cookies.set('session' , '')
    
    
    

    
 


   

     if (isAuthRoute && isVerified) {
    const redirectUrl = request.nextUrl.searchParams.get('redirect') || '/dashboard'
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

   if (isPrivate && !isVerified) {
    const signInUrl = new URL('/signin', request.url)
    signInUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()

}
