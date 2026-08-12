import { palette } from "../data/team";
import { Reveal, RevealText, SectionLabel } from "./primitives";

const LAYERS = [
  {
    label: "The Problem",
    content:
      "94.7% of Singapore's 369,500 SMEs employ fewer than 25 people — nobody's job is reading policy wording. And carriers can't afford to verify anything on a S$1,200 premium, so what can't be verified gets excluded, sub-limited or conditioned.",
  },
  {
    label: "The Insight",
    content:
      "We read a real Singapore SME policy and found it pays proportionally less if the sum insured falls below 85% of a value in no document the business holds; excludes theft unless a schedule box was ticked; and voids water damage after 14 days empty. None of that is knowable without reading two documents together.",
  },
  {
    label: "The Product",
    content:
      "Proven reads what the business already has, computes what its policy actually pays, grades every finding as PROVEN, DECLARED or UNESTABLISHED, tells you how much of the document it couldn't account for, and hands a licensed adviser a prepared case.",
  },
];

export default function ProductSection() {
  return (
    <section
      id="product"
      className="relative border-t border-line-soft px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="00" color={palette[0]}>
            What we're building
          </SectionLabel>
        </Reveal>

        {/* Problem statement heading */}
        <Reveal delay={0.08}>
          <p
            className="mt-8 text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold tracking-tight"
            style={{ color: palette[0] }}
          >
            Problem Statement 03
          </p>
        </Reveal>

        {/* Hackathon badge */}
        <Reveal delay={0.12}>
          <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-line-soft bg-surface/60 px-5 py-2.5">
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ background: palette[0] }}
            />
            <span className="font-mono text-xs tracking-[0.14em] text-mute uppercase">
              Global FinTech Hackcelerator 2026 · Zurich Insurance
            </span>
          </div>
        </Reveal>

        <h2 className="display mt-2 max-w-5xl text-[clamp(2.6rem,6.5vw,5.5rem)] text-bright">
          <RevealText text="Closing the SME" />{" "}
          <span className="spectrum italic">
            <RevealText text="protection gap." delay={0.2} />
          </span>
        </h2>

        <Reveal delay={0.15} className="mt-2 max-w-2xl">
          <p className="text-pretty text-xl leading-relaxed text-body md:text-[1.35rem]">
            Most SMEs don't know what they don't know. Gaps in coverage go unnoticed
            until a claim is denied. We're building{" "}
            <span className="font-semibold text-bright">Proven</span> — an AI engine
            that reads the documents a small business already holds, computes what
            its insurance would actually pay, and hands a licensed adviser a
            prepared case.
          </p>
        </Reveal>

        {/* Three-layer narrative */}
        <div className="mt-20 grid gap-6 md:grid-cols-3 md:gap-8">
          {LAYERS.map((layer, i) => {
            const accent = palette[i % palette.length];
            return (
              <Reveal key={layer.label} delay={i * 0.1} amount={0.2}>
                <div
                  className="group relative h-full overflow-hidden rounded-xl border border-line-soft bg-surface/60 p-8 transition-colors duration-500 hover:border-[var(--accent)]"
                  style={{ "--accent": accent }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 w-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                    style={{ background: accent }}
                  />
                  <span
                    className="font-mono text-xs font-medium tracking-[0.2em] uppercase"
                    style={{ color: accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-bright">
                    {layer.label}
                  </h3>
                  <p className="mt-4 text-pretty leading-relaxed text-body">
                    {layer.content}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
