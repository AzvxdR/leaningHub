import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  ReactNode,
  useState,
} from "react";
import Reveal, { Kicker } from "./Reveal";
import { OWNER_EMAIL, formatSize, sendRequest } from "../lib/emailService";
import {
  IconClock,
  IconFile,
  IconMail,
  IconSend,
  IconShield,
  IconX,
} from "./icons";

/* ------------------------------------------------------------ */
/* Types & constants                                             */
/* ------------------------------------------------------------ */

type FormState = {
  fullName: string;
  email: string;
  university: string;
  country: string;
  degree: string;
  assignmentType: string;
  subject: string;
  language: string;
  wordCount: string;
  deadline: string;
  timezone: string;
  description: string;
  ethics: boolean;
  privacy: boolean;
};

const INITIAL: FormState = {
  fullName: "",
  email: "",
  university: "",
  country: "",
  degree: "",
  assignmentType: "",
  subject: "",
  language: "",
  wordCount: "",
  deadline: "",
  timezone: "",
  description: "",
  ethics: false,
  privacy: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EXTENSIONS = ["pdf", "doc", "docx", "ppt", "pptx", "zip"];
const ACCEPT = ".pdf,.doc,.docx,.ppt,.pptx,.zip";
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

const DEGREES = ["Bachelor", "Master", "PhD", "Other"];
const ASSIGNMENT_TYPES = [
  "Term paper",
  "Research paper",
  "Essay",
  "Case study",
  "Lab report",
  "Thesis/Dissertation",
  "Presentation",
  "Other",
];
const LANGUAGES = ["English", "German", "Other"];

/** Focus order used to jump to the first invalid field. */
const FIELD_ORDER = [
  "fullName",
  "email",
  "university",
  "country",
  "degree",
  "assignmentType",
  "subject",
  "language",
  "wordCount",
  "deadline",
  "description",
  "guidelines",
  "ethics",
  "privacy",
];

const todayISO = () => new Date().toISOString().slice(0, 10);

/* ------------------------------------------------------------ */
/* Small presentational helpers                                  */
/* ------------------------------------------------------------ */

function inputCls(error?: string) {
  return `w-full rounded-[0.5rem] border bg-white px-3.5 py-3 text-[0.95rem] text-ink shadow-sm outline-none transition-all duration-200 placeholder:text-ink/35 focus:border-primary focus:ring-4 focus:ring-primary/10 ${
    error ? "border-error ring-4 ring-error/10" : "border-line hover:border-ink/25"
  }`;
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1.5 text-[0.8rem] font-medium text-error">
      <span className="mt-[0.42em] h-1.5 w-1.5 shrink-0 rounded-full bg-error" aria-hidden="true" />
      {children}
    </p>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-error" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="ml-1.5 text-[0.7rem] font-medium tracking-wide text-ink/40 uppercase">
            optional
          </span>
        )}
      </label>
      {children}
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

function GroupLabel({ children }: { children: ReactNode }) {
  return (
    <p className="col-span-full mt-2 flex items-center gap-3 text-[0.7rem] font-bold tracking-[0.16em] text-primary/75 uppercase first:mt-0">
      {children}
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
    </p>
  );
}

/* ------------------------------------------------------------ */
/* File upload field (click or drag & drop)                      */
/* ------------------------------------------------------------ */

