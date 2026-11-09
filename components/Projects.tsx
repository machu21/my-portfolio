"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Download, 
  Sparkles, 
  Terminal, 
  CheckCircle2
} from "lucide-react";

type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: "Desktop & Realtime" | "Web & SaaS" | "Hardware & IoT" | "Client Platform";
  featured?: boolean;
  isNew?: boolean;
  tags: string[];
  url?: string;
  downloadUrl?: string;
  downloadLabel?: string;
  releaseUrl?: string;
  highlights: string[];
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const projects: Project[] = [
    {
      id: "tango",
      name: "Tango PDF Editor",
      tagline: "100% Offline Flutter Desktop PDF Studio & Annotation Engine",
      description: "A fast, lightweight, and completely offline desktop PDF editor and document studio built with Flutter. Designed for extreme privacy and speed: add text boxes on click, draw freehand ink, highlight text, insert vector shapes, create Bézier digital signatures, auto-save non-destructive drafts, and flatten clean PDFs with zero data leaving the device.",
      category: "Desktop & Realtime",
      featured: true,
      isNew: true,
      tags: ["Flutter", "Dart", "Windows Desktop", "PDF Engine", "Offline-First", "Digital Signatures"],
      url: "https://github.com/machu21/my-portfolio/releases/tag/tango-v1",
      releaseUrl: "https://github.com/machu21/my-portfolio/releases/tag/tango-v1",
      downloadUrl: "https://github.com/machu21/my-portfolio/releases/download/tango-v1/Tango_PDF_Editor_Setup_v1.0.0.exe",
      downloadLabel: "Download .exe (v1.0)",
      highlights: [
        "100% private & offline with zero tracking",
        "Bézier curve digital signatures",
        "Non-destructive draft auto-saving",
        "Fast desktop rendering engine"
      ]
    },
    {
      id: "teemchat",
      name: "TeemChat",
      tagline: "16-Bit Proximity Virtual Space & Retro Hangout",
      description: "A collaborative 16-bit virtual space featuring WebRTC spatial proximity voice chat, Supabase Realtime synchronization, customizable pixel avatars, and an interactive AI Companion. Designed as a fun, nostalgic Gather Town alternative for remote teams and gaming hangouts.",
      category: "Desktop & Realtime",
      featured: true,
      isNew: true,
      tags: ["Next.js", "Supabase Realtime", "WebRTC", "Spatial Audio", "Pixel Canvas", "AI Companion"],
      url: "https://www.teemchat.chat/",
      highlights: [
        "Proximity-based WebRTC spatial voice",
        "Sub-millisecond Supabase Realtime synchronization",
        "Custom pixel avatar customizer",
        "Interactive virtual room companion"
      ]
    },
    {
      id: "cj-pickleball",
      name: "C&J Pickleball & Events Place",
      tagline: "Sports Venue & Events Booking Web Platform",
      description: "Premier sports venue and celebrations management platform in Taytay, Rizal. Built to handle hourly indoor court bookings (two pickleball & basketball courts at ₱350/hr), 180-pax air-conditioned banquet hall reservations, 5th-floor view deck dining menus, and PickleCam instant highlight replay clips.",
      category: "Client Platform",
      featured: true,
      isNew: true,
      tags: ["Next.js", "React", "Tailwind CSS", "Venue Booking", "PickleCam Highlights", "Commercial Client"],
      url: "https://www.cjpickleballandeventsplacerentals.com/",
      highlights: [
        "Real-time court reservation system (₱350/hr)",
        "180-pax banquet hall event booking",
        "PickleCam match video replay hub",
        "5th-floor view deck dining preview"
      ]
    },
    {
      id: "far-agents",
      name: "FAR AGENTS",
      tagline: "Real Estate Acquisition & Disposition CRM Engine",
      description: "A comprehensive enterprise CRM and workflow automation engine engineered to streamline lead generation, automated multi-channel follow-ups, and acquisition operations for scaling real estate investment agencies.",
      category: "Web & SaaS",
      tags: ["GoHighLevel API", "Node.js", "CRM Architecture", "Webhooks", "Lead Pipelines"],
      url: "https://app.faragents.com",
      highlights: [
        "Automated multi-channel follow-up cadences",
        "Custom high-velocity lead disposition pipelines",
        "Webhook bridges connecting third-party telephony"
      ]
    },
    {
      id: "upgrade-financial",
      name: "Upgrade Financial Group",
      tagline: "Insurance & Wealth Protection Portal",
      description: "A modern financial advisory and insurance platform delivering customized coverage models, retirement strategies, and streamlined client onboarding workflows for personal and family wealth.",
      category: "Client Platform",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "FinTech UI", "Responsive Design"],
      url: "https://www.upgradefinancialgroup.com/",
      highlights: [
        "Interactive coverage estimator and models",
        "Streamlined client intake and advisory matching",
        "Ultra-responsive modern presentation"
      ]
    },
    {
      id: "ai-waste-classifier",
      name: "AI Waste Classifier & Smart Segregator",
      tagline: "Raspberry Pi & Computer Vision Recycling Machine",
      description: "Raspberry Pi–powered automated physical recycling sorting system utilizing computer vision and edge machine learning (OpenCV & TensorFlow) to classify PET bottles and cans, control mechanical servo gates, and dispense incentive coins.",
      category: "Hardware & IoT",
      tags: ["Raspberry Pi", "OpenCV", "TensorFlow Lite", "Python", "Arduino", "Embedded C++"],
      highlights: [
        "Real-time edge computer vision classification",
        "Dual servo motor mechanical sorting gates",
        "Automated coin hopper payout mechanism",
        "Physical junkshop deployment"
      ]
    },
    {
      id: "pedalboard-builder",
      name: "Pedalboard Builder",
      tagline: "Interactive Canvas Planner for Musicians & Signal Chains",
      description: "An interactive drag-and-drop web planner designed for guitarists and sound engineers to configure, scale, and power-route custom pedalboards with physical hardware precision and dimensions.",
      category: "Web & SaaS",
      tags: ["React", "TypeScript", "HTML5 Canvas", "Drag & Drop", "Audio Tech"],
      url: "https://pedalboard-planner.vercel.app",
      highlights: [
        "Accurate scale pedal canvas & drag-and-drop",
        "Power supply mA draw calculations",
        "Interactive exportable pedalboard layouts"
      ]
    },
    {
      id: "gas-crm",
      name: "Google Apps Script Real Estate CRM",
      tagline: "Serverless Workspace CRM & Pipeline Engine",
      description: "A custom lightweight CRM operating entirely inside Google Workspace to orchestrate lead statuses, automated messaging triggers, and deal coordination without expensive recurring software subscriptions.",
      category: "Web & SaaS",
      tags: ["Google Apps Script", "JavaScript", "Google Sheets API", "Cloud Automations"],
      url: "https://script.google.com/macros/s/AKfycbyJgN44wkARAHtU8byd50Huva9HT9o7jdVxtDQSuVN3MCoOOGcNwpgWXSurR_DLB2UI/exec",
      highlights: [
        "Zero server overhead inside Google Workspace",
        "Automated email and status trigger webhooks",
        "High-velocity deal logging for acquisitions"
      ]
    },
    {
      id: "note-taking-app",
      name: "Minimalist Note Taking App",
      tagline: "Distraction-Free Markdown Notes Workspace",
      description: "A snappy, keyboard-first note-taking application featuring live Markdown preview, instantaneous keyword search, and local persistence built with React and TypeScript.",
      category: "Web & SaaS",
      tags: ["React", "TypeScript", "Markdown Engine", "Local Storage", "Tailwind CSS"],
      url: "https://note-taking-app-livid-iota.vercel.app/",
      highlights: [
        "Instant live Markdown rendering",
        "Offline-capable local storage sync",
        "Clean typography and dark mode"
      ]
    }
  ];

  const filterOptions = [
    { label: "All", count: projects.length },
    { label: "Featured", count: projects.filter(p => p.featured).length },
    { label: "Desktop & Realtime", count: projects.filter(p => p.category === "Desktop & Realtime").length },
    { label: "Client Platform", count: projects.filter(p => p.category === "Client Platform").length },
    { label: "Web & SaaS", count: projects.filter(p => p.category === "Web & SaaS").length },
    { label: "Hardware & IoT", count: projects.filter(p => p.category === "Hardware & IoT").length },
  ];

  const filteredProjects = projects.filter(p => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Featured") return p.featured;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col gap-6">
      
      {/* Header with editorial label */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            01 — PORTFOLIO & WORK
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">
            Featured Projects
          </h2>
        </div>
        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-700/60 w-fit">
          {projects.length} Total Builds
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 pb-2 border-b border-zinc-100 dark:border-zinc-800">
        {filterOptions.map((filter) => (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(filter.label)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFilter === filter.label
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold shadow-xs"
                : "bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
            }`}
          >
            <span>{filter.label}</span>
            <span className={`text-[10px] font-mono opacity-60 ${activeFilter === filter.label ? "text-white dark:text-zinc-900" : ""}`}>
              ({filter.count})
            </span>
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`group relative rounded-2xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between gap-6 ${
              project.featured
                ? "bg-white dark:bg-zinc-900/80 border-zinc-300/80 dark:border-zinc-700/80 shadow-md hover:border-zinc-400 dark:hover:border-zinc-600"
                : "bg-white/70 dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm"
            }`}
          >
            {/* Top row: Badges & Category */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    {project.category}
                  </span>
                  {project.isNew && (
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      NEW
                    </span>
                  )}
                  {project.featured && (
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Direct Action Link Icon */}
                {project.url && (
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-1"
                    aria-label={`Open ${project.name}`}
                  >
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
                  {project.url ? (
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {project.name}
                    </Link>
                  ) : (
                    <span>{project.name}</span>
                  )}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                  {project.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mt-1">
                {project.description}
              </p>

              {/* Key Bullet Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: Tags & Action CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
                {project.downloadUrl && (
                  <Link
                    href={project.downloadUrl}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{project.downloadLabel || "Download"}</span>
                  </Link>
                )}

                {project.releaseUrl && (
                  <Link
                    href={project.releaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>GitHub Release</span>
                  </Link>
                )}

                {project.url && !project.downloadUrl && (
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white transition-colors shadow-xs"
                  >
                    <span>Visit Live Platform</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                )}

                {!project.url && !project.downloadUrl && (
                  <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 italic px-2 py-1">
                    Physical Hardware Prototype
                  </span>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
