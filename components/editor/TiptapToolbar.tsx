"use client";

import { type Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Bold, Italic, Strikethrough, Underline, Code, Pilcrow, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, LinkIcon, ImageIcon, Undo, Redo, CodeSquare, RemoveFormatting
} from "lucide-react";
import { useCallback } from "react";

type Props = {
  editor: Editor | null;
};

export const TiptapToolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return; // User cancelled
    if (url === '') { // Empty URL, remove link
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const toggleCodeBlock = useCallback(() => {
    editor.chain().focus().toggleCodeBlock().run();
  }, [editor]);

  return (
    <div className="border border-input bg-transparent rounded-md p-1 flex flex-wrap items-center gap-1 mb-4 sticky top-[calc(var(--navbar-height,64px)+0.5rem)] z-10 bg-background/80 backdrop-blur-sm">
      {/* Basic Formatting */}
      <Button variant={editor.isActive('bold') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().toggleBold()} title="Bold"> <Bold className="w-4 h-4" /> </Button>
      <Button variant={editor.isActive('italic') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().toggleItalic()} title="Italic"> <Italic className="w-4 h-4" /> </Button>
      <Button variant={editor.isActive('underline') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleUnderline().run()} disabled={!editor.can().toggleUnderline()} title="Underline"> <Underline className="w-4 h-4" /> </Button>
      <Button variant={editor.isActive('strike') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().toggleStrike()} title="Strikethrough"> <Strikethrough className="w-4 h-4" /> </Button>
      <Button variant={editor.isActive('code') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleCode().run()} disabled={!editor.can().toggleCode()} title="Inline Code"> <Code className="w-4 h-4" /> </Button>

      {/* Headings */}
      <Button variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Heading 1"> <Heading1 className="w-4 h-4" /> </Button>
      <Button variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2"> <Heading2 className="w-4 h-4" /> </Button>
      <Button variant={editor.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3"> <Heading3 className="w-4 h-4" /> </Button>
      <Button variant={editor.isActive('paragraph') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().setParagraph().run()} title="Paragraph"> <Pilcrow className="w-4 h-4" /> </Button>

      {/* Lists */}
      <Button variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List"> <List className="w-4 h-4" /> </Button>
      <Button variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Ordered List"> <ListOrdered className="w-4 h-4" /> </Button>

      {/* Block Elements */}
      <Button variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote"> <Quote className="w-4 h-4" /> </Button>
      <Button variant={editor.isActive('codeBlock') ? 'secondary' : 'ghost'} size="icon" onClick={toggleCodeBlock} title="Code Block"> <CodeSquare className="w-4 h-4" /> </Button>

      {/* Link and Image */}
      <Button variant={editor.isActive('link') ? 'secondary' : 'ghost'} size="icon" onClick={setLink} title="Set Link"> <LinkIcon className="w-4 h-4" /> </Button>
      <Button variant={'ghost'} size="icon" onClick={addImage} title="Add Image"> <ImageIcon className="w-4 h-4" /> </Button>
      
      <Button variant={'ghost'} size="icon" onClick={() => editor.chain().focus().unsetAllMarks().run()} title="Clear Formatting Marks"> <RemoveFormatting className="w-4 h-4" /> </Button>
      {/* History */}
      <Button variant={'ghost'} size="icon" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo"> <Undo className="w-4 h-4" /> </Button>
      <Button variant={'ghost'} size="icon" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo"> <Redo className="w-4 h-4" /> </Button>
    </div>
  );
};