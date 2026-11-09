"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import {
  FolderGit2,
  Briefcase,
  Cpu,
  Mail,
  Calendar,
  Sparkles,
  ExternalLink,
  User,
  Radio,
  Check,
  Copy
} from "lucide-react";

export default function Sidebar() {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const email = "matthew.patacsil021@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openChatbot = () => {
    window.dispatchEvent(new CustomEvent("toggle-chatbot"));
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "projects", "experience", "stack", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "about", label: "Overview", icon: User },
    { id: "projects", label: "Projects", icon: FolderGit2, badge: "9" },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "stack", label: "Tech Stack", icon: Cpu },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <aside data-guide="sidebar" className="w-full lg:w-64 xl:w-72 shrink-0">
      <div className="lg:sticky lg:top-8 flex flex-col gap-6 p-5 sm:p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
        
        {/* Brand / Profile Header */}
        <div className="flex items-center gap-3.5 pb-5 border-b border-zinc-100 dark:border-zinc-800">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-zinc-200 dark:ring-zinc-700 shrink-0">
            <Image
              src="/images/profile.jpg"
              alt="Matthew Patacsil"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-base text-zinc-900 dark:text-zinc-100 truncate">
                Matthew Patacsil
              </h1>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
              Full-Stack & Systems Engineer
            </p>
          </div>
        </div>

        {/* Live Availability Badge */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="truncate">Available for projects & contracts</span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-guide={`nav-${item.id}`}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-zinc-700 text-zinc-100 dark:bg-zinc-300 dark:text-zinc-900"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Quick AI Trigger */}
        <button
          onClick={openChatbot}
          data-guide="chat"
          className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer text-left"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-12 transition-transform" />
            <span>Ask AI Assistant</span>
          </div>
          <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">
            Alt + K
          </kbd>
        </button>

        {/* Interactive Stats / Presence */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 text-[11px] text-zinc-500 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800/60">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span>1 person browsing now</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-400">Rizal, PH</span>
        </div>

        {/* Contact Links & Calendly */}
        <div className="flex flex-col gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <Link
            href="https://calendly.com/matthew-patacsil021/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-white transition-colors shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Intro Call</span>
          </Link>

          <button
            onClick={handleCopyEmail}
            data-guide="email"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-medium transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy Email Address</span>
              </>
            )}
          </button>
        </div>

        {/* Social Links & Theme Switcher */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
            <Link
              href="https://github.com/machu21"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </Link>
            <Link
              href="mailto:matthew.patacsil021@gmail.com"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </Link>
            <Link
              href="https://github.com/machu21/my-portfolio/releases/tag/tango-v1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              title="Tango PDF Editor Release"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <ThemeToggle />
        </div>

      </div>
    </aside>
  );
}
