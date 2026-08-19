import { palette, teamStats } from "../data/team";
import { Counter, Reveal } from "./primitives";

export default function TeamStats() {
  return (
    <section className="relative border-t border-line-soft px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {teamStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.09} amount={0.5}>
              <div
                className="group relative border-t border-line pt-8"
                style={{ "--accent": palette[i % palette.length] }}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-0.5 w-10 -translate-y-px transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-24"
                  style={{ background: palette[i % palette.length] }}
                />
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="display block text-[clamp(4rem,8vw,6.5rem)] leading-none text-bright transition-colors duration-500 group-hover:text-(--accent)"
                />
                <p className="mt-5 font-mono text-xs tracking-[0.18em] text-mute uppercase">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14">
          <p className="max-w-2xl text-sm leading-relaxed text-mute">
            Counted from our resumes. Competitions entered together count once, not once per
            member.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
