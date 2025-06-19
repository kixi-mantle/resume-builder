import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: 'authorization_code',
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, refresh_token, id_token, expires_in } = tokenResponse.data;

    const res = await axios('https://www.googleapis.com/oauth2/v3/userinfo',{
        headers : {
            Authorization : `Bearer ${access_token}`
        }
    })

    //db logic goes here or i can make a server action 

    // Here, save tokens in DB or session (this example just returns them)
    return NextResponse.json({ access_token, refresh_token, id_token, expires_in });
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return NextResponse.json({ error: 'Failed to exchange code for token' }, { status: 500 });
  }
}
