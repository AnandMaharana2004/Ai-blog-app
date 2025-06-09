"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";

import { TiptapToolbar } from "@/components/editor/TiptapToolbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save, Send, Eye, Upload } from "lucide-react";
import { TagSelector } from "@/components/editor/TagSelector";
import { ImageUpload } from "@/components/editor/ImageUpload";
import { BlogPreview } from "@/components/editor/BlogPreview";

import "@/styles/editor.css";
import { Navbar } from "@/components/navbar";

const BlogEditorPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {}, 
        heading: {
          levels: [1, 2, 3],
        }
      }),
      Underline,
      Strike,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      Image.configure({
        inline: false,
      }),
      Placeholder.configure({
        placeholder: "Start crafting your masterpiece here...",
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4',
      },
    }
  });

  const handleSaveDraft = () => {
    console.log("Saving draft...", {
      title,
      content,
      coverImage,
      tags: selectedTags
    });
    alert("Draft saved to console!");
  };

  const handlePublish = () => {
    if (!title || !content || !coverImage) {
      alert("Please fill in all required fields (title, content, and cover image)");
      return;
    }
    console.log("Publishing post...", {
      title,
      content,
      coverImage,
      tags: selectedTags
    });
    alert("Post published to console!");
  };

  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  if (showPreview) {
    return (
      <BlogPreview 
        title={title}
        content={content}
        coverImage={coverImage}
        tags={selectedTags}
        onClose={togglePreview}
      />
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="container mx-auto max-w-5xl py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="coverImage" className="text-lg font-medium mb-2 block">
              Cover Image
            </Label>
            <ImageUpload
              currentImage={coverImage}
              onImageUpload={setCoverImage}
            />
          </div>

          <div>
            <Label htmlFor="blogTitle" className="text-lg font-medium mb-2 block">
              Blog Title
            </Label>
            <Input
              id="blogTitle"
              type="text"
              placeholder="Enter your captivating blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl h-14 p-4 font-semibold border-2 focus-visible:ring-offset-0 focus-visible:ring-2"
            />
          </div>

          <div>
            <Label className="text-lg font-medium mb-2 block">Tags</Label>
            <TagSelector
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />
          </div>

          <div>
            <Label className="text-lg font-medium mb-2 block">Content</Label>
            <TiptapToolbar editor={editor} />
            <EditorContent editor={editor} className="shadow-sm border rounded-lg mt-2" />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" size="lg" onClick={togglePreview}>
              <Eye className="mr-2 h-5 w-5" /> Preview
            </Button>
            <Button variant="outline" size="lg" onClick={handleSaveDraft}>
              <Save className="mr-2 h-5 w-5" /> Save Draft
            </Button>
            <Button
              variant="default"
              size="lg"
              onClick={handlePublish}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="mr-2 h-5 w-5" /> Publish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditorPage;