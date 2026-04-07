"use client";

import { useState } from "react";
import Image from "next/image";

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

    // Set your maximum character limit here
    const MAX_CHARS = 1000;

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await res.json();

            // NEW: Catch HTTP errors (like 429 Quota Exceeded or 500 Server Error)
            if (!res.ok) {
                throw new Error(data.error || "Failed to connect to the AI.");
            }

            if (data.reply) {
                setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
            }
        } catch (error) {
            console.error("Chat Error:", error);

            // NEW: A highly professional, actionable fallback message
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
                    className="bg-slate-900 text-white p-4 rounded-full shadow-lg hover:bg-slate-800 transition-transform hover:scale-105"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-[350px] h-[600px] flex flex-col overflow-hidden">

                    {/* Header */}
                    <div className="bg-slate-900 p-4 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-600 bg-white">
                                <Image src="/images/profile.jpg" alt="Pat" fill className="object-cover" />
                            </div>
                            <span className="text-white font-semibold text-sm">Ask Matt's AI Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    {/* Messages Area - Changed to flex-1 with no explicit height, so it fills the available space */}
                    <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>

                                {msg.role === "bot" && (
                                    <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 mt-1 bg-white border border-slate-200">
                                        <Image src="/images/matt-patacsil.jpg" alt="Bot" fill className="object-cover" />
                                    </div>
                                )}

                                <div className={`px-4 py-2 text-sm rounded-2xl max-w-[80%] ${msg.role === "user"
                                    ? "bg-slate-900 text-white rounded-tr-none"
                                    : "bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm"
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-2 items-center text-slate-400 text-xs pl-8">
                                Typing...
                            </div>
                        )}
                    </div>

                    {/* Input Area with Character Limit */}
                    <div className="p-3 bg-white border-t border-slate-100 flex flex-col gap-2 shrink-0">
                        <form onSubmit={sendMessage} className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                maxLength={MAX_CHARS}
                                placeholder="Type a message..."
                                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-slate-900"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </form>

                        {/* Status Bar */}
                        <div className="flex justify-between items-center text-[10px] text-slate-500 px-1">
                            <span>Ask about CRM, automation, or tech!</span>
                            <span className={`font-medium ${input.length >= MAX_CHARS ? "text-red-500" : ""}`}>
                                {input.length}/{MAX_CHARS}
                            </span>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}