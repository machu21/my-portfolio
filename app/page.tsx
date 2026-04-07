import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";
import ThemeToggle from "@/components/ThemeToggle"; 

export default function Home() {
  return (
    // Add dark mode background and text colors to the main wrapper
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-16 relative transition-colors duration-300">
      
      {/* THE TOGGLE BUTTON IN THE TOP RIGHT */}
      <div className="absolute top-6 right-6 z-40">
        <ThemeToggle />
      </div>

      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-8 pt-16">
        
        {/* Left Column */}
        <div className="flex-1 lg:w-[65%] flex flex-col gap-10">
          <Hero />
          <TechStack />
          <Projects />
          <Contact />
          
          <footer className="pt-8 pb-4 text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} Matt. All rights reserved.
          </footer>
        </div>

        {/* Right Column */}
        <aside className="lg:w-[35%] w-full relative">
          <div className="lg:sticky lg:top-8 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <Experience />
          </div>
        </aside>

      </div>

      <Chatbot />
    </main>
  );
}