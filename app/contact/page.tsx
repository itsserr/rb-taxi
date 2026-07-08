import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Noorder Taxi via telefoon, WhatsApp of e-mail. Wij staan klaar om uw rit te bevestigen.",
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
    icon: Clock,
    label: "Bereikbaarheid",
    value: "Dagelijks van 06:00 tot 00:00",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <section className="section-y-first">
      <div className="container-luxe max-w-2xl">
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

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link href="/reserveren">
            <Button size="lg" className="w-full sm:w-auto">
              Ga naar reserveren
            </Button>
          </Link>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full border-[#25D366]/40 text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10 sm:w-auto"
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
