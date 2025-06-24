 import { Bold, Italic, List, ListOrdered } from "lucide-react"
import dynamic from "next/dynamic";
import {Editor} from '@tiptap/core'
import { useEffect } from "react";
 
const TipTapEditor = dynamic(
  () => import('@tiptap/react').then((mod) => mod.EditorContent),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-[200px] border rounded-lg bg-gray-50 animate-pulse" />
    )
  }
);


type EditorProps = {
  editor : Editor , 
  initialContent? : string , 
  onChange? : (data : string)=> void
}


export default function EditorCom({editor , initialContent , onChange }:EditorProps) {


    useEffect(()=>{
        if (!initialContent || !editor) return 
      if(initialContent != editor.getHTML()){
             editor.commands.setContent(initialContent)
      }
    
    },[initialContent , editor ])

    

    useEffect(()=>{
        if (!initialContent || !editor || !onChange) return 
      const handleUpdate = ({editor} : {editor : Editor}) =>{
               onChange(editor.getHTML())
      }

      editor.on('update' , handleUpdate)

      return ()=> {editor.off('update' , handleUpdate )}
    
    },[initialContent , editor , onChange ])


  

     
    return (
        <div> {/* Toolbar with Lucide Icons */}
      <div className="flex flex-wrap gap-1 p-2 border border-gray-300 rounded-t-md bg-gray-50">
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded cursor-pointer ${
            editor.isActive('bold') ? 'bg-gray-300' : ''
          }`}
          aria-label="Bold"
        >
          <Bold className="w-5 h-5" />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded cursor-pointer ${
            editor.isActive('italic') ? 'bg-gray-300' : ''
          }`}
          aria-label="Italic"
        >
          <Italic className="w-5 h-5" />
        </button>

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded cursor-pointer ${
            editor.isActive('bulletList') ? 'bg-gray-300' : ''
          }`}
          aria-label="Bullet List"
        >
          <List className="w-5 h-5" />
        </button>

        {/* Numbered List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded cursor-pointer ${
            editor.isActive('orderedList') ? 'bg-gray-300' : ''
          }`}
          aria-label="Numbered List"
        >
          <ListOrdered className="w-5 h-5" />
        </button>
      </div>


      <TipTapEditor 
      editor = { editor}
      className="rounded-md border border-gray-300 bg-white p-2 min-h-[200px]"  />    </div>
    )
  };
