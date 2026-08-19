import { allTechnologies, palette } from "../data/team";

/**
 * Every technology named across the five resumes, on two counter-scrolling
 * tracks. Each track holds the list twice so the CSS translate to -50% loops
 * seamlessly. Hovering pauses; reduced motion stops it entirely.
 */
function Track({ items, duration, reverse = false }) {
  return (
    <div className="marquee-host relative overflow-hidden py-2.5">
      <div
        className={`marquee gap-3 ${reverse ? "marquee-reverse" : ""}`}
        style={{ "--marquee-duration": duration }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-3 pr-3">
            {items.map((tech, i) => (
              <span
                key={`${copy}-${tech}`}
                className="pill pill-quiet shrink-0 px-3.5 py-1.5 text-xs whitespace-nowrap"
                style={{ "--pill-accent": palette[i % palette.length] }}
              >
                {tech}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  const half = Math.ceil(allTechnologies.length / 2);
  const top = allTechnologies.slice(0, half);
  const bottom = allTechnologies.slice(half);

  return (
    <section className="relative overflow-hidden border-t border-line-soft py-16 md:py-20">
      <div className="mx-auto mb-9 flex max-w-7xl flex-wrap items-baseline justify-between gap-4 px-6 md:px-10">
        <h2 className="eyebrow">Technologies represented</h2>
        <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-mute uppercase">
          {allTechnologies.length} named across five resumes
        </p>
      </div>

      <div className="space-y-1">
        <Track items={top} duration="72s" />
        <Track items={bottom} duration="86s" reverse />
      </div>

      {/* Fade the tracks into the page edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-base to-transparent md:w-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-base to-transparent md:w-40"
      />
    </section>
  );
}
