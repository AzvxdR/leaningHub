import { OWNER_EMAIL } from "../lib/emailService";
import { LogoMark } from "./icons";

const EXPLORE = [
  { label: "Services", href: "#services" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact & Request", href: "#contact" },
];

const SERVICES = [
  "Term paper support",
  "Research coaching",
  "Assignment feedback",
  "Thesis editing",
  "Citation help",
];

export default function Footer({
  openLegal,
}: {
  openLegal: (doc: "privacy" | "terms") => void;
}) {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div
        className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-teal/12 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand + disclaimer */}
          <div>
            <a href="#top" className="flex items-center gap-2.5" aria-label="Back to top">
              <span className="grid h-9 w-9 place-items-center rounded-[0.55rem] bg-white/10">
                <LogoMark className="h-5.5 w-5.5" />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                Academic <span className="text-teal italic">Support</span> Hub
              </span>
            </a>
            <p className="mt-4 max-w-sm text-[0.9rem] leading-relaxed text-white/60">
              Ethical academic assistance for university students — coaching,
              editing, feedback, and formatting support for term papers, research
              papers, theses, and reports.
            </p>
            <p className="mt-5 max-w-sm border-l-2 border-teal/60 pl-4 text-[0.78rem] leading-relaxed text-white/45">
              All support and materials are provided for learning and improvement.
              You are responsible for your final work and must follow your
              institution’s academic integrity rules.
            </p>
          </div>

          {/* explore */}
          <nav aria-label="Footer">
            <p className="text-[0.7rem] font-bold tracking-[0.18em] text-teal uppercase">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[0.9rem] text-white/65 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.18em] text-teal uppercase">
              Get in touch
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.9rem] text-white/65">
              <li>
                <a
                  href={`mailto:${OWNER_EMAIL}`}
                  className="font-medium text-white/80 underline-offset-2 transition-colors hover:text-teal hover:underline"
                >
                  {OWNER_EMAIL}
                </a>
              </li>
              <li>Mon–Sat · 9:00–19:00 CET</li>
              <li>Replies within 24 hours</li>
            </ul>
            <a
              href="#contact"
              className="mt-5 inline-flex min-h-12 items-center rounded-[0.5rem] bg-teal px-5 py-3 text-sm font-semibold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal/85"
            >
              Request Help
            </a>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-[0.78rem] text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Academic Support Hub. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => openLegal("privacy")}
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => openLegal("terms")}
              className="transition-colors hover:text-white"
            >
              Terms of Service
            </button>
            <a href="#top" className="flex items-center gap-1.5 transition-colors hover:text-white">
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
