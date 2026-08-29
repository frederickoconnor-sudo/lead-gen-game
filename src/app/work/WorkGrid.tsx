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

function companyBg(company: string): string {
  if (company.toLowerCase().includes("hunters")) return "bg-violet-950";
  if (company.toLowerCase().includes("tamr")) return "bg-blue-900";
  return "bg-stone-800";
}

function categoryAccent(category: string): string {
  const map: Record<string, string> = {
    "Positioning & Messaging": "text-violet-400",
    "GTM & Launches": "text-orange-400",
    "Competitive Intelligence": "text-amber-400",
    "Sales Enablement": "text-sky-400",
    "Customer Stories": "text-emerald-400",
    "Thought Leadership": "text-rose-400",
    "Blogs": "text-yellow-400",
    "Podcasts": "text-teal-400",
    "Interactive": "text-fuchsia-400",
  };
  return map[category] ?? "text-stone-400";
}

function TypographicCover({ entry }: { entry: WorkEntry }) {
  const bg = companyBg(entry.company);
  const accent = categoryAccent(entry.category);
  const coverMetric = entry.caseStudy?.sections.find((s) => s.metric)?.metric;

  return (
    <div className={`absolute inset-0 ${bg} flex flex-col justify-between p-5`}>
      <span className={`text-[9px] font-bold uppercase tracking-[0.25em] ${accent}`}>
        {entry.category}
      </span>
      <div>
        {coverMetric && (
          <div className="mb-3">
            <p className="font-[family-name:var(--font-syne)] text-xl font-bold text-white leading-tight">
              {coverMetric.value}
            </p>
            <p className={`text-[10px] mt-0.5 ${accent} opacity-70`}>{coverMetric.label}</p>
          </div>
        )}
        <h3 className="font-[family-name:var(--font-syne)] text-[1.05rem] font-bold leading-tight text-white mb-2">
          {entry.shortTitle ?? entry.title}
        </h3>
        <p className="text-[10px] text-white/40">{entry.company}</p>
      </div>
    </div>
  );
}

function WorkCard({ entry }: { entry: WorkEntry }) {
  const objectPos = entry.thumbnailPosition ??
    (entry.thumbnail?.includes("/previews/") ? "object-center" : "object-top");

  return (
    <Link href={`/work/${entry.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-md bg-stone-800 mb-3 h-48">
        {entry.thumbnail ? (
          <Image
            src={entry.thumbnail}
            alt={entry.thumbnailAlt ?? entry.shortTitle ?? entry.title}
            fill
            className={`object-cover ${objectPos} group-hover:scale-[1.04] transition-transform duration-500 ease-out`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <TypographicCover entry={entry} />
        )}
      </div>

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
            <div className="mb-7">
              <h2 className="font-[family-name:var(--font-syne)] text-[11px] font-bold uppercase tracking-[0.28em] text-stone-400 mb-3">
                {category}
              </h2>
              <div className="border-t border-stone-700" />
            </div>

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
