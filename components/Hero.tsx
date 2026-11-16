"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Mail,
  MapPin,
  Sparkles,
  ArrowUpRight,
  CodeXml,
  Laptop,
  Smartphone,
  Rocket,
  Pencil
} from "lucide-react";
import { SparkleStar, OpenAIIcon, ClaudeIcon, AiNodesIcon } from "@/components/Icons";

export default function Hero() {
  const triggerChat = () => {
    window.dispatchEvent(new CustomEvent("toggle-chatbot"));
  };

  return (
    <section id="about" className="flex flex-col gap-8 pt-2">

      {/* Top Banner / Avatar + Bio Intro */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

        {/* Profile Picture with modern frame */}
        <div className="relative group shrink-0">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-200 to-zinc-400 dark:from-zinc-700 dark:to-zinc-800 rounded-3xl blur-[2px] opacity-70 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-md">
            <Image
              src="/images/profile.jpg"
              alt="Matthew Patacsil"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
          <span className="absolute -bottom-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 ring-2 ring-white dark:ring-zinc-950"></span>
          </span>
        </div>

        {/* Name, Headline & Location */}
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-mono w-fit">
            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
            <span>Rizal, Philippines • GMT+8</span>
          </div>

          <h1
            data-guide="name"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 w-fit"
          >
            Matthew Patacsil
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base font-medium">
            Full-Stack Software Engineer & Automation Architect
          </p>
        </div>
      </div>

      {/* Narrative with inline styled tags using real Lucide icons */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-4">
        <p className="text-zinc-700 dark:text-zinc-300 text-base sm:text-lg leading-relaxed sm:leading-loose">
          I&apos;m a{" "}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium text-xs sm:text-sm border border-zinc-200/80 dark:border-zinc-700/80 shadow-2xs align-middle mx-0.5">
            <CodeXml className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
            <span>full-stack</span>
          </span>{" "}
          engineer building modern{" "}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium text-xs sm:text-sm border border-zinc-200/80 dark:border-zinc-700/80 shadow-2xs align-middle mx-0.5">
            <Laptop className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
            <span>web</span>
          </span>{" "}
          &{" "}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium text-xs sm:text-sm border border-zinc-200/80 dark:border-zinc-700/80 shadow-2xs align-middle mx-0.5">
            <Smartphone className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
            <span>mobile apps</span>
          </span>
          , with a dedicated focus on{" "}
          <span className="inline-flex items-center align-middle mx-1 group/ai cursor-default">
            <span className="inline-flex items-center -space-x-1.5 mr-1.5">
              <span className="relative z-10 w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700/90 shadow-xs flex items-center justify-center text-zinc-800 dark:text-zinc-200 -rotate-6 group-hover/ai:-translate-x-1 transition-transform">
                <SparkleStar className="w-3.5 h-3.5" />
              </span>
              <span className="relative z-20 w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700/90 shadow-xs flex items-center justify-center text-zinc-800 dark:text-zinc-200 -rotate-2 group-hover/ai:-translate-y-0.5 transition-transform">
                <OpenAIIcon className="w-3.5 h-3.5" />
              </span>
              <span className="relative z-30 w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700/90 shadow-xs flex items-center justify-center text-zinc-800 dark:text-zinc-200 rotate-2 group-hover/ai:translate-y-0.5 transition-transform">
                <ClaudeIcon className="w-3.5 h-3.5" />
              </span>
              <span className="relative z-40 w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700/90 shadow-xs flex items-center justify-center text-zinc-800 dark:text-zinc-200 rotate-6 group-hover/ai:translate-x-1 transition-transform">
                <AiNodesIcon className="w-3.5 h-3.5" />
              </span>
            </span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">generative AI</span>
          </span>
          .
        </p>

        <p className="text-zinc-700 dark:text-zinc-300 text-base sm:text-lg leading-relaxed sm:leading-loose">
          Every day I&apos;m shipping{" "}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium text-xs sm:text-sm border border-zinc-200/80 dark:border-zinc-700/80 shadow-2xs align-middle mx-0.5">
            <Rocket className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
            <span>cool new software</span>
          </span>{" "}
          and automated workflows. I love turning{" "}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium text-xs sm:text-sm border border-zinc-200/80 dark:border-zinc-700/80 shadow-2xs align-middle mx-0.5">
            <Pencil className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
            <span>rough ideas</span>
          </span>{" "}
          into products people genuinely rely on.
        </p>

        {/* Quick Social & Link Pills */}
        <div
          data-guide="socials"
          className="flex flex-wrap items-center gap-3 pt-3 text-xs font-mono text-zinc-600 dark:text-zinc-400"
        >
          <Link
            href="https://github.com/machu21"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline flex items-center gap-1"
          >
            github <ArrowUpRight className="w-3 h-3" />
          </Link>
          <span>/</span>
          <Link
            href="mailto:matthew.patacsil021@gmail.com"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline flex items-center gap-1"
          >
            email <ArrowUpRight className="w-3 h-3" />
          </Link>
          <span>/</span>
          <Link
            href="https://calendly.com/matthew-patacsil021/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline flex items-center gap-1"
          >
            calendly <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="https://calendly.com/matthew-patacsil021/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-sm active:scale-[0.98]"
        >
          <Calendar className="w-4 h-4" />
          <span>Schedule Intro Call</span>
        </Link>

        <Link
          href="mailto:matthew.patacsil021@gmail.com"
          className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all shadow-xs"
        >
          <Mail className="w-4 h-4" />
          <span>Send Direct Email</span>
        </Link>

        <button
          onClick={triggerChat}
          className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Ask AI Assistant</span>
        </button>
      </div>

      {/* Stats / Metric Cards row (matching modern portfolio aesthetic) */}
      <div
        data-guide="stats"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
      >
        <div
          data-guide-stat
          className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col justify-between transition-colors"
        >
          <span className="font-mono text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            9+
          </span>
          <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mt-1">
            Shipped Projects
          </span>
        </div>

        <div
          data-guide-stat
          className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col justify-between transition-colors"
        >
          <span className="font-mono text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            4+ Yrs
          </span>
          <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mt-1">
            Building & Shipping
          </span>
        </div>

        <div
          data-guide-stat
          className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col justify-between transition-colors"
        >
          <span className="font-mono text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            100%
          </span>
          <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mt-1">
            Production Focused
          </span>
        </div>

        <div
          data-guide-stat
          className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col justify-between transition-colors"
        >
          <span className="font-mono text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            IoT & AI
          </span>
          <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mt-1">
            Hardware & Vision
          </span>
        </div>
      </div>

    </section>
  );
}
