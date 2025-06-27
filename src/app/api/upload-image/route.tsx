
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "../../../server/cloudinary";
import { UploadApiResponse } from "cloudinary";

export const config = {
    api : {
        bodyParser : false
    }
}



export  const   POST = async(req : NextRequest)=>{
 
try {
    const formData = await req.formData();
    const file = formData.get('file') as File

    if(!file){
        return NextResponse.json(
            {error : 'No file uploaded'},
            {status : 400}
        )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes);
    
    const result : UploadApiResponse = await new Promise((resolve , reject)=> {
        cloudinary.uploader.upload_stream(
            {folder : 'resume_uploads'},
            (error , result) =>{
                if(error) reject(error);
                if(!result) return reject(new Error('upload returned no result'))
                resolve(result)
            }
        ).end(buffer)
    })
    
      console.log(result)

    return NextResponse.json({url : result.secure_url});
   }catch(error){
    console.error("upload error:" ,error);
    return NextResponse.json({ error : 'upload failed'} , {status  : 500});
   }
}
