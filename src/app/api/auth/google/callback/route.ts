import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import User from '../../../../../models/User';
import { connectDB } from '../../../../../lib/mongodb';
import { createJWT } from '../../../../../server/safety';
import env from '../../../../../server/data';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    const url = new URL('/login?error=google_auth_failed', req.url);
return NextResponse.redirect(url.toString());
  }

  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', new URLSearchParams({
      code,
      client_id: env.CLIENT_ID,
      client_secret: env.CLIENT_SECRET,
      redirect_uri: env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = tokenResponse.data;

    const res = await axios('https://www.googleapis.com/oauth2/v3/userinfo',{
        headers : {
            Authorization : `Bearer ${access_token}`
        }
    })
    
    const { data} = res


    console.log(data);
    

    await connectDB()

    let user = await User.findOne({ email: data.email, authType: 'google' });

if (!user) {
  user = new User({ 
    email: data.email, 
    name: data.name, 
    isEmailVerified: data.email_verified, 
    authType: 'google' 
  });
} else {
  user.name = data.name;
  user.isEmailVerified = data.email_verified;
}

    await user.save()

const sessiontoken = await createJWT(user._id.toString())
        const response =  NextResponse.redirect('/dashboard')
        response.cookies.set('session', sessiontoken, {
        httpOnly: true,
        secure: false,
       
        sameSite: 'lax',
        path: '/'
});

   return response 


    // Here, save tokens in DB or session (this example just returns them)
    
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    const url = new URL('/login?error=google_auth_failed', req.url);
return NextResponse.redirect(url.toString());
  }
}
