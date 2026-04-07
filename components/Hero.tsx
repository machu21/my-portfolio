import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="flex flex-col gap-6">

            {/* Header section with Profile Pic and Name */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-2">

                {/* Profile Picture Container */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shrink-0 border-2 border-slate-200">
                    <Image
                        src="/images/profile.jpg" /* Make sure this matches your exact file name in the public folder */
                        alt="Pat - Profile Picture"
                        fill
                        className="object-cover"
                        priority /* This tells Next.js to load this image instantly */
                    />
                </div>

                <div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Matthew Patacsil</h1>
                    <p className="text-slate-500 font-medium flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        Rizal, Philippines
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 text-sm font-semibold text-slate-700 mt-2">
                <span className="bg-slate-100 px-3 py-1 rounded-md">Software Engineer</span>
                <span className="bg-slate-100 px-3 py-1 rounded-md">CRM & Automation</span>
                <span className="bg-slate-100 px-3 py-1 rounded-md">AI / Hardware</span>
                <span className="bg-slate-100 px-3 py-1 rounded-md">GHL Automation</span>
                <span className="bg-slate-100 px-3 py-1 rounded-md">Real Estate Virtual Assistant</span>
            </div>

            <div className="flex gap-4 mt-2">
                <Link href="https://calendly.com/matthew-patacsil021/30min" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                    Schedule a Call
                </Link>
                <Link href="mailto:matthew.patacsil021@gmail.com" className="bg-white border border-slate-200 text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                    Send Email
                </Link>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">About</h2>
                {/* UPDATED: Changed text-slate-600 to text-slate-600 dark:text-slate-300 */}
                <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>
                        I'm a full-stack software engineer specializing in developing robust solutions with Next.js, Node.js, and Express. I focus on building modern web applications, custom CRM platforms, and automated workflows.
                    </p>
                    <p>
                        Lately, I've been diving deep into integrating hardware and machine learning into everyday applications, including computer vision projects with Raspberry Pi and automated business solutions to help agencies scale.
                    </p>
                </div>
            </div>
        </section>
    );
}