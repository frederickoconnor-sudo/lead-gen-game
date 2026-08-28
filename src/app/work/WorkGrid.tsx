import Link from "next/link";
import Image from "next/image";
import { workEntries } from "@/lib/work-entries";
import type { WorkEntry } from "@/lib/work-entries";

const DISPLAY_ORDER = [
  "Positioning & Messaging",
  "GTM & Launches",
  "Competitive Intelligence",
  "Sales Enablement",
  "Customer Stories",
  "Thought Leadership",
  "Interactive",
  "Blogs",
  "Podcasts",
] as const;

function companyColors(company: string) {
  if (company.toLowerCase().includes("hunters"))
    return { bg: "bg-violet-950", accent: "text-violet-400", heading: "text-white", sub: "text-violet-300/60" };
  if (company.toLowerCase().includes("tamr"))
    return { bg: "bg-blue-900", accent: "text-blue-300", heading: "text-white", sub: "text-blue-200/60" };
  return { bg: "bg-stone-800", accent: "text-stone-400", heading: "text-white", sub: "text-stone-300/60" };
}

function TypographicCover({ entry }: { entry: WorkEntry }) {
  const { bg, accent, heading, sub } = companyColors(entry.company);
  return (
    <div className={`absolute inset-0 ${bg} flex flex-col justify-between p-5`}>
      <span className={`text-[9px] font-bold uppercase tracking-[0.25em] ${accent}`}>
        {entry.category}
      </span>
      <div>
        <h3 className={`font-[family-name:var(--font-syne)] text-[1.05rem] font-bold leading-tight ${heading} mb-2`}>
          {entry.shortTitle ?? entry.title}
        </h3>
        <p className={`text-[10px] ${sub}`}>{entry.company}</p>
      </div>
    </div>
  );
}

function WorkCard({ entry }: { entry: WorkEntry }) {
  const isScreenshot = !!entry.thumbnail && !entry.thumbnail.includes("/previews/");

  return (
    <Link href={`/work/${entry.slug}`} className="group block">
      {/* Visual cover */}
      <div className="relative overflow-hidden rounded-md bg-stone-800 mb-3 h-48">
        {entry.thumbnail ? (
          <Image
            src={entry.thumbnail}
            alt={entry.shortTitle ?? entry.title}
            fill
            className={`object-cover ${isScreenshot ? "object-top" : "object-center"} group-hover:scale-[1.04] transition-transform duration-500 ease-out`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <TypographicCover entry={entry} />
        )}
      </div>

      {/* Metadata */}
      <h3 className="font-[family-name:var(--font-syne)] text-sm font-bold text-stone-200 leading-snug mb-1.5 group-hover:text-violet-400 transition-colors duration-150">
        {entry.shortTitle ?? entry.title}
      </h3>
      <p className="text-xs text-stone-400 leading-relaxed line-clamp-2 mb-1.5">
        {entry.hook}
      </p>
      <p className="text-[10px] text-stone-600">{entry.company}</p>
    </Link>
  );
}

export default function WorkGrid() {
  return (
    <div className="space-y-14">
      {DISPLAY_ORDER.map((category) => {
        const entries = workEntries.filter((e) => e.category === category);
        if (!entries.length) return null;

        return (
          <section key={category}>
            {/* Editorial section heading */}
            <div className="mb-7">
              <h2 className="font-[family-name:var(--font-syne)] text-[11px] font-bold uppercase tracking-[0.28em] text-stone-400 mb-3">
                {category}
              </h2>
              <div className="border-t border-stone-700" />
            </div>

            {/* Grid — max 3 cols, left-aligned */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {entries.map((entry) => (
                <WorkCard key={entry.slug} entry={entry} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
