"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Brain, Zap, ArrowRight, Bot, PenTool, Heart, MessageSquare, Bookmark } from "lucide-react";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";

// --- Dummy Data for Blog Articles ---
// Separated into Recommended and Trending
const recommendedArticles = [
  {
    id: 1,
    title: "Mastering Tailwind CSS for Responsive Design",
    content: "Learn how to build stunning, responsive UIs with Tailwind CSS from scratch. This article covers utility-first principles and best practices.",
    likes: 124,
    comments: 32,
    saves: 18,
    author: {
      name: "Alice Johnson",
      profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Alice",
      followers: 2500,
    },
    coverImage: "https://via.placeholder.com/400x200/AED6F1/000000?text=TailwindCSS",
  },
  {
    id: 2,
    title: "The Future of AI in Content Creation",
    content: "Explore how artificial intelligence is transforming the landscape of content generation, from ideation to automated publishing.",
    likes: 89,
    comments: 15,
    saves: 9,
    author: {
      name: "Bob Smith",
      profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Bob",
      followers: 1800,
    },
    coverImage: "https://via.placeholder.com/400x200/DDA0DD/000000?text=AI+Content",
  },
  {
    id: 7,
    title: "Optimizing Web Performance: A Practical Guide",
    content: "Boost your website's speed and user experience with these essential performance optimization techniques.",
    likes: 180,
    comments: 45,
    saves: 22,
    author: {
      name: "Grace Hopper",
      profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Grace",
      followers: 4000,
    },
    coverImage: "https://via.placeholder.com/400x200/F4A460/000000?text=Web+Perf",
  },
  {
    id: 8,
    title: "Getting Started with GraphQL and Apollo Client",
    content: "Learn how to build powerful and flexible APIs using GraphQL and consume them with Apollo Client in React.",
    likes: 98,
    comments: 20,
    saves: 11,
    author: {
      name: "John Doe",
      profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=John",
      followers: 1700,
    },
    coverImage: "https://via.placeholder.com/400x200/ADD8E6/000000?text=GraphQL",
  },
  {
    id: 9,
    title: "Serverless Functions with AWS Lambda",
    content: "Deploy and manage backend logic without servers using AWS Lambda. A deep dive into serverless architecture.",
    likes: 110,
    comments: 28,
    saves: 14,
    author: {
      name: "Sarah Connor",
      profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Sarah",
      followers: 2300,
    },
    coverImage: "https://via.placeholder.com/400x200/C8A2C8/000000?text=AWS+Lambda",
  },
];

const trendingArticles = [
  {
    id: 3,
    title: "Debugging React Applications with DevTools",
    content: "A comprehensive guide to effectively debugging your React applications using browser developer tools and React DevTools.",
    likes: 210,
    comments: 55,
    saves: 25,
    author: {
      name: "Charlie Brown",
      profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Charlie",
      followers: 3100,
    },
    coverImage: "https://via.placeholder.com/400x200/F0E68C/000000?text=React+Debug",
  },
  {
    id: 4,
    title: "Understanding Server-Side Rendering (SSR) in Next.js",
    content: "Dive deep into Server-Side Rendering with Next.js and understand its benefits for SEO and performance.",
    likes: 75,
    comments: 10,
    saves: 5,
    author: {
      name: "Diana Prince",
      profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Diana",
      followers: 1200,
    },
    coverImage: "https://via.placeholder.com/400x200/B0E0E6/000000?text=Next.js+SSR",
  },
  {
    id: 5,
    title: "Building Scalable APIs with Node.js and Express",
    content: "Learn the best practices for building robust and scalable RESTful APIs using Node.js, Express, and MongoDB.",
    likes: 150,
    comments: 40,
    saves: 20,
    author: {
      name: "Eve Green",
      profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Eve",
      followers: 2800,
    },
    coverImage: "https://via.placeholder.com/400x200/98FB98/000000?text=Node.js+API",
  },
  {
    id: 6,
    title: "Introduction to Web Accessibility (a11y)",
    content: "Discover the importance of web accessibility and how to make your web applications usable by everyone.",
    likes: 95,
    comments: 20,
    saves: 12,
    author: {
      name: "Frank White",
      profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Frank",
      followers: 1500,
    },
    coverImage: "https://via.placeholder.com/400x200/FFB6C1/000000?text=Web+a11y",
  },
  {
    id: 10,
    title: "The Power of Progressive Web Apps (PWAs)",
    content: "Transform your web applications into installable, offline-capable experiences with Progressive Web Apps.",
    likes: 130,
    comments: 30,
    saves: 16,
    author: {
      name: "Mark Twain",
      profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Mark",
      followers: 2900,
    },
    coverImage: "https://via.placeholder.com/400x200/DDA0DD/000000?text=PWA",
  },
];
// --- End Dummy Data ---

