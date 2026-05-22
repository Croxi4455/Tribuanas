import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import {
    Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2,
    List, ListOrdered, Link2, Minus, Undo, Redo, AlignLeft, AlignCenter, AlignRight, Quote,
} from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

type Props = {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    className?: string;
};

function ToolBtn({ onClick, active, children, title }: { onClick: () => void; active?: boolean; children: React.ReactNode; title: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${active ? 'bg-[#F5B800]/20 text-[#F5B800]' : 'text-white/40 hover:bg-white/8 hover:text-white'}`}
        >
            {children}
        </button>
    );
}

function Divider() {
    return <div className="mx-1 h-5 w-px bg-white/10" />;
}

export default function RichEditor({ value, onChange, placeholder = 'Tulis konten...', className = '' }: Props) {
    const [, setForceUpdate] = useState(0);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
                blockquote: true,
                bulletList: true,
                orderedList: true,
                horizontalRule: true,
                history: true,
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { class: 'text-[#F5B800] underline' },
            }),
            Placeholder.configure({ placeholder }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
            setForceUpdate(n => n + 1);
        },
        onSelectionUpdate: () => {
            setForceUpdate(n => n + 1);
        },
        onTransaction: () => {
            setForceUpdate(n => n + 1);
        },
        editorProps: {
            attributes: {
                class: 'min-h-[200px] px-4 py-3 text-sm text-white outline-none leading-relaxed prose prose-invert prose-sm max-w-none prose-headings:text-white prose-headings:font-black prose-p:text-white/70 prose-a:text-[#F5B800] prose-strong:text-white prose-li:text-white/70 prose-blockquote:border-[#F5B800]/30 prose-blockquote:text-white/50',
            },
        },
        immediatelyRender: false,
    });

    // Only sync on mount — don't override while user is typing
    useEffect(() => {
        if (editor && !editor.isFocused && value !== editor.getHTML()) {
            editor.commands.setContent(value, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor]);

    if (!editor) return null;

    const insertLink = () => {
        const url = prompt('Masukkan URL:');
        if (url) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        } else {
            editor.chain().focus().unsetLink().run();
        }
    };

    return (
        <div className={`overflow-hidden rounded-xl border border-white/10 bg-white/5 focus-within:border-[#F5B800]/50 transition-colors ${className}`}>
            {/* Toolbar */}
            <div className="flex items-center gap-0.5 overflow-x-auto border-b border-white/8 px-3 py-2 scrollbar-none">
                <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
                    <Bold className="h-4 w-4" />
                </ToolBtn>
                <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
                    <Italic className="h-4 w-4" />
                </ToolBtn>
                <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
                    <UnderlineIcon className="h-4 w-4" />
                </ToolBtn>

                <Divider />

                <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 1">
                    <Heading1 className="h-4 w-4" />
                </ToolBtn>
                <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 2">
                    <Heading2 className="h-4 w-4" />
                </ToolBtn>
                <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Quote">
                    <Quote className="h-4 w-4" />
                </ToolBtn>

                <Divider />

                <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
                    <List className="h-4 w-4" />
                </ToolBtn>
                <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List">
                    <ListOrdered className="h-4 w-4" />
                </ToolBtn>

                <Divider />

                <ToolBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Rata Kiri">
                    <AlignLeft className="h-4 w-4" />
                </ToolBtn>
                <ToolBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Rata Tengah">
                    <AlignCenter className="h-4 w-4" />
                </ToolBtn>
                <ToolBtn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Rata Kanan">
                    <AlignRight className="h-4 w-4" />
                </ToolBtn>

                <Divider />

                <ToolBtn onClick={insertLink} active={editor.isActive('link')} title="Insert Link">
                    <Link2 className="h-4 w-4" />
                </ToolBtn>
                <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Garis Horizontal">
                    <Minus className="h-4 w-4" />
                </ToolBtn>

                <Divider />

                <ToolBtn onClick={() => editor.chain().focus().undo().run()} title="Undo">
                    <Undo className="h-4 w-4" />
                </ToolBtn>
                <ToolBtn onClick={() => editor.chain().focus().redo().run()} title="Redo">
                    <Redo className="h-4 w-4" />
                </ToolBtn>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} />
        </div>
    );
}
