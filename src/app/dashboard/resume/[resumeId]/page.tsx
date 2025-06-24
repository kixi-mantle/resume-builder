"use client"


import React, { use, useEffect, useRef, useState } from 'react'
import Template_1 from '../../../../ResumeTemplate/resumes/Template-1'; 
import FormWrapper from '../_components/FormWrapper'; 
import { notFound } from 'next/navigation';
import { getResume } from '../../../../action/resumeAction';
import { useForm } from 'react-hook-form';
import { ResumeVlidation, Template_1_type } from '../../../../ResumeTemplate/resumeSchema';
import { zodResolver } from '@hookform/resolvers/zod';


const Page = ({params} : { params : Promise<{resumeId : string}>}) => {
  const previewRef = useRef<HTMLDivElement>(null)
  const [height , setHeight] = useState(1123);
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
  const [title , setTitle] = useState<string>('') 
  const unwrappedParams =  use(params)
  const {resumeId} = unwrappedParams
  const {register , watch , control , handleSubmit , setValue , reset } = useForm<Template_1_type>({
    resolver : zodResolver(ResumeVlidation),
    defaultValues : defaultValues
  })
  
  
  
  useEffect(()=>{
     //call for data and provide the data to the defaultvalues
     const getResumeData = async()=>{
      const resume = await getResume(resumeId)
      if(!resume) notFound()
        const {title , ...data} = resume
      setTitle(title)
       reset(data)
    }

    
    getResumeData()
      
    
  },[resumeId, reset])
  
  
  
  
  useEffect(()=>{
    const updateDimensions = ()=>{
      setHeight(previewRef.current?.clientHeight ?? 1123)
      setWidth(previewRef.current?.clientWidth ?? 794)
  
      
      
    }
    
    updateDimensions();
    window.addEventListener("resize" , updateDimensions);
    return () => window.removeEventListener('resize',updateDimensions)
  },[])
  
  

  if (!resumeId)return notFound()

    
      const form : Template_1_type = watch();

  




  return (
    <div className = "h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]  px-[2rem] py-[4rem] relative flex justify-between items-center ">
       

       

       
            {/* form part */}
            <div  className='w-full lg:basis-[48%] h-full flex items-center '>
              <FormWrapper form={form} register={register} control={control} handleSubmit={handleSubmit} setValue={setValue}/>

            </div>

            {/* form preview */}

            <div className='basis-[48%] p-[1rem] h-full  my-8 bg-red-50 relative overflow-x-hidden overflow-y-auto scroll [&::-webkit-scrollbar]:hidden hidden lg:block'
           
            ref={previewRef}>
                 
            <Template_1 
              data={form} 
              height={height} 
              width={width} 
            />
          
            


        </div>
      
    </div>
  )
}

export default Page




