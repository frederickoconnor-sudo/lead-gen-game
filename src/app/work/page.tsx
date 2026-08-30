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
      {/* Nav — left side only */}
      <nav className="sticky top-0 z-20 bg-stone-900/90 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        </div>
      </nav>

      <div>
        {/* About Me */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 pb-10 sm:pb-12">
          <h2 className="font-[family-name:var(--font-syne)] text-[11px] font-bold uppercase tracking-[0.28em] text-stone-400 mb-3">
            About Me
          </h2>
          <div className="border-t border-stone-700 mb-6" />
          <p className="text-stone-300 text-sm leading-relaxed max-w-2xl mb-5">
            Product marketer with 9+ years of B2B SaaS experience, including cybersecurity (EDR, SIEM, IAM), data management, and software development. Builds competitive intelligence and win/loss programs that arm sales teams, and translates complex, technical capabilities into narratives that resonate with buyers and sellers. Partners cross-functionally with product, sales, and demand gen to launch GTM campaigns and unblock deals.
          </p>
          <Link
            href="/resume"
            className="text-sm font-semibold text-stone-300 hover:text-violet-400 transition-colors duration-150"
          >
            View resume →
          </Link>
        </section>

        {/* Work */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-8 sm:pb-10">
          <h1 className="font-[family-name:var(--font-syne)] text-4xl sm:text-5xl font-extrabold text-stone-100 tracking-tight leading-none mb-5">
            Work
          </h1>
          <nav aria-label="Work sections" className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              ["Positioning & Messaging", "positioning-messaging"],
              ["GTM & Launches", "gtm-launches"],
              ["Competitive Intelligence", "competitive-intelligence"],
              ["Sales Enablement", "sales-enablement"],
              ["Customer Stories", "customer-stories"],
              ["Thought Leadership", "thought-leadership"],
              ["Interactive", "interactive"],
              ["Blogs", "blogs"],
              ["Podcasts", "podcasts"],
            ].map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-stone-100 transition-colors duration-150"
              >
                {label}
              </a>
            ))}
          </nav>
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
