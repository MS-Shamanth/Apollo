import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useState } from "react";

import { members, siteConfig } from "../data/team";
import { useMediaQuery } from "../hooks/useSiteHooks";
import { EASE } from "./primitives";

/** Drifting colour fields tinted with the five member hues. */
function Atmosphere() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #21212a 1px, transparent 1px), linear-gradient(to bottom, #21212a 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(ellipse 72% 58% at 50% 34%, #000 18%, transparent 76%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 72% 58% at 50% 34%, #000 18%, transparent 76%)",
        }}
      />

      <motion.div
        className="absolute -top-52 -left-24 h-[42rem] w-[42rem] rounded-full blur-[150px]"
        style={{ background: "radial-gradient(circle, rgba(233,180,76,0.20), transparent 68%)" }}
        animate={reduced ? undefined : { x: [0, 90, 0], y: [0, 50, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[18%] left-[38%] h-[36rem] w-[36rem] rounded-full blur-[150px]"
        style={{ background: "radial-gradient(circle, rgba(107,168,229,0.16), transparent 70%)" }}
        animate={reduced ? undefined : { x: [0, -70, 0], y: [0, 60, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 -bottom-40 h-[40rem] w-[40rem] rounded-full blur-[150px]"
        style={{ background: "radial-gradient(circle, rgba(200,139,224,0.16), transparent 70%)" }}
        animate={reduced ? undefined : { x: [0, -60, 0], y: [0, -45, 0] }}
        transition={{ duration: 31, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-base" />
    </div>
  );
}

/** The five portraits as one band. Hovering gives a panel more of the row. */
function PortraitBand({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="mt-16 md:mt-20">
      <div
        className="flex gap-2 overflow-x-auto pb-2 md:overflow-visible md:pb-0"
        onMouseLeave={() => setHovered(null)}
      >
        {members.map((member, i) => {
          const isHovered = hovered === member.id;
          const isDimmed = hovered !== null && !isHovered;

          return (
            <motion.button
              key={member.id}
              type="button"
              onClick={() => onSelect(member.id)}
              onMouseEnter={() => setHovered(member.id)}
              onFocus={() => setHovered(member.id)}
              onBlur={() => setHovered(null)}
              aria-label={`View profile: ${member.name}, ${member.role}`}
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.55 + i * 0.09, ease: EASE }}
              style={{
                "--accent": member.accent,
                flexGrow: isDesktop ? (isHovered ? 1.9 : 1) : undefined,
              }}
              className="group relative h-64 w-40 flex-none overflow-hidden rounded-lg border border-line-soft transition-[flex-grow,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-(--accent) focus:outline-none focus-visible:border-(--accent) md:h-[24rem] md:w-auto md:flex-1"
            >
              <img
                src={member.portrait}
                alt={member.name}
                width={900}
                height={1125}
                loading={i < 3 ? "eager" : "lazy"}
                decoding="async"
                className={[
                  "absolute inset-0 h-full w-full object-cover object-top transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isHovered ? "scale-[1.04] saturate-110" : "saturate-[0.55]",
                  isDimmed ? "opacity-35" : "opacity-100",
                ].join(" ")}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-base via-base/30 to-transparent" />
              <div
                className="absolute inset-x-0 bottom-0 h-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: member.accent }}
              />

              <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                <span
                  className="block font-mono text-xs font-medium tracking-[0.2em]"
                  style={{ color: member.accent }}
                >
                  {member.index}
                </span>
                <span className="mt-1.5 block truncate text-lg font-medium tracking-tight text-bright md:text-xl">
                  {member.firstName}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default function Hero({ onSelect }) {
  return (
    <section
      id="top"
      className="grain relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pt-32 pb-20 md:px-10 md:pt-40"
    >
      <Atmosphere />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-10 bg-accent" />
          <span className="eyebrow">Meet the team</span>
        </motion.div>

        <h1 className="display mt-8 text-[clamp(3.4rem,12vw,10rem)]">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-bright"
              initial={{ y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.25, delay: 0.1, ease: EASE }}
            >
              Five minds.
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="spectrum block italic"
              initial={{ y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.25, delay: 0.22, ease: EASE }}
            >
              One vision.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.42, ease: EASE }}
          className="mt-10 max-w-2xl text-pretty text-xl leading-relaxed text-body md:text-[1.4rem]"
        >
          A multidisciplinary team building across machine learning, retrieval systems,
          backend infrastructure and product.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-6 font-mono text-xs tracking-[0.2em] text-mute uppercase"
        >
          {siteConfig.location} · Graduating 2027
        </motion.p>

        <PortraitBand onSelect={onSelect} />
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="relative mx-auto mt-16 hidden items-center gap-2.5 font-mono text-xs tracking-[0.2em] text-mute uppercase transition-colors hover:text-bright md:inline-flex"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} strokeWidth={1.5} />
        </motion.span>
      </motion.a>
    </section>
  );
}
