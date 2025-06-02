"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
// import CodeBlock from "@tiptap/extension-code-block"; // Included in StarterKit by default, configure if needed

// import { Navbar } from "@/components/layout/Navbar"; // Your Navbar
import { TiptapToolbar } from "@/components/editor/TiptapToolbar"; // Toolbar created above
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save, Send } from "lucide-react";

// Import editor CSS
import "@/styles/editor.css"; // Adjust path if necessary
import { Navbar } from "@/components/navbar";

const BlogEditorPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // To store editor content as HTML or JSON

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable history from StarterKit if you want to handle it separately or use Tiptap's default
        // history: false, 
        // Configure CodeBlock if needed, e.g., to disable exiting on triple enter
        codeBlock: { 
            // HTMLAttributes: { class: 'language-js', }, // Example default language
        },
        heading: {
            levels: [1, 2, 3], // Allow H1, H2, H3
        }
      }),
      Underline,
      Strike,
      Link.configure({
        openOnClick: false, // Don't open link on click in editor, but allow editing
        autolink: true,
        linkOnPaste: true,
      }),
      Image.configure({
        inline: false, // Allow images to be block elements
        // allowBase64: true, // If you want to support base64 images (increases content size)
      }),
      Placeholder.configure({
        placeholder: "Start crafting your masterpiece here...",
      }),
      // CodeBlock, // If using it separately from StarterKit or for specific config
    ],
    content: content, // Initial content for the editor
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML()); // Update state with HTML content
      // Or use editor.getJSON() for JSON format
    },
    editorProps: {
        attributes: {
            // Add any accessibility attributes or custom classes here if needed
            // class: 'prose dark:prose-invert max-w-none focus:outline-none', // Example Tailwind Prose classes - Careful, this might conflict with editor.css
        },
    }
  });

  const handleSaveDraft = () => {
    console.log("Saving draft...");
    console.log("Title:", title);
    console.log("Content (HTML):", content);
    // TODO: Implement API call to save draft
    alert("Draft saved to console!");
  };

  const handlePublish = () => {
    console.log("Publishing post...");
    console.log("Title:", title);
    console.log("Content (HTML):", content);
    // TODO: Implement API call to publish post
    alert("Post published to console!");
  };

  // Effect to update editor if initial content is loaded asynchronously
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      // This might be needed if you load content from an API and want to set it
      // editor.commands.setContent(content, false); // 'false' to not emit update
    }
  }, [content, editor]);


  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="container mx-auto max-w-5xl py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="blogTitle" className="text-lg font-medium mb-2 block">Blog Title</Label>
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
            <Label className="text-lg font-medium mb-2 block">Content</Label>
            <TiptapToolbar editor={editor} />
            <EditorContent editor={editor} className="shadow-sm"/> {/* This renders the editor */}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" size="lg" onClick={handleSaveDraft}>
              <Save className="mr-2 h-5 w-5" /> Save Draft
            </Button>
            <Button variant="default" size="lg" onClick={handlePublish} className="bg-blue-600 hover:bg-blue-700">
              <Send className="mr-2 h-5 w-5" /> Publish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditorPage;