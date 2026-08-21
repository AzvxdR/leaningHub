import { useState } from "react";
import Reveal, { SectionHead } from "./Reveal";
import { IconChevron } from "./icons";

const FAQS = [
  {
    q: "Is this service legal?",
    a: "Yes. Everything we offer is academic assistance of the same kind universities themselves provide through writing centers and tutoring: coaching, editing, feedback, and formatting help. We never produce work meant to be submitted as your own. As with any support, you should check your institution’s rules — and our deliverables are designed to stay well inside them.",
  },
  {
    q: "Do you write the whole paper for me?",
    a: "No — and we won’t. The writing stays yours. We help you understand the brief, build strong outlines, restructure weak sections, polish language, and fix citations. You receive edits, model outlines, and annotated feedback on your own text; you remain fully responsible for what you submit.",
  },
  {
    q: "Will I get plagiarism-free help?",
    a: "Always. Every suggestion, outline, and comment we produce is original, and the focus is on improving your own writing — not replacing it. You receive your documents back with track changes and notes, so you decide what to adopt, rewrite, or discard.",
  },
  {
    q: "How will I receive feedback?",
    a: "By email, as annotated documents: your text with track-changes edits, margin comments, and a short revision letter summarizing the key improvements. Where useful, we add a live coaching call (video or voice) to walk through the feedback together.",
  },
  {
    q: "Which citation styles do you cover?",
    a: "APA (7th), MLA (9th), Chicago/Turabian (17th), IEEE, Harvard, Vancouver, and common German faculty standards. We audit your existing citations and leave you a style sheet, so future papers stay consistent without us.",
  },
  {
    q: "What happens to my files and data?",
    a: "Your guidelines, drafts, and personal data are used only to prepare your proposal and deliver your service. Nothing is shared, published, or resold — and everything is deleted on request. See our Privacy Policy for the full details.",
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHead
          kicker="FAQ"
          title="Straight answers, no fine print"
          lead="The questions every student asks before reaching out — including the important ones about integrity."
        />

        <div className="mt-12 space-y-3.5">
          {FAQS.map((item, i) => {
            const open = openIdx === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div
                  className={`overflow-hidden rounded-xl border bg-white shadow-card transition-all duration-300 ${
                    open ? "border-primary/35 shadow-lift" : "border-line hover:border-primary/25"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIdx(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${i}`}
                      className="flex min-h-12 w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                    >
                      <span className="font-display text-[1.02rem] font-semibold text-ink sm:text-lg">
                        {item.q}
                      </span>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                          open
                            ? "rotate-180 bg-primary text-white"
                            : "bg-paper text-ink/50"
                        }`}
                      >
                        <IconChevron className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-label={item.q}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-[0.94rem] leading-relaxed text-ink/68 sm:px-6">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={160}>
          <p className="mt-8 text-center text-sm text-ink/55">
            Still unsure?{" "}
            <a
              href="#contact"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              Ask us anything in the request form
            </a>{" "}
            — the proposal is free either way.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
