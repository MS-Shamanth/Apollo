import { members, palette } from "../data/team";
import MemberCard from "./MemberCard";
import { Reveal, RevealText, SectionLabel } from "./primitives";

export default function TeamGrid({ onSelect }) {
  return (
    <section id="team" className="relative border-t border-line-soft px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="02" color={palette[1]}>
            The team
          </SectionLabel>
        </Reveal>

        <h2 className="display mt-10 text-[clamp(2.6rem,7vw,6rem)] text-bright">
          <RevealText text="The people" />{" "}
          <span className="spectrum italic">
            <RevealText text="behind it." delay={0.18} />
          </span>
        </h2>

        <div className="mt-20 md:mt-28">
          {members.map((member, i) => (
            <MemberCard
              key={member.id}
              member={member}
              reversed={i % 2 === 1}
              onSelect={onSelect}
            />
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
