import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* Shared easing so every transition on the site feels like one system. */
export const EASE = [0.16, 1, 0.3, 1];

/** Scroll-triggered reveal. Collapses to a plain fade when motion is reduced. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  amount = 0.3,
  style,
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: reduced ? 0.2 : 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word reveal for headlines. */
export function RevealText({ text, className = "", delay = 0, stagger = 0.045 }) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Coloured index plus an uppercase section name. */
export function SectionLabel({ index, children, color, className = "" }) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <span
        aria-hidden="true"
        className="h-2 w-2 rounded-full"
        style={{ background: color ?? "var(--color-accent)" }}
      />
      <span className="font-mono text-xs font-medium tracking-[0.2em]" style={{ color }}>
        {index}
      </span>
      <span className="eyebrow">{children}</span>
    </div>
  );
}

/** Counts up to `value` once scrolled into view. */
export function Counter({ value, suffix = "", duration = 1600, className = "", style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduced) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className} style={style}>
      {String(display).padStart(2, "0")}
      {suffix}
    </span>
  );
}

/** Technology chip. Pass an accent to tint the hover fill. */
export function Tag({ children, accent, quiet = false }) {
  return (
    <span
      className={`pill px-3.5 py-1.5 text-xs ${quiet ? "pill-quiet" : ""}`}
      style={{ "--pill-accent": accent ?? "var(--color-accent)" }}
    >
      {children}
    </span>
  );
}
