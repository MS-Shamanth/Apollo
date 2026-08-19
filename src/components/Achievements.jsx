import { headlineAchievements, mergedAchievements, palette } from "../data/team";
import { Reveal, RevealText, SectionLabel } from "./primitives";

/*
 * Five headline rows, one per person, each a different event. Everything else
 * sits in the list below, merged by event: hackathons the team entered together
 * — Infosys Global, Skillathon, Meta OpenEnv — appear once with every member
 * named rather than repeating the same event per person.
 */
export default function Achievements({ onSelect }) {
  return (
    <section
      id="achievements"
      className="relative border-t border-line-soft px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="04" color={palette[3]}>
            Achievements
          </SectionLabel>
        </Reveal>

        <h2 className="display mt-10 text-[clamp(2.6rem,7vw,6rem)] text-bright">
          <RevealText text="Results," />{" "}
          <span className="spectrum italic">
            <RevealText text="on the record." delay={0.18} />
          </span>
        </h2>

        {/* One standout per person */}
        <div className="mt-20 md:mt-28">
          {headlineAchievements.map((item, i) => (
            <Reveal key={item.memberId} delay={i * 0.06} amount={0.25}>
              <button
                type="button"
                onClick={() => onSelect(item.memberId)}
                style={{ "--accent": item.accent }}
                className="group grid w-full grid-cols-1 items-center gap-x-8 gap-y-4 border-t border-line py-9 text-left transition-colors duration-500 hover:border-(--accent) md:grid-cols-12 md:py-11"
              >
                <span
                  className="font-mono text-xs font-medium tracking-[0.2em] md:col-span-1"
                  style={{ color: item.accent }}
                >
                  {item.index}
                </span>

                <div className="md:col-span-4">
                  <h3
                    className="display text-[clamp(1.9rem,3.6vw,3rem)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
                    style={{ color: item.accent }}
                  >
                    {item.result}
                  </h3>
                </div>

                <div className="md:col-span-5">
                  <p className="text-lg text-bright md:text-xl">{item.event}</p>
                  {item.note ? (
                    <p className="mt-2 max-w-md text-pretty leading-relaxed text-mute">
                      {item.note}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 md:col-span-2 md:flex-col md:items-end md:gap-1.5">
                  <span className="flex flex-wrap justify-end gap-x-2 gap-y-1">
                    {item.members.map((m, mi) => (
                      <span
                        key={m.id}
                        className="font-mono text-xs tracking-[0.14em] uppercase"
                        style={{ color: mi === 0 ? "var(--color-bright)" : m.accent }}
                      >
                        {m.firstName}
                      </span>
                    ))}
                  </span>
                  {item.year ? (
                    <span className="font-mono text-sm text-mute">{item.year}</span>
                  ) : null}
                </div>
              </button>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>

        {/* Everything else, merged so a shared event appears once */}
        <Reveal delay={0.1} className="mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="eyebrow">Also recognised</h3>
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-mute uppercase">
              Shared entries listed once, with everyone named
            </p>
          </div>

          <div className="mt-8 grid gap-x-14 gap-y-0 md:grid-cols-2">
            {mergedAchievements.map((item) => (
              <div
                key={item.event}
                className="group/row flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2 border-b border-line-soft py-5 transition-colors duration-500 hover:border-line"
              >
                <p className="min-w-0">
                  <span className="text-bright">{item.results.join(" / ")}</span>
                  <span className="text-mute"> — {item.event}</span>
                  {item.years.length > 0 ? (
                    <span className="ml-2 font-mono text-[0.6875rem] text-mute">
                      {item.years.join(" · ")}
                    </span>
                  ) : null}
                </p>

                <span className="flex flex-none flex-wrap items-center gap-2">
                  {item.members.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => onSelect(m.id)}
                      className="pill px-3 py-1 text-[0.6875rem] tracking-[0.12em] uppercase"
                      style={{ "--pill-accent": m.accent }}
                    >
                      {m.firstName}
                    </button>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
