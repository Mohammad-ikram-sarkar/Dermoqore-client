"use client";

import type { Content } from "@tiptap/core";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

interface Props {
  /** TipTap JSON document (object) or a JSON/HTML string. */
  content: unknown;
}

function normalizeContent(content: unknown): Content {
  if (typeof content !== "string") return content as Content;
  try {
    return JSON.parse(content) as Content;
  } catch {
    return content as Content; // fall back to raw HTML string
  }
}

export default function BlogContent({ content }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Link.configure({ openOnClick: true }),
      Image,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: normalizeContent(content),
    editable: false,
  });

  if (!editor) return null;

  return (
    <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed [&_blockquote]:border-l-4 [&_blockquote]:border-muted-foreground/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_h2]:mt-6 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mt-5 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_img]:rounded-lg [&_img]:max-w-full [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_a]:text-[#D46B5A] [&_a]:underline [&_a]:underline-offset-4">
      <EditorContent editor={editor} />
    </div>
  );
}
