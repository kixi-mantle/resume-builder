

interface Education {
    degree : string,
    institution : string , 
    date : string , 
}

interface Experience {
  position: string;
  company: string;
  date: string;
  achievements: string[];
}

export interface Template_1_type {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  photo?: string | null;
  summary: string;
  experience: Experience[];
  education: Education[];
  additionalInfo : object;
  
  
}