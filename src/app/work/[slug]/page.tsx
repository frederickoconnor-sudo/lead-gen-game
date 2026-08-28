import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { workEntries, getEntryBySlug } from "@/lib/work-entries";
import CaseStudyLayout from "./CaseStudyLayout";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

const SITE_URL = "https://fredjo.xyz";

export async function generateStaticParams() {
  return workEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — Fred O'Connor`,
    description: entry.hook,
  };
}

function getViewerSrc(file: string): string {
  const ext = file.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return file;
  const fullUrl = `${SITE_URL}${file}`;
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fullUrl)}`;
}

function ExternalLinkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export default async function WorkEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);
  if (!entry) notFound();

  const isInternalLink = entry.link?.startsWith("/");
  const viewerSrc = entry.file ? getViewerSrc(entry.file) : null;
  const isPdf = entry.file?.endsWith(".pdf");

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Nav */}
      <nav className="sticky top-0 z-20 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/work" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
            ← Work
          </Link>
          <div className="flex items-center gap-6 text-sm text-stone-500">
            <Link href="/work" className="hover:text-stone-900 transition-colors">Work</Link>
            <Link href="/resume" className="hover:text-stone-900 transition-colors">Resume</Link>
            <Link href="/games" className="hover:text-stone-900 transition-colors">Interactive</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-14">
        {entry.caseStudy ? (
          <CaseStudyLayout entry={entry} />
        ) : (
          <>
            {/* Meta label */}
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">
              {entry.category} · {entry.company}
            </p>

            {/* Title */}
            <h1 className="font-[family-name:var(--font-syne)] text-4xl font-bold text-stone-900 leading-tight mb-4">
              {entry.title}
            </h1>

            {/* Hook */}
            <p className="text-xl text-stone-500 leading-relaxed mb-12 max-w-2xl">
              {entry.hook}
            </p>

            {/* ── TEXT FIRST ─────────────────────────────── */}
            <div className="space-y-8 mb-14">
              <div>
                <p className="font-[family-name:var(--font-syne)] text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-3">
                  What it is
                </p>
                <p className="text-base text-stone-700 leading-relaxed">{entry.what}</p>
              </div>

              <div className="border-t border-stone-200 pt-8">
                <p className="font-[family-name:var(--font-syne)] text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-3">
                  Why it was created
                </p>
                <p className="text-base text-stone-700 leading-relaxed">{entry.why}</p>
              </div>

              <div className="border-t border-stone-200 pt-8">
                <p className="font-[family-name:var(--font-syne)] text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-3">
                  Result
                </p>
                <p className="text-base text-stone-700 leading-relaxed">{entry.result}</p>
              </div>
            </div>

            {/* Inline document viewer for files */}
            {viewerSrc && (
              <div className={`rounded-2xl overflow-hidden border border-stone-200 shadow-sm mb-8 ${isPdf ? "" : "bg-stone-100"}`}>
                <iframe
                  src={viewerSrc}
                  className="w-full"
                  style={{ height: isPdf ? "820px" : "680px" }}
                  title={entry.title}
                  allow="fullscreen"
                />
              </div>
            )}

            {/* Screenshots */}
            {entry.images && entry.images.length > 0 && (
              <div className="space-y-4 mb-8">
                {entry.images.map((img) => (
                  <figure
                    key={img.src}
                    className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-sm"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-top"
                      priority
                    />
                    {img.caption && (
                      <figcaption className="px-5 py-2.5 text-xs text-stone-400 bg-white border-t border-stone-100">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}

            {/* View live — external links only, no download */}
            {entry.link && (
              <div className="mt-2">
                {isInternalLink ? (
                  <Link
                    href={entry.link}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold text-stone-700 hover:border-violet-400 hover:text-violet-700 transition-colors"
                  >
                    <ExternalLinkIcon />
                    View live
                  </Link>
                ) : (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold text-stone-700 hover:border-violet-400 hover:text-violet-700 transition-colors"
                  >
                    <ExternalLinkIcon />
                    View live
                  </a>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="max-w-3xl mx-auto px-6 py-8 border-t border-stone-200 mt-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-stone-400 font-[family-name:var(--font-syne)]">
            Fred O&apos;Connor — Product Marketing
          </p>
          <Link href="/work" className="text-sm text-stone-400 hover:text-violet-700 transition-colors">
            ← All work
          </Link>
        </div>
      </footer>
    </div>
  );
}
