import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import apolloMark from "../assets/brand/apollo-mark.webp";
import { palette, siteConfig } from "../data/team";
import { useActiveSection, useScrolled } from "../hooks/useSiteHooks";
import { EASE } from "./primitives";

// The mark is decorative: the wordmark beside it already says TEAM APOLLO, and
// the link that wraps both carries its own label.
const MARK = { src: apolloMark, alt: "", width: 160, height: 189 };

const SECTIONS = [
  { id: "product", label: "Product" },
  { id: "about", label: "About" },
  { id: "team", label: "Team" },
  { id: "expertise", label: "Expertise" },
  { id: "achievements", label: "Achievements" },
];

const SECTION_IDS = SECTIONS.map((s) => s.id);

export default function Navbar() {
  const scrolled = useScrolled(60);
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.15, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[100]"
      >
        <div
          className={[
            "mx-auto flex items-center justify-between gap-6 transition-all duration-500",
            scrolled
              ? "mt-3 max-w-5xl rounded-full border border-line bg-base/80 px-5 py-3 backdrop-blur-xl md:px-6"
              : "mt-0 max-w-none border-b border-transparent px-6 py-7 md:px-10",
          ].join(" ")}
        >
          {/* The font size lives on the link so the mark can be sized in em and
              stay locked to the wordmark's height. */}
          <a
            href="#top"
            className="group flex items-center gap-2.5 font-mono text-xs font-medium tracking-[0.2em] text-bright"
            aria-label="Back to top"
          >
            <img
              {...MARK}
              aria-hidden="true"
              className="h-[1.6em] w-auto shrink-0 transition-transform duration-500 group-hover:scale-110"
            />
            <span>{siteConfig.teamName}</span>
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
            {SECTIONS.map((section, i) => {
              const isActive = active === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="relative px-4 py-2 font-mono text-xs tracking-[0.16em] uppercase transition-colors duration-300"
                >
                  <span className={isActive ? "text-bright" : "text-mute hover:text-body"}>
                    {section.label}
                  </span>
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full"
                      style={{ background: palette[i % palette.length] }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  ) : null}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#team"
              className="pill hidden px-5 py-2 text-xs tracking-[0.16em] uppercase sm:inline-flex"
            >
              Meet the team
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="pill h-10 w-10 justify-center md:hidden"
              aria-label="Open menu"
            >
              <Menu size={17} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[150] bg-base/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-7">
              <span className="flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] text-bright">
                <img {...MARK} aria-hidden="true" className="h-[1.6em] w-auto shrink-0" />
                {siteConfig.teamName}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="pill h-10 w-10 justify-center"
                aria-label="Close menu"
              >
                <X size={17} strokeWidth={1.5} />
              </button>
            </div>

            <nav aria-label="Sections" className="mt-8 flex flex-col px-6">
              {SECTIONS.map((section, i) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease: EASE }}
                  className="flex items-baseline gap-5 border-b border-line-soft py-6"
                >
                  <span
                    className="font-mono text-xs"
                    style={{ color: palette[i % palette.length] }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-4xl text-bright">{section.label}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
