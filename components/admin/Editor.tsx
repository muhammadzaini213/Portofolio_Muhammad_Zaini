"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

export default function Editor({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    // --- TAMBAHKAN BARIS INI ---
    immediatelyRender: false, 
    // ---------------------------
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none border border-white/10 p-4 min-h-[300px] focus:outline-none bg-white/[0.02] font-mono text-sm focus:border-accent/50 transition-all',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Sinkronisasi jika value berubah dari database (penting untuk mode Edit)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) {
    return <div className="min-h-[300px] bg-white/[0.02] border border-white/10 animate-pulse" />
  }

  return (
    <div className="w-full">
      <EditorContent editor={editor} />
    </div>
  )
}