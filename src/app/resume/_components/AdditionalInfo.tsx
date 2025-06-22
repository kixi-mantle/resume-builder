"use client"

import {  UseFormSetValue } from "react-hook-form"
import { Template_1_type } from "../../../ResumeTemplate/resumeSchema"
import EditorCom from "./Editor";
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";




import 'prosemirror-view/style/prosemirror.css';



export type InfoProps = {
      data : {
        additionalInfo : string
    } ; 
    setValue : UseFormSetValue<Template_1_type>
    
}

const AdditionalInfo = ({setValue  , data} : InfoProps)=>{


  
     const editor =  useEditor({
      extensions: [StarterKit.configure({
              bulletList: {
                HTMLAttributes: {
                  class: 'list-disc pl-4',
                },
              },
              orderedList: {
                HTMLAttributes: {
                  class: 'list-decimal pl-4',
                },
            },
            })],
      content: data.additionalInfo,
       editorProps : {
      attributes : {
        class: 'min-h-[200px] p-2 outline-none whitespace-pre-wrap'
      },
    },
      onUpdate: ({ editor }) => {
        // Update form state on every change
        setValue('additionalInfo', editor.getHTML(), { shouldValidate: true });
      },

      autofocus : true,
      immediatelyRender:false
  
    });
  
    if (!editor) {
      return (
        <div className="flex flex-col w-full space-y-2">
          <label className="text-sm font-semibold text-gray-600">Summary</label>
          <div className="p-4 bg-gray-100 rounded-md text-gray-500">
            Loading editor...
          </div>
        </div>
      );
    }
  

  

    return(
        <div className="flex flex-col w-full">
        <label className="text-sm font-semibold text-gray-600">Summary</label>
        

        <EditorCom editor={editor} />
       
      </div>
            
    )
}

export default AdditionalInfo;