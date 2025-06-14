import {z} from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';


const env = createEnv({
    server : {
        MONGO_URI : z.string().url(),
        JWT_SECRET : z.string().min(1),
        EMAIL_USERNAME : z.string().min(1),
        EMAIL_PASSWORD : z.string().min(1),
    },
    experimental__runtimeEnv : true
})

export default env