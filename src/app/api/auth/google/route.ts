

import { NextResponse } from "next/server";
import env from "../../../../server/data";

export async function GET(){
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
        client_id : env.CLIENT_ID,
        redirect_uri : env.GOOGLE_REDIRECT_URI,
        response_type : 'code',
        scope : [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/gmail.send',
        ].join(' '),
        access_type : 'offline',
        prompt : 'consent',
        
    };

    const qs = new URLSearchParams(options);

    return NextResponse.redirect(`${rootUrl}?${qs.toString()}`)
    
}