function FileField({
  id,
  label,
  required,
  file,
  error,
  onFile,
  onClear,
}: {
  id: string;
  label: string;
  required?: boolean;
  file: File | null;
  error?: string;
  onFile: (f: File) => void;
  onClear: () => void;
}) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-error" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="ml-1.5 text-[0.7rem] font-medium tracking-wide text-ink/40 uppercase">
            optional
          </span>
        )}
      </span>

      {!file ? (
        <label
          htmlFor={id}
          onDragOver={(e: DragEvent) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e: DragEvent) => {
            e.preventDefault();
            setDragOver(false);
            const f = e.dataTransfer.files?.[0];
            if (f) onFile(f);
          }}
          className={`flex min-h-12 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[0.5rem] border-2 border-dashed px-4 py-6 text-center transition-all duration-200 sm:flex-row sm:gap-3 sm:text-left ${
            dragOver
              ? "border-teal bg-teal/8"
              : error
                ? "border-error/60 bg-error/4"
                : "border-line bg-paper hover:border-primary/45 hover:bg-primary/4"
          }`}
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <IconFile className="h-5 w-5" />
          </span>
          <span className="text-[0.88rem] leading-snug text-ink/65">
            <strong className="font-semibold text-primary">Click to upload</strong>{" "}
            or drag &amp; drop
            <span className="mt-0.5 block text-[0.72rem] text-ink/45">
              PDF, DOCX, DOC, PPT or ZIP · max 10 MB
            </span>
          </span>
          <input
            id={id}
            type="file"
            accept={ACCEPT}
            className="sr-only"
            aria-describedby={error ? `${id}-error` : undefined}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
              e.target.value = "";
            }}
          />
        </label>
      ) : (
        <div className="flex items-center gap-3 rounded-[0.5rem] border border-teal/40 bg-teal/6 px-4 py-3.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal/15 text-teal-deep">
            <IconFile className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.88rem] font-semibold text-ink">{file.name}</p>
            <p className="text-[0.72rem] text-ink/50">{formatSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={onClear}
            aria-label={`Remove file ${file.name}`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink/40 transition-colors hover:bg-error/10 hover:text-error"
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>
      )}
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

/* ------------------------------------------------------------ */
/* Main component                                                */
/* ------------------------------------------------------------ */

