"use client"


import React, { useEffect, useRef, useState } from 'react'
import Template_1 from '../../../ResumeTemplate/resumes/Template-1'; 
import FormWrapper from '../_components/FormWrapper'; 


const Page = () => {
  const resumeData = {
  name: "Jacqueline Thompson",
  address: "123 Anywhere St., Any City",
  phone: "123-456-7890",
  email: "hello@reallygreatsite.com",
  website: "www.reallygreatsite.com",
  photo: "/path-to-photo.jpg",
  summary: "Results-oriented Engineering Executive with a proven track record...",
  
  experience: [

    
    {
      position: "Project Engineer",
      company: "Salford & Co",
      date: "Mar 2021 - Dec 2022",
      achievements: 
      '<p>HTML content from Quill</p>'
        
      
    },
   
  ],
  
  education: [
    {
      degree: "Master of Science in Mechanical Engineering",
      institution: "University of Engineering and Technology",
      date: "Sep 2019 - Oct 2020",
      
    },
    {
      degree: "Bachelor of Science in Civil Engineering",
      institution: "City College of Engineering",
      date: "Aug 2015 - Aug 2019",
     
    }
  ],
  
  additionalInfo : '<p>HTML content from Quill</p>'
};



const previewRef = useRef<HTMLDivElement>(null)
const [height , setHeight] = useState(1123);
const [width , setWidth] = useState(794);



useEffect(()=>{
   //call for data and provide the data to the defaultvalues
  
},[])




useEffect(()=>{
  const updateDimensions = ()=>{
    setHeight(previewRef.current?.clientHeight ?? 1123)
    setWidth(previewRef.current?.clientWidth ?? 794)

    
    
  }
  
  updateDimensions();
  window.addEventListener("resize" , updateDimensions);
  return () => window.removeEventListener('resize',updateDimensions)
},[])


  return (
    <div className = "h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]  px-[2rem] py-[4rem] relative flex justify-between items-center ">

       
            {/* form part */}
            <div  className='w-full lg:basis-[48%] h-full flex items-center '>
              <FormWrapper />

            </div>

            {/* form preview */}

            <div className='basis-[48%] p-[1rem] h-full  my-8 bg-red-50 relative overflow-x-hidden overflow-y-auto scroll [&::-webkit-scrollbar]:hidden hidden lg:block'
           
            ref={previewRef}>
                 
            <Template_1 
              data={resumeData} 
              height={height} 
              width={width} 
            />
          
            


        </div>
      
    </div>
  )
}

export default Page




