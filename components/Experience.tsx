import { Terminal } from "lucide-react";

type ExperienceItem = {
  role: string;
  company: string;
  year: string;
  description?: string;
  skills?: string[];
  isCurrent?: boolean;
  isMilestone?: boolean;
};

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      role: "Lead Automation Engineer",
      company: "FAR AGENTS",
      year: "2026",
      isCurrent: true,
      description: "Architecting high-velocity CRM workflows, telephony webhooks, and automated lead follow-ups for real estate acquisitions.",
      skills: ["GoHighLevel", "Node.js", "Webhooks", "CRM Architecture"]
    },
    {
      role: "Hardware & Edge AI Developer",
      company: "RTL Junkshop Capstone",
      year: "2026",
      isCurrent: true,
      description: "Developing Raspberry Pi computer vision models and physical motor servos for automated recyclable segregation and coin incentives.",
      skills: ["Raspberry Pi", "OpenCV", "Python", "TensorFlow Lite"]
    },
    {
      role: "Full-Stack & Systems Developer",
      company: "Independent / Freelance",
      year: "2025",
      description: "Built commercial platforms, desktop studios (Tango), and real-time multiplayer spaces (TeemChat) using Next.js, Supabase, and Flutter.",
      skills: ["Next.js", "Flutter", "Supabase", "TypeScript"]
    },
    {
      role: "Lead Manager",
      company: "FilamReiva",
      year: "2024",
      description: "Managed real estate acquisition pipelines, lead qualification cadences, and automated CRM record keeping.",
      skills: ["Operations", "Pipeline Automation", "CRM"]
    },
    {
      role: "Lead Manager",
      company: "Specialized Virtual Deals",
      year: "2023",
      description: "Oversaw virtual acquisition team operations, dialer setups, and high-volume lead routing engines.",
      skills: ["Virtual Operations", "Team Leadership"]
    },
    {
      role: "Quality Assurance Specialist",
      company: "My Automated Deals",
      year: "2022",
      description: "Monitored operational quality of cold calling engines, CRM data accuracy, and conversion funnels.",
      skills: ["QA Testing", "Data Integrity"]
    },
    {
      role: "Front-End Developer",
      company: "CYWare",
      year: "2022",
      description: "Crafted responsive web interfaces and reusable client UI components.",
      skills: ["HTML/CSS", "JavaScript", "React"]
    },
    {
      role: "Hello World!",
      company: "Wrote my first line of code",
      year: "2020",
      isMilestone: true,
      description: "Began journey in programming, electronics, and full-stack software development.",
      skills: ["C++", "Python", "Web Basics"]
    }
  ];

  return (
    <section id="experience" className="flex flex-col gap-5 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
      
      {/* Editorial Header */}
      <div>
        <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
          02 — CAREER PATH
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">
          Experience & Roles
        </h2>
      </div>

      {/* Timeline items */}
      <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-2.5 sm:ml-3 space-y-6 pt-2">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-6 sm:pl-7 group">
            
            {/* Timeline Marker Dot */}
            {exp.isCurrent ? (
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-zinc-900 dark:bg-zinc-100 ring-4 ring-zinc-100 dark:ring-zinc-900">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60"></span>
              </div>
            ) : (
              <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700 ring-4 ring-white dark:ring-zinc-950 group-hover:bg-zinc-500 transition-colors"></div>
            )}

            {/* Content card */}
            <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-2xs">
              
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug flex items-center gap-1.5">
                    {exp.isMilestone && (
                      <Terminal className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
                    )}
                    <span>{exp.role}</span>
                  </h3>
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {exp.company}
                  </span>
                </div>

                <span className="font-mono text-[10px] font-semibold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200/60 dark:border-zinc-700/60 shrink-0">
                  {exp.year}
                </span>
              </div>

              {exp.description && (
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">
                  {exp.description}
                </p>
              )}

              {exp.skills && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-50 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
