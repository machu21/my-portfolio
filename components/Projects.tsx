import Link from 'next/link';

export default function Projects() {
  const projects = [
    {
      name: "FAR AGENTS",
      description: "A comprehensive CRM and automation platform built to streamline lead generation and client management.",
      url: "https://app.faragents.com"
    },
    {
      name: "AI Waste Classifier",
      description: "Raspberry Pi-based waste segregator utilizing a camera and machine learning to identify recyclable materials.",
      url: "#"
    },
    {
      name: "AI Real Estate Comps Tool",
      description: "A web application that uses AI to analyze real estate listings and provide accurate property valuations and comparables.",
      url: "https://ghl-comps-engine.vercel.app/"
    },
    {
      name: "Google Apps Script Real Estate CRM",
      description: "Track and manage real estate leads, automate follow-ups, and organize client information using a custom CRM built with Google Apps Script.",
      url: "https://script.google.com/macros/s/AKfycbyJgN44wkARAHtU8byd50Huva9HT9o7jdVxtDQSuVN3MCoOOGcNwpgWXSurR_DLB2UI/exec"
    }
  ];

  return (
    <section id="projects" className="pt-4 border-t border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Projects</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div key={index} className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all bg-white dark:bg-slate-900">
            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{project.name}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
              {project.description}
            </p>
            <Link href={project.url} className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              View Project →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}