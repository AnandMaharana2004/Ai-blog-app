// app/dashboard/[articleId]/page.tsx
"use client";

import React from 'react';
import { useParams } from 'next/navigation'; // For app router
import Image from 'next/image';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft, Eye, ThumbsUp, MessageSquare, TrendingUp, Sparkles,
    Zap, Clock, Layers, Globe,
    CalendarDays
} from 'lucide-react';

import { getArticleDetails, dummyArticle1Details } from '@/lib/dummyArticleData'; // Adjust path
import { StatCard } from '@/components/StatCard';
import { Navbar } from '@/components/navbar';
// import { StatCard } from '@/components/StatCard'; // Assuming you make StatCard a reusable component

// You might want to move StatCard into its own component file if used frequently



const IndividualArticleDashboard: React.FC = () => {
    const params = useParams();
    const articleId = params?.articleId as string;

    // In a real application, you'd fetch this data from an API based on articleId
    // For this example, we'll use our dummy data or a lookup function
    const article = getArticleDetails(articleId) || dummyArticle1Details; // Fallback for demonstration

    if (!article) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-lg text-gray-600">Article not found.</p>
            </div>
        );
    }

    // Aggregate total traffic sources views for the chart
    const trafficSourceChartData = article.trafficSources?.map(source => ({
        name: source.source,
        views: source.views
    }));

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 flex flex-col py-2">
                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-2">
                    <Button
                        variant="ghost"
                        onClick={() => window.history.back()} // Simple back navigation
                        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
                    </Button>

                    {/* Article Header Section */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8 relative overflow-hidden">
                        {/* Article Banner/Hero Image */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-700/10 via-blue-500/10 to-transparent"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                            <Image
                                src={article.imageUrl}
                                alt={article.title}
                                width={200}
                                height={150}
                                className="rounded-lg shadow-md flex-shrink-0 object-cover w-full md:w-48 h-36 md:h-36"
                            />
                            <div className="flex-grow text-center md:text-left">
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                                    {article.title}
                                </h1>
                                <p className="text-lg text-gray-700 mb-4 line-clamp-2">
                                    {article.contentSnippet}
                                </p>
                                <div className="flex items-center justify-center md:justify-start gap-4 text-gray-600 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={article.authorProfilePic} alt={article.authorName} />
                                            <AvatarFallback>{article.authorName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>by <span className="font-semibold text-gray-800">{article.authorName}</span></span>
                                    </div>
                                    <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> Published: {new Date(article.publishDate).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {article.averageReadTimeMinutes} min read</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-6 md:mt-0">
                                <Button className="w-full md:w-auto">Edit Article</Button>
                                <Button variant="outline" className="w-full md:w-auto">Promote Article</Button>
                            </div>
                        </div>
                    </div>

                    {/* Key Metrics Overview */}
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Metrics</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <StatCard
                            icon={Eye}
                            title="Total Views"
                            value={article.totalViews.toLocaleString()}
                            description="Since publication"
                            iconColorClass="text-blue-500"
                        />
                        <StatCard
                            icon={ThumbsUp}
                            title="Total Likes"
                            value={article.totalLikes.toLocaleString()}
                            description="Overall positive feedback"
                            iconColorClass="text-red-500"
                        />
                        <StatCard
                            icon={MessageSquare}
                            title="Total Comments"
                            value={article.totalComments.toLocaleString()}
                            description="Reader engagement"
                            iconColorClass="text-green-500"
                        />
                        <StatCard
                            icon={TrendingUp}
                            title="Engagement Rate"
                            value={`${article.engagementRate.toFixed(2)}%`}
                            description="(Likes + Comments) / Views"
                            iconColorClass="text-purple-500"
                        />
                    </div>

                    {/* Performance Charts */}
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Performance Trends</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                        {/* Daily Views */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Eye className="w-5 h-5 text-blue-600" /> Daily Views
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={article.dailyViews} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} className="text-sm text-gray-600" />
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

                        {/* Daily Engagement (Likes & Comments) */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-green-600" /> Daily Engagement
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={article.dailyLikes.map((l, i) => ({
                                    date: l.date,
                                    likes: l.likes,
                                    comments: article.dailyComments?.[i]?.comments || 0 // Ensure comments data exists
                                }))} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} className="text-sm text-gray-600" />
                                    <YAxis axisLine={false} tickLine={false} className="text-sm text-gray-600" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '10px' }}
                                        labelStyle={{ fontWeight: 'bold', color: '#333' }}
                                        itemStyle={{ color: '#666' }}
                                    />
                                    <Line type="monotone" dataKey="likes" stroke="#ef4444" strokeWidth={2} dot={{ r: 4, fill: '#ef4444' }} activeDot={{ r: 6 }} name="Likes" />
                                    <Line type="monotone" dataKey="comments" stroke="#22c55e" strokeWidth={2} dot={{ r: 4, fill: '#22c55e' }} activeDot={{ r: 6 }} name="Comments" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Traffic Sources & Keywords (Optional but highly valuable) */}
                    {article.trafficSources && article.topKeywords && (
                        <>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Traffic & Search Performance</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                                {/* Traffic Sources */}
                                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-indigo-600" /> Traffic Sources
                                    </h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={trafficSourceChartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                            <XAxis dataKey="name" angle={-30} textAnchor="end" height={60} interval={0} className="text-xs text-gray-600" />
                                            <YAxis axisLine={false} tickLine={false} className="text-sm text-gray-600" />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '10px' }}
                                                labelStyle={{ fontWeight: 'bold', color: '#333' }}
                                                itemStyle={{ color: '#666' }}
                                            />
                                            <Bar dataKey="views" fill="#818cf8" radius={[10, 10, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Top Performing Keywords */}
                                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-yellow-500" /> Top Search Keywords
                                    </h3>
                                    <div className="space-y-3">
                                        {article.topKeywords.sort((a, b) => b.clicks - a.clicks).map((kw, index) => (
                                            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                <span className="font-medium text-gray-800">{kw.keyword}</span>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span>Impressions: <span className="font-semibold">{kw.impressions.toLocaleString()}</span></span>
                                                    <span>Clicks: <span className="font-semibold">{kw.clicks.toLocaleString()}</span></span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Call to Action for AI Assistant (optional) */}
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Sparkles className="w-6 h-6 text-yellow-500" /> AI Insights for this Article
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Use the **BlogAI Assistant** to get specific recommendations for "Mastering Prompt Engineering: A Guide for Developers". Try asking:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                            <li>"How can I improve the SEO for this article?"</li>
                            <li>"Suggest topics for a follow-up article based on this one's performance."</li>
                            <li>"What external sites could I share this article on to boost views?"</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IndividualArticleDashboard;