import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";

import Achievements from "./components/Achievements";
import Expertise from "./components/Expertise";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import MemberProfile from "./components/MemberProfile";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import TeamGrid from "./components/TeamGrid";
import TeamIntro from "./components/TeamIntro";
import TeamStats from "./components/TeamStats";
import TechMarquee from "./components/TechMarquee";
import { getMember } from "./data/team";

export default function App() {
  const [activeId, setActiveId] = useState(null);
  const activeMember = activeId ? getMember(activeId) : null;

  const open = useCallback((id) => setActiveId(id), []);
  const close = useCallback(() => setActiveId(null), []);

  return (
    <>
      <a
        href="#team"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:rounded-full focus:border focus:border-accent focus:bg-base focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-bright"
      >
        Skip to team
      </a>

      <ScrollProgress />
      <Navbar />

      <main>
        <Hero onSelect={open} />
        <TeamIntro />
        <TeamGrid onSelect={open} />
        <Expertise onSelect={open} />
        <TechMarquee />
        <Achievements onSelect={open} />
        <TeamStats />
      </main>

      <Footer />

      <AnimatePresence mode="wait">
        {activeMember ? (
          <MemberProfile
            key={activeMember.id}
            member={activeMember}
            onClose={close}
            onNavigate={open}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
