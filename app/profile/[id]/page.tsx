// app/profile/page.tsx (or components/UserProfileSection.tsx)
"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image'; // For optimized images
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Users, UserPlus, FileText, CalendarDays, Eye, ThumbsUp
} from 'lucide-react';

import { dummyUserProfile, dummyUserPosts } from '@/lib/dummyData'; // Adjust path as needed

// Define filter options
type FilterType = 'most-popular' | 'latest' | 'oldest';

const UserProfileSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('latest');
  const user = dummyUserProfile;
  const posts = dummyUserPosts; // In a real app, this would be fetched based on user ID

  const filteredPosts = useMemo(() => {
    let sortedPosts = [...posts]; // Create a shallow copy to avoid mutating original array

    switch (activeFilter) {
      case 'most-popular':
        sortedPosts.sort((a, b) => b.views - a.views);
        break;
      case 'latest':
        sortedPosts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
        break;
      case 'oldest':
        sortedPosts.sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime());
        break;
      default:
        break;
    }
    return sortedPosts;
  }, [activeFilter, posts]);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Profile Banner */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 bg-gray-200 overflow-hidden">
        <Image
          src={user.profileBanner || '/default-banner.jpg'} // Fallback to a default banner if none provided
          alt="Profile Banner"
          layout="fill" // Ensures the image covers the container
          objectFit="cover" // Crops image to fit, maintains aspect ratio
          className="object-center"
        />
        {/* Semi-transparent overlay for better readability of text if any */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 md:-mt-32 relative z-10">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 w-full">
            <Avatar className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg">
              <AvatarImage src={user.profilePic} alt={user.username} />
              <AvatarFallback className="text-4xl">{user.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left mt-4 sm:mt-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{user.username}</h1>
              <p className="text-gray-600 text-sm sm:text-base max-w-lg mt-2">{user.bio}</p>
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-4 text-gray-700 text-sm sm:text-base">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> **{user.followers.toLocaleString()}** Followers</span>
                <span className="flex items-center gap-1"><UserPlus className="w-4 h-4" /> **{user.following.toLocaleString()}** Following</span>
                <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> **{user.postsCount.toLocaleString()}** Posts</span>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row items-center gap-3">
            <Button className="w-full sm:w-auto">Follow</Button>
            <Button variant="outline" className="w-full sm:w-auto">Message</Button>
          </div>
        </div>

        {/* Profile Navigation / Filters */}
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {/* Main Navigation Tabs */}
              <Button variant="ghost" className="text-lg font-semibold text-blue-600 hover:bg-blue-50">Posts</Button>
              <Button variant="ghost" className="text-lg font-semibold text-gray-700 hover:bg-gray-100">About</Button>
              <Button variant="ghost" className="text-lg font-semibold text-gray-700 hover:bg-gray-100">Community</Button>
            </div>

            {/* Filter Buttons (similar to YouTube) */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-2 mt-4 sm:mt-0">
              <Button
                variant={activeFilter === 'most-popular' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('most-popular')}
                size="sm"
              >
                Most Popular
              </Button>
              <Button
                variant={activeFilter === 'latest' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('latest')}
                size="sm"
              >
                Latest
              </Button>
              <Button
                variant={activeFilter === 'oldest' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('oldest')}
                size="sm"
              >
                Oldest
              </Button>
            </div>
          </div>
        </div>

        {/* User Posts Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden group">
                <div className="relative w-full h-48 sm:h-40 md:h-48 overflow-hidden">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="secondary">View Post</Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg line-clamp-2" title={post.title}>
                    {post.title}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm mt-2 space-x-3">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.views.toLocaleString()} views</span>
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {post.likes.toLocaleString()} likes</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" /> Published: {new Date(post.publishDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500 italic">
              No posts found for the selected filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileSection;