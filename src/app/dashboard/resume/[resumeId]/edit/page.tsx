"use client"

import React, { use, useEffect, useRef, useState } from 'react'
import Template_1 from '../../../../../ResumeTemplate/resumes/Template-1'; 
import FormWrapper from '../../_components/FormWrapper'; 
import { notFound } from 'next/navigation';
import { getResume } from '../../../../../action/resumeAction';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Template_1_type , ResumeVlidation} from '../../../../../ResumeTemplate/resumeSchema';
import { useRouter } from 'next/navigation';
import { File } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog'; // Assuming you're using shadcn/ui
import { DialogTitle } from '@radix-ui/react-dialog';

const Page = ({params} : { params : Promise<{resumeId : string}>}) => {
const router = useRouter()
const [showPreview, setShowPreview] = useState(false); // State for modal visibility

const previewRef = useRef<HTMLDivElement>(null)
const [modalWidth , setModalWidth] = useState(794)
const [width , setWidth] = useState(794);
const defaultValues  = {
      name: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  photo: null,
  summary: '',
  experience: [],
  education: [],
  additionalInfo: '',
}
const unwrappedParams =  use(params)
const {resumeId} = unwrappedParams
const {register , watch , control , handleSubmit , setValue , reset } = useForm<Template_1_type>({
  resolver : zodResolver(ResumeVlidation),
  defaultValues : defaultValues
})

useEffect(()=>{
    const getResumeData = async()=>{
      
    const resume = await getResume(resumeId)
    
    if (!resume) {
    router.push('/not-found');
    return;
  }
      const {...data} = resume
      reset(data)
  }
  getResumeData()
},[resumeId , reset , router])

useEffect(()=>{
  const updateDimensions = ()=>{
    
    setWidth(previewRef.current?.clientWidth ?? 794)
    setModalWidth(window.innerWidth * 0.80)
  }
  
  updateDimensions();
  window.addEventListener("resize" , updateDimensions);
  return () => window.removeEventListener('resize',updateDimensions)
},[])

if (!resumeId) return notFound()

const form : Template_1_type = watch();

return (
 <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-indigo-50 max-h-[calc(100vh-4rem)] px-[2rem] py-[4rem] relative flex justify-between items-center bg-gray-50">
  {/* form part */}
  <div className='w-full lg:basis-[48%] h-full flex items-center'>
    <FormWrapper 
      form={form} 
      register={register} 
      control={control} 
      handleSubmit={handleSubmit} 
      setValue={setValue} 
      resumeId={resumeId}
    />
  </div>

  {/* Desktop preview */}
  <div className='w-full lg:basis-[48%] p-[1rem] h-full my-8 bg-white rounded-md relative overflow-x-hidden overflow-y-auto scroll [&::-webkit-scrollbar]:hidden hidden lg:block border border-gray-200 shadow-sm'
    ref={previewRef}>
    <Template_1 
      data={form} 
      width={width} 
    />
  </div>

  {/* Mobile preview button - now with red theme */}
  <button 
    onClick={() => setShowPreview(true)}
    className="fixed bottom-6 right-[50%] translate-x-[50%] lg:hidden flex items-center px-4 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
  >
    <File className='mr-2'/>
    Preview
  </button>

  {/* Mobile preview modal */}
  <Dialog open={showPreview} onOpenChange={setShowPreview}>
    <DialogContent className="w-[90vw] h-[90vh] max-w-[800px]">
      <DialogTitle className='text-red-600 text-xl font-semibold text-center mb-4'>
        Resume Preview
      </DialogTitle>
      <div className="w-full h-full p-[1rem] bg-white rounded-md relative overflow-y-auto overflow-x-hidden scroll [&::-webkit-scrollbar]:hidden border border-gray-200">
        <Template_1 
          data={form} 
          width={modalWidth} 
        />
      </div>
    </DialogContent>
  </Dialog>
</div>
)
}

export default Page