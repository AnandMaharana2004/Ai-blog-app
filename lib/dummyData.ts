// lib/dummyData.ts
// import { UserProfile, UserPost } from '@/types/user'; // Assuming you put types in types/user.ts

// types/user.ts
interface UserProfile {
    id: string;
    username: string;
    profilePic: string; // URL to profile picture
    profileBanner: string; // URL to banner image
    bio: string;
    followers: number;
    following: number;
    postsCount: number;
}

// types/post.ts (assuming posts are similar to your blog analytics, but simpler)
interface UserPost {
    id: string;
    title: string;
    thumbnail: string; // URL to post thumbnail
    views: number;
    likes: number;
    publishDate: string; // ISO string or similar
}

export const dummyUserProfile: UserProfile = {
    id: "user1",
    username: "CodeExplorer",
    profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=CodeExplorer",
    profileBanner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example banner
    bio: "Sharing insights on web development, AI, and effective coding practices. Join me on a journey through the digital landscape!",
    followers: 12500,
    following: 345,
    postsCount: 78,
};

export const dummyUserPosts: UserPost[] = [
    {
        id: "post1",
        title: "Understanding React Hooks: A Deep Dive",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-cd3b08e2e052?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        views: 25000,
        likes: 1200,
        publishDate: "2024-05-15T10:00:00Z",
    },
    {
        id: "post2",
        title: "Next.js Authentication with NextAuth.js",
        thumbnail: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        views: 18000,
        likes: 950,
        publishDate: "2024-04-20T14:30:00Z",
    },
    {
        id: "post3",
        title: "Optimizing Database Queries for Performance",
        thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcefd63f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        views: 32000,
        likes: 2100,
        publishDate: "2024-06-01T08:00:00Z",
    },
    {
        id: "post4",
        title: "Building Real-time Apps with WebSockets",
        thumbnail: "https://images.unsplash.com/photo-1549692520-cb9d3652f252?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        views: 15000,
        likes: 700,
        publishDate: "2024-03-10T11:00:00Z",
    },
    {
        id: "post5",
        title: "A Beginner's Guide to TypeScript",
        thumbnail: "https://images.unsplash.com/photo-1627398246471-ea268779b5cde?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        views: 28000,
        likes: 1500,
        publishDate: "2024-02-25T09:00:00Z",
    },
];