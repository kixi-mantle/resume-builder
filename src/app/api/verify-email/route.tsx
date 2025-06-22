import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import { Types } from "mongoose";
import { createJWT } from "../../../server/safety";

export async function POST(request: NextRequest) {
    try {
        console.log('\n[Verify Email] Starting verification process');
        
        const searchParams = request.nextUrl.searchParams;
        const token = searchParams.get('token');
        const id = searchParams.get('id');

        console.log(`\n[Verify Email] Received token: ${token?.substring(0, 5)}..., id: ${id}`);

        if (!token || !id) {
            console.error('\n[Verify Email] Missing token or id');
            return NextResponse.json({
                success: false,
                message: "Missing verification parameters",
                redirectUrl: "/signup"
            }, { status: 400 });
        }

        await connectDB();
        console.log('\n[Verify Email] Connected to DB');

        const user = await User.findById(new Types.ObjectId(id)).select("+emailVerifyToken +emailVerifyExpires");
        
        if (!user) {
            console.error('\n[Verify Email] User not found');
            return NextResponse.json({
                success: false,
                message: "Account not found",
                redirectUrl: "/signup"
            }, { status: 404 });
        }

        console.log(`\n[Verify Email] User found: ${user.email}`);

        // Verify token match
        if (user.emailVerifyToken !== token) {
            console.error('\n[Verify Email] Token mismatch');
            console.log(`Stored token: ${user.emailVerifyToken?.substring(0, 5)}...`);
            console.log(`Received token: ${token.substring(0, 5)}...`);
            
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
            success: true,
            message: "Email verified successfully",
            redirectUrl: "/dashboard"
        });
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