import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";
import GuideCursor from "@/components/GuideCursor";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowUp, MapPin } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300 relative bg-dot-pattern">
      
      {/* Mobile Top Header (hidden on large screens) */}
      <header className="lg:hidden sticky top-0 z-30 px-5 py-3.5 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
            Matthew Patacsil
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left Sticky Sidebar */}
          <Sidebar />

          {/* Right Main Content Stream */}
          <div className="flex-1 min-w-0 max-w-4xl flex flex-col gap-12 sm:gap-16">
            <Hero />
            <Projects />
            <Experience />
            <TechStack />
            <Contact />

            {/* Footer */}
            <footer className="pt-8 pb-12 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <span>© {new Date().getFullYear()} Matthew Patacsil.</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-zinc-400" />
                  Rizal, Philippines
                </span>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="#about"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
                >
                  Back to top <ArrowUp className="w-3 h-3" />
                </a>
              </div>
            </footer>
          </div>

        </div>
      </div>

      {/* Automatic Guide Cursor Tour */}
      <GuideCursor />

      {/* AI Assistant Modal and Floating Trigger */}
      <Chatbot />

    </main>
  );
}
