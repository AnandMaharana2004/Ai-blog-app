"use client";

// import { Navbar } from "@/components/layout/Navbar"; // Your existing Navbar

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";


// Icons from lucide-react
import {
  Clock,
  MessageSquare,
  UserPlus,
  Share2,
  Bookmark,
  ThumbsUp, // Or a custom clap icon
  Send,
  Edit3, // For a "Write a comment" feel
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

// Dummy data for the blog article (replace with actual data fetching)
const articleData = {
  title: "The Future of AI in Content Creation: A Deep Dive",
  kicker: "Transforming Ideas into Impact",
  author: {
    name: "Dr. Evelyn Hayes",
    avatarUrl: "/avatars/evelyn.png", // Replace with actual path
    fallback: "EH",
    bio: "AI Ethicist and Senior Researcher at FutureAI Labs. Passionate about responsible technology.",
    profileLink: "/profile/evelyn-hayes",
  },
  publicationDate: "May 28, 2025",
  readTime: "8 min read",
  featuredImageUrl: "/images/blog-header-ai.jpg", // Replace with actual path
  contentHtml: `
    <p class="lead text-xl text-muted-foreground">Artificial Intelligence is no longer a futuristic concept; it's a present-day reality reshaping industries, and content creation is at the forefront of this transformation. This article explores the multifaceted impact of AI on how we generate, distribute, and consume content.</p>

    <h2>Understanding AI's Role</h2>
    <p>AI encompasses a range of technologies, from Natural Language Processing (NLP) and Generation (NLG) to machine learning models that can analyze vast datasets and identify patterns. In content creation, these tools offer capabilities like:</p>
    <ul>
      <li>Automated content generation (drafts, summaries, social media posts)</li>
      <li>Personalized content recommendations</li>
      <li>Enhanced SEO optimization</li>
      <li>Sentiment analysis and audience insights</li>
    </ul>
    <figure>
      <img src="/images/ai-infographic.jpg" alt="AI in Content Workflow" class="rounded-lg border shadow-sm" />
      <figcaption class="text-center text-sm text-muted-foreground mt-2">Fig 1: AI integrated into a typical content workflow.</figcaption>
    </figure>
    <h2>The Creative Partnership: Human + AI</h2>
    <p>A common misconception is that AI aims to replace human creativity. Instead, the most powerful applications involve a synergistic partnership. AI can handle repetitive tasks, data analysis, and initial drafting, freeing up human creators to focus on higher-level strategy, nuanced storytelling, and injecting genuine emotion and unique perspectives.</p>
    <blockquote>
      <p>"AI tools are like incredibly smart assistants. They can help you research, write faster, and overcome writer's block, but the core vision and the soul of the content still need to come from the human creator."</p>
    </blockquote>
    <p>Consider the process of writing a long-form blog post. An AI might help with:</p>
    <ol>
      <li><strong>Topic Ideation:</strong> Analyzing trends to suggest relevant topics.</li>
      <li><strong>Outline Generation:</strong> Creating a structured outline based on keywords.</li>
      <li><strong>First Draft Assistance:</strong> Generating paragraphs for sections of the outline.</li>
      <li><strong>Editing & Proofreading:</strong> Identifying grammar errors, suggesting style improvements.</li>
    </ol>
    <h2>Ethical Considerations and Challenges</h2>
    <p>As with any powerful technology, the rise of AI in content creation brings ethical considerations:</p>
    <ul>
      <li><strong>Authenticity and Transparency:</strong> Should AI-generated content be disclosed?</li>
      <li><strong>Bias in Algorithms:</strong> AI models can perpetuate biases present in their training data.</li>
      <li><strong>Job Displacement:</strong> Concerns about the impact on content creation professionals.</li>
      <li><strong>Misinformation:</strong> The potential for AI to generate convincing but false narratives.</li>
    </ul>
    <pre><code class="language-python">
# Example: Basic text generation with a hypothetical library
import hypothetical_ai_lib as hai

generator = hai.TextGenerator(model="large-creative-v3")
prompt = "Write a short paragraph about the benefits of AI in education."
generated_text = generator.generate(prompt, max_length=100)
print(generated_text)
    </code></pre>
    <h2>Looking Ahead</h2>
    <p>The integration of AI into content creation is an evolving journey. We can expect more sophisticated tools, deeper personalization, and new forms of interactive content. The key will be to harness AI's power responsibly, fostering a future where technology augments human creativity rather than diminishes it.</p>
  `,
  tags: ["AI", "Content Creation", "Future of Work", "Technology", "Ethics"],
  claps: 1280,
  comments: [
    { id: 1, author: "Mark Olsen", avatarUrl: "/avatars/mark.png", fallback: "MO", text: "Great overview, Evelyn! The ethical considerations are particularly important to keep in mind.", timestamp: "2 days ago" },
    { id: 2, author: "Sarah Chen", avatarUrl: "/avatars/sarah.png", fallback: "SC", text: "I've started using AI tools for drafting, and it's a huge time saver. The human touch is still crucial for the final product though.", timestamp: "1 day ago" },
  ]
};


const BlogArticlePage = () => {
  // In a real app, you'd fetch articleData based on a slug or ID
  const { title, kicker, author, publicationDate, readTime, featuredImageUrl, contentHtml, tags, claps, comments } = articleData;

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="container mx-auto max-w-5xl py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto"> {/* Centered content column */}
          {/* Article Header */}
          <header className="mb-8">
            {kicker && <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">{kicker}</p>}
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
              {title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={author.avatarUrl} alt={author.name} />
                  <AvatarFallback>{author.fallback}</AvatarFallback>
                </Avatar>
                <div>
                  <a href={author.profileLink} className="text-sm font-medium text-foreground hover:underline">
                    {author.name}
                  </a>
                  <p className="text-xs text-muted-foreground">
                    {publicationDate} &middot; {readTime}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <UserPlus className="mr-2 h-4 w-4" /> Follow
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Optional Featured Image */}
          {featuredImageUrl && (
            <div className="mb-8 aspect-[16/9] overflow-hidden rounded-lg border">
              <img
                src={featuredImageUrl}
                alt={`Featured image for ${title}`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Body */}
          <article
            className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none prose-img:rounded-xl prose-img:border prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-700"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
          {/* Note: Using dangerouslySetInnerHTML requires trusting the HTML source. For user-generated content, sanitize it properly. */}

          {/* Tags & Engagement */}
          <footer className="mt-10 pt-8 border-t">
            <div className="mb-6">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="mr-2 mb-2 text-sm">{tag}</Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <Button variant="outline" size="lg" className="group">
                <ThumbsUp className="mr-2 h-5 w-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                <span className="text-muted-foreground group-hover:text-blue-600 transition-colors">Clap</span>
                <span className="ml-2 text-blue-600 font-semibold">{claps > 1000 ? (claps / 1000).toFixed(1) + 'k' : claps}</span>
              </Button>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <MessageSquare className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </footer>

          {/* Author Bio Card */}
          <Card className="mt-12">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={author.avatarUrl} alt={author.name} />
                  <AvatarFallback>{author.fallback}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-xs uppercase text-muted-foreground">Written By</p>
                  <a href={author.profileLink} className="text-xl font-semibold text-foreground hover:underline">
                    {author.name}
                  </a>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">{author.bio}</p>
                  <Button variant="secondary" size="sm">
                    More from {author.name}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section - Basic */}
          <section className="mt-12" id="comments">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Responses ({comments.length})
            </h2>
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-9 w-9 mt-1">
                    <AvatarImage src={author.avatarUrl} /> {/* Assuming current user avatar */}
                    <AvatarFallback>{author.fallback}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea placeholder="What are your thoughts?" className="mb-2" rows={3} />
                    <div className="flex justify-end">
                      <Button>
                        <Send className="mr-2 h-4 w-4" /> Respond
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={comment.avatarUrl} alt={comment.author} />
                        <AvatarFallback>{comment.fallback}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-foreground">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                        </div>
                        <p className="text-sm text-foreground/90">{comment.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticlePage;