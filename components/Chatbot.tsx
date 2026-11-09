"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { 
  Sparkles, 
  X, 
  Send
} from "lucide-react";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I'm Matt's AI Assistant. Ask me anything about **Tango PDF Editor**, **TeemChat**, **C&J Pickleball**, his experience, or tech stack!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messagesLeft, setMessagesLeft] = useState<number>(5);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_CHARS = 1000;
  const DAILY_LIMIT = 5;

  const quickPrompts = [
    "Tell me about Tango PDF Editor",
    "What is TeemChat?",
    "Tell me about C&J Pickleball",
    "What is Matt's tech stack?"
  ];

  // Rate limit check
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const storedData = localStorage.getItem("chat_rate_limit_v2");

    if (storedData) {
      try {
        const { date, count } = JSON.parse(storedData);
        if (date === today) {
          setMessagesLeft(Math.max(0, DAILY_LIMIT - count));
        } else {
          localStorage.setItem("chat_rate_limit_v2", JSON.stringify({ date: today, count: 0 }));
          setMessagesLeft(DAILY_LIMIT);
        }
      } catch {
        setMessagesLeft(DAILY_LIMIT);
      }
    } else {
      localStorage.setItem("chat_rate_limit_v2", JSON.stringify({ date: today, count: 0 }));
      setMessagesLeft(DAILY_LIMIT);
    }
  }, []);

  // Listen for custom trigger and Alt+K shortcut
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && (e.key === "k" || e.key === "K")) || 
          (e.metaKey && (e.key === "k" || e.key === "K"))) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("toggle-chatbot", handleToggle);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("toggle-chatbot", handleToggle);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || messagesLeft <= 0 || isLoading) return;

    const userMessage = queryText.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    const today = new Date().toISOString().split("T")[0];
    const currentUsage = DAILY_LIMIT - messagesLeft + 1;
    localStorage.setItem("chat_rate_limit_v2", JSON.stringify({ date: today, count: currentUsage }));
    setMessagesLeft((prev) => Math.max(0, prev - 1));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reach AI");
      }

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I'm temporarily having trouble reaching the model. You can reach Matt directly at **matthew.patacsil021@gmail.com** or book a quick chat on his [Calendly](https://calendly.com/matthew-patacsil021/30min)!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(input);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-zinc-700/50 dark:border-zinc-300"
          aria-label="Open AI Assistant"
        >
          <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-semibold tracking-tight">Ask Matt&apos;s AI</span>
          <kbd className="hidden sm:inline-block font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 dark:bg-zinc-200 text-zinc-300 dark:text-zinc-700">
            Alt + K
          </kbd>
        </button>
      )}

      {/* Modern Chat Window */}
      {isOpen && (
        <div
          data-chatbot-open="true"
          className="w-[calc(100vw-2.5rem)] sm:w-[400px] h-[580px] max-h-[85vh] rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          
          {/* Header */}
          <div className="px-5 py-4 bg-zinc-900 dark:bg-zinc-900 text-white flex items-center justify-between shrink-0 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-zinc-700 shrink-0">
                <Image
                  src="/images/profile.jpg"
                  alt="Matthew Patacsil"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-zinc-100 flex items-center gap-1.5">
                  Matt&apos;s AI Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h4>
                <p className="text-[10px] text-zinc-400">Trained on projects & experience</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-zinc-50/60 dark:bg-zinc-900/40 text-xs sm:text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" && (
                  <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 mt-0.5 ring-1 ring-zinc-300 dark:ring-zinc-700 relative">
                    <Image
                      src="/images/matt-patacsil.jpg"
                      alt="Matt Bot"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div
                  className={`px-4 py-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-tr-none font-medium shadow-2xs"
                      : "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-tl-none shadow-2xs"
                  }`}
                >
                  {msg.role === "bot" ? (
                    <ReactMarkdown
                      components={{
                        strong: ({ children }) => (
                          <strong className="font-bold text-zinc-900 dark:text-zinc-100">
                            {children}
                          </strong>
                        ),
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0 leading-relaxed">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc pl-4 space-y-1 mb-2 last:mb-0">
                            {children}
                          </ul>
                        ),
                        li: ({ children }) => <li className="pl-0.5">{children}</li>,
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            className="text-blue-600 dark:text-blue-400 underline font-medium hover:opacity-80"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 text-xs pl-8">
                <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap gap-1.5 shrink-0">
              {quickPrompts.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => sendQuery(prompt)}
                  disabled={messagesLeft <= 0 || isLoading}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors disabled:opacity-50 text-left cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input & Status Bar */}
          <div className="p-3 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2 shrink-0">
            <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={MAX_CHARS}
                disabled={messagesLeft <= 0 || isLoading}
                placeholder={
                  messagesLeft > 0
                    ? "Ask about Tango, TeemChat, stack, or projects..."
                    : "Daily message limit reached!"
                }
                className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 disabled:opacity-50 transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || messagesLeft <= 0}
                className="p-2.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white disabled:opacity-40 transition-colors cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between px-1 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
              <span>
                {messagesLeft > 0 ? `${messagesLeft} inquiries left today` : "Limit resets tomorrow"}
              </span>
              <span>{input.length}/{MAX_CHARS}</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
