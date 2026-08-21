/* Custom inline SVG icon set — consistent 24px stroke icons. */

type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true as const,
};

/** Pen-nib brand mark (rendered inside a navy tile by the caller). */
export function LogoMark({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 3l6.5 6.5L10 20.5H4.5V15L12 3z"
        fill="#14B8A6"
      />
      <circle cx="12" cy="10.5" r="1.9" fill="#0C1E46" />
      <path
        d="M12 12.4l-2.6 6.3"
        stroke="#0C1E46"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M15.5 5.5L19 2"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconLayers({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M6 3.5h8.2L18.5 8v12a.9.9 0 0 1-.9.9H6a.9.9 0 0 1-.9-.9V4.4a.9.9 0 0 1 .9-.9z" />
      <path d="M14 3.5V8h4.5" />
      <path d="M8.4 12h7.2M8.4 15.4h7.2M8.4 8.6h3" />
    </svg>
  );
}

export function IconCompass({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.6 8.4l-2.2 5-5 2.2 2.2-5 5-2.2z" />
      <circle cx="12" cy="12" r="0.4" fill="currentColor" />
    </svg>
  );
}

export function IconPenCheck({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M14.5 4.5l5 5L9 20H4v-5L14.5 4.5z" />
      <path d="M12.5 6.5l5 5" />
      <path d="M15 17.5l2 2 4-4.5" strokeWidth="2" />
    </svg>
  );
}

export function IconBookRibbon({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 6.2C10.4 4.8 8 4.3 4.5 4.5v13.7c3.5-.2 5.9.3 7.5 1.6 1.6-1.3 4-1.8 7.5-1.6V4.5C16 4.3 13.6 4.8 12 6.2z" />
      <path d="M12 6.2v13.6" />
      <path d="M15.4 4.6v6.2l1.6-1.4 1.6 1.4V4.7" strokeWidth="1.5" />
    </svg>
  );
}

export function IconQuote({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M9.5 7.5c-2.6.6-4 2.4-4 5.2V17h4.6v-4.6H7.4c.1-1.7.9-2.8 2.6-3.3l-.5-1.6z" />
      <path d="M19 7.5c-2.6.6-4 2.4-4 5.2V17h4.6v-4.6h-2.7c.1-1.7.9-2.8 2.6-3.3L19 7.5z" />
    </svg>
  );
}

export function IconChartBoard({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="4" width="17" height="12.5" rx="1.2" />
      <path d="M12 2.5V4M12 16.5v2M8.5 21l3.5-2.5L15.5 21" />
      <path d="M7.2 13v-2.6M12 13V7.6M16.8 13v-4" strokeWidth="2" />
    </svg>
  );
}

export function IconMail({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.6" />
      <path d="M4.5 7.5l7.5 5.6 7.5-5.6" />
    </svg>
  );
}

export function IconClock({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.4 2" />
    </svg>
  );
}

export function IconShield({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3l7 2.6v5.6c0 4.6-3 7.9-7 9.8-4-1.9-7-5.2-7-9.8V5.6L12 3z" />
      <path d="M8.8 12l2.2 2.2 4.2-4.6" />
    </svg>
  );
}

export function IconCheck({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

export function IconStar({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.1l-5.7 3.1 1.2-6.3-4.7-4.4 6.4-.8L12 2.8z"
      />
    </svg>
  );
}

export function IconArrowRight({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12h15M13.5 5.5L20 12l-6.5 6.5" />
    </svg>
  );
}

export function IconFile({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M6 3.5h8.2L18.5 8v12a.9.9 0 0 1-.9.9H6a.9.9 0 0 1-.9-.9V4.4a.9.9 0 0 1 .9-.9z" />
      <path d="M14 3.5V8h4.5" />
      <path d="M8.4 12.5h7.2M8.4 15.8h4.6" />
    </svg>
  );
}

export function IconX({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
    </svg>
  );
}

export function IconMenu({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 6.5h16M4 12h16M4 17.5h10" />
    </svg>
  );
}

export function IconChevron({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M5.5 9l6.5 6.5L18.5 9" />
    </svg>
  );
}

export function IconSend({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M20.5 3.5L10 14M20.5 3.5l-6.8 17-3.7-7.3-7.3-3.7 17.8-6z" />
    </svg>
  );
}

export function IconSparkle({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3z"
      />
    </svg>
  );
}

export function IconGlobe({ className = "" }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.3 3.9 5.1 3.9 8.5s-1.3 6.2-3.9 8.5c-2.6-2.3-3.9-5.1-3.9-8.5s1.3-6.2 3.9-8.5z" />
    </svg>
  );
}
