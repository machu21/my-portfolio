"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown"; // NEW: Import the markdown parser

type Message = {
    role: "user" | "bot";
    text: string;
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "bot", text: "Hi! I'm Matt's virtual assistant. Ask me anything about Matt's experience, tech stack, or projects!" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messagesLeft, setMessagesLeft] = useState<number>(3);

    const MAX_CHARS = 1000;
    const DAILY_LIMIT = 3;

    // Check rate limit on component load
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        const storedData = localStorage.getItem("chat_rate_limit");

        if (storedData) {
            const { date, count } = JSON.parse(storedData);
            if (date === today) {
                setMessagesLeft(Math.max(0, DAILY_LIMIT - count));
            } else {
                // New day: Reset limit
                localStorage.setItem("chat_rate_limit", JSON.stringify({ date: today, count: 0 }));
                setMessagesLeft(DAILY_LIMIT);
            }
        } else {
            // First time visiting: Set initial state
            localStorage.setItem("chat_rate_limit", JSON.stringify({ date: today, count: 0 }));
            setMessagesLeft(DAILY_LIMIT);
        }
    }, []);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || messagesLeft <= 0) return;

        const userMessage = input.trim();
        setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
        setInput("");
        setIsLoading(true);

        // Update local storage count
        const today = new Date().toISOString().split("T")[0];
        const currentUsage = DAILY_LIMIT - messagesLeft + 1;
        localStorage.setItem("chat_rate_limit", JSON.stringify({ date: today, count: currentUsage }));
        setMessagesLeft((prev) => prev - 1);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to connect to the AI.");
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
                    text: "It looks like my AI systems are currently running updates or experiencing high traffic! 🔌 In the meantime, please feel free to email Matt directly or use the 'Schedule a Call' link on the page."
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Floating Action Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-slate-900 dark:bg-slate-800 text-white p-4 rounded-full shadow-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-transform hover:scale-105"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-[380px] h-[600px] flex flex-col overflow-hidden transition-colors">

                    {/* Header */}
                    <div className="bg-slate-900 p-4 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-600 bg-white dark:bg-slate-800">
                                <Image src="/images/profile.jpg" alt="Pat" fill className="object-cover" />
                            </div>
                            <span className="text-white font-semibold text-sm">Ask Matt's AI Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-900 flex flex-col gap-5">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>

                                {msg.role === "bot" && (
                                    <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                        <Image src="/images/matt-patacsil.jpg" alt="Bot" fill className="object-cover" />
                                    </div>
                                )}

                                <div className={`px-4 py-3 text-sm rounded-2xl max-w-[85%] leading-relaxed ${msg.role === "user"
                                    ? "bg-slate-900 dark:bg-slate-700 text-white rounded-tr-none"
                                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-tl-none shadow-sm"
                                    }`}>
                                    {/* NEW: Render Markdown for the Bot, keep plain text for the user */}
                                    {msg.role === "bot" ? (
                                        <ReactMarkdown 
                                            components={{
                                                strong: ({node, ...props}) => <strong className="font-bold text-slate-900 dark:text-white" {...props} />,
                                                ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1" {...props} />,
                                                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                                                a: ({node, ...props}) => <a className="text-blue-600 dark:text-blue-400 underline" {...props} />,
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
                            <div className="flex gap-2 items-center text-slate-400 dark:text-slate-500 text-xs pl-10 font-medium">
                                <span className="animate-pulse">Typing...</span>
                            </div>
                        )}
                    </div>

                    {/* Input Area with Rate Limit Notification */}
                    <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2 shrink-0">
                        <form onSubmit={sendMessage} className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                maxLength={MAX_CHARS}
                                disabled={messagesLeft <= 0 || isLoading}
                                placeholder={messagesLeft > 0 ? "Type a message..." : "Daily message limit reached!"}
                                className="flex-1 bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-slate-500 disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:text-slate-400 dark:disabled:text-slate-600 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim() || messagesLeft <= 0}
                                className="bg-slate-900 dark:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-600 disabled:opacity-50 flex items-center justify-center transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </form>

                        {/* Status Bar showing remaining messages */}
                        <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 px-1">
                            <span className={messagesLeft === 0 ? "text-amber-600 dark:text-amber-500 font-medium" : ""}>
                                {messagesLeft > 0 ? `${messagesLeft} messages left today` : "Limit resets tomorrow"}
                            </span>
                            <span className={`font-medium ${input.length >= MAX_CHARS ? "text-red-500 dark:text-red-400" : ""}`}>
                                {input.length}/{MAX_CHARS}
                            </span>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}