import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 max-w-5xl mx-auto">
      <div className="font-bold text-xl tracking-tighter">MatthewPatacsil.</div>
      <div className="space-x-6 text-sm font-medium">
        <Link href="#about" className="hover:text-blue-600 transition-colors">About</Link>
        <Link href="#projects" className="hover:text-blue-600 transition-colors">Projects</Link>
        <Link href="#contact" className="hover:text-blue-600 transition-colors">Contact</Link>
      </div>
    </nav>
  );
}