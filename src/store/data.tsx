import {create} from 'zustand'
import { Template_1_type  } from '../ResumeTemplate/resumeSchema'



const defaultvalues : Template_1_type = {
     name: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  photo: null,
  summary: '',
  experience:[],
  education: [],
  additionalInfo: '',
}


type Store = {
    formData : Template_1_type;
    setFormData : (data : Template_1_type) => void;
}
type updateStore =  {
    resumePartialUpdate : boolean ,
    setResumePartialUpdate : (data : boolean) => void , 
    resumeFullUpdate : boolean ,
    setResumeFullUpdate : (data : boolean) => void , 
}

export const useStore = create<Store>((set)=>({
    formData : defaultvalues,
    setFormData : (data : Template_1_type) => set({formData : data}),

}))

export const useUpdateStore = create<updateStore>((set)=>({
    resumePartialUpdate : true ,
    setResumePartialUpdate : (data : boolean) => set({resumePartialUpdate : data}) , 
    resumeFullUpdate : true ,
    setResumeFullUpdate : (data : boolean) => set({resumeFullUpdate : data}) , 
}))