// components/CreateBlogForm.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Edit } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import the new RichTextEditor and FullArticlePreview components
import RichTextEditor from "./RichTextEditor";
import FullArticlePreview from "./FullArticlePreview";

interface BlogFormData {
  title: string;
  content: string; // Now HTML content from Tiptap
  tags: string[]; // Still an array, but will typically hold one selected tag for now
  category: string;
  coverImage: string;
  authorName: string;
  authorProfilePic: string;
  authorFollowers: number;
}

// Predefined list of tags for the dropdown
const predefinedTags = [
  "React", "Next.js", "TailwindCSS", "JavaScript", "TypeScript",
  "Node.js", "Express", "MongoDB", "AI", "Machine Learning",
  "Web Development", "Frontend", "Backend", "UX/UI Design", "SEO",
  "Cloud Computing", "DevOps", "Cybersecurity"
];

const CreateBlogForm: React.FC = () => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    content: "", // Initial content for Tiptap
    tags: [], // Will store selected tag(s)
    category: "",
    coverImage: "",
    authorName: "Your Name",
    authorProfilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=DefaultUser",
    authorFollowers: 0,
  });

  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  // Handler for Tiptap content changes
  const handleContentChange = (htmlContent: string) => {
    setFormData((prev) => ({ ...prev, content: htmlContent }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Changed type for input only
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCategorySelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  // Handler for Tag Select
  const handleTagSelectChange = (value: string) => {
    // For single select, we replace the array with the new selection
    setFormData((prev) => ({ ...prev, tags: value ? [value] : [] }));
    // If you want multi-select for tags, this logic would need to be more complex
    // potentially using a custom multi-select component or storing tags as a comma-separated string
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          coverImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, coverImage: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Blog data submitted:", formData);
    alert("Blog submitted! Check console for data. (This is a demo submission)");
    // Optionally reset form here
    // setFormData({ ...initialFormData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background and Floating Icons */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl w-full bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-2xl relative z-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Create Your Blog Post
        </h2>

        {/* Tab Navigation */}
        <div className="flex justify-center border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("edit")}
            className={`py-3 px-6 text-lg font-medium transition-colors duration-300 flex items-center gap-2
              ${activeTab === "edit"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <Edit className="w-5 h-5" /> Edit
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`py-3 px-6 text-lg font-medium transition-colors duration-300 flex items-center gap-2
              ${activeTab === "preview"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <Eye className="w-5 h-5" /> Preview
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "edit" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title" className="mb-2 block text-gray-700 font-medium">Blog Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter your captivating blog title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Replaced Textarea with RichTextEditor */}
            <div>
              <Label htmlFor="content" className="mb-2 block text-gray-700 font-medium">Blog Content</Label>
              <RichTextEditor
                content={formData.content}
                onContentChange={handleContentChange}
                placeholder="Start writing your amazing blog post here..."
              />
            </div>

            <div>
              <Label htmlFor="coverImage" className="mb-2 block text-gray-700 font-medium">Cover Image</Label>
              <Input
                id="coverImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.coverImage && (
                <p className="text-sm text-gray-500 mt-2">Image selected. Preview on 'Preview' tab.</p>
              )}
            </div>

            {/* Category Select (using existing handler) */}
            <div>
              <Label htmlFor="category" className="mb-2 block text-gray-700 font-medium">Category</Label>
              <Select onValueChange={handleCategorySelectChange} value={formData.category}>
                <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Blog Categories</SelectLabel>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Programming">Programming</SelectItem>
                    <SelectItem value="AI & ML">AI & ML</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* New: Tags Select (like category dropdown) */}
            <div>
              <Label htmlFor="tags" className="mb-2 block text-gray-700 font-medium">Tag</Label>
              <Select onValueChange={handleTagSelectChange} value={formData.tags[0] || ""}>
                <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Common Tags</SelectLabel>
                    {predefinedTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {formData.tags.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">Selected Tag: {formData.tags[0]}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-md text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Submit Blog
            </Button>
          </form>
        )}

        {activeTab === "preview" && (
          <div className="py-8">
            <FullArticlePreview data={formData} />
          </div>
        )}
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default CreateBlogForm;