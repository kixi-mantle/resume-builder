

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
  address: string;
  phone: string;
  email: string;
  website: string;
  photo: string | null;
  summary: string;
  experience: Experience[];
  education: Education[];
  additionalInfo : object;
  
  
}