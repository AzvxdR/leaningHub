/* ============================================================
 * EMAIL DELIVERY LAYER — Academic Support Hub
 * ------------------------------------------------------------
 * All requests are delivered to the business owner at:
 *     abdulaziz.ghanem@web.de
 *
 * HOW TO CONFIGURE (pick one):
 *
 * 1) FORMSPREE  (recommended for the static build — no server)
 *    a. Go to https://formspree.io → "New form" → set the
 *       send-to address to  abdulaziz.ghanem@web.de
 *    b. Create a file named `.env` in the project root:
 *           VITE_FORMSPREE_ID=yourFormIdHere
 *    c. Rebuild (npm run build). Every submission — including
 *       the uploaded guideline/material files — is then POSTed
 *       straight to Formspree and forwarded to the owner inbox.
 *       (File attachments require Formspree's paid tier; on the
 *       free tier file names are still transmitted in the body.)
 *
 * 2) EMAILJS (alternative)
 *    a. Create a service + template at https://www.emailjs.com
 *       using your SMTP credentials (kept in the EmailJS
 *       dashboard — never in this codebase).
 *    b. `npm install @emailjs/browser`, add to `.env`:
 *           VITE_EMAILJS_SERVICE_ID=...
 *           VITE_EMAILJS_TEMPLATE_ID=...
 *           VITE_EMAILJS_PUBLIC_KEY=...
 *    c. Replace the Formspree branch below with emailjs.send().
 *
 * 3) ZERO-CONFIG FALLBACK (works out of the box)
 *    If no ID is configured, submission opens the visitor's
 *    email client with a fully structured, pre-filled message
 *    addressed to abdulaziz.ghanem@web.de (fields labelled,
 *    attachment names listed).
 * ============================================================ */

export const OWNER_EMAIL = "abdulaziz.ghanem@web.de";

const FORMSPREE_ID: string =
  (import.meta.env.VITE_FORMSPREE_ID as string | undefined) ?? "";

export type RequestPayload = {
  /** Labelled fields exactly as shown in the email body */
  data: Record<string, string>;
  /** Files selected by the student (name + size are transmitted) */
  files: File[];
};

export type SendResult = { ok: true; via: "formspree" | "mailto" };

/** Human readable file size, e.g. "1.2 MB" */
export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Structured, labelled plain-text body for the request email. */
export function buildEmailBody(p: RequestPayload): string {
  const lines = Object.entries(p.data)
    .filter(([, v]) => v.trim() !== "")
    .map(([k, v]) => `${k}: ${v}`);

  const fileList = p.files.length
    ? p.files.map((f) => `  • ${f.name} (${formatSize(f.size)})`).join("\n")
    : "  (none attached)";

  return [
    "NEW SUPPORT REQUEST — Academic Support Hub",
    "============================================",
    "",
    ...lines,
    "",
    "Uploaded files:",
    fileList,
    "",
    "============================================",
    "Sent from the website request form.",
  ].join("\n");
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function sendRequest(p: RequestPayload): Promise<SendResult> {
  const body = buildEmailBody(p);
  const minimumDelay = wait(900); // perceptible "sending" feedback

  if (FORMSPREE_ID) {
    const fd = new FormData();
    Object.entries(p.data).forEach(([k, v]) => fd.append(k, v));
    p.files.forEach((f) => fd.append("attachments", f, f.name));
    fd.append("_subject", `New support request — ${p.data["Full name"]}`);

    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" },
    });
    await minimumDelay;
    if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
    return { ok: true, via: "formspree" };
  }

  /* Fallback: open the visitor's mail client, fully pre-filled. */
  const subject = `New support request — ${p.data["Full name"]} (${
    p.data["Assignment type"] || "academic work"
  })`;
  const href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
  await minimumDelay;
  return { ok: true, via: "mailto" };
}
