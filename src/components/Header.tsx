import { useEffect, useState } from "react";
import { IconMenu, IconX, LogoMark } from "./icons";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/90 shadow-[0_6px_24px_-12px_rgba(15,23,42,0.18)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[72px] sm:px-6">
        {/* Wordmark */}
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label="Academic Support Hub — back to top"
        >
          <span className="grid h-9 w-9 place-items-center rounded-[0.55rem] bg-navy shadow-[0_6px_16px_-6px_rgba(12,30,70,0.55)] transition-transform duration-300 group-hover:-rotate-6">
            <LogoMark className="h-5.5 w-5.5" />
          </span>
          <span className="font-display text-[1.06rem] leading-none font-semibold tracking-tight text-ink">
            Academic <span className="text-primary italic">Support</span> Hub
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link text-[0.92rem] font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-[0.5rem] bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(29,78,216,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-deep hover:shadow-[0_16px_30px_-10px_rgba(29,78,216,0.7)] sm:inline-flex"
          >
            Request Help
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="grid h-12 w-12 place-items-center rounded-[0.5rem] border border-line bg-white text-ink transition-colors hover:border-primary/40 lg:hidden"
          >
            {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-line bg-paper/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          open ? "max-h-[26rem] border-b" : "max-h-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-4 sm:px-6">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${i * 40}ms` }}
              className={`rounded-lg px-3 py-3 font-display text-lg font-medium text-ink transition-all duration-300 hover:bg-primary/5 hover:text-primary ${
                open ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-[0.5rem] bg-primary px-5 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-deep"
          >
            Request Help
          </a>
        </nav>
      </div>
    </header>
  );
}
