import { expertise, getMember, palette } from "../data/team";
import { Reveal, RevealText, SectionLabel } from "./primitives";

export default function Expertise({ onSelect }) {
  return (
    <section
      id="expertise"
      className="relative border-t border-line-soft px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="03" color={palette[2]}>
            Capabilities
          </SectionLabel>
        </Reveal>

        <h2 className="display mt-10 text-[clamp(2.6rem,7vw,6rem)] text-bright">
          <RevealText text="What we" />{" "}
          <span className="spectrum italic">
            <RevealText text="bring." delay={0.18} />
          </span>
        </h2>

        <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-2 lg:grid-cols-3">
          {expertise.map((area, i) => {
            const accent = palette[i % palette.length];

            return (
              <Reveal
                key={area.title}
                delay={(i % 3) * 0.08}
                amount={0.2}
                style={{ "--accent": accent }}
              >
                <div className="group relative h-full overflow-hidden rounded-xl border border-line-soft bg-surface/60 p-8 transition-colors duration-500 hover:border-(--accent)">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 w-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                    style={{ background: accent }}
                  />

                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-xs font-medium tracking-[0.2em]"
                      style={{ color: accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs text-mute">{area.members.length}/5</span>
                  </div>

                  <h3 className="mt-6 text-2xl leading-snug tracking-tight text-bright">
                    {area.title}
                  </h3>

                  <p className="mt-3.5 text-pretty leading-relaxed text-body">
                    {area.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {area.stack.map((tech) => (
                      <span
                        key={tech}
                        className="pill pill-quiet px-3 py-1 text-[0.6875rem] tracking-wide"
                        style={{ "--pill-accent": accent }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-line-soft pt-5">
                    {area.members.map((id) => {
                      const member = getMember(id);
                      if (!member) return null;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => onSelect(id)}
                          className="pill px-3 py-1 text-[0.6875rem] tracking-[0.12em] uppercase"
                          style={{ "--pill-accent": member.accent }}
                        >
                          {member.firstName}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
