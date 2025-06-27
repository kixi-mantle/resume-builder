import {z} from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';


const env = createEnv({
    server : {
        MONGO_URI : z.string().url(),
        JWT_SECRET : z.string().min(1),
        EMAIL_USERNAME : z.string().min(1),
        EMAIL_PASSWORD : z.string().min(1),
        REFRESH_TOKEN : z.string().min(1),
        CLIENT_SECRET : z.string().min(1),
        CLIENT_ID : z.string().min(1),
        GOOGLE_REDIRECT_URI : z.string().min(1),
        JWT_EXPIRES_IN : z.string().min(1),
        COUDINARY_API_SECRET : z.string().min(1),

    },

    client : {
     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME : z.string().min(1),  
     NEXT_PUBLIC_CLOUDINARY_API_KEY : z.string().min(1),
     NEXT_PUBLIC_BASE_URL : z.string().min(1),
    },
    experimental__runtimeEnv : {
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    }
})

export default env