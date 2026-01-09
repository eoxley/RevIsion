"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface VARKProfile {
  visual: number;
  auditory: number;
  readWrite: number;
  kinesthetic: number;
  primaryStyles: string[];
  isMultimodal: boolean;
}

interface ChatInterfaceProps {
  varkProfile: VARKProfile | null;
}

export function ChatInterface({ varkProfile }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting based on VARK profile
  useEffect(() => {
    if (messages.length === 0) {
      const greeting = varkProfile
        ? `Hi! I'm your personal GCSE revision coach for the 2026 exams. I can see you're ${
            varkProfile.isMultimodal
              ? "a multimodal learner"
              : `primarily a ${varkProfile.primaryStyles[0]?.replace("_", "/")} learner`
          }. I'll tailor all my revision advice to match how you learn best.

What GCSE subject would you like help with? Just let me know the subject and your exam board (AQA, Edexcel, OCR, etc.) and I'll give you personalised revision strategies!`
        : "Hi! I'm your GCSE revision coach for the 2026 exams. To give you personalised study advice, please take the VARK assessment first. But feel free to ask me any general GCSE revision questions!";

      setMessages([{ role: "assistant", content: greeting }]);
    }
  }, [varkProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          varkProfile: varkProfile
            ? {
                visual: varkProfile.visual,
                auditory: varkProfile.auditory,
                readWrite: varkProfile.readWrite,
                kinesthetic: varkProfile.kinesthetic,
                primaryStyles: varkProfile.primaryStyles,
                isMultimodal: varkProfile.isMultimodal,
              }
            : null,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantMessage += chunk;

        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: "assistant",
            content: assistantMessage,
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate personalized prompts based on VARK profile
  const getSuggestedPrompts = () => {
    if (!varkProfile) {
      return [
        "What are the best GCSE revision techniques?",
        "How should I prepare for 2026 exams?",
        "Help me choose revision resources",
      ];
    }

    const primaryStyle = varkProfile.primaryStyles[0];

    const stylePrompts: Record<string, string[]> = {
      visual: [
        "Create a visual revision timetable for my GCSEs",
        "Best mind mapping techniques for Biology",
        "How do I use diagrams to revise Chemistry?",
        "Recommend YouTube channels for GCSE revision",
      ],
      auditory: [
        "Create a revision plan I can discuss with friends",
        "Best podcasts and audio resources for GCSEs",
        "How do I memorize quotes by saying them aloud?",
        "Tips for study groups and discussion revision",
      ],
      read_write: [
        "Create a detailed written revision schedule",
        "How do I take better notes for GCSE English?",
        "Best revision guides and textbooks to buy",
        "How to use mark schemes effectively",
      ],
      kinesthetic: [
        "Create a hands-on revision plan with past papers",
        "How do I revise while staying active?",
        "Best practice techniques for GCSE Maths",
        "How to do timed exam practice effectively",
      ],
    };

    return stylePrompts[primaryStyle] || stylePrompts.visual;
  };

  const suggestedPrompts = getSuggestedPrompts();

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-xl">🤖</span>
          </div>
          <div>
            <h3 className="font-semibold text-white">RevisionAI</h3>
            <p className="text-sm text-blue-100">
              {varkProfile
                ? `Personalized for your ${varkProfile.primaryStyles[0]?.replace("_", "/")} learning style`
                : "Your AI Study Coach"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2",
                message.role === "user"
                  ? "bg-blue-600 text-white rounded-br-md"
                  : "bg-slate-100 text-slate-900 rounded-bl-md"
              )}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-slate-500 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => setInput(prompt)}
                className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about revision strategies..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