export default function Contact({
  openLegal,
}: {
  openLegal: (doc: "privacy" | "terms") => void;
}) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [guidelines, setGuidelines] = useState<File | null>(null);
  const [materials, setMaterials] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [via, setVia] = useState<"formspree" | "mailto">("formspree");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  const validateFile = (f: File): string => {
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
    if (!EXTENSIONS.includes(ext))
      return "Unsupported format. Use PDF, DOCX, DOC, PPT or ZIP.";
    if (f.size > MAX_SIZE) return "File is larger than 10 MB. Please compress it or send it by email.";
    return "";
  };

  const handleFile = (
    which: "guidelines" | "materials",
    f: File
  ) => {
    const err = validateFile(f);
    setErrors((e) => {
      const next = { ...e };
      if (err) next[which] = err;
      else delete next[which];
      return next;
    });
    if (!err) (which === "guidelines" ? setGuidelines : setMaterials)(f);
  };

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your full name.";
    if (!form.email.trim()) e.email = "Your email address is required.";
    else if (!EMAIL_RE.test(form.email.trim()))
      e.email = "Please enter a valid email address (e.g. name@uni.edu).";
    if (!form.university.trim()) e.university = "Please tell us your university or institution.";
    if (!form.country.trim()) e.country = "Please enter your country.";
    if (!form.degree) e.degree = "Please select your degree level.";
    if (!form.assignmentType) e.assignmentType = "Please select the assignment type.";
    if (!form.subject.trim()) e.subject = "Please enter the subject or course.";
    if (!form.language) e.language = "Please select the working language.";
    const wc = Number(form.wordCount);
    if (!form.wordCount || Number.isNaN(wc) || wc <= 0)
      e.wordCount = "Enter an estimated word count (a rough guess is fine).";
    if (!form.deadline) e.deadline = "Please pick your deadline.";
    else if (form.deadline < todayISO())
      e.deadline = "The deadline can’t be in the past.";
    if (form.description.trim().length < 20)
      e.description = "Please describe your assignment in at least a few sentences.";
    if (!guidelines)
      e.guidelines = "Please upload your guidelines or professor’s brief.";
    if (!form.ethics)
      e.ethics = "Please confirm you’ll use the service for learning and guidance.";
    if (!form.privacy) e.privacy = "Please accept the Privacy Policy and Terms.";
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const errs = validate();
    setErrors(errs);

    const firstInvalid = FIELD_ORDER.find((k) => errs[k]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      document
        .getElementById(firstInvalid)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("sending");
    try {
      const payload = {
        data: {
          "Full name": form.fullName.trim(),
          Email: form.email.trim(),
          "University / Institution": form.university.trim(),
          Country: form.country.trim(),
          "Degree level": form.degree,
          "Assignment type": form.assignmentType,
          "Subject / Course": form.subject.trim(),
          Language: form.language,
          "Estimated word count": `${Number(form.wordCount).toLocaleString("en-US")} words`,
          Deadline: form.deadline,
          ...(form.timezone.trim() ? { Timezone: form.timezone.trim() } : {}),
          "Assignment description": form.description.trim(),
        },
        files: [guidelines, materials].filter((f): f is File => Boolean(f)),
      };
      const res = await sendRequest(payload);
      setVia(res.via);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const resetAll = () => {
    setForm(INITIAL);
    setErrors({});
    setGuidelines(null);
    setMaterials(null);
    setStatus("idle");
  };

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* ---------- left: reassurance & contact info ---------- */}
          <div>
            <Reveal>
              <Kicker>Contact &amp; request</Kicker>
              <h2 className="font-display mt-3 text-3xl leading-[1.12] font-semibold text-ink sm:text-4xl">
                Tell us about your assignment —{" "}
                <span className="text-teal-deep italic">we’ll take it from there.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/65">
                Share your requirements and guidelines below. A real academic coach
                reviews every request personally and replies with a free, fixed
                proposal — usually the same day.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ul className="mt-8 space-y-4">
                {[
                  {
                    icon: IconClock,
                    title: "Reply within 24 hours",
                    desc: "Monday to Saturday, 9:00–19:00 CET — usually much faster.",
                  },
                  {
                    icon: IconShield,
                    title: "Confidential by default",
                    desc: "Your files and details are used only for your request and deleted on demand.",
                  },
                  {
                    icon: IconMail,
                    title: "Direct line",
                    desc: OWNER_EMAIL,
                    href: `mailto:${OWNER_EMAIL}`,
                  },
                ].map((row) => {
                  const Icon = row.icon;
                  return (
                    <li
                      key={row.title}
                      className="flex items-start gap-4 rounded-xl border border-line bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5.5 w-5.5" />
                      </span>
                      <div>
                        <p className="text-[0.95rem] font-bold text-ink">{row.title}</p>
                        {row.href ? (
                          <a
                            href={row.href}
                            className="text-[0.88rem] font-medium text-primary underline-offset-2 hover:underline"
                          >
                            {row.desc}
                          </a>
                        ) : (
                          <p className="text-[0.88rem] text-ink/60">{row.desc}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 rounded-xl border border-line bg-white/70 p-5">
                <p className="text-[0.7rem] font-bold tracking-[0.16em] text-ink/45 uppercase">
                  What happens next
                </p>
                <ol className="mt-3 space-y-2.5">
                  {[
                    "We read your brief and guidelines carefully.",
                    "You receive a written proposal with a fixed quote.",
                    "Support starts only after you approve it.",
                  ].map((s, i) => (
                    <li key={s} className="flex items-start gap-3 text-[0.9rem] text-ink/70">
                      <span className="font-display grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal/12 text-[0.72rem] font-bold text-teal-deep">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 border-t border-line pt-3.5 text-[0.78rem] leading-relaxed text-ink/50">
                  All support and materials are provided for learning and improvement.
                  You are responsible for your final work and must follow your
                  institution’s academic integrity rules.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---------- right: request form ---------- */}
          <Reveal delay={140}>
            <div className="overflow-hidden rounded-xl border border-line bg-white shadow-lift">
              <div className="flex items-center justify-between gap-3 border-b border-line bg-paper/80 px-6 py-5 sm:px-8">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink">Request support</h3>
                  <p className="mt-0.5 text-[0.82rem] text-ink/55">
                    Takes about 3 minutes — the more detail, the sharper our proposal.
                  </p>
                </div>
                <span className="hidden shrink-0 rounded-full bg-success/10 px-3 py-1.5 text-[0.68rem] font-bold tracking-wider text-success uppercase sm:block">
                  Free quote
                </span>
              </div>

              {status === "sent" ? (
                /* ---------- success state ---------- */
                <div className="px-6 py-14 text-center sm:px-10" role="status">
                  <svg viewBox="0 0 100 100" className="mx-auto h-20 w-20 text-success" aria-hidden="true">
                    <circle
                      cx="50" cy="50" r="44"
                      fill="none" stroke="currentColor" strokeWidth="5"
                      className="draw-circle" strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <path
                      d="M32 52l13 13 24-28"
                      fill="none" stroke="currentColor" strokeWidth="6"
                      strokeLinecap="round" strokeLinejoin="round"
                      className="draw-check"
                    />
                  </svg>
                  <h4 className="font-display mt-6 text-2xl font-semibold text-ink">
                    Thank you! Your request has been sent.
                  </h4>
                  <p className="mt-2 text-[0.95rem] text-ink/65">
                    We’ll contact you via email soon — usually within 24 hours.
                  </p>
                  {via === "mailto" && (
                    <p className="mx-auto mt-4 max-w-md rounded-lg bg-paper px-4 py-3 text-[0.82rem] leading-relaxed text-ink/60">
                      Your email app just opened with everything pre-filled — press{" "}
                      <strong className="font-semibold text-ink">Send</strong> to deliver
                      it. If it didn’t open, write to us directly at{" "}
                      <a href={`mailto:${OWNER_EMAIL}`} className="font-semibold text-primary hover:underline">
                        {OWNER_EMAIL}
                      </a>{" "}
                      and attach your files.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={resetAll}
                    className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-[0.5rem] border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:border-primary hover:text-primary"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                /* ---------- form ---------- */
                <form onSubmit={onSubmit} noValidate className="px-6 py-7 sm:px-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <GroupLabel>About you</GroupLabel>

                    <Field id="fullName" label="Full name" required error={errors.fullName}>
                      <input
                        id="fullName"
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Mira Al-Rashid"
                        value={form.fullName}
                        onChange={(e) => set("fullName", e.target.value)}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                        className={inputCls(errors.fullName)}
                      />
                    </Field>

                    <Field id="email" label="Email address" required error={errors.email}>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="name@uni.edu"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={inputCls(errors.email)}
                      />
                    </Field>

                    <Field id="university" label="University / Institution" required error={errors.university}>
                      <input
                        id="university"
                        type="text"
                        placeholder="e.g. University of Cologne"
                        value={form.university}
                        onChange={(e) => set("university", e.target.value)}
                        aria-invalid={!!errors.university}
                        aria-describedby={errors.university ? "university-error" : undefined}
                        className={inputCls(errors.university)}
                      />
                    </Field>

                    <Field id="country" label="Country" required error={errors.country}>
                      <input
                        id="country"
                        type="text"
                        autoComplete="country-name"
                        placeholder="e.g. Germany"
                        value={form.country}
                        onChange={(e) => set("country", e.target.value)}
                        aria-invalid={!!errors.country}
                        aria-describedby={errors.country ? "country-error" : undefined}
                        className={inputCls(errors.country)}
                      />
                    </Field>

                    <GroupLabel>Your assignment</GroupLabel>

                    <Field id="degree" label="Degree level" required error={errors.degree}>
                      <select
                        id="degree"
                        value={form.degree}
                        onChange={(e) => set("degree", e.target.value)}
                        aria-invalid={!!errors.degree}
                        aria-describedby={errors.degree ? "degree-error" : undefined}
                        className={`${inputCls(errors.degree)} ${form.degree ? "" : "text-ink/40"}`}
                      >
                        <option value="" disabled>
                          Please select…
                        </option>
                        {DEGREES.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </Field>

                    <Field id="assignmentType" label="Assignment type" required error={errors.assignmentType}>
                      <select
                        id="assignmentType"
                        value={form.assignmentType}
                        onChange={(e) => set("assignmentType", e.target.value)}
                        aria-invalid={!!errors.assignmentType}
                        aria-describedby={errors.assignmentType ? "assignmentType-error" : undefined}
                        className={`${inputCls(errors.assignmentType)} ${form.assignmentType ? "" : "text-ink/40"}`}
                      >
                        <option value="" disabled>
                          Please select…
                        </option>
                        {ASSIGNMENT_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </Field>

                    <Field id="subject" label="Subject / Course" required error={errors.subject}>
                      <input
                        id="subject"
                        type="text"
                        placeholder="e.g. Marketing Research Methods"
                        value={form.subject}
                        onChange={(e) => set("subject", e.target.value)}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        className={inputCls(errors.subject)}
                      />
                    </Field>

                    <Field id="language" label="Language" required error={errors.language}>
                      <select
                        id="language"
                        value={form.language}
                        onChange={(e) => set("language", e.target.value)}
                        aria-invalid={!!errors.language}
                        aria-describedby={errors.language ? "language-error" : undefined}
                        className={`${inputCls(errors.language)} ${form.language ? "" : "text-ink/40"}`}
                      >
                        <option value="" disabled>
                          Please select…
                        </option>
                        {LANGUAGES.map((l) => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>
                    </Field>

                    <Field id="wordCount" label="Estimated word count" required error={errors.wordCount}>
                      <input
                        id="wordCount"
                        type="number"
                        min={1}
                        step={1}
                        placeholder="e.g. 3500"
                        value={form.wordCount}
                        onChange={(e) => set("wordCount", e.target.value)}
                        aria-invalid={!!errors.wordCount}
                        aria-describedby={errors.wordCount ? "wordCount-error" : undefined}
                        className={inputCls(errors.wordCount)}
                      />
                    </Field>

                    <Field id="deadline" label="Deadline" required error={errors.deadline}>
                      <input
                        id="deadline"
                        type="date"
                        min={todayISO()}
                        value={form.deadline}
                        onChange={(e) => set("deadline", e.target.value)}
                        aria-invalid={!!errors.deadline}
                        aria-describedby={errors.deadline ? "deadline-error" : undefined}
                        className={inputCls(errors.deadline)}
                      />
                    </Field>

                    <Field id="timezone" label="Timezone" error={undefined} className="sm:col-span-2">
                      <input
                        id="timezone"
                        type="text"
                        placeholder="e.g. CET (Berlin) — helps us schedule feedback calls"
                        value={form.timezone}
                        onChange={(e) => set("timezone", e.target.value)}
                        className={inputCls()}
                      />
                    </Field>

                    <div className="sm:col-span-2">
                      <Field id="description" label="Detailed assignment description" required error={errors.description}>
                        <textarea
                          id="description"
                          rows={5}
                          placeholder="What is the task? What has your professor asked for? Where do you feel stuck — structure, sources, argument, language, formatting?"
                          value={form.description}
                          onChange={(e) => set("description", e.target.value)}
                          aria-invalid={!!errors.description}
                          aria-describedby={errors.description ? "description-error" : undefined}
                          className={`${inputCls(errors.description)} resize-y`}
                        />
                      </Field>
                    </div>

                    <GroupLabel>Files</GroupLabel>

                    <div className="sm:col-span-2 grid gap-5">
                      <FileField
                        id="guidelines"
                        label="University / professor guidelines"
                        required
                        file={guidelines}
                        error={errors.guidelines}
                        onFile={(f) => handleFile("guidelines", f)}
                        onClear={() => {
                          setGuidelines(null);
                          setErrors((e) => ({ ...e, guidelines: "Please upload your guidelines or professor’s brief." }));
                        }}
                      />
                      <FileField
                        id="materials"
                        label="Additional materials (drafts, slides, rubrics…)"
                        file={materials}
                        onFile={(f) => handleFile("materials", f)}
                        onClear={() => setMaterials(null)}
                      />
                    </div>

                    <GroupLabel>Confirmations</GroupLabel>

                    <div className="sm:col-span-2 space-y-3">
                      <div>
                        <label htmlFor="ethics" className="flex cursor-pointer items-start gap-3 rounded-[0.5rem] border border-line bg-paper/70 p-3.5 transition-colors hover:border-primary/35">
                          <input
                            id="ethics"
                            type="checkbox"
                            checked={form.ethics}
                            onChange={(e) => set("ethics", e.target.checked)}
                            aria-invalid={!!errors.ethics}
                            aria-describedby={errors.ethics ? "ethics-error" : undefined}
                            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-primary"
                          />
                          <span className="text-[0.88rem] leading-relaxed text-ink/75">
                            I confirm that I will use this service only for{" "}
                            <strong className="font-semibold text-ink">learning, editing, and guidance</strong>,
                            and that I remain responsible for my own submission.{" "}
                            <span className="text-error">*</span>
                          </span>
                        </label>
                        {errors.ethics && <FieldError id="ethics-error">{errors.ethics}</FieldError>}
                      </div>

                      <div>
                        <label htmlFor="privacy" className="flex cursor-pointer items-start gap-3 rounded-[0.5rem] border border-line bg-paper/70 p-3.5 transition-colors hover:border-primary/35">
                          <input
                            id="privacy"
                            type="checkbox"
                            checked={form.privacy}
                            onChange={(e) => set("privacy", e.target.checked)}
                            aria-invalid={!!errors.privacy}
                            aria-describedby={errors.privacy ? "privacy-error" : undefined}
                            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-primary"
                          />
                          <span className="text-[0.88rem] leading-relaxed text-ink/75">
                            I accept the{" "}
                            <button
                              type="button"
                              onClick={() => openLegal("privacy")}
                              className="font-semibold text-primary underline underline-offset-2 hover:text-primary-deep"
                            >
                              Privacy Policy
                            </button>{" "}
                            and{" "}
                            <button
                              type="button"
                              onClick={() => openLegal("terms")}
                              className="font-semibold text-primary underline underline-offset-2 hover:text-primary-deep"
                            >
                              Terms of Service
                            </button>
                            . <span className="text-error">*</span>
                          </span>
                        </label>
                        {errors.privacy && <FieldError id="privacy-error">{errors.privacy}</FieldError>}
                      </div>
                    </div>
                  </div>

                  {status === "error" && (
                    <p role="alert" className="mt-5 rounded-lg border border-error/30 bg-error/6 px-4 py-3 text-[0.88rem] font-medium text-error">
                      Something went wrong while sending your request. Please try
                      again, or email us directly at{" "}
                      <a href={`mailto:${OWNER_EMAIL}`} className="font-bold underline underline-offset-2">
                        {OWNER_EMAIL}
                      </a>
                      .
                    </p>
                  )}

                  <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[0.5rem] bg-primary px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(29,78,216,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {status === "sending" ? (
                        <>
                          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                          Sending your request…
                        </>
                      ) : (
                        <>
                          Send request
                          <IconSend className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[0.78rem] text-ink/50 sm:max-w-[13rem] sm:text-left">
                      Goes straight to our lead coach’s inbox —{" "}
                      <a href={`mailto:${OWNER_EMAIL}`} className="font-semibold text-primary hover:underline">
                        {OWNER_EMAIL}
                      </a>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
