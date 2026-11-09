import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Matthew Patacsil | Full-Stack Software & Automation Engineer",
  description: "Portfolio of Matthew 'Matt' Patacsil — Full-Stack Engineer, Automation Specialist, and Creator of Tango PDF Editor, TeemChat, FAR AGENTS, and more.",
  keywords: [
    "Matthew Patacsil",
    "Full-Stack Engineer",
    "Tango PDF Editor",
    "TeemChat",
    "C&J Pickleball Rentals",
    "FAR AGENTS",
    "Next.js",
    "Flutter",
    "Automation Engineer",
    "Rizal Philippines"
  ],
  authors: [{ name: "Matthew Patacsil" }],
  openGraph: {
    title: "Matthew Patacsil | Full-Stack Software & Automation Engineer",
    description: "Explore projects, live demos, and engineering work by Matthew Patacsil: web, desktop, realtime spaces, and hardware automation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
