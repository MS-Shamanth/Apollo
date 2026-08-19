import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

import { palette } from "../data/team";

/**
 * Hairline reading indicator across the top of the page, running the five
 * member hues left to right.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[120] h-0.5 origin-left"
      style={{
        scaleX: reduced ? scrollYProgress : scaleX,
        backgroundImage: `linear-gradient(90deg, ${palette.join(", ")})`,
      }}
    />
  );
}
