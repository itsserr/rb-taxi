import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Clock, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RouteLine } from "@/components/ui/route-line";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Het verhaal achter RB Taxi: persoonlijk taxivervoer, gebouwd op betrouwbaarheid, vakmanschap en aandacht voor de reiziger.",
};

const VALUES = [
  {
    icon: Clock,
    title: "Stiptheid",
    description:
      "We plannen ruim vooraf, zodat u nooit hoeft te wachten en nooit te laat komt.",
  },
  {
    icon: ShieldCheck,
    title: "Betrouwbaarheid",
    description:
      "Vaste chauffeurs, goed onderhouden auto's en heldere afspraken, elke rit opnieuw.",
  },
  {
    icon: Handshake,
    title: "Persoonlijk contact",
    description:
      "Elke reservering wordt telefonisch bevestigd. Geen geautomatiseerde afhandeling.",
  },
];

export default function OverOnsPage() {
  return (
    <>
      <section className="section-y-first">
        <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow mb-4">Over ons</p>
            <h1 className="font-display text-4xl italic text-foreground sm:text-5xl">
              Gebouwd op vertrouwen, rit na rit
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted">
              RB Taxi is opgericht vanuit een eenvoudige overtuiging: een
              taxirit moet zorgeloos zijn, van de eerste bevestiging tot de
              laatste stap uit de auto. Wat begon als een kleine, lokale
              onderneming is uitgegroeid tot een vaste naam voor reizigers en
              bedrijven die waarde hechten aan stiptheid en discretie.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Onze chauffeurs kennen de regio als hun broekzak en behandelen
              elke rit met dezelfde zorgvuldigheid, of het nu gaat om een
              vroege vlucht naar Schiphol of een avond uit uw eigen buurt.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/reserveren" className="w-full sm:w-auto">
                <Button className="w-full">Boek Nu</Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full">
                  Neem contact op
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1600&auto=format&fit=crop"
              alt="Chauffeur bij een geparkeerde luxe auto"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="section-y border-t border-white/5 bg-surface">
        <div className="container-luxe">
          <div className="mb-16 max-w-xl">
            <p className="eyebrow mb-4">Waar wij voor staan</p>
            <h2 className="font-display text-3xl italic text-foreground sm:text-4xl">
              Drie principes, iedere rit
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title}>
                <value.icon className="h-6 w-6 text-navy-light" />
                <h3 className="mt-5 font-display text-lg text-foreground">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-luxe flex flex-col items-center text-center">
          <RouteLine className="w-32 text-white/20" />
          <p className="mt-8 max-w-lg font-display text-2xl italic text-foreground">
            &ldquo;Elke rit begint met een adres en eindigt met een
            belofte.&rdquo;
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
