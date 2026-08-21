import { IconSparkle } from "./icons";

const ITEMS = [
  "APA 7th ed.",
  "MLA 9th ed.",
  "Chicago 17th",
  "IEEE",
  "Harvard",
  "Vancouver",
  "Term papers",
  "Hausarbeiten",
  "Theses & dissertations",
  "Lab reports",
  "Case studies",
  "Literature reviews",
];

function Row() {
  return (
    <>
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center gap-6 text-[0.8rem] font-semibold tracking-[0.14em] whitespace-nowrap text-ink/45 uppercase"
        >
          {item}
          <IconSparkle className="h-3.5 w-3.5 text-teal/70" />
        </span>
      ))}
    </>
  );
}

/** Slim marquee band — styles & formats we cover. Pauses on hover. */
export default function Ticker() {
  return (
    <div className="marquee-wrap border-y border-line bg-white/70 py-4 backdrop-blur-sm">
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-6">
          <Row />
          <span aria-hidden="true" className="flex items-center gap-6">
            <Row />
          </span>
        </div>
      </div>
    </div>
  );
}
