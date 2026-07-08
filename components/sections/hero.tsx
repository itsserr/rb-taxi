"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

const CarScene = dynamic(
  () => import("@/components/three/car-scene").then((m) => m.CarScene),
  { ssr: false }
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      scrollProgress.current = Math.min(Math.max(-rect.top / rect.height, 0), 1);
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
        <CarScene rotationTarget={scrollProgress} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/5 to-background/55" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,11,13,0.75)_100%)]" />

      <div className="container-luxe relative z-10 flex flex-1 flex-col items-center justify-start pt-28 text-center sm:pt-36">
        <p className="eyebrow animate-fade-up opacity-0 [animation-delay:0.1s]">
          Taxivervoer op maat
        </p>

        <h1 className="mt-6 animate-fade-up font-display text-6xl italic tracking-tight text-foreground opacity-0 [animation-delay:0.25s] sm:text-7xl lg:text-8xl">
          RB Taxi
        </h1>

        <p className="mt-5 max-w-md animate-fade-up text-balance text-base leading-relaxed text-muted opacity-0 [animation-delay:0.4s] sm:text-lg">
          Betrouwbare luxe taxi service
        </p>

        <div className="mt-9 flex animate-fade-up flex-col items-center gap-4 opacity-0 [animation-delay:0.55s] sm:flex-row">
          <Link href="/reserveren">
            <Button size="lg" className="px-12">
              Boek Nu
            </Button>
          </Link>
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
        </div>
      </div>

      <div className="relative z-10 flex animate-fade-up justify-center pb-8 opacity-0 [animation-delay:0.9s] sm:pb-10">
        <div className="flex flex-col items-center gap-2 text-muted-2">
          <span className="text-[10px] uppercase tracking-widest2">Scroll</span>
          <span className="h-8 w-px bg-gradient-to-b from-navy-light to-transparent" />
        </div>
      </div>
    </section>
  );
}
