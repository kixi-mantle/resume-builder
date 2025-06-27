"use client"

import {  UseFormSetValue } from "react-hook-form"
import { Template_1_type } from "../../../../ResumeTemplate/resumeSchema"



import 'prosemirror-view/style/prosemirror.css';
import EditorCom from "./Editor";




export type SummaryProps = {
      data : {
        summary : string
    } ; 
    setValue : UseFormSetValue<Template_1_type>
    
}

const Summary = ({setValue  , data} : SummaryProps)=>{


   


    return(
        <div className="flex flex-col w-full">
        <label className="text-sm font-semibold text-gray-600">Summary</label>
      <EditorCom initialContent={data.summary} onChange={(data)=>{
        setValue('summary' , data)
      }} />
      </div>
            
    )
}

export default Summary;