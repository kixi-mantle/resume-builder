import { Bold, Italic, List, ListOrdered } from "lucide-react";
import dynamic from "next/dynamic";
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

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
  initialContent?: string;
  onChange?: (data: string) => void;
};

export default function EditorCom({ initialContent, onChange }: EditorProps) {
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
        class: 'min-h-[200px] p-2 outline-none whitespace-pre-wrap',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="min-h-[200px] border rounded-lg bg-gray-50 animate-pulse" />
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border border-gray-300 rounded-t-md bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded cursor-pointer ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}
          aria-label="Bold"
        >
          <Bold className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded cursor-pointer ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
          aria-label="Italic"
        >
          <Italic className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded cursor-pointer ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}
          aria-label="Bullet List"
        >
          <List className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded cursor-pointer ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}
          aria-label="Numbered List"
        >
          <ListOrdered className="w-5 h-5" />
        </button>
      </div>

      <TipTapEditor editor={editor} className="rounded-md border border-gray-300 bg-white p-2 min-h-[200px]" />
    </div>
  );
}
