// lib/dummyArticleData.ts

// import { BlogArticleDetails } from '@/types/blog'; // Assuming types/blog.ts
// types/blog.ts (or add to your existing types file)

interface BlogArticleDetails {
    id: string;
    title: string;
    authorId: string;
    authorName: string;
    authorProfilePic: string;
    publishDate: string; // ISO string
    contentSnippet: string; // A short excerpt of the article content
    imageUrl: string; // Main image for the article

    // Detailed Metrics
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    averageReadTimeMinutes: number; // e.g., calculated from content length
    engagementRate: number; // (likes + comments) / views * 100

    // Time-series data for charts
    dailyViews: { date: string; views: number; }[];
    dailyLikes: { date: string; likes: number; }[];
    dailyComments: { date: string; comments: number; }[];

    // Optional: traffic sources, referral data, audience demographics, keyword performance
    trafficSources?: { source: string; views: number; }[];
    topKeywords?: { keyword: string; impressions: number; clicks: number; }[];
}

export const dummyArticle1Details: BlogArticleDetails = {
    id: "blog1",
    title: "Mastering Prompt Engineering: A Guide for Developers",
    authorId: "jane_doe_id",
    authorName: "Jane Doe",
    authorProfilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=JaneDoe",
    publishDate: "2025-06-01T09:00:00Z",
    contentSnippet: "Unlock the full potential of AI models by mastering the art of prompt engineering. This guide covers essential techniques...",
    imageUrl: "https://images.unsplash.com/photo-1606761245781-a75d5e755255?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example image for the article

    totalViews: 12500,
    totalLikes: 450,
    totalComments: 85,
    averageReadTimeMinutes: 8,
    engagementRate: 4.28,

    dailyViews: [
        { date: "2025-06-01", views: 1500 }, { date: "2025-06-02", views: 2100 },
        { date: "2025-06-03", views: 1800 }, { date: "2025-06-04", views: 2500 },
        { date: "2025-06-05", views: 2200 }, { date: "2025-06-06", views: 2400 },
    ],
    dailyLikes: [
        { date: "2025-06-01", likes: 30 }, { date: "2025-06-02", likes: 60 },
        { date: "2025-06-03", likes: 50 }, { date: "2025-06-04", likes: 80 },
        { date: "2025-06-05", likes: 70 }, { date: "2025-06-06", likes: 90 },
    ],
    dailyComments: [
        { date: "2025-06-01", comments: 5 }, { date: "2025-06-02", comments: 12 },
        { date: "2025-06-03", comments: 8 }, { date: "2025-06-04", comments: 15 },
        { date: "2025-06-05", comments: 10 }, { date: "2025-06-06", comments: 18 },
    ],

    trafficSources: [
        { source: "Google Search", views: 6000 },
        { source: "Social Media", views: 3500 },
        { source: "Direct Traffic", views: 1500 },
        { source: "Referral Links", views: 1000 },
        { source: "Other", views: 500 },
    ],
    topKeywords: [
        { keyword: "prompt engineering", impressions: 15000, clicks: 1000 },
        { keyword: "AI for developers", impressions: 10000, clicks: 700 },
        { keyword: "large language models", impressions: 8000, clicks: 500 },
    ]
};

// You might also have a function to fetch by ID in a real app:
export const getArticleDetails = (id: string): BlogArticleDetails | undefined => {
    if (id === dummyArticle1Details.id) {
        return dummyArticle1Details;
    }
    // In a real app, you'd fetch from a database or API
    return undefined;
};