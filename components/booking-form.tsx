"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Phone, MessageCircle, CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AddressInput } from "@/components/ui/address-input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { RouteLine } from "@/components/ui/route-line";
import { SITE } from "@/lib/constants";

const TIME_OPTIONS = Array.from({ length: 24 * 4 }, (_, i) => {
  const hours = Math.floor(i / 4);
  const minutes = (i % 4) * 15;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
});

type FormState = {
  naam: string;
  telefoon: string;
  email: string;
  ophaallocatie: string;
  bestemming: string;
  datum: Date | undefined;
  tijd: string;
  personen: string;
  koffers: string;
  opmerkingen: string;
};

const INITIAL_STATE: FormState = {
  naam: "",
  telefoon: "",
  email: "",
  ophaallocatie: "",
  bestemming: "",
  datum: undefined,
  tijd: "",
  personen: "1",
  koffers: "0",
  opmerkingen: "",
};

function getMinDate() {
  const min = new Date();
  min.setHours(0, 0, 0, 0);
  min.setDate(min.getDate() + 1);
  return min;
}

export function BookingForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const minDate = useMemo(getMinDate, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.naam.trim()) next.naam = "Vul uw naam in.";
    if (!/^[0-9+\s()-]{8,}$/.test(form.telefoon.trim()))
      next.telefoon = "Vul een geldig telefoonnummer in.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Vul een geldig e-mailadres in.";
    if (!form.ophaallocatie.trim()) next.ophaallocatie = "Vul een ophaallocatie in.";
    if (!form.bestemming.trim()) next.bestemming = "Vul een bestemming in.";
    if (!form.datum) next.datum = "Kies een datum.";
    if (!form.tijd) next.tijd = "Kies een tijdstip.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-sm border border-white/10 bg-surface px-8 py-16 text-center">
        <CheckCircle2 className="h-10 w-10 text-navy-light" />
        <h3 className="mt-6 font-display text-2xl text-foreground">
          Uw aanvraag is ontvangen
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          Bedankt voor uw aanvraag. Wij nemen zo spoedig mogelijk telefonisch
          contact met u op om uw reservering te bevestigen.
        </p>
        {form.datum && (
          <p className="mt-2 text-xs text-muted-2">
            Gevraagde rit: {format(form.datum, "EEEE d MMMM yyyy", { locale: nl })} om{" "}
            {form.tijd}
          </p>
        )}
        <p className="mt-4 text-xs text-muted-2">
          Vragen over uw aanvraag? Mail ons op{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-navy-light transition-colors hover:text-foreground"
          >
            {SITE.email}
          </a>
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            setForm(INITIAL_STATE);
            setSubmitted(false);
          }}
        >
          Nieuwe reservering plaatsen
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
      <div className="rounded-sm border border-navy-light/30 bg-navy-dim/40 px-5 py-5">
        <p className="text-sm font-medium leading-relaxed text-foreground">
          Reserveringen minimaal 24 uur van tevoren.
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Voor spoed (binnen 24 uur) kunt u direct bellen of WhatsAppen.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a href={SITE.phoneHref} className="w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
            >
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
              type="button"
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

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="naam">Naam</Label>
          <Input
            id="naam"
            value={form.naam}
            onChange={(e) => update("naam", e.target.value)}
            placeholder="Voor- en achternaam"
            aria-invalid={!!errors.naam}
          />
          {errors.naam && <p className="mt-2 text-xs text-red-400">{errors.naam}</p>}
        </div>

        <div>
          <Label htmlFor="telefoon">Telefoonnummer</Label>
          <Input
            id="telefoon"
            type="tel"
            value={form.telefoon}
            onChange={(e) => update("telefoon", e.target.value)}
            placeholder="06 12 34 56 78"
            aria-invalid={!!errors.telefoon}
          />
          {errors.telefoon && (
            <p className="mt-2 text-xs text-red-400">{errors.telefoon}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">E-mailadres</Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="naam@voorbeeld.nl"
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="mt-2 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <div className="grid gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-start">
          <div>
            <Label htmlFor="ophaallocatie">Ophaallocatie</Label>
            <AddressInput
              id="ophaallocatie"
              value={form.ophaallocatie}
              onChange={(value) => update("ophaallocatie", value)}
              placeholder="Straat, huisnummer, plaats"
              aria-invalid={!!errors.ophaallocatie}
            />
            {errors.ophaallocatie && (
              <p className="mt-2 text-xs text-red-400">
                {errors.ophaallocatie}
              </p>
            )}
          </div>

          <div className="hidden justify-center pt-9 sm:flex">
            <RouteLine vertical className="h-12 w-6 rotate-90 text-white/20" />
          </div>

          <div>
            <Label htmlFor="bestemming">Bestemming</Label>
            <AddressInput
              id="bestemming"
              value={form.bestemming}
              onChange={(value) => update("bestemming", value)}
              placeholder="Straat, huisnummer, plaats"
              aria-invalid={!!errors.bestemming}
            />
            {errors.bestemming && (
              <p className="mt-2 text-xs text-red-400">{errors.bestemming}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="datum">Datum</Label>
          <DatePicker
            value={form.datum}
            onChange={(date) => update("datum", date)}
            minDate={minDate}
            invalid={!!errors.datum}
          />
          {errors.datum && (
            <p className="mt-2 text-xs text-red-400">{errors.datum}</p>
          )}
        </div>

        <div>
          <Label htmlFor="tijd">Tijdstip</Label>
          <Select
            id="tijd"
            value={form.tijd}
            onChange={(e) => update("tijd", e.target.value)}
            aria-invalid={!!errors.tijd}
          >
            <option value="" disabled>
              Kies een tijdstip
            </option>
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
          {errors.tijd && (
            <p className="mt-2 text-xs text-red-400">{errors.tijd}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="personen">Aantal personen</Label>
          <Select
            id="personen"
            value={form.personen}
            onChange={(e) => update("personen", e.target.value)}
          >
            {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "persoon" : "personen"}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="koffers">Aantal koffers</Label>
          <Select
            id="koffers"
            value={form.koffers}
            onChange={(e) => update("koffers", e.target.value)}
          >
            {Array.from({ length: 7 }, (_, i) => i).map((n) => (
              <option key={n} value={n}>
                {n === 0 ? "Geen koffers" : `${n} ${n === 1 ? "koffer" : "koffers"}`}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="opmerkingen">Opmerkingen (optioneel)</Label>
        <Textarea
          id="opmerkingen"
          value={form.opmerkingen}
          onChange={(e) => update("opmerkingen", e.target.value)}
          placeholder="Bijv. kinderzitje, rolstoeltoegankelijkheid..."
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-2">
          Liever direct bellen? {SITE.phone} &middot; of mail{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="transition-colors hover:text-foreground"
          >
            {SITE.email}
          </a>
        </p>
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Reservering Aanvragen
        </Button>
      </div>
    </form>
  );
}
