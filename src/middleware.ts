// import { NextRequest, NextResponse } from "next/server"



// export const config = {
//     matcher : [
//     '/((?!_next/static|_next/image|favicon.ico|$).*)', 
//     ]
// }


// const ROUTE_CONFIG = {
//     public: [
//         '/signin',
//         '/signup',
//         '/',
//     ],
//     private : [
//         '/dashboard'
//     ],
//     authRoutes : ['/singin' , 'singup']
// }


// export function middleware(request : NextRequest){

//     const {pathname} = request.nextUrl
//     const isVerified = Boolean(request.cookies.get('session')?.value);

//     const isPrivate = ROUTE_CONFIG.private.some(path => 
//         new RegExp(`^${path.replace('.* ', '(/.*)?')}$`).test(pathname)
//     )

//     const isAuthRoute = ROUTE_CONFIG.authRoutes.includes(pathname)

//      if (isAuthRoute && isVerified) {
//     const redirectUrl = request.nextUrl.searchParams.get('redirect') || '/dashboard'
//     return NextResponse.redirect(new URL(redirectUrl, request.url))
//   }

//    if (isPrivate && !isVerified) {
//     const signInUrl = new URL('/signin', request.url)
//     signInUrl.searchParams.set('redirect', pathname)
//     return NextResponse.redirect(signInUrl)
//   }

//   return NextResponse.next()

// }

export default function middleware(){
    
}