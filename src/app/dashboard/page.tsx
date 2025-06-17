"use client"


import React, { useEffect, useRef, useState } from 'react'
import Template_1 from '../../ResumeTemplate/resumes/Template-1';

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
        
      position: "Engineering Executive",
      company: "Borcelle Technologies",
      date: "Jan 2023 - Present",
      achievements: [
        "Implemented cost-effective solutions, resulting in a 20% reduction in project expenses.",
        "Streamlined project workflows, enhancing overall efficiency by 25%.",
        "Led a team in successfully delivering a complex engineering project on time and within allocated budget."
      ]
    },
    {
      position: "Project Engineer",
      company: "Salford & Co",
      date: "Mar 2021 - Dec 2022",
      achievements: [
        "Managed project timelines, reducing delivery times by 30%.",
        "Spearheaded the adoption of cutting-edge engineering software, improving project accuracy by 15%.",
        "Collaborated with cross-functional teams, enhancing project success rates by 10%."
      ]
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
  
  additionalInfo : {
    skills : "this,that patakljfla;kjd",
    pure : "this,that patakljfla;kjd",
    name : "this,that patakljfla;kjd",
    
  }
};

const previewRef = useRef<HTMLDivElement>(null)
const [height , setHeight] = useState(1123);
const [width , setWidth] = useState(794);


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
    <div className = "container flex justify-center items-center ">

        <div className='w-full flex'>

            {/* form part */}
            <div  className='basis-[50%]'>

            </div>

            {/* form preview */}

            <div className='basis-[50%]  h-[600px] bg-red-50 relative overflow-hidden ' 
            ref={previewRef}>
                 
            <Template_1 
              data={resumeData} 
              height={height} 
              width={width} 
            />
          
            </div>


        </div>
      
    </div>
  )
}

export default Page




