"use client";

import { useState } from "react";
// import { Navbar } from "@/components/layout/Navbar";
import {
    UserCircle,
    ImagePlus,
    VideoIcon,
    Briefcase,
    CalendarClock,
    Newspaper,
    UserPlus,
    Hash,
} from "lucide-react";
import { Navbar } from "@/components/navbar";

const FeedPage = () => {
    const [posts, setPosts] = useState([
        { id: 1, author: "John Doe", content: "Exciting news in the industry!", timestamp: "1 hour ago" },
        { id: 2, author: "Jane Smith", content: "Sharing my latest project update.", timestamp: "2 hours ago" },
        // Add more dummy posts here
    ]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Left Sidebar (Hidden on small screens) */}
                <aside className="hidden md:block md:col-span-3 space-y-4">
                    <div className="bg-white shadow rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                            <UserCircle className="h-10 w-10 text-gray-500" />
                            <div>
                                <div className="font-semibold">Your Name</div>
                                <div className="text-sm text-gray-500">Brief Bio/Headline</div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-600">
                            {/* Add more profile details or links here */}
                            <div className="py-2 border-b border-gray-200">Connections: <span className="font-semibold">500+</span></div>
                            <div className="py-2 border-b border-gray-200">Network</div>
                            <div className="py-2">Groups</div>
                            {/* ... */}
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-4 text-sm text-gray-600">
                        {/* Add links to networks, groups, etc. */}
                        <div className="mb-2 font-semibold">Shortcuts</div>
                        <div className="py-1 hover:bg-gray-100 rounded"><Hash className="inline-block w-4 h-4 mr-2 text-gray-400" /> #trending</div>
                        <div className="py-1 hover:bg-gray-100 rounded"><Briefcase className="inline-block w-4 h-4 mr-2 text-gray-400" /> Jobs</div>
                        {/* ... */}
                    </div>
                </aside>

                {/* Main Feed Area */}
                <main className="col-span-1 md:col-span-6 space-y-4">
                    {/* Start a Post */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <div className="flex space-x-3 mb-3">
                            <UserCircle className="h-10 w-10 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Start a post"
                                className="flex-grow rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                        </div>
                        <div className="flex justify-around items-center border-t border-gray-200 pt-2">
                            <button className="flex items-center text-blue-500 hover:text-blue-700 focus:outline-none text-sm">
                                <ImagePlus className="w-5 h-5 mr-1" /> Photo
                            </button>
                            <button className="flex items-center text-green-500 hover:text-green-700 focus:outline-none text-sm">
                                <VideoIcon className="w-5 h-5 mr-1" /> Video
                            </button>
                            <button className="flex items-center text-indigo-500 hover:text-indigo-700 focus:outline-none text-sm">
                                <Briefcase className="w-5 h-5 mr-1" /> Job
                            </button>
                            <button className="flex items-center text-red-500 hover:text-red-700 focus:outline-none text-sm">
                                <CalendarClock className="w-5 h-5 mr-1" /> Event
                            </button>
                            {/* More options can be added */}
                        </div>
                    </div>

                    {/* Feed Posts */}
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white shadow rounded-lg p-4">
                            <div className="flex items-center space-x-3 mb-2">
                                <UserCircle className="h-8 w-8 text-gray-500" />
                                <div className="text-sm font-semibold">{post.author}</div>
                                <div className="text-xs text-gray-500">{post.timestamp}</div>
                            </div>
                            <div className="text-gray-800 text-sm">{post.content}</div>
                            <div className="mt-3 border-t border-gray-200 pt-2 flex justify-between text-gray-600 text-sm">
                                <button className="hover:text-blue-500 focus:outline-none">Like</button>
                                <button className="hover:text-blue-500 focus:outline-none">Comment</button>
                                <button className="hover:text-blue-500 focus:outline-none">Share</button>
                                <button className="hover:text-blue-500 focus:outline-none">Send</button>
                            </div>
                        </div>
                    ))}

                    {/* Load More Button / Infinite Scroll can be implemented here */}
                    <div className="text-center py-4 text-gray-500">
                        <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Load More
                        </button>
                    </div>
                </main>

                {/* Right Sidebar (Hidden on small and medium screens) */}
                <aside className="hidden lg:block lg:col-span-3 space-y-4">
                    <div className="bg-white shadow rounded-lg p-4">
                        <div className="font-semibold mb-2">LinkedIn News</div>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li className="hover:bg-gray-100 rounded p-2">
                                <a href="#" className="flex items-center">
                                    <Newspaper className="w-4 h-4 mr-2 text-gray-400" /> Big Tech Earnings
                                </a>
                            </li>
                            <li className="hover:bg-gray-100 rounded p-2">
                                <a href="#" className="flex items-center">
                                    <Newspaper className="w-4 h-4 mr-2 text-gray-400" /> Remote Work Trends
                                </a>
                            </li>
                            {/* Add more news items */}
                        </ul>
                    </div>

                    <div className="bg-white shadow rounded-lg p-4">
                        <div className="font-semibold mb-2">Who to follow</div>
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <UserCircle className="h-7 w-7 text-gray-500" />
                                    <div>Company A</div>
                                </div>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full focus:outline-none">
                                    <UserPlus className="w-4 h-4 inline-block" /> Follow
                                </button>
                            </div>
                            {/* Add more suggestions */}
                        </div>
                    </div>

                    {/* Add more right sidebar content (ads, etc.) */}
                </aside>
            </div>
        </div>
    );
};

export default FeedPage;