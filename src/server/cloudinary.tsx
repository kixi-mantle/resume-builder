

import { v2 as cloudinary} from 'cloudinary';
import env from './data';


 cloudinary.config({
    cloud_name : env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key : env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret : env.COUDINARY_API_SECRET,
})

export default cloudinary;