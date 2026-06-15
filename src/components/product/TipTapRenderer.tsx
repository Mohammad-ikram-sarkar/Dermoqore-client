"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

interface Props {
  content: string;
}

export default function TipTapRenderer({ content }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Link.configure({
        openOnClick: true,
      }),
    ],
    content,
    editable: false,
  });

  if (!editor) return null;

  return (
    <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed">
      <EditorContent editor={editor} />
    </div>
  );
}
