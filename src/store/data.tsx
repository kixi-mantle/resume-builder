import {create} from 'zustand'
import { Template_1_type , Experience , Education } from '../ResumeTemplate/resumeSchema'



const defaultvalues : Template_1_type = {
     name: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  photo: null,
  summary: '',
  experience: [],
  education: [],
  additionalInfo: {},
}


type Store = {
    formData : Template_1_type;
    setFormData : (data : Template_1_type) => void;
}

const useStore = create<Store>((set)=>({
    formData : defaultvalues,
    setFormData : (data : Template_1_type) => set({formData : data}),

}))