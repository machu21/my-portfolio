export default function TechStack() {
    const stack = [
        { category: "Frontend", tools: "Next.js, React, Tailwind CSS, Flutter" },
        { category: "Backend", tools: "Node.js, Express, Python, Google Apps Script, C++" },
        { category: "Database", tools: "PostgreSQL, MongoDB, SQLite" },
        { category: "Hardware & AI", tools: "Raspberry Pi, Arduino, Machine Learning" }
    ];

    return (
        <section className="pt-4 border-t border-slate-200">
            <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
            <div className="flex flex-col gap-4">
                {stack.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row md:items-center py-2 border-b border-slate-100 last:border-0">
                        <span className="w-48 font-semibold text-slate-900 dark:text-slate-100">
                            {item.category}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">
                            {item.tools}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}