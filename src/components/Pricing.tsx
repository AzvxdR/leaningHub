import Reveal, { SectionHead } from "./Reveal";
import { IconArrowRight, IconCheck, IconShield } from "./icons";

const FACTORS = [
  ["Length & word count", "A 12-page term paper costs less than a 60-page thesis — quotes scale per word or per chapter."],
  ["Complexity & degree level", "Bachelor essays, Master research papers, and PhD dissertations need different depth of review."],
  ["Deadline", "Standard (7+ days) is always cheapest. Rush turnaround is available and priced openly."],
] as const;

const GUARANTEES = [
  "Fixed quote before we start — no hidden fees, ever.",
  "100% original guidance — zero plagiarism, checked on every file.",
  "Deliverables are edits, outlines & templates — you submit your own work.",
] as const;

const MENU = [
  {
    name: "Structure & Outline Session",
    price: "from €39",
    desc: "45-minute coaching call plus a model outline and a source-evaluation worksheet for your topic.",
    tag: "Best first step",
  },
  {
    name: "Full Edit & Feedback",
    price: "from €0.04 / word",
    desc: "Line edits with track changes, margin comments, citation audit, and a one-page revision letter.",
    tag: "Most requested",
  },
  {
    name: "Thesis & Dissertation Package",
    price: "from €349",
    desc: "Chapter-by-chapter reviews, faculty-template formatting check, and defense Q&A preparation.",
    tag: "Long-term support",
  },
] as const;

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-white/60 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          kicker="Pricing & transparency"
          title="Honest quotes, decided before we begin"
          lead="Prices depend on length, complexity, and deadline. Every request gets a written, fixed quote — you approve it before any work starts and before any payment."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* left: how pricing works */}
          <div>
            <Reveal>
              <h3 className="font-display text-xl font-semibold text-ink">
                What shapes your quote
              </h3>
            </Reveal>
            <ul className="mt-5 space-y-4">
              {FACTORS.map(([title, desc], i) => (
                <Reveal key={title} delay={i * 100}>
                  <li className="flex gap-4 rounded-xl border border-line bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40">
                    <span className="font-display mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[0.95rem] font-bold text-ink">{title}</p>
                      <p className="mt-0.5 text-[0.88rem] leading-relaxed text-ink/60">{desc}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200}>
              <ul className="mt-7 space-y-3">
                {GUARANTEES.map((g) => (
                  <li key={g} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5.5 w-5.5 shrink-0 place-items-center rounded-full bg-success/12 text-success">
                      <IconCheck className="h-3 w-3" />
                    </span>
                    <span className="text-[0.92rem] leading-relaxed text-ink/75">{g}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* right: service menu */}
          <Reveal delay={140}>
            <div className="overflow-hidden rounded-xl border border-line bg-white shadow-lift">
              <div className="flex items-center justify-between bg-navy px-6 py-5">
                <p className="font-display text-lg font-semibold text-white">Service menu</p>
                <span className="rounded-full bg-teal/15 px-3 py-1 text-[0.68rem] font-bold tracking-wider text-teal uppercase">
                  Guideline-based
                </span>
              </div>
              <div className="divide-y divide-line">
                {MENU.map((m) => (
                  <div
                    key={m.name}
                    className="group px-6 py-6 transition-colors duration-300 hover:bg-paper"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="font-display text-[1.08rem] font-semibold text-ink">
                        {m.name}
                      </h4>
                      <p className="font-display text-lg font-semibold whitespace-nowrap text-primary">
                        {m.price}
                      </p>
                    </div>
                    <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink/60">{m.desc}</p>
                    <span className="mt-3 inline-block rounded-full bg-teal/10 px-2.5 py-1 text-[0.66rem] font-bold tracking-wider text-teal-deep uppercase">
                      {m.tag}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-line bg-paper/70 px-6 py-5">
                <a
                  href="#contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-[0.5rem] bg-primary px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-deep"
                >
                  Get my exact quote
                  <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <p className="mt-3 text-center text-[0.75rem] text-ink/50">
                  Free &amp; non-binding — you only pay once you approve the proposal.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ethics note */}
        <Reveal delay={120}>
          <aside className="mt-12 flex flex-col gap-4 rounded-xl border-l-4 border-teal bg-teal/6 p-6 sm:flex-row sm:items-center sm:gap-5 sm:p-7">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal/15 text-teal-deep">
              <IconShield className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">
                Ethics &amp; Academic Integrity
              </h3>
              <p className="mt-1 text-[0.94rem] leading-relaxed text-ink/70">
                Our support is for <strong className="font-semibold text-ink">learning, improvement, and clarity</strong>.
                You must follow your institution’s academic integrity policies. All
                materials — outlines, edits, model texts — are provided as guidance
                and examples for your own work.
              </p>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
