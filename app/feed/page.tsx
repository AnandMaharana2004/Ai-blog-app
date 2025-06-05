"use client";

import { useState } from "react";
// import { Navbar } from "@/components/layout/Navbar"; // Assuming Navbar is in this path

// shadcn/ui components
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Icons from lucide-react
import {
    ImagePlus,
    VideoIcon,
    Briefcase,
    CalendarClock,
    Newspaper,
    UserPlus,
    Hash,
    MoreHorizontal,
    MessageCircle,
    Repeat,
    Send,
    ThumbsUp,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

// Dummy data for posts (you'd fetch this from an API)
const initialPosts = [
    {
        id: 1,
        author: "Elena Rodriguez",
        authorTitle: "AI Researcher @ Innovatech",
        authorAvatar: "/avatars/elena.png", // Replace with actual paths or URLs
        timestamp: "1h ago",
        content:
            "Thrilled to share our latest breakthrough in natural language understanding! Our new model achieves state-of-the-art results on several benchmarks. #AI #NLP #MachineLearning",
        imageUrl: "/images/post-image-1.jpg", // Optional image for the post
        likes: 125,
        comments: 18,
    },
    {
        id: 2,
        author: "Marcus Chen",
        authorTitle: "UX Lead @ DesignCo",
        authorAvatar: "/avatars/marcus.png",
        timestamp: "3h ago",
        content:
            "Just published a new article on 'The Future of Accessible Design'. Would love to hear your thoughts and feedback! Link in comments. #UXDesign #Accessibility #WebDevelopment",
        likes: 98,
        comments: 27,
    },
    {
        id: 3,
        author: "BlogAI Official",
        authorTitle: "Content Generation Platform",
        authorAvatar: "/logo-square.png", // Use your app's logo
        timestamp: "1d ago",
        content:
            "Did you know you can generate entire blog drafts with BlogAI in minutes? Try our new 'Advanced Outline' feature today and supercharge your content creation! #AIWriting #ContentMarketing #SaaS",
        likes: 210,
        comments: 45,
    },
];

// Placeholder for current user (replace with actual user data)
const currentUser = {
    name: "Your Name",
    title: "Your Professional Title",
    avatarUrl: "/avatars/current-user.png", // Placeholder
    avatarFallback: "YN",
};


const FeedPage = () => {
    const [posts, setPosts] = useState(initialPosts);

    return (
        // Use shadcn/ui's 'bg-muted' for a subtle background that complements Cards
        <>
            <div className="min-h-screen bg-muted/40">
                <Navbar />

                <div className="max-w-screen-xl mx-auto py-6 px-2 sm:px-4 lg:px-6 grid grid-cols-12 gap-x-4 lg:gap-x-6">
                    {/* Left Sidebar (Hidden on small screens) */}
                    <aside className="hidden md:block md:col-span-3 space-y-4">
                        {/* Profile Card */}
                        <Card>
                            <CardHeader className="items-center text-center p-4">
                                <Avatar className="w-20 h-20 mb-2 border-2 border-primary/20">
                                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                                    <AvatarFallback>{currentUser.avatarFallback}</AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-lg">{currentUser.name}</CardTitle>
                                <CardDescription className="text-xs">{currentUser.title}</CardDescription>
                            </CardHeader>
                            <Separator />
                            <CardContent className="p-4 text-sm space-y-2">
                                <div className="flex justify-between items-center hover:bg-muted p-2 rounded-md cursor-pointer">
                                    <span>Connections</span>
                                    <span className="font-semibold text-blue-600">500+</span>
                                </div>
                                <div className="hover:bg-muted p-2 rounded-md cursor-pointer">Grow your network</div>
                            </CardContent>
                            <Separator />
                            <CardFooter className="p-4">
                                <Button variant="outline" className="w-full text-sm">View Profile</Button>
                            </CardFooter>
                        </Card>

                        {/* Shortcuts/Recent Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Recent</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-1 text-sm">
                                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                                    <Hash className="w-4 h-4 mr-2 text-blue-500" /> #artificialintelligence
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                                    <Briefcase className="w-4 h-4 mr-2 text-green-500" /> Startup Jobs
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                                    <UserPlus className="w-4 h-4 mr-2 text-purple-500" /> Tech Community Group
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Main Feed Area */}
                    <main className="col-span-12 md:col-span-9 lg:col-span-6 space-y-4">
                        {/* Start a Post Card */}
                        <Card>
                            <CardContent className="p-3 sm:p-4">
                                <div className="flex items-center space-x-3 mb-3">
                                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                                        <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                                        <AvatarFallback>{currentUser.avatarFallback}</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline" className="flex-grow justify-start rounded-full text-muted-foreground hover:text-foreground text-sm sm:text-base">
                                        Start a post, try writing with AI...
                                    </Button>
                                </div>
                                <Separator className="my-2 sm:my-3" />
                                <div className="flex justify-around items-center gap-1">
                                    <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-muted hover:text-blue-600 flex-1">
                                        <ImagePlus className="w-5 h-5 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Photo</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-muted hover:text-green-600 flex-1">
                                        <VideoIcon className="w-5 h-5 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Video</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-muted hover:text-purple-600 flex-1">
                                        <CalendarClock className="w-5 h-5 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Event</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-muted hover:text-amber-600 flex-1">
                                        <Newspaper className="w-5 h-5 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Article</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Feed Posts */}
                        {posts.map((post) => (
                            <Card key={post.id}>
                                <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage src={post.authorAvatar} alt={post.author} />
                                                <AvatarFallback>{post.author.substring(0, 1)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <CardTitle className="text-sm font-semibold hover:underline cursor-pointer">{post.author}</CardTitle>
                                                <CardDescription className="text-xs">{post.authorTitle}</CardDescription>
                                                <CardDescription className="text-xs">{post.timestamp}</CardDescription>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="w-8 h-8">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="pb-3">
                                    <p className="text-sm text-foreground/90 whitespace-pre-line">
                                        {post.content}
                                    </p>
                                    {post.imageUrl && (
                                        <div className="mt-3 rounded-lg overflow-hidden border">
                                            <img src={post.imageUrl} alt="Post image" className="w-full h-auto object-cover" />
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter className="pt-2 pb-3 border-t flex-col items-start">
                                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                                        {post.likes > 0 && <span>{post.likes} Likes</span>}
                                        {post.likes > 0 && post.comments > 0 && <span>·</span>}
                                        {post.comments > 0 && <span>{post.comments} Comments</span>}
                                    </div>
                                    <Separator className="mb-2" />
                                    <div className="flex justify-around w-full">
                                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-600 flex-1">
                                            <ThumbsUp className="w-4 h-4 mr-1 sm:mr-2" /> Like
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-600 flex-1">
                                            <MessageCircle className="w-4 h-4 mr-1 sm:mr-2" /> Comment
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-600 flex-1">
                                            <Repeat className="w-4 h-4 mr-1 sm:mr-2" /> Repost
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-600 flex-1">
                                            <Send className="w-4 h-4 mr-1 sm:mr-2" /> Send
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                        {/* Load More Button */}
                        <div className="text-center py-4">
                            <Button variant="outline">Load More Posts</Button>
                        </div>
                    </main>

                    {/* Right Sidebar (Hidden on small and medium screens) */}
                    <aside className="hidden lg:block lg:col-span-3 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Add to your feed</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[
                                    { name: "TechCrunch", desc: "Technology News", avatar: "/avatars/techcrunch.png", fallback: "TC" },
                                    { name: "OpenAI", desc: "AI Research Company", avatar: "/avatars/openai.png", fallback: "OI" },
                                    { name: "React Developers", desc: "Community", avatar: "/avatars/react.png", fallback: "RD" },
                                ].map(item => (
                                    <div key={item.name} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={item.avatar} />
                                                <AvatarFallback>{item.fallback}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-semibold text-sm hover:underline cursor-pointer">{item.name}</div>
                                                <div className="text-xs text-muted-foreground">{item.desc}</div>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <UserPlus className="w-4 h-4 mr-1" /> Follow
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Trending Today</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-1">
                                {["AI Ethics Debate Heats Up", "The Future of Remote Work", "Quantum Computing Milestones"].map(trend => (
                                    <Button key={trend} variant="ghost" className="w-full justify-start text-sm h-auto py-2 text-muted-foreground hover:text-foreground">
                                        <div>
                                            <p className="font-medium text-foreground">{trend}</p>
                                            <p className="text-xs">Trending in Your Network</p>
                                        </div>
                                    </Button>
                                ))}
                            </CardContent>
                        </Card>
                        {/* You could add an Ad Card here too */}
                    </aside>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FeedPage;