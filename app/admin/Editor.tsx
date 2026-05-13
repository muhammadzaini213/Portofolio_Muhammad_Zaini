// components/admin/Editor.tsx
"use client"
import Image from "@tiptap/extension-image"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect, useCallback } from "react"
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Minus,
    Undo,
    Redo,
    Code2,
} from "lucide-react"

interface EditorProps {
    value: string
    onChange: (val: string) => void
}

type ToolbarButtonProps = {
    onClick: () => void
    active?: boolean
    disabled?: boolean
    title: string
    children: React.ReactNode
}

function ToolbarButton({ onClick, active, disabled, title, children }: ToolbarButtonProps) {
    return (
        <button
            type="button"
            title={title}
            disabled={disabled}
            onClick={onClick}
            className={`p-1.5 transition-all rounded-sm ${active
                    ? "bg-accent text-black"
                    : "text-white/50 hover:text-white hover:bg-white/10"
                } disabled:opacity-20 disabled:cursor-not-allowed`}
        >
            {children}
        </button>
    )
}

export default function Editor({ value, onChange }: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3] },
                bulletList: { keepMarks: true },
                orderedList: { keepMarks: true },
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class:
                    "prose prose-invert prose-sm max-w-none min-h-[320px] p-4 focus:outline-none text-white/80",
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        },
    })

    // Sync external value (e.g. on load)
    useEffect(() => {
        if (!editor) return
        const current = editor.getHTML()
        if (value !== current) {
            editor.commands.setContent(value, { emitUpdate: false })
        }
    }, [value, editor])

    const handleImagePaste = useCallback(
        async (e: React.ClipboardEvent) => {
            const items = Array.from(e.clipboardData.items)
            const imageItem = items.find((i) => i.type.startsWith("image/"))
            if (!imageItem || !editor) return

            e.preventDefault()
            const file = imageItem.getAsFile()
            if (!file) return

            try {
                const { uploadImage } = await import("@/lib/upload")
                const url = await uploadImage(file)
                editor.chain().focus().setImage({ src: url }).run()
            } catch {
                alert("Gagal upload gambar dari clipboard.")
            }
        },
        [editor]
    )

    if (!editor) return null

    const groups = [
        [
            { icon: <Undo size={14} />, title: "Undo", action: () => editor.chain().focus().undo().run(), disabled: !editor.can().undo() },
            { icon: <Redo size={14} />, title: "Redo", action: () => editor.chain().focus().redo().run(), disabled: !editor.can().redo() },
        ],
        [
            { icon: <Heading2 size={14} />, title: "Heading 2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
            { icon: <Heading3 size={14} />, title: "Heading 3", action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }) },
        ],
        [
            { icon: <Bold size={14} />, title: "Bold", action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
            { icon: <Italic size={14} />, title: "Italic", action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
            { icon: <Strikethrough size={14} />, title: "Strikethrough", action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive("strike") },
        ],
        [
            { icon: <List size={14} />, title: "Bullet List", action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
            { icon: <ListOrdered size={14} />, title: "Ordered List", action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
        ],
        [
            { icon: <Code size={14} />, title: "Inline Code", action: () => editor.chain().focus().toggleCode().run(), active: editor.isActive("code") },
            { icon: <Code2 size={14} />, title: "Code Block", action: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive("codeBlock") },
            { icon: <Quote size={14} />, title: "Blockquote", action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote") },
            { icon: <Minus size={14} />, title: "Divider", action: () => editor.chain().focus().setHorizontalRule().run() },
        ],
    ]

    return (
        <div className="border border-white/10 focus-within:border-accent/50 transition-all">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-white/[0.02]">
                {groups.map((group, gi) => (
                    <div key={gi} className="flex items-center gap-0.5">
                        {gi > 0 && <span className="w-px h-4 bg-white/10 mx-1" />}
                        {group.map((btn, bi) => (
                            <ToolbarButton
                                key={bi}
                                title={btn.title}
                                onClick={btn.action}
                                active={"active" in btn ? btn.active : false}
                                disabled={"disabled" in btn ? btn.disabled : false}
                            >
                                {btn.icon}
                            </ToolbarButton>
                        ))}
                    </div>
                ))}
                <span className="ml-auto text-[9px] text-white/20 uppercase tracking-wider">
                    Ctrl+Z undo · Paste image supported
                </span>
            </div>

            {/* Editor Area */}
            <div onPaste={handleImagePaste} className="bg-white/[0.02]">
                <EditorContent editor={editor} />
            </div>

            {/* Word count */}
            <div className="px-4 py-2 border-t border-white/5 bg-white/[0.01] flex justify-end">
                <span className="text-[9px] text-white/20 font-mono">
                    {editor.storage.characterCount?.characters?.() ?? editor.getText().length} chars
                </span>
            </div>
        </div>
    )
}