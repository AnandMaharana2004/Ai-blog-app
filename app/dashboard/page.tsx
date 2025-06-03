// app/dashboard/page.tsx (or components/DashboardPage.tsx)
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, Eye, ThumbsUp, MessageSquare, TrendingUp, Sparkles,
  Zap
} from 'lucide-react';

import FloatingChatbot from '@/components/FloatingChatbot';
import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';

// --- Dummy Data for Dashboard Analytics ---
interface BlogAnalytic {
  id: string;
  title: string;
  authorName: string;
  authorProfilePic: string;
  views: number;
  likes: number;
  comments: number;
  engagementScore: number; // e.g., (likes + comments) / views * 100
  publishDate: string;
}

interface MonthlyViews {
  month: string;
  views: number;
}

const dummyBlogAnalytics: BlogAnalytic[] = [
  {
    id: "blog1",
    title: "Mastering Prompt Engineering: A Guide for Developers",
    authorName: "Jane Doe",
    authorProfilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=JaneDoe",
    views: 12500,
    likes: 450,
    comments: 85,
    engagementScore: 4.28,
    publishDate: "2025-06-01",
  },
  {
    id: "blog2",
    title: "The Future of AI in Content Creation",
    authorName: "Bob Johnson",
    authorProfilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Bob",
    views: 8900,
    likes: 320,
    comments: 60,
    engagementScore: 4.27,
    publishDate: "2025-05-20",
  },
  {
    id: "blog3",
    title: "Debugging React Applications with DevTools",
    authorName: "Charlie Brown",
    authorProfilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Charlie",
    views: 15000,
    likes: 600,
    comments: 110,
    engagementScore: 4.73,
    publishDate: "2025-05-10",
  },
  {
    id: "blog4",
    title: "Understanding Server-Side Rendering (SSR) in Next.js",
    authorName: "Diana Prince",
    authorProfilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Diana",
    views: 7200,
    likes: 280,
    comments: 40,
    engagementScore: 4.44,
    publishDate: "2025-04-25",
  },
  {
    id: "blog5",
    title: "Building Scalable APIs with Node.js and Express",
    authorName: "Eve Green",
    authorProfilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Eve",
    views: 10500,
    likes: 390,
    comments: 70,
    engagementScore: 4.38,
    publishDate: "2025-04-10",
  },
];

const monthlyViewsData: MonthlyViews[] = [

  { month: 'Feb', views: 30000 },
  { month: 'Mar', views: 45000 },
  { month: 'Apr', views: 60000 },
  { month: 'May', views: 5000 },
  { month: 'Jun', views: 82000 },
  { month: 'July', views: 5000 },
];

// --- Helper Components for Dashboard Cards ---

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  description: string;
  iconColorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, description, iconColorClass }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center space-x-4">
    <div className={`p-3 rounded-full ${iconColorClass} bg-opacity-20`}>
      <Icon className={`w-6 h-6 ${iconColorClass}`} />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);


const DashboardPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
        {/* Main Dashboard Content */}
        {/* Adjusted padding for smaller screens (px-4 for smallest, sm:px-6, lg:px-8) */}
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* Adjusted heading size for smaller screens (text-3xl on sm, 4xl on larger) */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 sm:w-9 sm:h-9 text-blue-600" /> Your Blog Dashboard
          </h1>

          {/* Analytics Overview Cards:
              grid-cols-1 for very small, sm:grid-cols-2 for small, md:grid-cols-2, lg:grid-cols-4
              This ensures cards stack vertically on tiny screens before going into 2 or 4 columns.
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={Eye}
              title="Total Views"
              value={dummyBlogAnalytics.reduce((acc, blog) => acc + blog.views, 0).toLocaleString()}
              description="Across all your articles"
              iconColorClass="text-blue-500"
            />
            <StatCard
              icon={ThumbsUp}
              title="Total Likes"
              value={dummyBlogAnalytics.reduce((acc, blog) => acc + blog.likes, 0).toLocaleString()}
              description="Overall positive feedback"
              iconColorClass="text-red-500"
            />
            <StatCard
              icon={MessageSquare}
              title="Total Comments"
              value={dummyBlogAnalytics.reduce((acc, blog) => acc + blog.comments, 0).toLocaleString()}
              description="Total engagement from readers"
              iconColorClass="text-green-500"
            />
            <StatCard
              icon={TrendingUp}
              title="Avg. Engagement"
              value={`${(dummyBlogAnalytics.reduce((acc, blog) => acc + blog.engagementScore, 0) / dummyBlogAnalytics.length).toFixed(2)}%`}
              description="Average engagement score per article"
              iconColorClass="text-purple-500"
            />
          </div>

          {/* Charts Section: Remains grid-cols-1 on small, lg:grid-cols-2 on large */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Monthly Views Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" /> Monthly Views Trend
              </h3>
              {/* ResponsiveContainer already handles chart resizing */}
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyViewsData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-sm text-gray-600" />
                  <YAxis axisLine={false} tickLine={false} className="text-sm text-gray-600" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '10px' }}
                    labelStyle={{ fontWeight: 'bold', color: '#333' }}
                    itemStyle={{ color: '#666' }}
                  />
                  <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Engagement Per Blog Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-600" /> Engagement Per Article
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dummyBlogAnalytics} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  {/* Adjusted XAxis for smaller screens to ensure labels are readable */}
                  <XAxis
                    dataKey="title"
                    angle={-30}
                    textAnchor="end"
                    height={60}
                    interval={0}
                    // Truncate more aggressively on smaller screens if needed, or use a smaller font.
                    // Tailwind's text-xs is already quite small.
                    tickFormatter={(value) => {
                      const words = value.split(' ');
                      return words.length > 3 ? words.slice(0, 2).join(' ') + '...' : value;
                    }}
                    className="text-xs text-gray-600"
                  />
                  <YAxis axisLine={false} tickLine={false} className="text-sm text-gray-600" />
                  <Tooltip
                    formatter={(value: number, name: string, props: any) => [`${value.toFixed(2)}%`, 'Engagement Score']}
                    labelFormatter={(label: string) => `Article: ${label}`}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '10px' }}
                    labelStyle={{ fontWeight: 'bold', color: '#333' }}
                    itemStyle={{ color: '#666' }}
                  />
                  <Bar dataKey="engagementScore" fill="#8884d8" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Performing Blogs */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-600" /> Top Performing Blogs
            </h2>
            <div className="space-y-4">
              {dummyBlogAnalytics.sort((a, b) => b.views - a.views).map((blog, index) => (
                <div
                  key={blog.id}
                  // Flex direction to column on small screens, row on medium and up
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-3 sm:space-y-0"
                >
                  <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <span className="text-xl font-bold text-gray-700 w-8 flex-shrink-0">#{index + 1}</span>
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={blog.authorProfilePic} alt={blog.authorName} />
                      <AvatarFallback>{blog.authorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow"> {/* Allow text to grow and wrap */}
                      <h3 className="font-semibold text-gray-900 text-base sm:text-lg leading-tight">{blog.title}</h3>
                      <p className="text-sm text-gray-600">by {blog.authorName}</p>
                      <div className="flex flex-wrap items-center text-gray-500 text-xs mt-1 space-x-3">
                        <span className="flex items-center"><Eye className="w-3 h-3 mr-1" /> {blog.views.toLocaleString()}</span>
                        <span className="flex items-center"><ThumbsUp className="w-3 h-3 mr-1" /> {blog.likes.toLocaleString()}</span>
                        <span className="flex items-center"><MessageSquare className="w-3 h-3 mr-1" /> {blog.comments.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  {/* Button moves to bottom or adjusts margin on small screens */}
                  <Button variant="outline" size="sm" className="w-full sm:w-auto text-blue-600 hover:bg-blue-50 mt-3 sm:mt-0">View Details</Button>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Enhancements Section */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-yellow-500" /> AI-Powered Enhancement Suggestions
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base"> {/* Adjusted text size */}
              Utilize the floating **BlogAI Assistant** (bottom right) to ask questions about your blog performance and get personalized suggestions to improve your content, increase engagement, and attract more readers! Try asking:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2 text-sm sm:text-base"> {/* Adjusted text size */}
              <li>"Which of my blogs needs the most improvement?"</li>
              <li>"How can I increase views on 'Mastering Prompt Engineering'?"</li>
              <li>"Suggest a new topic based on my top-performing blogs."</li>
              <li>"What are common reasons for low engagement on blog posts?"</li>
            </ul>
          </div>
        </div>

        {/* Floating Chatbot */}
        <FloatingChatbot />
      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;