import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

import { members } from "../data/team";
import { useLockBodyScroll } from "../hooks/useSiteHooks";
import { GithubMark, LinkedinMark } from "./icons";
import { EASE, Tag } from "./primitives";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function Block({ label, children }) {
  return (
    <section className="border-t border-line pt-8">
      <h3 className="eyebrow mb-6">{label}</h3>
      {children}
    </section>
  );
}

function Dash() {
  return <span className="mt-3 h-px w-3.5 flex-none bg-line" />;
}

export default function MemberProfile({ member, onClose, onNavigate }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const reduced = useReducedMotion();

  useLockBodyScroll(true);

  const index = members.findIndex((m) => m.id === member.id);
  const previous = members[(index - 1 + members.length) % members.length];
  const next = members[(index + 1) % members.length];

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const nodes = Array.from(panelRef.current.querySelectorAll(FOCUSABLE)).filter(
        (node) => node.offsetParent !== null,
      );
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    closeRef.current?.focus();
    panelRef.current?.scrollTo({ top: 0 });
  }, [member.id]);

  const linkClass = "pill px-5 py-2.5 text-xs tracking-[0.14em] uppercase";

  return (
    <div className="fixed inset-0 z-[160] flex items-stretch justify-center">
      <motion.button
        type="button"
        onClick={onClose}
        aria-label="Close profile"
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="absolute inset-0 cursor-default bg-base/88 backdrop-blur-md"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-name"
        initial={{ opacity: 0, y: reduced ? 0 : 44 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduced ? 0 : 28 }}
        transition={{ duration: reduced ? 0.2 : 0.7, ease: EASE }}
        style={{ "--accent": member.accent }}
        className="relative w-full overflow-y-auto overscroll-contain bg-surface md:m-6 md:max-w-6xl md:rounded-2xl md:border md:border-line"
      >
        {/* Accent edge */}
        <div
          aria-hidden="true"
          className="sticky top-0 z-30 h-1 w-full"
          style={{ background: member.accent }}
        />

        {/* Control bar */}
        <div className="sticky top-1 z-20 flex items-center justify-between gap-4 border-b border-line-soft bg-surface/95 px-5 py-4 backdrop-blur-xl md:px-9">
          <span className="font-mono text-xs tracking-[0.2em] text-mute uppercase">
            <span style={{ color: member.accent }}>{member.index}</span> /{" "}
            {String(members.length).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate(previous.id)}
              aria-label={`Previous profile: ${previous.name}`}
              className="pill h-9 w-9 justify-center"
            >
              <ArrowLeft size={15} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate(next.id)}
              aria-label={`Next profile: ${next.name}`}
              className="pill h-9 w-9 justify-center"
            >
              <ArrowRight size={15} strokeWidth={1.5} />
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close profile"
              className="pill ml-1.5 h-9 px-4 text-xs tracking-[0.16em] uppercase"
            >
              Close
              <X size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="grid gap-10 px-5 py-10 md:grid-cols-12 md:gap-14 md:px-9 md:py-14">
          {/* Portrait */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduced ? 0.2 : 1, ease: EASE }}
              className="relative aspect-4/5 overflow-hidden rounded-xl border border-line-soft bg-raised md:sticky md:top-28"
            >
              <img
                src={member.portrait}
                alt={member.name}
                width={900}
                height={1125}
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base/40 via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* Details */}
          <div className="md:col-span-7">
            <p
              className="font-mono text-xs font-medium tracking-[0.2em] uppercase"
              style={{ color: member.accent }}
            >
              {member.role}
            </p>

            <h2
              id="profile-name"
              className="display mt-5 text-[clamp(2.5rem,5.5vw,4rem)] text-bright"
            >
              {member.name}
            </h2>

            <p className="mt-6 max-w-xl text-pretty text-xl leading-relaxed text-body">
              {member.tagline}
            </p>

            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-mute">
              {member.summary}
            </p>

            {/* Links */}
            <div className="mt-9 flex flex-wrap gap-3">
              {member.links.github ? (
                <a
                  href={member.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={linkClass}
                >
                  <GithubMark size={15} /> GitHub
                </a>
              ) : null}
              {member.links.linkedin ? (
                <a
                  href={member.links.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={linkClass}
                >
                  <LinkedinMark size={15} /> LinkedIn
                </a>
              ) : null}
              {member.links.email ? (
                <a href={`mailto:${member.links.email}`} className={linkClass}>
                  <Mail size={15} strokeWidth={1.5} /> Email
                </a>
              ) : null}
            </div>

            <div className="mt-14 space-y-12">
              {/* Achievements */}
              <Block label="Achievements">
                <ul>
                  {member.achievements.map((item, i) => (
                    <li
                      key={`${item.event}-${i}`}
                      className="flex gap-5 border-b border-line-soft py-5 last:border-b-0"
                    >
                      <span
                        className="mt-1 font-mono text-xs"
                        style={{ color: member.accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="text-lg text-bright">{item.result}</span>
                          <span className="text-body">{item.event}</span>
                          {item.year ? (
                            <span className="font-mono text-xs text-mute">{item.year}</span>
                          ) : null}
                        </div>
                        {item.note ? (
                          <p className="mt-2 leading-relaxed text-mute">{item.note}</p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </Block>

              {/* Experience */}
              {member.experience?.length ? (
                <Block label="Experience">
                  <div className="space-y-9">
                    {member.experience.map((role) => (
                      <div key={`${role.org}-${role.role}`}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                          <h4 className="text-lg text-bright">{role.role}</h4>
                          <span className="font-mono text-xs tracking-wide text-mute">
                            {role.period}
                          </span>
                        </div>
                        <p className="mt-1.5" style={{ color: member.accent }}>
                          {role.org}
                        </p>
                        <ul className="mt-4 space-y-2.5">
                          {role.points.map((point) => (
                            <li key={point} className="flex gap-3.5 leading-relaxed text-body">
                              <Dash />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Block>
              ) : null}

              {/* Projects */}
              <Block label="Selected projects">
                <div className="space-y-10">
                  {member.projects.map((project) => (
                    <div key={project.name}>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h4 className="text-xl text-bright">{project.name}</h4>
                        {project.subtitle ? (
                          <span className="text-body">{project.subtitle}</span>
                        ) : null}
                      </div>

                      {project.context ? (
                        <p
                          className="mt-1.5 font-mono text-[0.6875rem] tracking-[0.12em] uppercase"
                          style={{ color: member.accent, opacity: 0.8 }}
                        >
                          {project.context}
                        </p>
                      ) : null}

                      <p className="mt-3.5 max-w-xl leading-relaxed text-body">
                        {project.description}
                      </p>

                      {project.metrics?.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.metrics.map((metric) => (
                            <Tag key={metric} accent={member.accent}>
                              {metric}
                            </Tag>
                          ))}
                        </div>
                      ) : null}

                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-4 inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-mute uppercase transition-colors hover:text-bright"
                        >
                          Repository
                          <ArrowUpRight size={13} strokeWidth={1.5} />
                        </a>
                      ) : null}
                    </div>
                  ))}
                </div>
              </Block>

              {/* Skills */}
              <Block label="Skills">
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <Tag key={skill} accent={member.accent}>
                      {skill}
                    </Tag>
                  ))}
                </div>
              </Block>

              {/* Education */}
              <Block label="Education">
                {member.education.map((entry) => (
                  <div
                    key={entry.institution}
                    className="flex flex-wrap justify-between gap-x-6 gap-y-2"
                  >
                    <div>
                      <p className="text-lg text-bright">{entry.qualification}</p>
                      <p className="mt-1.5 text-body">{entry.institution}</p>
                    </div>
                    <div className="text-right font-mono text-xs tracking-wide text-mute">
                      <p>{entry.year}</p>
                      {entry.detail ? (
                        <p className="mt-1.5" style={{ color: member.accent }}>
                          {entry.detail}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </Block>

              {/* Certifications */}
              {member.certifications?.length ? (
                <Block label="Certifications">
                  <ul className="space-y-3">
                    {member.certifications.map((cert) => (
                      <li key={cert} className="flex gap-3.5 leading-relaxed text-body">
                        <Dash />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </Block>
              ) : null}

              {/* Leadership and activities */}
              {member.extracurricular?.length ? (
                <Block label="Leadership & activities">
                  <ul className="space-y-3">
                    {member.extracurricular.map((item) => (
                      <li key={item} className="flex gap-3.5 leading-relaxed text-body">
                        <Dash />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Block>
              ) : null}

              {/* Interests */}
              {member.interests?.length ? (
                <Block label="Interests">
                  <div className="flex flex-wrap gap-2">
                    {member.interests.map((interest) => (
                      <Tag key={interest} accent={member.accent}>
                        {interest}
                      </Tag>
                    ))}
                  </div>
                </Block>
              ) : null}
            </div>

            {/* Next member */}
            <button
              type="button"
              onClick={() => onNavigate(next.id)}
              className="group/next mt-16 flex w-full items-center justify-between gap-6 border-t border-line pt-8 text-left"
              style={{ "--next-accent": next.accent }}
            >
              <span>
                <span className="eyebrow">Next profile</span>
                <span className="display mt-2.5 block text-3xl text-bright transition-colors duration-500 group-hover/next:text-(--next-accent) md:text-4xl">
                  {next.name}
                </span>
              </span>
              <ArrowRight
                size={22}
                strokeWidth={1.25}
                className="flex-none text-mute transition-all duration-500 group-hover/next:translate-x-2 group-hover/next:text-(--next-accent)"
              />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
