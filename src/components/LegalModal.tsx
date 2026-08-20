import { ReactNode, useEffect } from "react";
import { OWNER_EMAIL } from "../lib/emailService";
import { IconX } from "./icons";

const DOCS: Record<
  "privacy" | "terms",
  { title: string; updated: string; body: ReactNode }
> = {
  privacy: {
    title: "Privacy Policy",
    updated: "January 2026",
    body: (
      <>
        <p>
          <strong>What we collect.</strong> When you use the request form, we
          receive the details you enter (name, email, institution, assignment
          details) together with any files you upload (guidelines, drafts,
          materials).
        </p>
        <p>
          <strong>How we use it.</strong> Your data is used exclusively to
          prepare your proposal and deliver the coaching, editing, or feedback
          service you requested. Nothing is shared, published, or resold — ever.
        </p>
        <p>
          <strong>Storage &amp; transfer.</strong> Form data is transmitted over
          encrypted HTTPS. Files remain accessible only to the coach handling
          your request.
        </p>
        <p>
          <strong>Your rights.</strong> You may request access, correction, or
          complete deletion of your data at any time — a short email to{" "}
          <a href={`mailto:${OWNER_EMAIL}`} className="font-semibold text-primary underline underline-offset-2">
            {OWNER_EMAIL}
          </a>{" "}
          is enough. Deletion is carried out within 7 days.
        </p>
      </>
    ),
  },
  terms: {
    title: "Terms of Service",
    updated: "January 2026",
    body: (
      <>
        <p>
          <strong>Scope of service.</strong> Academic Support Hub provides
          academic assistance only: coaching, tutoring, editing, feedback,
          formatting, and citation support. We do not produce work intended to
          be submitted as a student’s own.
        </p>
        <p>
          <strong>Your responsibility.</strong> All deliverables — outlines,
          model texts, edits, and comments — are provided for guidance and
          example purposes. You remain solely responsible for your final
          submission and for complying with your institution’s academic
          integrity policies.
        </p>
        <p>
          <strong>Requests we decline.</strong> We refuse any request that asks
          us to complete assessed work for submission (contract cheating or
          ghostwriting), without refund obligation on our side.
        </p>
        <p>
          <strong>Quotes &amp; payment.</strong> You receive a written fixed
          quote before any work begins. Payment is due only after you approve
          the proposal. No hidden fees.
        </p>
        <p>
          <strong>No grade guarantee.</strong> We deliver careful, professional
          support; grades and assessment outcomes remain at the discretion of
          your institution.
        </p>
      </>
    ),
  },
};

export default function LegalModal({
  doc,
  onClose,
}: {
  doc: "privacy" | "terms" | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!doc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [doc, onClose]);

  if (!doc) return null;
  const d = DOCS[doc];

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-title"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-navy/55 backdrop-blur-sm"
      />
      <div className="animate-pop relative max-h-[86vh] w-full max-w-xl overflow-y-auto rounded-t-xl border border-line bg-white shadow-lift sm:rounded-xl">
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-line bg-white/95 px-6 py-5 backdrop-blur-sm">
          <div>
            <h2 id="legal-title" className="font-display text-xl font-semibold text-ink">
              {d.title}
            </h2>
            <p className="mt-0.5 text-[0.72rem] font-semibold tracking-wider text-ink/40 uppercase">
              Updated {d.updated}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Close"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink/50 transition-colors hover:bg-paper hover:text-ink"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4 px-6 py-6 text-[0.92rem] leading-relaxed text-ink/75">
          {d.body}
        </div>
      </div>
    </div>
  );
}
