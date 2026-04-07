import Link from 'next/link';

export default function Contact() {
  return (
    <section id="contact" className="pt-4 border-t border-slate-200">
      <h2 className="text-xl font-bold mb-6 text-slate-900">Get in Touch</h2>
      
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="max-w-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Let's build something together.</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Whether you need a custom CRM, automated workflows to scale your agency, or a full-stack web application, I'm currently available for new projects and consultations.
          </p>
        </div>
        
        <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
          <Link 
            href="mailto:matthew.patacsil021@gmail.com" 
            className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors text-center"
          >
            Send an Email
          </Link>
          <Link 
            href="https://calendly.com/matthew-patacsil021/30min" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-slate-900 border border-slate-200 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors text-center"
          >
            Schedule a Call
          </Link>
        </div>
      </div>
    </section>
  );
}