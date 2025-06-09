"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

interface BlogPreviewProps {
  title: string;
  content: string;
  coverImage: string | null;
  tags: string[];
  onClose: () => void;
}

export const BlogPreview = ({
  title,
  content,
  coverImage,
  tags,
  onClose,
}: BlogPreviewProps) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 bg-white z-10 border-b">
        <div className="container mx-auto max-w-5xl py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Preview Mode</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-5xl pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {coverImage && (
          <div className="relative w-full h-[400px] mb-8">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-6">{title}</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </main>
    </div>
  );
};