export default function ExplorePage() {
  const [isHovered, setIsHovered] = useState(false);

  // Article type definition
  type Article = {
    id: number;
    title: string;
    content: string;
    likes: number;
    comments: number;
    saves: number;
    author: {
      name: string;
      profilePic: string;
      followers: number;
    };
    coverImage: string;
  };

  // Reusable Card Component to avoid repetition
  const ArticleCard = ({ article }: { article: Article }) => (
    <div
      key={article.id}
      className="group bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden
                 min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] scroll-snap-align-start" // Added min/max width and scroll-snap
    >
      {/* Article Cover Image */}
      {article.coverImage && (
        <div className="w-full h-40 bg-gray-200 overflow-hidden rounded-t-xl"> {/* Reduced height slightly for better fit */}
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-4 flex flex-col flex-grow"> {/* Reduced padding slightly */}
        {/* Article Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-1 text-left line-clamp-2">
          {article.title}
        </h3>
        {/* Smaller Content Information */}
        <p className="text-gray-600 text-sm mb-3 text-left flex-grow line-clamp-3">
          {article.content}
        </p>

        {/* Article Information (Likes, Comments, Saves) */}
        <div className="flex items-center justify-between text-gray-500 text-xs mb-3 pt-3 border-t border-gray-100"> {/* Smaller text for info */}
          <div className="flex items-center space-x-2"> {/* Smaller space */}
            <span className="flex items-center">
              <Heart className="w-3 h-3 mr-1 text-red-500" /> {article.likes}
            </span>
            <span className="flex items-center">
              <MessageSquare className="w-3 h-3 mr-1 text-blue-500" /> {article.comments}
            </span>
            <span className="flex items-center">
              <Bookmark className="w-3 h-3 mr-1 text-purple-500" /> {article.saves}
            </span>
          </div>
          <Button variant="link" size="sm" className="text-blue-600 text-xs hover:underline p-0 h-auto"> {/* Smaller button */}
            Read More
          </Button>
        </div>

        {/* User/Author Profile Information */}
        <div className="flex items-center space-x-2 border-t border-gray-100 pt-3 mt-auto"> {/* Smaller space/padding */}
          <Avatar className="w-8 h-8"> {/* Smaller avatar */}
            <AvatarImage src={article.author.profilePic} alt={article.author.name} />
            <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-800 text-sm">{article.author.name}</p> {/* Smaller text */}
            <p className="text-xs text-gray-500">
              {article.author.followers.toLocaleString()} followers
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col items-center justify-center p-4 overflow-hidden relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Floating AI Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <Brain
            className="absolute top-1/4 left-1/4 w-6 h-6 text-blue-300 animate-bounce opacity-60"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          />
          <Sparkles
            className="absolute top-1/3 right-1/4 w-5 h-5 text-purple-300 animate-bounce opacity-60"
            style={{ animationDelay: "1s", animationDuration: "4s" }}
          />
          <Zap
            className="absolute bottom-1/3 left-1/3 w-4 h-4 text-pink-300 animate-bounce opacity-60"
            style={{ animationDelay: "2s", animationDuration: "3.5s" }}
          />
          <Bot
            className="absolute bottom-1/4 right-1/3 w-5 h-5 text-indigo-300 animate-bounce opacity-60"
            style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
          />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 w-full py-8"> {/* Added vertical padding */}
          {/* Header Section for Explore Page */}
          <div className="flex flex-col items-center justify-center space-y-4 mb-12">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <PenTool className="w-8 h-8 text-blue-600" />
                <Sparkles className="w-4 h-4 text-purple-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Explore BlogAI Articles
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover insightful articles and connect with amazing authors.
            </p>
          </div>

          {/* --- Recommended Articles Section --- */}
          <div className="mb-12 text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 px-4 md:px-0">Recommended for You</h2>
            <div className="flex overflow-x-auto pb-4 scroll-snap-x mandatory snap-x-start gap-6 px-4 md:px-0 no-scrollbar">
              {recommendedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* --- Trending Articles Section --- */}
          <div className="mb-12 text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 px-4 md:px-0">Trending Articles</h2>
            <div className="flex overflow-x-auto pb-4 scroll-snap-x mandatory snap-x-start gap-6 px-4 md:px-0 no-scrollbar">
              {trendingArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* CTA Button (optional for explore page) */}
          <div className="mt-16">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 hover:border-gray-400 px-8 py-3 rounded-full text-lg font-semibold bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-300"
                >
                  About BlogAI
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center mb-4">About BlogAI</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-gray-700">
                  <p>
                    BlogAI is revolutionizing content creation by combining cutting-edge artificial intelligence with
                    intuitive design. Our platform empowers writers, marketers, and businesses to create exceptional
                    blog content that drives engagement and results.
                  </p>
                  <p>
                    Founded by a team of AI researchers and content strategists, we understand the challenges of
                    consistent, high-quality content creation. Our mission is to democratize great writing by making
                    AI-powered tools accessible to everyone.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">50K+</div>
                      <div className="text-sm text-gray-600">Articles Generated</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">10K+</div>
                      <div className="text-sm text-gray-600">Happy Writers</div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        /* Custom scrollbar hiding (for Webkit browsers like Chrome/Safari) */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* For Firefox */
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
      </div>
      <Footer />
    </>
  );
}