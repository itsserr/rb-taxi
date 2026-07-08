import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met RB Taxi via telefoon, WhatsApp of e-mail. Wij staan klaar om uw rit te bevestigen.",
};

const DETAILS = [
  {
    icon: Phone,
    label: "Telefoon",
    value: SITE.phone,
    href: SITE.phoneHref,
  },
  {
    icon: Mail,
    label: "E-mail",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: MapPin,
    label: "Adres",
    value: SITE.address,
    href: undefined,
  },
  {
    icon: Clock,
    label: "Bereikbaarheid",
    value: "Dagelijks van 06:00 tot 00:00",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <section className="section-y-first">
      <div className="container-luxe grid gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="font-display text-4xl italic text-foreground sm:text-5xl">
            We staan voor u klaar
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            Voor een rit binnen 24 uur belt of appt u ons het snelst — dan
            regelen we het direct telefonisch. Plant u verder vooruit, gebruik
            dan gerust ons reserveringsformulier.
          </p>

          <ul className="mt-10 space-y-6">
            {DETAILS.map((detail) => (
              <li key={detail.label} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-surface">
                  <detail.icon className="h-4 w-4 text-navy-light" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest2 text-muted-2">
                    {detail.label}
                  </p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="mt-1 block text-base text-foreground transition-colors hover:text-navy-light"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-base text-foreground">
                      {detail.value}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <Link href="/reserveren">
            <Button size="lg" className="mt-12">
              Ga naar reserveren
            </Button>
          </Link>
        </div>

        <div className="overflow-hidden rounded-sm border border-white/10">
          <iframe
            title="Kaart RB Taxi"
            src="https://www.google.com/maps?q=Herengracht%20182%20Amsterdam&output=embed"
            className="h-full min-h-[420px] w-full grayscale invert-[0.92] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
