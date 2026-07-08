import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RouteLine } from "@/components/ui/route-line";
import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-background">
      <Image
        src="https://images.unsplash.com/photo-1764605206511-7a649d9df63b?q=80&w=2400&auto=format&fit=crop"
        alt="Zwarte Mercedes-Benz S-Klasse, geparkeerd bij nacht in een stedelijke straat"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(10,11,13,0.65)_100%)]" />

      <div className="container-luxe relative z-10 pb-24 pt-40 sm:pb-36 sm:pt-48">
        <p className="eyebrow mb-6 animate-fade-up opacity-0 [animation-delay:0.1s]">
          Taxivervoer op maat
        </p>

        <h1 className="max-w-4xl animate-fade-up font-display text-6xl font-medium leading-[0.98] tracking-tight text-foreground opacity-0 [animation-delay:0.25s] sm:text-7xl lg:text-8xl">
          Van vertrek tot bestemming, zonder compromis.
        </h1>

        <p className="mt-8 max-w-xl animate-fade-up text-lg leading-relaxed text-muted opacity-0 [animation-delay:0.4s]">
          RB Taxi verzorgt persoonlijk vervoer voor wie stiptheid, rust en
          stijl belangrijk vindt. Eén telefoontje, en de rest is geregeld.
        </p>

        <div className="mt-10 flex animate-fade-up flex-col gap-4 opacity-0 [animation-delay:0.55s] sm:flex-row sm:items-center">
          <Link href="/reserveren">
            <Button size="lg" className="w-full sm:w-auto">
              Boek nu
            </Button>
          </Link>
          <a
            href={SITE.phoneHref}
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-white/15 px-9 py-4 text-sm text-foreground transition-colors hover:border-white/30 sm:w-auto"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
        </div>

        <div className="mt-16 hidden animate-fade-up items-center gap-4 opacity-0 [animation-delay:0.7s] sm:flex">
          <span className="text-xs uppercase tracking-widest2 text-muted-2">
            Ophaaladres
          </span>
          <RouteLine className="w-24 text-white/20" />
          <span className="text-xs uppercase tracking-widest2 text-muted-2">
            Bestemming
          </span>
        </div>
      </div>
    </section>
  );
}
