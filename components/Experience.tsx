import { Terminal } from "lucide-react";

type ExperienceItem = {
  role: string;
  company: string;
  year: string;
  location?: string;
  description?: string;
  skills?: string[];
  isCurrent?: boolean;
  isMilestone?: boolean;
};

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      role: "Owner / Founder",
      company: "Truline Tech (Startup)",
      year: "Sep 2026 – Present",
      location: "Philippines",
      isCurrent: true,
      description: "Leading technology strategy, full-stack product architecture, and engineering execution across client software and proprietary startup ventures.",
      skills: ["Full-Stack Architecture", "Next.js", "TypeScript", "Product Strategy", "Cloud Infrastructure"]
    },
    {
      role: "Web Developer",
      company: "Elevate Remote Solutions",
      year: "Jul 2026 – Nov 2026",
      location: "US (Remote)",
      description: "Engineered responsive web applications, created reusable component systems, and delivered high-performance frontend interfaces for remote client teams.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Web Engineering"]
    },
    {
      role: "Automation Engineer",
      company: "FAR Agents",
      year: "Mar 2026 – Jul 2026",
      location: "US (Remote)",
      description: "Architected high-velocity CRM workflows, telephony webhooks, automated lead follow-up cadences, and pipeline integrations for real estate acquisitions.",
      skills: ["GoHighLevel", "Workflow Automation", "Node.js", "Webhooks", "CRM Architecture"]
    },
    {
      role: "Web Developer",
      company: "Specialized Virtual Deals",
      year: "Feb 2023 – Dec 2025",
      location: "US (Remote)",
      description: "Developed and maintained custom internal web platforms, lead management dashboards, and digital tools supporting virtual real estate transactions.",
      skills: ["Web Development", "JavaScript", "React", "Frontend Design", "Internal Tools"]
    },
    {
      role: "Lead Manager / Team Leader",
      company: "FILAMREIVA",
      year: "Jul 2023 – Apr 2025",
      location: "US (Remote)",
      description: "Supervised virtual acquisition team operations, optimized pipeline routing cadences, and enforced CRM data hygiene and conversion workflows.",
      skills: ["Team Leadership", "Operations Management", "Pipeline Optimization", "CRM Architecture"]
    },
    {
      role: "Jr. Web Designer",
      company: "Freelance",
      year: "Apr 2022 – Aug 2023",
      location: "Philippines",
      description: "Designed responsive websites, crafted conversion-focused landing pages, and produced tailored digital assets for diverse independent clients.",
      skills: ["Web Design", "UI/UX", "HTML/CSS", "Figma", "Responsive Layouts"]
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
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    <span>{exp.company}</span>
                    {exp.location && (
                      <>
                        <span className="text-zinc-300 dark:text-zinc-600 font-normal">•</span>
                        <span className="text-zinc-400 dark:text-zinc-500 font-normal">{exp.location}</span>
                      </>
                    )}
                  </div>
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
