import { ReactNode, useEffect, useRef, useState } from "react";

/** Scroll-reveal wrapper — fades/slides children in once visible. */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Small uppercase eyebrow label used above section titles. */
export function Kicker({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] ${
        dark ? "text-teal" : "text-teal-deep"
      }`}
    >
      <span className="inline-block h-[2px] w-7 bg-current" aria-hidden="true" />
      {children}
    </p>
  );
}

/** Standard section heading block (kicker + title + optional lead). */
export function SectionHead({
  kicker,
  title,
  lead,
  align = "center",
  dark = false,
}: {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}
    >
      <Kicker dark={dark}>{kicker}</Kicker>
      <h2
        className={`font-display mt-3 text-3xl leading-[1.12] font-semibold sm:text-4xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-white/70" : "text-ink/65"
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
