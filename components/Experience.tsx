export default function Experience() {
    const experiences = [
        {
            role: "Automation Engineer",
            company: "FAR AGENTS",
            year: "2026"
        },
        {
            role: "Hardware & AI Developer",
            company: "RTL Junkshop Capstone",
            year: "2026"
        },
        {
            role: "Full-Stack Developer",
            company: "Freelance",
            year: "2025"
        },
        {
            role: "Lead Manager",
            company: "FilamReiva",
            year: "2024"
        },
        {
            role: "Lead Manager",
            company: "Specialized Virtual Deals",
            year: "2023"
        },
        {
            role: "Quality Assurance Specialist",
            company: "My Automated Deals",
            year: "2022"
        },
        {
            role: "Front-End Developer",
            company: "CYWare",
            year: "2022"
        },
        {
            role: "Hello World! 👋🏻",
            company: "Wrote my first line of code",
            year: "2020"
        }
    ];

    return (
        <section className="flex flex-col w-full">
            {/* Reduced Header Size */}
            <h2 className="text-xl font-bold dark:font-bold dark:text-white mb-4 text-slate-900">Experience</h2>

            {/* Reduced Vertical Spacing (space-y-4 instead of space-y-8) */}
            <div className="relative border-l border-slate-200 ml-1 space-y-4">
                {experiences.map((exp, index) => (
                    // Reduced left padding
                    <div key={index} className="relative pl-6">

                        {/* Smaller Square Timeline Marker */}
                        {index === 0 ? (
                            <div className="absolute -left-[6px] top-1.5 w-3 h-3 bg-slate-900 rounded-sm dark:bg-white dark:border-slate-600"></div>
                        ) : (
                            <div className="absolute -left-[6px] top-1.5 w-3 h-3 bg-blue dark:bg-slate-800 dark:border dark:border-slate-600 rounded-sm"></div>
                        )}

                        <div className="flex justify-between items-start gap-4">
                            <div className="flex flex-col">
                                {/* Reduced font sizes to text-sm and text-xs */}
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{exp.role}</h3>
                                <span className="text-slate-600 text-xs mt-0.5">{exp.company}</span>
                            </div>

                            {/* UPDATED: Added dark:bg-slate-800, dark:border-slate-700, and dark:text-slate-300 */}
                            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-2 py-0.5 rounded shrink-0">
                                {exp.year}
                            </span>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}