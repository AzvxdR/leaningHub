import Reveal, { Kicker } from "./Reveal";
import { IconStar } from "./icons";

const QUOTES = [
  {
    quote:
      "The annotated draft taught me more than a semester of guessing. My professor noticed the difference immediately — because the ideas were still mine, just sharper.",
    name: "Lena M.",
    role: "Master’s student · Business Administration, Cologne",
    rotate: "lg:-rotate-2",
    offset: "lg:translate-y-4",
    tint: "border-primary/20",
  },
  {
    quote:
      "They never wrote a single word for me — they showed me how to fix my own. That’s exactly why I trust them with every chapter of my dissertation.",
    name: "Amir K.",
    role: "PhD candidate · Mechanical Engineering",
    rotate: "lg:rotate-1",
    offset: "lg:-translate-y-2",
    tint: "border-teal/30",
  },
  {
    quote:
      "APA finally makes sense. The citation audit caught formal errors that would have cost me real points, and the style sheet they left behind still helps me today.",
    name: "Sofia R.",
    role: "Bachelor’s student · Psychology",
    rotate: "lg:rotate-2",
    offset: "lg:translate-y-6",
    tint: "border-navy/15",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Kicker>From our students</Kicker>
            <h2 className="font-display mt-3 max-w-xl text-3xl leading-[1.12] font-semibold text-ink sm:text-4xl">
              Better drafts, <span className="text-teal-deep italic">their</span> words
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink/55">
            Every review ends with the student still holding the pen. Here’s how
            that feels from their side of the desk.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 120}>
              <figure
                className={`relative h-full rounded-xl border-t-4 bg-white p-6 shadow-card transition-all duration-300 hover:rotate-0 hover:shadow-lift sm:p-7 ${q.rotate} ${q.offset} ${q.tint}`}
              >
                <span
                  className="font-display absolute -top-5 left-6 text-[4.2rem] leading-none text-teal/25 select-none"
                  aria-hidden="true"
                >
                  “
                </span>
                <span className="flex gap-1 text-amber-500" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <IconStar key={s} className="h-3.5 w-3.5" />
                  ))}
                </span>
                <blockquote className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">
                  {q.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <p className="text-sm font-bold text-ink">{q.name}</p>
                  <p className="mt-0.5 text-[0.78rem] text-ink/55">{q.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
