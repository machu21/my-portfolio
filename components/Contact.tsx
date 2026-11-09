"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Copy, 
  Check, 
  Clock, 
  MapPin,
  Sparkles
} from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "matthew.patacsil021@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerChatbot = () => {
    window.dispatchEvent(new CustomEvent("toggle-chatbot"));
  };

  return (
    <section id="contact" className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col gap-6">
      
      {/* Editorial Header */}
      <div>
        <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
          04 — INQUIRIES & COLLABORATION
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">
          Get in Touch
        </h2>
      </div>

      {/* Main Contact Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        
        <div className="max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Full-Stack, Desktop & Automation Contracts</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Let&apos;s build something remarkable together.
          </h3>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Whether you need a custom CRM pipeline, a real-time web platform, an offline Flutter desktop studio, or full-stack software development from concept to launch — let&apos;s talk.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Rizal, Philippines</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>GMT+8 (Flexible overlap)</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
          <Link
            href="https://calendly.com/matthew-patacsil021/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-sm active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Intro Call</span>
          </Link>

          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Email Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-400" />
                <span>Copy Email Address</span>
              </>
            )}
          </button>

          <button
            onClick={triggerChatbot}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Ask AI Assistant [Alt + K]</span>
          </button>
        </div>

      </div>

    </section>
  );
}
