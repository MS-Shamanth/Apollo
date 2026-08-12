import { palette } from "../data/team";
import { Reveal, RevealText, SectionLabel } from "./primitives";

/* Each strength generalises evidence that appears in the resumes. */
const STRENGTHS = [
  {
    title: "We compete and win",
    body: "Five international hackathons, a TiE Global Summit invitation, and a Kaushalya Karnataka Award — our record is built on stage, under pressure.",
  },
  {
    title: "We prove, not just claim",
    body: "Evidence-class grading, preregistered evaluation, and a measured error rate. Every number on this site traces to work we can show.",
  },
  {
    title: "We build for trust",
    body: "Append-only records, no-violations-table schemas, and consent-as-pull — architecture where the guarantee is structural, not a promise.",
  },
];

export default function TeamIntro() {
  return (
    <section id="about" className="relative border-t border-line-soft px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="01" color={palette[0]}>
            The collective
          </SectionLabel>
        </Reveal>

        <h2 className="display mt-10 max-w-4xl text-[clamp(2.6rem,6.5vw,5.5rem)] text-bright">
          <RevealText text="Five builders." />{" "}
          <span className="spectrum italic">
            <RevealText text="One venture." delay={0.2} />
          </span>
        </h2>

        <Reveal delay={0.15} className="mt-10 max-w-2xl">
          <p className="text-pretty text-xl leading-relaxed text-body md:text-[1.35rem]">
            Two institutions in Mysuru, all graduating in 2027. We came together through
            competitions and stayed because the mix covers technical depth, product thinking
            and entrepreneurial drive — exactly what Proven needs.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
          {STRENGTHS.map((strength, i) => (
            <Reveal key={strength.title} delay={i * 0.1}>
              <div className="group relative border-t border-line pt-8">
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-0.5 w-12 -translate-y-px transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-28"
                  style={{ background: palette[i] }}
                />
                <h3 className="text-2xl leading-snug tracking-tight text-bright">
                  {strength.title}
                </h3>
                <p className="mt-4 max-w-sm text-pretty leading-relaxed text-body">
                  {strength.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
