// components/FullArticlePreview.tsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, CalendarDays } from 'lucide-react';

interface BlogFormData {
  title: string;
  content: string; // This will now be HTML from Tiptap
  tags: string[];
  category: string;
  coverImage: string;
  authorName: string;
  authorProfilePic: string;
  authorFollowers: number;
}

interface FullArticlePreviewProps {
  data: BlogFormData;
}

const FullArticlePreview: React.FC<FullArticlePreviewProps> = ({ data }) => {
  // Static values for preview, in a real app these would be dynamic
  const readTimeMinutes = Math.ceil((data.content?.replace(/<[^>]*>/g, '').length || 0) / 200); // Estimate based on plain text length
  const currentDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden w-full max-w-3xl mx-auto p-0 md:p-6">
      {/* Cover Image */}
      {data.coverImage && (
        <div className="w-full h-64 md:h-96 bg-gray-200 overflow-hidden mb-8">
          <img
            src={data.coverImage}
            alt={data.title || "Blog Cover"}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {!data.coverImage && (
        <div className="w-full h-64 md:h-96 bg-gray-100 flex items-center justify-center text-gray-400 mb-8">
          No Cover Image
        </div>
      )}

      <div className="px-6 md:px-0 pb-8">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          {data.title || "Your Captivating Blog Title Here"}
        </h1>

        {/* Author & Meta Info */}
        <div className="flex items-center space-x-4 mb-8 border-b border-gray-200 pb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={data.authorProfilePic} alt={data.authorName} />
            <AvatarFallback>{data.authorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-800 text-lg">{data.authorName}</p>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> {currentDate}
              <span className="mx-1">•</span>
              <Clock className="w-4 h-4" /> {readTimeMinutes} min read
            </p>
          </div>
        </div>

        {/* Blog Content: Using dangerouslySetInnerHTML for Tiptap's HTML output */}
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.content || '<p class="text-gray-500 italic">Start typing in the "Edit" tab to see your content appear here! This supports rich text formatting like <strong>bold</strong>, <em>italic</em>, <a href="#">links</a>, lists, and headings.</p>' }}
        />


        {/* Tags and Category */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-600 mb-2">Category:</p>
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 ring-1 ring-inset ring-blue-700/10">
            {data.category || "Uncategorized"}
          </span>

          <p className="text-sm font-semibold text-gray-600 mt-6 mb-2">Tags:</p>
          <div className="flex flex-wrap gap-2">
            {data.tags.length > 0 ? (
              data.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-500/10">
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm italic">No tags selected yet.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullArticlePreview;