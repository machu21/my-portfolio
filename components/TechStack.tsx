import React from "react";
import { 
  Code2, 
  Server, 
  Database, 
  Workflow, 
  Cpu 
} from "lucide-react";

type StackCategory = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: { name: string; highlight?: boolean }[];
};

export default function TechStack() {
  const stack: StackCategory[] = [
    {
      title: "Frontend & Cross-Platform",
      icon: Code2,
      items: [
        { name: "Next.js 16 (App Router)", highlight: true },
        { name: "React 19", highlight: true },
        { name: "Flutter (Desktop & Mobile)", highlight: true },
        { name: "TypeScript", highlight: true },
        { name: "Tailwind CSS v4" },
        { name: "HTML5 Canvas" },
      ]
    },
    {
      title: "Backend & Real-Time Engines",
      icon: Server,
      items: [
        { name: "Node.js", highlight: true },
        { name: "Supabase Realtime", highlight: true },
        { name: "WebRTC / Spatial Audio", highlight: true },
        { name: "Express.js" },
        { name: "Python" },
        { name: "C++" },
        { name: "Google Apps Script" },
      ]
    },
    {
      title: "Databases & Cloud Storage",
      icon: Database,
      items: [
        { name: "PostgreSQL", highlight: true },
        { name: "Supabase", highlight: true },
        { name: "MongoDB" },
        { name: "SQLite" },
        { name: "Vercel & Edge Functions" },
      ]
    },
    {
      title: "CRM & Business Automation",
      icon: Workflow,
      items: [
        { name: "GoHighLevel (GHL) API", highlight: true },
        { name: "Custom Webhook Bridges", highlight: true },
        { name: "Multi-Channel Pipelines" },
        { name: "Twilio Telephony" },
        { name: "Zapier / Make" },
      ]
    },
    {
      title: "Embedded Hardware & Edge AI",
      icon: Cpu,
      items: [
        { name: "Raspberry Pi (Pi 4/5, Pico)", highlight: true },
        { name: "OpenCV (Computer Vision)", highlight: true },
        { name: "TensorFlow Lite", highlight: true },
        { name: "Arduino" },
        { name: "Servo Controllers (L298N)" },
        { name: "RF Modules (LoRa / nRF24L01+)" },
      ]
    }
  ];

  return (
    <section id="stack" className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col gap-6">
      
      {/* Editorial Header */}
      <div>
        <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
          03 — ARCHITECTURE & TOOLS
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">
          Technical Stack
        </h2>
      </div>

      {/* Grid of categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stack.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <div
              key={index}
              className={`p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between gap-4 shadow-2xs ${
                index === stack.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item, iIdx) => (
                  <span
                    key={iIdx}
                    className={`font-mono text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                      item.highlight
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700 font-semibold"
                        : "bg-zinc-50 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 border-zinc-200/60 dark:border-zinc-800/60"
                    }`}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
