import { wedding } from "@/config/wedding";
import { Intro } from "@/components/sections/Intro";
import { Hero } from "@/components/sections/Hero";
import { Couple } from "@/components/sections/Couple";
import { Countdown } from "@/components/sections/Countdown";
import { Ceremonies } from "@/components/sections/Ceremonies";
import { Venue } from "@/components/sections/Venue";
import { Gallery } from "@/components/sections/Gallery";
import { Rsvp } from "@/components/sections/Rsvp";
import { Blessings } from "@/components/sections/Blessings";
import { FloatingDock } from "@/components/FloatingDock";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { TapBlessings } from "@/components/motion/TapBlessings";

export default function Invitation() {
  return (
    <>
      <ScrollProgress />
      <TapBlessings />
      <main>
        {/* The intro cover lifts off the pinned hero; then the couple section slides up over it */}
        <div className="relative">
          <Intro />
          <Hero />
          <div id="intro-spacer" aria-hidden className="h-[100svh]" />
          <Couple />
        </div>
        <Countdown />
        <Ceremonies />
        <Venue />
        <Gallery />
        <Rsvp />
        <Blessings />
      </main>
      <FloatingDock
        musicSrc={wedding.music.src}
        musicTitle={wedding.music.title}
      />
      {wedding.isSample && (
        <p className="fixed bottom-4 left-4 z-40 rounded-full border border-gold/40 bg-ivory/90 px-3 py-1.5 text-[11px] text-ink-muted shadow-sm backdrop-blur sm:bottom-6 sm:left-6">
          Sample details · edit <code className="text-maroon">src/config/wedding.ts</code>
        </p>
      )}
    </>
  );
}
