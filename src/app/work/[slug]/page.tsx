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

function getFileHref(file: string): string {
  const ext = file.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return file;
  const fullUrl = `${SITE_URL}${file}`;
  return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fullUrl)}`;
}

function getViewerSrc(file: string): string {
  const ext = file.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return file;
  const fullUrl = `${SITE_URL}${file}`;
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fullUrl)}`;
}

function OpenDocLink({ href, label = "Open full document ↗" }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors"
    >
      {label}
    </a>
  );
}

function ViewLiveButton({ href, internal, label = "View live ↗" }: { href: string; internal?: boolean; label?: string }) {
  const cls = "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold text-stone-700 hover:border-violet-400 hover:text-violet-700 transition-colors";
  if (internal) {
    return <Link href={href} className={cls}>{label}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {label}
    </a>
  );
}

export default async function WorkEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);
  if (!entry) notFound();

  const isInternalLink = entry.link?.startsWith("/");
  const isPdfLink = entry.link?.toLowerCase().endsWith(".pdf");
  const fileHref = entry.file ? getFileHref(entry.file) : null;
  const viewerSrc = entry.file ? getViewerSrc(entry.file) : null;
  const isPdf = entry.file?.toLowerCase().endsWith(".pdf");

  // Determine which artifact case applies — first match wins
  const caseA = !!(entry.preview && entry.file);
  const caseB = !caseA && !!(entry.images?.length);
  const caseC = !caseA && !caseB && !!(entry.file);
  const caseD = !caseA && !caseB && !caseC && !!(entry.link && entry.thumbnail && !isPdfLink);
  const caseE = !caseA && !caseB && !caseC && !caseD && !!(entry.link && isPdfLink);
  const caseF = !caseA && !caseB && !caseC && !caseD && !caseE && !!(entry.link);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <nav className="sticky top-0 z-20 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/work" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
            ← Work
          </Link>
          <div className="flex items-center gap-6 text-sm text-stone-500">
            <Link href="/resume" className="hover:text-stone-900 transition-colors">Resume</Link>
          </div>
        </div>
      </nav>

      {entry.caseStudy ? (
        <main className="max-w-3xl mx-auto px-6 py-14">
          <CaseStudyLayout entry={entry} />
        </main>
      ) : (
        <>
          {/* Project context */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 pb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">
              {entry.category} · {entry.company}
            </p>
            <h1 className="font-[family-name:var(--font-syne)] text-4xl font-bold text-stone-900 leading-tight mb-4">
              {entry.title}
            </h1>
            <p className="text-xl text-stone-500 leading-relaxed mb-12 max-w-2xl">
              {entry.hook}
            </p>
            <div className="space-y-8">
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
          </div>

          {/* Artifact */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24 mt-10">

            {/* Case A: preview PNG + file → show image, click to open doc */}
            {caseA && (
              <div>
                <div className="mb-5">
                  <OpenDocLink href={fileHref!} />
                </div>
                <a href={fileHref!} target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
                    <Image
                      src={entry.preview!}
                      alt={entry.thumbnailAlt ?? entry.title}
                      width={1600}
                      height={1200}
                      className="w-full h-auto group-hover:opacity-95 transition-opacity duration-150"
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 80vw, 1024px"
                    />
                  </div>
                </a>
              </div>
            )}

            {/* Case B: images array */}
            {caseB && (
              <div className="space-y-6">
                {entry.images!.map((img) => (
                  <figure
                    key={img.src}
                    className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-sm"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={1200}
                      height={800}
                      className="w-full h-auto"
                      priority
                    />
                    {img.caption && (
                      <figcaption className="px-5 py-2.5 text-xs text-stone-400 bg-white border-t border-stone-100">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
                {entry.link && (
                  <div className="mt-2">
                    <ViewLiveButton href={entry.link} internal={isInternalLink} />
                  </div>
                )}
              </div>
            )}

            {/* Case C: file only (no preview) → large iframe */}
            {caseC && (
              <div>
                <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
                  <p className="text-sm text-stone-400">Loading document…</p>
                  <OpenDocLink href={fileHref!} />
                </div>
                <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
                  <iframe
                    src={viewerSrc!}
                    className="w-full"
                    style={{ height: isPdf ? "82vh" : "75vh", minHeight: "480px" }}
                    title={entry.title}
                    allow="fullscreen"
                  />
                </div>
                <div className="mt-5">
                  <OpenDocLink href={fileHref!} />
                </div>
              </div>
            )}

            {/* Case D: external link + thumbnail → show thumbnail, link to page */}
            {caseD && (
              <div>
                <div className="mb-5">
                  <ViewLiveButton href={entry.link!} internal={isInternalLink} />
                </div>
                {isInternalLink ? (
                  <Link href={entry.link!} className="block group">
                    <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
                      <Image
                        src={entry.thumbnail!}
                        alt={entry.thumbnailAlt ?? entry.title}
                        width={1600}
                        height={900}
                        className="w-full h-auto group-hover:opacity-95 transition-opacity duration-150"
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 80vw, 1024px"
                      />
                    </div>
                  </Link>
                ) : (
                  <a href={entry.link!} target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
                      <Image
                        src={entry.thumbnail!}
                        alt={entry.thumbnailAlt ?? entry.title}
                        width={1600}
                        height={900}
                        className="w-full h-auto group-hover:opacity-95 transition-opacity duration-150"
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 80vw, 1024px"
                      />
                    </div>
                  </a>
                )}
              </div>
            )}

            {/* Case E: link ending in .pdf → embed PDF iframe */}
            {caseE && (
              <div>
                <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
                  <p className="text-sm text-stone-400">Loading document…</p>
                  <OpenDocLink href={entry.link!} />
                </div>
                <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
                  <iframe
                    src={entry.link!}
                    className="w-full"
                    style={{ height: "82vh", minHeight: "480px" }}
                    title={entry.title}
                    allow="fullscreen"
                  />
                </div>
                <div className="mt-5">
                  <OpenDocLink href={entry.link!} />
                </div>
              </div>
            )}

            {/* Case F: link only */}
            {caseF && (
              <div>
                <ViewLiveButton href={entry.link!} internal={isInternalLink} />
              </div>
            )}

          </div>
        </>
      )}

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
