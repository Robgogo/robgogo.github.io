import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { Providers } from "@/components/Providers";
import { ThemeToggle } from "@/components/ThemeToggle";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://robgogo.github.io"),
  title: "Robera Worku — Senior Software Engineer",
  description:
    "Terminal-flavored portfolio of Robera Worku: Senior Software Engineer at Ebury, previously Klarna. Fintech backend systems, security, and cloud.",
  openGraph: {
    title: "Robera Worku — Senior Software Engineer",
    description:
      "robera@madrid:~$ whoami — fintech backend engineer in Madrid. Type `help` on the site.",
    url: "https://robgogo.github.io",
    type: "website",
  },
};

const navLinks = [
  { href: "/#experience", label: "experience" },
  { href: "/#projects", label: "projects" },
  { href: "/#skills", label: "skills" },
  { href: "/#about", label: "about" },
  { href: "/#contact", label: "contact" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen flex flex-col font-mono scanlines ${jetbrainsMono.variable}`}
      >
        <Providers>
          <header className="sticky top-0 z-40 border-b border-term-border bg-term-bgAlt">
            <div className="flex items-center gap-4 px-4 py-3 max-w-[1000px] mx-auto w-full text-sm">
              <Link href="/" className="shrink-0">
                <span className="text-term-green">robera@madrid</span>
                <span className="text-term-muted">:</span>
                <span className="text-term-cyan">~</span>
              </Link>
              <nav className="hidden md:flex gap-4 text-term-muted overflow-x-auto">
                {navLinks.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="hover:text-term-accent transition-colors"
                  >
                    ./{l.label}
                  </Link>
                ))}
              </nav>
              <div className="ml-auto">
                <ThemeToggle />
              </div>
            </div>
          </header>
          {children}
          <footer />
        </Providers>
      </body>
    </html>
  );
}
