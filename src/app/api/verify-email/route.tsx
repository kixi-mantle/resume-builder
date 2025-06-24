import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import { Types } from "mongoose";
import { createJWT } from "../../../server/safety";

export async function GET(request: NextRequest) {
    try {
        
        const searchParams = request.nextUrl.searchParams;
        const token = searchParams.get('token');
        const id = searchParams.get('id');


        if (!token || !id) {
            return NextResponse.json({
                success: false,
                message: "Missing verification parameters",
                redirectUrl: "/signup"
            }, { status: 400 });
        }

        await connectDB();

        const user = await User.findById(new Types.ObjectId(id)).select("+emailVerifyToken +emailVerifyExpires");
        
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Account not found",
                redirectUrl: "/signup"
            }, { status: 404 });
        }


        // Verify token match
        if (user.emailVerifyToken !== token) {
            
            
            return NextResponse.json({
                success: false,
                message: "Invalid verification token",
                redirectUrl: "/signup"
            }, { status: 400 });
        }

        // Verify expiration
        const expire = user.emailVerifyExpires?.getTime();
        if (!expire || Date.now() > expire) {
            
            
            return NextResponse.json({
                success: false,
                message: "Verification link has expired",
                redirectUrl: "/signup"
            }, { status: 400 });
        }

        // All checks passed - verify email
        user.isEmailVerified = true;
        user.emailVerifyToken = undefined;
        user.emailVerifyExpires = undefined;
        await user.save();

        // Create session
        const sessiontoken = await createJWT(user._id.toString())
        const response =  NextResponse.json({
            success : true ,
            message : "Account verified successsfully"
        })
        response.cookies.set('session', sessiontoken, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    path: '/'
});

return response

    } catch (error) {
        console.error('\n[Verify Email] ERROR:', error);
        return NextResponse.json({
            success: false,
            message: "Internal server error during verification",
            redirectUrl: "/signup"
        }, { status: 500 });
    }
}