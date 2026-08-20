import Reveal from "./Reveal";
import { IconArrowRight, IconCheck, IconStar } from "./icons";

/** Rotating "draft reviewed" stamp with circular text. */
function Stamp() {
  return (
    <div
      className="absolute -top-9 -right-4 h-24 w-24 sm:-right-9 sm:h-28 sm:w-28"
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full text-teal-deep">
        <defs>
          <path
            id="stamp-circ"
            d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
          />
        </defs>
        <circle cx="50" cy="50" r="47" fill="#fff" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 4" />
        <text fontSize="10.2" letterSpacing="2.1" fill="currentColor" fontWeight="600">
          <textPath href="#stamp-circ">DRAFT REVIEWED · ETHICALLY SOUND ·&#160;</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-teal text-white shadow-[0_8px_18px_-6px_rgba(20,184,166,0.7)]">
          <IconCheck className="h-4.5 w-4.5" />
        </span>
      </span>
    </div>
  );
}

const AVATARS = [
  { initials: "LM", bg: "bg-primary text-white" },
  { initials: "AK", bg: "bg-teal text-white" },
  { initials: "SR", bg: "bg-navy text-white" },
  { initials: "JD", bg: "bg-white text-primary border border-line" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* -------- Copy column -------- */}
        <div>
          <Reveal>
            <p className="animate-rise inline-flex flex-wrap items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[0.72rem] font-semibold tracking-[0.14em] text-ink/60 uppercase shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
              </span>
              Coaching · Editing · Formatting — for Bachelor, Master &amp; PhD
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="font-display mt-6 text-[2rem] leading-[1.08] font-semibold tracking-tight text-ink sm:text-[2.6rem] lg:text-[3.05rem]">
              Get expert support for your academic papers —{" "}
              <span className="relative inline-block whitespace-nowrap text-primary italic">
                ethically&nbsp;&amp;&nbsp;legally.
                <svg
                  viewBox="0 0 300 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full text-teal"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10 C 60 4, 150 3, 296 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    className="draw-underline"
                  />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
              We help you understand requirements, improve{" "}
              <span className="highlight-sweep font-medium text-ink">structure</span>,
              refine language, and format your work correctly —{" "}
              <strong className="font-semibold text-ink">
                you stay in control of your submission.
              </strong>
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex min-h-12 items-center gap-2.5 rounded-[0.5rem] bg-primary px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(29,78,216,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-deep"
              >
                Start Your Request
                <IconArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="group inline-flex min-h-12 items-center gap-2 rounded-[0.5rem] border border-line bg-white px-6 py-3.5 text-[0.95rem] font-semibold text-ink transition-all duration-300 hover:border-teal hover:text-teal-deep"
              >
                View Services
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="flex -space-x-2.5">
                {AVATARS.map((a) => (
                  <span
                    key={a.initials}
                    className={`grid h-9 w-9 place-items-center rounded-full text-[0.68rem] font-bold shadow-sm ring-2 ring-paper ${a.bg}`}
                  >
                    {a.initials}
                  </span>
                ))}
              </div>
              <div>
                <span className="flex items-center gap-1 text-amber-500" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} className="h-4 w-4" />
                  ))}
                </span>
                <p className="mt-0.5 text-sm text-ink/65">
                  <strong className="font-semibold text-ink">4.9/5</strong> from 1,200+
                  students coached across 68 subjects
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* -------- Annotated-draft visual -------- */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative">
            {/* offset frames + dot patch */}
            <div
              className="absolute -inset-3 rotate-[-3.5deg] rounded-xl border-2 border-teal/30"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-8 -left-8 h-28 w-28 opacity-60 [background-image:radial-gradient(rgba(29,78,216,0.35)_1.5px,transparent_1.5px)] [background-size:12px_12px]"
              aria-hidden="true"
            />

            <div className="relative rotate-2 rounded-xl border border-line bg-white p-6 shadow-[0_28px_60px_-18px_rgba(15,23,42,0.28)] transition-transform duration-500 hover:rotate-0 sm:p-8">
              <Stamp />

              {/* document header */}
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.7rem] font-bold tracking-[0.16em] text-ink/45 uppercase">
                  Introduction — Draft v3
                </p>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[0.68rem] font-semibold text-amber-800">
                  Under review
                </span>
              </div>

              {/* skeleton title */}
              <div className="mt-4 h-3.5 w-3/4 rounded bg-navy/85" aria-hidden="true" />

              {/* edited sentence */}
              <p className="font-display mt-5 text-[1.02rem] leading-relaxed text-ink/85">
                “The results{" "}
                <s className="decoration-error/80 decoration-2">very clearly</s>{" "}
                <ins className="font-semibold text-teal-deep no-underline">strongly</ins>{" "}
                demonstrate that structured feedback improves revision quality…”
              </p>

              {/* skeleton lines with a sweeping highlight */}
              <div className="mt-5 space-y-2.5" aria-hidden="true">
                <div className="h-2.5 w-full rounded bg-line" />
                <div className="relative h-2.5 w-[92%] rounded bg-line">
                  <span className="absolute inset-y-0 left-0 w-2/3 rounded bg-teal/30" />
                </div>
                <div className="h-2.5 w-[84%] rounded bg-line" />
                <div className="h-2.5 w-[58%] rounded bg-line" />
              </div>

              {/* clarity meter */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-[0.72rem] font-semibold tracking-wide text-ink/55 uppercase">
                  <span>Clarity score</span>
                  <span className="text-teal-deep">87 / 100 ↑</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
                  <div className="animate-meter h-full w-[87%] rounded-full bg-gradient-to-r from-primary to-teal" />
                </div>
              </div>

              {/* margin notes */}
              <div className="animate-floaty absolute top-24 -right-3 max-w-[9.5rem] rotate-3 rounded-lg border border-line bg-white px-3 py-2.5 text-[0.72rem] leading-snug font-medium text-ink/80 shadow-[0_12px_28px_-10px_rgba(15,23,42,0.25)] sm:-right-8">
                <span className="mb-0.5 block text-[0.62rem] font-bold tracking-wider text-primary uppercase">
                  Coach’s note
                </span>
                Tighten this claim — cite the 2023 meta-analysis. ↩
              </div>
              <div
                className="animate-floaty absolute -left-3 bottom-24 -rotate-2 rounded-lg bg-teal px-3 py-2.5 text-[0.72rem] font-semibold text-white shadow-[0_12px_28px_-10px_rgba(20,184,166,0.6)] sm:-left-8"
                style={{ animationDelay: "1.2s" }}
              >
                Great evidence here ✓
              </div>
            </div>

            {/* floating format chip */}
            <div
              className="animate-floaty absolute -bottom-6 right-6 flex items-center gap-2 rounded-full border border-line bg-white py-2 pr-4 pl-2 text-[0.75rem] font-semibold text-ink/75 shadow-[0_12px_28px_-12px_rgba(15,23,42,0.3)]"
              style={{ animationDelay: "0.6s" }}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary">
                <IconCheck className="h-3.5 w-3.5" />
              </span>
              APA 7 · citations checked
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
