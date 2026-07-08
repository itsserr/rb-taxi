import type { Metadata } from "next";
import { Phone, MessageCircle } from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Reserveren",
  description:
    "Reserveer eenvoudig uw taxirit bij RB Taxi. Minimaal 24 uur van tevoren, telefonisch bevestigd.",
};

export default function ReserverenPage() {
  return (
    <section className="section-y-first">
      <div className="container-luxe max-w-3xl">
        <p className="eyebrow mb-4">Reserveren</p>
        <h1 className="font-display text-4xl italic text-foreground sm:text-5xl">
          Plan uw rit
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
          Vul onderstaand formulier in voor ritten die u minimaal 24 uur van
          tevoren plant. Wij bevestigen uw rit altijd telefonisch.
        </p>

        <div className="mt-8 flex flex-col gap-4 rounded-sm border border-white/8 bg-surface px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-muted">
            Rit binnen 24 uur nodig? Neem dan direct contact op, dan regelen
            we het telefonisch.
          </p>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <a href={SITE.phoneHref}>
              <Button variant="outline" size="sm" className="w-full">
                <Phone className="h-4 w-4" />
                Bel Ons
              </Button>
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full border-[#25D366]/40 text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Nu
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-14">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
