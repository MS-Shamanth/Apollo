import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { keyResultsFor } from "../data/team";
import { Reveal } from "./primitives";

/**
 * One editorial row per member.
 *
 * The right column is stretched to the portrait's full height and split into
 * three bands: identity at the top edge of the image, the substance in the
 * middle, and the profile link at the bottom edge. The middle band carries a
 * couple of results and core skills so the row stands on its own for anyone who
 * never opens the full profile.
 *
 * The whole row is one hit target — an absolutely positioned button sits over
 * the content so headings keep their semantics and the row stays
 * keyboard-reachable.
 */
export default function MemberCard({ member, reversed = false, onSelect }) {
  const rowRef = useRef(null);
  const reduced = useReducedMotion();
  const results = keyResultsFor(member).slice(0, 3);

  // Portrait drifts slightly slower than the page as the row passes through.
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [26, -26]);

  // Pointer-tracked glow, so the row feels responsive under the cursor.
  const glowX = useSpring(useMotionValue(50), { stiffness: 140, damping: 24 });
  const glowY = useSpring(useMotionValue(50), { stiffness: 140, damping: 24 });

  const onPointerMove = (event) => {
    if (reduced) return;
    const box = event.currentTarget.getBoundingClientRect();
    glowX.set(((event.clientX - box.left) / box.width) * 100);
    glowY.set(((event.clientY - box.top) / box.height) * 100);
  };

  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(680px circle at ${x}% ${y}%, ${member.accent}14, transparent 68%)`,
  );

  return (
    <Reveal amount={0.2} y={40} style={{ "--accent": member.accent }}>
      <article
        ref={rowRef}
        onPointerMove={onPointerMove}
        className="group relative grid items-stretch gap-9 border-t border-line py-14 md:grid-cols-12 md:gap-12 md:py-20"
      >
        <motion.div
          aria-hidden="true"
          style={{ background: glowBackground }}
          className="pointer-events-none absolute -inset-x-6 inset-y-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />

        {/* Portrait */}
        <div
          className={
            reversed
              ? "relative md:col-span-5 md:col-start-8"
              : "relative md:col-span-5 md:col-start-1"
          }
        >
          <motion.div style={{ y: parallax }} className="h-full">
            <div className="relative h-full min-h-full overflow-hidden rounded-xl border border-line-soft bg-raised transition-colors duration-700 group-hover:border-(--accent)">
              <div className="aspect-4/5 w-full max-w-sm md:h-full md:max-w-none">
                <img
                  src={member.portrait}
                  alt={member.name}
                  width={900}
                  height={1125}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top saturate-[0.55] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:saturate-110"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-base/60 via-transparent to-transparent transition-opacity duration-700 group-hover:opacity-30" />

              {/* Accent sweep across the portrait on hover. */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                style={{ background: member.accent }}
              />

              <span
                className="absolute top-5 left-5 font-mono text-xs font-medium tracking-[0.2em]"
                style={{ color: member.accent }}
              >
                {member.index}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Information — stretched to the portrait, split top / middle / bottom */}
        <div
          className={
            reversed
              ? "flex flex-col justify-between md:col-span-6 md:col-start-1 md:row-start-1"
              : "flex flex-col justify-between md:col-span-6 md:col-start-7"
          }
        >
          {/* Top: aligned with the top edge of the portrait */}
          <div>
            <p
              className="font-mono text-xs font-medium tracking-[0.2em] uppercase"
              style={{ color: member.accent }}
            >
              {member.role}
            </p>

            <h3 className="display mt-4 text-[clamp(2.4rem,5.4vw,4.4rem)] text-bright transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
              {member.name}
            </h3>

            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-body">{member.tagline}</p>
          </div>

          {/* Middle: the substance, for anyone who never opens the profile */}
          <div className="mt-9 space-y-7 md:mt-0">
            <div>
              <p className="eyebrow mb-3.5">Selected results</p>
              <ul className="space-y-2">
                {results.map((item) => (
                  <li
                    key={`${item.event}-${item.result}`}
                    className="flex items-baseline gap-3 text-sm leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 flex-none rounded-full"
                      style={{ background: member.accent }}
                    />
                    <span className="min-w-0">
                      <span className="text-bright">{item.result}</span>
                      <span className="text-mute"> — {item.event}</span>
                      {item.year ? (
                        <span className="ml-2 font-mono text-xs text-mute">{item.year}</span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-3.5">Core skills</p>
              {/* Sits above the row-wide button so each chip can respond to
                  hover. The button below remains the accessible path. */}
              <div
                className="relative z-10 flex flex-wrap gap-2.5"
                onClick={() => onSelect(member.id)}
                role="presentation"
              >
                {member.focus.map((item) => (
                  <span
                    key={item}
                    className="pill px-3.5 py-1.5 text-xs group-hover:border-(--accent)"
                    style={{ "--pill-accent": member.accent }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom: aligned with the bottom edge of the portrait */}
          <div className="mt-9 flex items-center gap-3 md:mt-0">
            <span
              className="h-0.5 w-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-14"
              style={{ background: member.accent }}
            />
            <span className="flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-mute uppercase transition-colors duration-500 group-hover:text-bright">
              View profile
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelect(member.id)}
          className="absolute inset-0 rounded-xl focus:outline-none focus-visible:ring-1 focus-visible:ring-(--accent)"
        >
          <span className="sr-only">
            Open full profile for {member.name}, {member.role}
          </span>
        </button>
      </article>
    </Reveal>
  );
}
