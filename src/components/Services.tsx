import Reveal, { SectionHead } from "./Reveal";
import {
  IconArrowRight,
  IconBookRibbon,
  IconChartBoard,
  IconCompass,
  IconLayers,
  IconPenCheck,
  IconQuote,
} from "./icons";

type Service = {
  n: string;
  name: string;
  desc: string;
  tags: string[];
  icon: (p: { className?: string }) => React.ReactElement;
  tint: string; // icon bubble classes
};

const SERVICES: Service[] = [
  {
    n: "01",
    name: "Term Paper Support",
    desc: "From topic to final draft: model outlines, section-by-section structure checks, and targeted feedback that sharpens your argument.",
    tags: ["Outlines", "Structure", "Feedback"],
    icon: IconLayers,
    tint: "bg-primary/10 text-primary",
  },
  {
    n: "02",
    name: "Research Paper Coaching",
    desc: "One-on-one guidance on methodology clarity, literature coverage, and argument flow — so every reviewer can follow your reasoning.",
    tags: ["Methodology", "Argument flow"],
    icon: IconCompass,
    tint: "bg-teal/12 text-teal-deep",
  },
  {
    n: "03",
    name: "Assignment Review & Feedback",
    desc: "Line-level comments on essays, case studies, and problem sets, plus a revision letter showing exactly what to improve and why.",
    tags: ["Line edits", "Revision letter"],
    icon: IconPenCheck,
    tint: "bg-navy/8 text-navy",
  },
  {
    n: "04",
    name: "Thesis & Dissertation Editing",
    desc: "Chapter reviews, consistency checks, and formatting against your faculty’s template — steady support for the long-haul project.",
    tags: ["Chapter review", "Formatting"],
    icon: IconBookRibbon,
    tint: "bg-primary/10 text-primary",
  },
  {
    n: "05",
    name: "Citation & Referencing Help",
    desc: "APA, MLA, Chicago, IEEE, Harvard — we audit your citations and teach you the style, so the next paper is easier than the last.",
    tags: ["APA 7", "MLA 9", "Chicago"],
    icon: IconQuote,
    tint: "bg-teal/12 text-teal-deep",
  },
  {
    n: "06",
    name: "Reports & Presentation Polish",
    desc: "Lab reports, business reports, and slide decks: clarity passes, structure fixes, and visual consistency before you present.",
    tags: ["Lab reports", "Slides"],
    icon: IconChartBoard,
    tint: "bg-navy/8 text-navy",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          kicker="What we help with"
          title={
            <>
              Six ways we strengthen{" "}
              <span className="text-primary italic">your</span> work
            </>
          }
          lead="Every service is assistance — coaching, editing, and feedback on the text you write. We never write in your place."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.n} delay={(i % 3) * 90}>
                <article className="group relative h-full overflow-hidden rounded-xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-lift">
                  {/* top accent bar */}
                  <span
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-teal transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-full transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 ${s.tint}`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-display text-2xl font-semibold text-ink/12 transition-colors duration-300 group-hover:text-teal/40">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-[1.22rem] font-semibold text-ink">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-[0.94rem] leading-relaxed text-ink/65">
                    {s.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line bg-paper px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide text-ink/55 uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-2.5 hover:text-primary-deep"
                  >
                    Request this support
                    <IconArrowRight className="h-4 w-4" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-ink/55">
            Not sure which format your work needs? Describe your assignment in the{" "}
            <a href="#contact" className="font-semibold text-primary underline-offset-2 hover:underline">
              request form
            </a>{" "}
            and we’ll recommend the right support level — free of charge.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
