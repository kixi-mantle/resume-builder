// app/api/user/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import User from '../../../models/User'
import { connectDB } from '../../../lib/mongodb'
import { verifyJWT } from '../../../server/safety'

export async function GET() {
  try {
    

    const sessionCookie = (await  cookies()).get('session')?.value
    
    // 2. Verify session exists
    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

 await connectDB()

    
    
    const {userId} = verifyJWT(sessionCookie)
    const user = await User.findById(userId).select('name email _id').lean()

     if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

   return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email
    })

  } catch (error) {
    console.error('User fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}