"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);

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
      <Image
        src="/noorder-taxi-vito.png"
        alt="Mercedes-Benz Vito van Noorder Taxi met daklicht, geparkeerd in een Nederlandse straat"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center] sm:object-center"
      />

      {/* Legibility scrim: base tint, then a bottom-weighted gradient behind the copy. */}
      <div className="pointer-events-none absolute inset-0 bg-background/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/80 via-background/20 to-background/85" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,8,16,0.55)_100%)]" />

      <div
        ref={textRef}
        className="container-luxe relative z-10 flex flex-1 flex-col items-center justify-center text-center"
      >
        <p className="eyebrow animate-fade-up opacity-0 [animation-delay:0.1s]">
          Taxivervoer op maat
        </p>

        <h1 className="mt-7 animate-fade-up font-display text-6xl italic leading-[0.95] tracking-tight text-foreground [text-shadow:0_2px_24px_rgba(0,0,0,0.65)] opacity-0 [animation-delay:0.28s] sm:text-8xl lg:text-9xl">
          Noorder Taxi
        </h1>

        <span className="mt-8 h-px w-16 origin-center animate-fade-up bg-gradient-to-r from-transparent via-navy-light to-transparent opacity-0 [animation-delay:0.42s]" />

        <p className="mt-8 max-w-lg animate-fade-up text-balance text-base leading-relaxed text-foreground/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.7)] opacity-0 [animation-delay:0.52s] sm:text-lg">
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
              className="h-16 w-full bg-background/40 px-10 text-base tracking-wide backdrop-blur-sm sm:w-auto"
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
