import dynamic from "next/dynamic";
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from "react";

const TipTapEditor = dynamic(
  () => import('@tiptap/react').then((mod) => mod.EditorContent),
  { 
    ssr: false,
    loading: () => (
      <div className="w-[794px] h-[1123px] border rounded-lg bg-white animate-pulse" />
    )
  }
);

type EditorProps = {
  initialContent?: string;
  onChange?: (data: string) => void;
  content : string
};

export default function EditorPreviewCom({ initialContent, onChange , content }: EditorProps) {
  const editor = useEditor({
    content: initialContent || '',
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: 'list-disc pl-4' }},
        orderedList: { HTMLAttributes: { class: 'list-decimal pl-4' }},
      }),
    ],
    editorProps: {
      attributes: {
        class: 'w-[794px] h-[1123px] border rounded-lg bg-white p-2 outline-none whitespace-pre-wrap',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(()=>{
    if(!editor) return 
    editor.commands.setContent(content)
  },[content , editor])

  if (!editor) {
    return (
      <div className="min-h-[200px] border rounded-lg bg-gray-50 animate-pulse" />
    );
  }

  return (
    <div>
      {/* Toolbar */}
      

      <TipTapEditor editor={editor} className="  bg-white p-2 h-[1123px] w-[794px]" />
    </div>
  );
}
