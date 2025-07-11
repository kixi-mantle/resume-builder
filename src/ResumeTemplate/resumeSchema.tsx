import { z } from "zod";


export type  Education =  {
    degree : string,
    institution : string , 
    date : string , 
}

export type Experience  = {
  position: string;
  company: string;
  date: string;
  achievements: string;
}

export type Template_1_type = {
  name: string;
  occupation : string;
  address: string;
  phone: string;
  email: string;
  website: string;
  photo: string | null;
  summary: string;
  experience: Experience[];
  education: Education[];
  additionalInfo : string;
  
  
}

export const ResumeVlidation = z.object({
            name : z.string().min(1 , {message : "Field is required"}),
            occupation : z.string().min(1 , {message : "Field is required"}),
            address : z.string().min(1 , {message : "Field is required"}),
            phone : z.string().min(1 , {message : "Field is required"}),
            email : z.string().min(1 , {message : "Field is required"}),
            website : z.string(),
            photo : z.string().nullable(),
            summary : z.string(),
            experience : z.array(z.object({
               position: z.string().trim().min(1 , {message : "Field is required"}),
                company: z.string().trim().min(1 , {message : "Field is required"}),
                date: z.string().trim().min(1 , {message : "Field is required"}),
                achievements: z.string().trim().min(1 , {message : "Field is required"}),
            })),
            education : z.array(z.object({
               degree : z.string().trim().min(1 , {message : "Field is required"}),
               institution : z.string().trim().min(1 , {message : "Field is required"}),
               date : z.string().trim().min(1 , {message : "Field is required"}),
            })),
            additionalInfo : z.string() 
})