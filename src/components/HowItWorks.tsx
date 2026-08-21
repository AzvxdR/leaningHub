import { useEffect, useRef, useState } from "react";
import Reveal, { SectionHead } from "./Reveal";

const STEPS = [
  {
    n: "1",
    title: "Tell us about your assignment",
    desc: "Fill in the request form and upload your guidelines, rubric, or professor’s notes.",
    accent: false,
  },
  {
    n: "2",
    title: "Get a tailored proposal",
    desc: "Within 24 hours we review your requirements and send a clear plan with a fixed quote.",
    accent: false,
  },
  {
    n: "3",
    title: "Receive feedback & edits",
    desc: "Annotated documents, structure suggestions, and a coaching call — if you want one.",
    accent: false,
  },
  {
    n: "4",
    title: "You finalize & submit",
    desc: "You keep full control: revise with our notes and submit your own work with confidence.",
    accent: true,
  },
];

/* ---------- count-up statistic ---------- */
function useCountUp(target: number, start: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

function Stat({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
  started,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  started: boolean;
}) {
  const v = useCountUp(value, started);
  const display =
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US");
  return (
    <div className="text-center sm:text-left">
      <p className="font-display text-3xl font-semibold text-white sm:text-4xl">
        {prefix}
        {display}
        <span className="text-teal">{suffix}</span>
      </p>
      <p className="mt-1.5 text-[0.82rem] font-medium tracking-wide text-white/55 uppercase">
        {label}
      </p>
    </div>
  );
}

export default function HowItWorks() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStatsVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white/60 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          kicker="How it works"
          title="From brief to confident submission in four steps"
          lead="A transparent process — you decide what help you take, and every deliverable lands back in your hands."
        />

        {/* timeline */}
        <div className="relative mt-14">
          {/* connector line (desktop) */}
          <div
            className="absolute top-7 right-[12%] left-[12%] hidden border-t-2 border-dashed border-primary/25 lg:block"
            aria-hidden="true"
          >
            <span className="dash-grow absolute inset-0 block origin-left border-t-2 border-dashed border-teal/70" />
          </div>

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 120}>
                <li className="relative flex gap-4 lg:block lg:text-center">
                  <span
                    className={`font-display z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full text-xl font-semibold shadow-[0_10px_24px_-10px_rgba(12,30,70,0.45)] ring-4 ring-paper transition-transform duration-300 hover:scale-110 ${
                      step.accent ? "bg-teal text-white" : "bg-navy text-white"
                    }`}
                  >
                    {step.n}
                  </span>
                  <div className="lg:mt-5">
                    <h3 className="font-display text-lg leading-snug font-semibold text-ink">
                      {step.title}
                      {step.accent && (
                        <span className="mt-1.5 block text-[0.68rem] font-bold tracking-[0.16em] text-teal-deep uppercase">
                          You stay in control
                        </span>
                      )}
                    </h3>
                    <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink/60">
                      {step.desc}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* stats band */}
        <div
          ref={statsRef}
          className="relative mt-16 overflow-hidden rounded-xl bg-navy px-6 py-10 shadow-lift sm:px-10"
        >
          <div
            className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-teal/15 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-28 -left-12 h-64 w-64 rounded-full bg-primary/25 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
            <Stat value={1200} suffix="+" label="Students coached" started={statsVisible} />
            <Stat value={68} label="Subjects covered" started={statsVisible} />
            <Stat value={4.9} decimals={1} suffix="/5" label="Avg. feedback rating" started={statsVisible} />
            <Stat value={24} prefix="<" suffix="h" label="To first response" started={statsVisible} />
          </div>
        </div>
      </div>
    </section>
  );
}
