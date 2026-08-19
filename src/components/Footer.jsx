import { ArrowUp } from "lucide-react";

import { members, siteConfig } from "../data/team";
import { GithubMark, LinkedinMark } from "./icons";
import { Reveal } from "./primitives";
import verisLogo from "../assets/veris-logo.png";

const NAV = [
  { id: "about", label: "About" },
  { id: "team", label: "Team" },
  { id: "expertise", label: "Expertise" },
  { id: "achievements", label: "Achievements" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line-soft px-6 pt-24 pb-12 md:px-10 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="display text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.95]">
            <span className="text-bright">We build.</span>
            <br />
            <span className="text-bright">We verify.</span>
            <br />
            <span className="spectrum italic">We ship.</span>
          </h2>
        </Reveal>

        <div className="mt-24 grid gap-14 border-t border-line pt-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <img src={verisLogo} alt="Veris logo" className="h-8 w-8 object-contain" />
              <p className="font-mono text-sm tracking-[0.2em] text-bright">
                {siteConfig.teamName}
              </p>
            </div>
            <p className="mt-5 max-w-xs text-pretty leading-relaxed text-mute">
              {siteConfig.intro}
            </p>
            <p className="mt-6 font-mono text-xs tracking-[0.16em] text-mute uppercase">
              {siteConfig.location}
            </p>
          </div>

          <div className="md:col-span-5">
            <h3 className="eyebrow mb-7">The team</h3>
            <ul className="space-y-4">
              {members.map((member) => (
                <li
                  key={member.id}
                  className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1.5 border-b border-line-soft pb-4"
                >
                  <span className="flex items-baseline gap-3">
                    <span
                      className="font-mono text-[0.6875rem]"
                      style={{ color: member.accent }}
                    >
                      {member.index}
                    </span>
                    <span className="text-body">{member.name}</span>
                  </span>
                  <span className="flex items-center gap-4">
                    <a
                      href={member.links.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${member.name} on GitHub`}
                      className="text-mute transition-colors hover:text-bright"
                    >
                      <GithubMark size={16} />
                    </a>
                    <a
                      href={member.links.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${member.name} on LinkedIn`}
                      className="text-mute transition-colors hover:text-bright"
                    >
                      <LinkedinMark size={16} />
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="eyebrow mb-7">Navigate</h3>
            <ul className="space-y-3.5">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="font-mono text-xs tracking-[0.16em] text-mute uppercase transition-colors hover:text-bright"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#top"
              className="pill mt-9 px-5 py-2.5 text-xs tracking-[0.16em] uppercase"
            >
              Top
              <ArrowUp size={13} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line-soft pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-mute uppercase">
            © {year} {siteConfig.teamName}
          </p>
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-mute uppercase">
            Profile information sourced from team resumes
          </p>
        </div>
      </div>
    </footer>
  );
}
