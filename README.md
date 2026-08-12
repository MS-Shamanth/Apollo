# Team Apollo — team site

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # production build into dist/
npm run preview    # serve the production build
npm run check      # data checks + SSR smoke test + build
```

## Where things live

```
src/
├── data/team.js            ← single source of truth (edit this to update anyone)
├── assets/team/*.webp      ← generated portraits, do not edit by hand
├── assets/brand/*.webp     ← generated logos, do not edit by hand
├── components/
│   ├── Navbar.jsx           floating nav, compacts on scroll, active-section indicator
│   ├── Hero.jsx             headline + interactive five-portrait band
│   ├── TeamIntro.jsx        the collective, strengths
│   ├── TeamGrid.jsx         alternating editorial rows
│   ├── MemberCard.jsx       one row per member
│   ├── MemberProfile.jsx    full-screen profile with prev/next, focus trap, Esc
│   ├── Expertise.jsx        six capability areas
│   ├── Skills.jsx           team coverage + individual specialisations + tech surface
│   ├── Achievements.jsx     headline results, then everything else
│   ├── TeamStats.jsx        animated counters
│   ├── Footer.jsx
│   ├── Cursor.jsx           desktop-only custom cursor
│   ├── icons.jsx            GitHub / LinkedIn marks as inline SVG
│   └── primitives.jsx       Reveal, RevealText, Counter, Tag, SectionLabel
└── hooks/useSiteHooks.js
scripts/
├── build-portraits.py      crop the source photos to 4:5 and emit webp + jpg
├── build-logos.py          key the black out of the source logos, emit webp
├── verify-data.mjs         counts and integrity checks on team.js
├── entry-smoke.jsx         SSR entry used by the smoke test
└── run-smoke.mjs           asserts the rendered HTML contains what it should
```

## Updating content

Edit `src/data/team.js`. Everything else follows from it — the stats band, the
skill coverage bars, the technology list and the achievement sections are all
derived at runtime, so they cannot drift out of sync with the member data.

`siteConfig.teamName` is the team identity, set to `TEAM APOLLO`. Change it in
that one place and the nav and footer follow. The page `<title>` and meta
description in `index.html` carry the name too, so update both if it changes.

## Portraits

Source photos live in `../Team_website/Team_PFP` and are never modified. The
build script crops each to a uniform 4:5 ratio, anchored above centre so heads
are not cut off, and downsizes to at most 900px wide. It never upscales, so
smaller source images stay at their native resolution. Sources are matched by
filename stem, so re-exporting a photo as `.png` instead of `.jpeg` is fine.

```bash
npm run portraits
```

## Logos

`Apollo_Logo-1.jpeg` (emblem plus wordmark) and `Apollo_Logo.jpeg` (emblem alone)
live in `src/assets/team` and are never modified. Both are flattened onto solid
black, which would show as a black rectangle over the translucent navbar pill, so
the script keys the background out to real transparency and writes
`src/assets/brand/apollo-mark.webp` (navbar) and `apollo-logo.webp` (footer).

Only the emblem band of the navbar source is kept: at the ~20px the navbar gives
it, the wordmark underneath would be an illegible smudge beside the real
`TEAM APOLLO` text.

```bash
npm run logos
```

## Accuracy notes

- Roles and one-line descriptors are condensed from each person's own summary,
  projects and experience. There are no invented quotes, titles or employers.
- Achievements are shown exactly as each person listed them, attributed by name.
  Several hackathons were entered together, so the same event appears for more
  than one member.
- The stats band counts distinct competitions once rather than once per member,
  so shared entries do not inflate the totals. Current figures: 5 members,
  13 competitions and programmes, 15 projects, 63 technologies named.
- No MAS, GFTN or Singapore FinTech Festival names or logos appear anywhere on
  the site. Those marks cannot be used without prior written consent, and
  publicity about competition participation is restricted — see `../session-1.md`.

## Accessibility and motion

Semantic sections and headings, a skip link, keyboard-reachable member rows,
a focus-trapped profile dialog with Esc to close, visible focus rings, and alt
text on every image. All motion is disabled by `prefers-reduced-motion`, and the
custom cursor is not rendered on touch devices or when motion is reduced.

## Known tradeoff

The JS bundle is ~121 kB gzipped, most of which is framer-motion. Switching to
`LazyMotion` with the `m` components would cut roughly half of that, at the cost
of reworking every animated component. Left as-is deliberately.
