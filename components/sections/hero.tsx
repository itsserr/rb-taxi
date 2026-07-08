"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

const TaxiSignScene = dynamic(
  () => import("@/components/three/taxi-sign-scene").then((m) => m.TaxiSignScene),
  { ssr: false }
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      scrollProgress.current = progress;

      if (textRef.current) {
        const fade = 1 - Math.min(progress / 0.55, 1);
        textRef.current.style.opacity = String(fade);
        textRef.current.style.transform = `translateY(${-progress * 34}px)`;
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] w-full flex-col overflow-hidden bg-background"
    >
      <div className="absolute inset-0">
        <TaxiSignScene rotationTarget={scrollProgress} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(6,8,16,0.5)_100%)]" />

      <div
        ref={textRef}
        className="container-luxe relative z-10 flex flex-1 flex-col items-center justify-start pt-24 text-center sm:pt-28"
      >
        <p className="eyebrow animate-fade-up opacity-0 [animation-delay:0.1s]">
          Taxivervoer op maat
        </p>

        <h1 className="mt-7 animate-fade-up font-display text-7xl italic leading-[0.95] tracking-tight text-foreground opacity-0 [animation-delay:0.28s] sm:text-8xl lg:text-9xl">
          RB Taxi
        </h1>

        <span className="mt-8 h-px w-16 origin-center animate-fade-up bg-gradient-to-r from-transparent via-navy-light to-transparent opacity-0 [animation-delay:0.42s]" />

        <p className="mt-8 max-w-lg animate-fade-up text-balance text-base leading-relaxed text-muted opacity-0 [animation-delay:0.52s] sm:text-lg">
          Luxe en betrouwbaar taxivervoer, 24/7 beschikbaar op afspraak.
        </p>

        <div className="mt-12 flex animate-fade-up flex-col items-center gap-4 opacity-0 [animation-delay:0.68s] sm:flex-row">
          <Link href="/reserveren" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="group relative h-16 w-full overflow-hidden px-12 text-base tracking-wide sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Reserveer een rit
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="pointer-events-none absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </Button>
          </Link>
          <a href={SITE.phoneHref} className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="h-16 w-full px-10 text-base tracking-wide sm:w-auto"
            >
              <Phone className="h-4 w-4" />
              Bel direct
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
