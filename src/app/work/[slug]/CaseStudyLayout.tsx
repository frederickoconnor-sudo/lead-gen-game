import type { WorkEntry } from "@/lib/work-entries";

function Metric({
  value,
  label,
  small = false,
}: {
  value: string;
  label: string;
  small?: boolean;
}) {
  return (
    <div>
      <p
        className={`font-[family-name:var(--font-syne)] font-bold text-stone-900 leading-none ${
          small ? "text-3xl" : "text-5xl"
        }`}
      >
        {value}
      </p>
      <p className="text-sm text-stone-500 mt-2">{label}</p>
    </div>
  );
}

export default function CaseStudyLayout({ entry }: { entry: WorkEntry }) {
  const { caseStudy } = entry;
  if (!caseStudy) return null;

  return (
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
      <p className={`text-xl text-stone-500 leading-relaxed max-w-2xl ${entry.myRole ? "mb-6" : "mb-14"}`}>
        {entry.hook}
      </p>

      {/* My role — if set */}
      {entry.myRole && (
        <div className="mb-10">
          <span className="font-[family-name:var(--font-syne)] text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mr-2">
            My role
          </span>
          <span className="text-sm text-stone-500">{entry.myRole}</span>
        </div>
      )}

      {/* Sections */}
      <div>
        {caseStudy.sections.map((section, i) => (
          <div
            key={section.heading}
            className={i > 0 ? "border-t border-stone-200 pt-10 mt-10" : ""}
          >
            {/* Section heading */}
            <p className="font-[family-name:var(--font-syne)] text-[10px] font-bold uppercase tracking-[0.2em] text-violet-500 mb-5">
              {section.heading}
            </p>

            {/* Primary metric — renders before body */}
            {section.metric && (
              <div className="mb-7 space-y-5">
                <Metric value={section.metric.value} label={section.metric.label} />
                {section.secondaryMetric && (
                  <Metric
                    value={section.secondaryMetric.value}
                    label={section.secondaryMetric.label}
                    small
                  />
                )}
              </div>
            )}

            {/* Body paragraphs */}
            <div className="space-y-4">
              {section.body.split("\n\n").map((para, j) => (
                <p key={j} className="text-base text-stone-700 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
