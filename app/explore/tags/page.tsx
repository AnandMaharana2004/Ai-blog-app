"use client";

import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Bookmark } from "lucide-react";

interface Article {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    username: string;
    profilePic: string;
    followers: number;
  };
  likes: number;
  comments: number;
  saves: number;
}

const mockArticles: Article[] = [
  {
    id: "1",
    title: "The Future of AI in Content Creation",
    content:
      "Explore how artificial intelligence is transforming the way we create and consume content. From automated writing tools to personalized experiences, the possibilities are endless.",
    author: {
      name: "John Doe",
      username: "johndoe",
      profilePic: "https://i.pravatar.cc/150?img=1",
      followers: 1200,
    },
    likes: 150,
    comments: 30,
    saves: 60,
  },
  {
    id: "2",
    title: "Mastering React Best Practices in 2024",
    content:
      "Stay ahead of the curve with the latest React best practices. Learn how to optimize your components, manage state effectively, and build scalable applications.",
    author: {
      name: "Jane Smith",
      username: "janesmith",
      profilePic: "https://i.pravatar.cc/150?img=2",
      followers: 2500,
    },
    likes: 220,
    comments: 45,
    saves: 80,
  },
  {
    id: "3",
    title: "A Guide to Next.js Server Components",
    content:
      "Discover the power of Next.js server components and how they can improve your application's performance and SEO. Dive into the details of server-side rendering and data fetching.",
    author: {
      name: "Alice Johnson",
      username: "alicejohnson",
      profilePic: "https://i.pravatar.cc/150?img=3",
      followers: 800,
    },
    likes: 180,
    comments: 35,
    saves: 70,
  },
];

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <Card className="bg-white shadow-md rounded-lg overflow-hidden">
      <CardHeader>
        <h3 className="text-lg font-semibold">{article.title}</h3>
      </CardHeader>
      <CardContent className="text-sm text-gray-700 leading-relaxed">
        {article.content}
      </CardContent>
      <CardFooter className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={article.author.profilePic} alt={article.author.name} />
          </Avatar>
          <div>
            <p className="font-medium">{article.author.username}</p>
            <p className="text-gray-400">{article.author.followers} followers</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Heart className="w-4 h-4 mr-1" />
            <span>{article.likes}</span>
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="w-4 h-4 mr-1" />
            <span>{article.comments}</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Bookmark className="w-4 h-4 mr-1" />
            <span>{article.saves}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const ExplorePage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;