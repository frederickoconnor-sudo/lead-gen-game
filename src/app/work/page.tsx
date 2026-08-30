import Link from "next/link";
import WorkGrid from "./WorkGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Fred O'Connor",
  description: "Product marketing work across positioning, sales enablement, customer stories, and thought leadership.",
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      {/* Nav — outside overflow container so sticky works correctly */}
      <nav className="sticky top-0 z-20 bg-stone-900/90 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-stone-400 hover:text-stone-100 transition-colors">
            ← Back
          </Link>
          <div className="flex items-center gap-4 sm:gap-6 text-sm text-stone-400">
            <Link href="/work" className="text-stone-100 font-semibold">Work</Link>
            <Link href="/resume" className="hover:text-stone-100 transition-colors">Resume</Link>
            <Link href="/games" className="hover:text-stone-100 transition-colors hidden sm:block">Interactive</Link>
          </div>
        </div>
      </nav>

      <div>
        <header className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 pb-8 sm:pb-10">
          <h1 className="font-[family-name:var(--font-syne)] text-4xl sm:text-5xl font-extrabold text-stone-100 tracking-tight leading-none mb-3">
            Work
          </h1>
          <p className="text-stone-400 text-sm leading-relaxed">
            22 pieces across positioning, GTM, competitive intelligence, sales enablement, customer stories, thought leadership, and more.
          </p>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
          <WorkGrid />
        </main>

        <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-stone-800">
          <p className="text-sm text-stone-500 font-[family-name:var(--font-syne)]">
            Fred O&apos;Connor — Product Marketing
          </p>
        </footer>
      </div>
    </div>
  );
}
