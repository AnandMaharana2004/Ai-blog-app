// components/FloatingChatbot.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Keep Textarea if used for input elsewhere, otherwise remove
import { Bot, Send, X } from 'lucide-react';

// ... (dummyBlogTitlesAndMetrics and ChatMessage interface remain the same) ...
const dummyBlogTitlesAndMetrics = [
  { title: "Mastering Prompt Engineering", views: 12500, likes: 450, comments: 85, engagement: 4.28 },
  { title: "The Future of AI in Content Creation", views: 8900, likes: 320, comments: 60, engagement: 4.27 },
  { title: "Debugging React Applications with DevTools", views: 15000, likes: 600, comments: 110, engagement: 4.73 },
  { title: "Understanding Server-Side Rendering (SSR) in Next.js", views: 7200, likes: 280, comments: 40, engagement: 4.44 },
  { title: "Building Scalable APIs with Node.js and Express", views: 10500, likes: 390, comments: 70, engagement: 4.38 },
];

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isOpen]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const newUserMessage: ChatMessage = { role: 'user', text: inputMessage.trim() };
    setChatHistory((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const blogContext = dummyBlogTitlesAndMetrics.map(blog =>
        `- "${blog.title}" (Views: ${blog.views}, Likes: ${blog.likes}, Comments: ${blog.comments}, Engagement: ${blog.engagement.toFixed(2)}%)`
      ).join('\n');

      const prompt = `You are a helpful AI assistant specialized in blog content analysis and improvement.
      A user has asked a question related to their blog. Here is the context of their blogs (titles and some metrics):
      ${blogContext}

      User's question: "${newUserMessage.text}"

      Based on the user's question and the provided blog context, provide a concise and helpful answer. If the user asks for enhancement suggestions, provide actionable advice.
      `;

      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] })
      });

      const result = await response.json();
      let modelResponseText = "Sorry, I couldn't get a response. Please try again.";

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        modelResponseText = result.candidates[0].content.parts[0].text;
      } else {
        console.error("Unexpected API response structure:", result);
      }

      setChatHistory((prev) => [...prev, { role: 'model', text: modelResponseText }]);

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setChatHistory((prev) => [...prev, { role: 'model', text: "An error occurred while fetching the response." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chatbot Icon: Adjusted for more padding on small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 animate-bounce-slow"
        aria-label="Open Chatbot"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>

      {/* Chatbot Modal: Adjusted width, height, and position for mobile */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-[calc(100vw-32px)] h-[400px] sm:w-80 sm:h-[450px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-40 animate-fade-in-up">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Bot className="w-5 h-5" /> BlogAI Assistant
            </h3>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-blue-700 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto space-y-4">
            {chatHistory.length === 0 ? (
              <div className="text-center text-gray-500 italic mt-4">
                Hi there! How can I help you with your blog analytics today?
              </div>
            ) : (
              chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg shadow-sm bg-gray-100 text-gray-800 rounded-bl-none">
                  <div className="flex items-center">
                    <span className="animate-pulse mr-2">...</span> Thinking
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Ask about your blogs..."
              className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={isLoading}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;