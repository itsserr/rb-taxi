import Link from "next/link";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-surface section-y">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,91,219,0.12),transparent_60%)]" />

      <div className="container-luxe relative flex flex-col items-center text-center">
        <p className="eyebrow">Reserveren</p>

        <h2 className="mt-4 max-w-2xl font-display text-3xl italic text-foreground sm:text-4xl">
          Vertel ons waar u heen moet. Wij regelen de rest.
        </h2>

        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
          Reserveer minimaal 24 uur van tevoren en ontvang telefonische
          bevestiging. Spoed binnen 24 uur? Bel of WhatsApp ons direct.
        </p>

        <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <Link href="/reserveren" className="w-full sm:w-auto">
            <Button size="lg" className="group w-full">
              Reserveer een rit
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
          <a href={SITE.phoneHref} className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full">
              <Phone className="h-4 w-4" />
              Bel Ons
            </Button>
          </a>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full border-[#25D366]/40 text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Nu
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
