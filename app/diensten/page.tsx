import type { Metadata } from "next";
import Link from "next/link";
import { Plane, Briefcase, User, Moon, Route, CalendarClock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/sections/cta-section";
import { SERVICES } from "@/lib/constants";

const ICONS = [Plane, Briefcase, User, Moon, Route, CalendarClock];

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Luchthavenvervoer, zakelijk en particulier vervoer, nachtelijke ritten, lange afstanden en vervoer op afspraak — alle diensten van Noorder Taxi op een rij.",
};

export default function DienstenPage() {
  return (
    <>
      <section className="section-y-first">
        <div className="container-luxe max-w-2xl">
          <p className="eyebrow mb-4">Diensten</p>
          <h1 className="font-display text-4xl italic text-foreground sm:text-5xl">
            Vervoer voor elk moment
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Van een vroege luchthaventransfer tot een zakelijke afspraak of een
            late rit naar huis: Noorder Taxi is 24 uur per dag op afspraak
            beschikbaar, met dezelfde stiptheid en zorg bij elke rit.
          </p>
        </div>
      </section>

      <section className="section-y border-t border-white/5 pt-0 sm:pt-0">
        <div className="container-luxe">
          <div className="grid gap-px overflow-hidden rounded-sm border border-white/8 bg-white/8 sm:grid-cols-2">
            {SERVICES.map((service, i) => {
              const Icon = ICONS[i];
              return (
                <div
                  key={service.slug}
                  id={service.slug}
                  className="bg-background p-8 sm:p-10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-light/25 bg-navy-dim/30">
                    <Icon className="h-5 w-5 text-navy-light" />
                  </div>
                  <h2 className="mt-5 font-display text-xl text-foreground">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {service.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Staat uw situatie er niet precies bij? Neem contact op — wij
              denken graag mee over de beste oplossing voor uw rit.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/reserveren">
                <Button size="lg">
                  Reserveer een rit
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Neem contact op
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
