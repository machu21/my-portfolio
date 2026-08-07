import Link from 'next/link';

export default function Projects() {
  const projects = [
    {
      name: "FAR AGENTS",
      description: "A comprehensive CRM and automation platform built to streamline lead generation, automated follow-ups, and client management for real estate agencies.",
      url: "https://app.faragents.com"
    },
    {
      name: "Upgrade Financial Group",
      description: "An insurance and financial services platform providing tailored solutions for clients seeking comprehensive coverage and investment strategies.",
      url: "https://www.upgradefinancialgroup.com/"
    },
    {
      name: "AI Waste Classifier",
      description: "Raspberry Pi-based automated sorting system utilizing computer vision and machine learning models to detect, classify, and segregate recyclable materials.",
      url: "#"
    },
    {
      name: "Google Apps Script Real Estate CRM",
      description: "A custom lightweight CRM solution engineered with Google Apps Script to organize lead pipelines, trigger automated communications, and manage workflows.",
      url: "https://script.google.com/macros/s/AKfycbyJgN44wkARAHtU8byd50Huva9HT9o7jdVxtDQSuVN3MCoOOGcNwpgWXSurR_DLB2UI/exec"
    },
    {
      name: "Pedalboard Builder",
      description: "An interactive web utility designed for musicians to build, customize, and visualize pedalboard configurations with drag-and-drop pedal layouts.",
      url: "https://pedalboard-planner.vercel.app"
    },

  {
      name: "Note Taking App",
      description: "A simple and efficient note-taking application built with React and TypeScript.",
      url: "https://note-taking-app-livid-iota.vercel.app/"
    }
  ];

  return (
    <section id="projects" className="pt-4 border-t border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Projects</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all bg-white dark:bg-slate-900 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{project.name}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div>
              {project.url !== "#" ? (
                <Link 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  View Project →
                </Link>
              ) : (
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500 italic">
                  Hardware Project
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}