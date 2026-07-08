import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RouteLine } from "@/components/ui/route-line";
import { SITE } from "@/lib/constants";

export function CtaSection() {
  return (
    <section className="section-y">
      <div className="container-luxe">
        <div className="relative overflow-hidden rounded-sm border border-white/10 bg-gradient-to-br from-navy-dim to-surface px-6 py-16 text-center sm:px-16 sm:py-24">
          <RouteLine className="mx-auto w-32 text-white/25" />
          <h2 className="mx-auto mt-8 max-w-2xl font-display text-3xl italic text-foreground sm:text-4xl">
            Vertel ons waar u heen moet. Wij regelen de rest.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted">
            Reserveer minimaal 24 uur van tevoren en ontvang telefonische
            bevestiging. Spoed binnen 24 uur? Bel of WhatsApp ons direct.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <Link href="/reserveren" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">
                Boek Nu
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
      </div>
    </section>
  );
}
