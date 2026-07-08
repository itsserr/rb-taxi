"use client";

import { useMemo, useState } from "react";
import { Phone, MessageCircle, CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RouteLine } from "@/components/ui/route-line";
import { SITE } from "@/lib/constants";

type FormState = {
  voornaam: string;
  achternaam: string;
  telefoon: string;
  ophaaladres: string;
  bestemming: string;
  datum: string;
  tijd: string;
  personen: string;
  opmerkingen: string;
};

const INITIAL_STATE: FormState = {
  voornaam: "",
  achternaam: "",
  telefoon: "",
  ophaaladres: "",
  bestemming: "",
  datum: "",
  tijd: "",
  personen: "1",
  opmerkingen: "",
};

function getMinDate() {
  const min = new Date();
  min.setDate(min.getDate() + 1);
  return min.toISOString().split("T")[0];
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

    if (!form.voornaam.trim()) next.voornaam = "Vul uw voornaam in.";
    if (!form.achternaam.trim()) next.achternaam = "Vul uw achternaam in.";
    if (!/^[0-9+\s()-]{8,}$/.test(form.telefoon.trim()))
      next.telefoon = "Vul een geldig telefoonnummer in.";
    if (!form.ophaaladres.trim()) next.ophaaladres = "Vul een ophaaladres in.";
    if (!form.bestemming.trim()) next.bestemming = "Vul een bestemming in.";
    if (!form.datum) {
      next.datum = "Kies een datum.";
    } else if (form.datum < minDate) {
      next.datum = "Reserveringen graag minimaal 24 uur van tevoren.";
    }
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
          Bedankt, {form.voornaam}. Wij nemen binnen enkele uren telefonisch
          contact met u op via {form.telefoon} om uw rit op {form.datum} om{" "}
          {form.tijd} te bevestigen.
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
          <Label htmlFor="voornaam">Voornaam</Label>
          <Input
            id="voornaam"
            value={form.voornaam}
            onChange={(e) => update("voornaam", e.target.value)}
            placeholder="Bijv. Jan"
            aria-invalid={!!errors.voornaam}
          />
          {errors.voornaam && (
            <p className="mt-2 text-xs text-red-400">{errors.voornaam}</p>
          )}
        </div>

        <div>
          <Label htmlFor="achternaam">Achternaam</Label>
          <Input
            id="achternaam"
            value={form.achternaam}
            onChange={(e) => update("achternaam", e.target.value)}
            placeholder="Bijv. de Vries"
            aria-invalid={!!errors.achternaam}
          />
          {errors.achternaam && (
            <p className="mt-2 text-xs text-red-400">{errors.achternaam}</p>
          )}
        </div>
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

      <div>
        <div className="grid gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-start">
          <div>
            <Label htmlFor="ophaaladres">Ophaaladres</Label>
            <Input
              id="ophaaladres"
              value={form.ophaaladres}
              onChange={(e) => update("ophaaladres", e.target.value)}
              placeholder="Straat, huisnummer, plaats"
              aria-invalid={!!errors.ophaaladres}
            />
            {errors.ophaaladres && (
              <p className="mt-2 text-xs text-red-400">
                {errors.ophaaladres}
              </p>
            )}
          </div>

          <div className="hidden justify-center pt-9 sm:flex">
            <RouteLine vertical className="h-12 w-6 rotate-90 text-white/20" />
          </div>

          <div>
            <Label htmlFor="bestemming">Bestemming</Label>
            <Input
              id="bestemming"
              value={form.bestemming}
              onChange={(e) => update("bestemming", e.target.value)}
              placeholder="Straat, huisnummer, plaats"
              aria-invalid={!!errors.bestemming}
            />
            {errors.bestemming && (
              <p className="mt-2 text-xs text-red-400">{errors.bestemming}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <Label htmlFor="datum">Datum</Label>
          <Input
            id="datum"
            type="date"
            min={minDate}
            value={form.datum}
            onChange={(e) => update("datum", e.target.value)}
            aria-invalid={!!errors.datum}
          />
          {errors.datum && (
            <p className="mt-2 text-xs text-red-400">{errors.datum}</p>
          )}
        </div>

        <div>
          <Label htmlFor="tijd">Tijdstip</Label>
          <Input
            id="tijd"
            type="time"
            value={form.tijd}
            onChange={(e) => update("tijd", e.target.value)}
            aria-invalid={!!errors.tijd}
          />
          {errors.tijd && (
            <p className="mt-2 text-xs text-red-400">{errors.tijd}</p>
          )}
        </div>

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
      </div>

      <div>
        <Label htmlFor="opmerkingen">Opmerkingen (optioneel)</Label>
        <Textarea
          id="opmerkingen"
          value={form.opmerkingen}
          onChange={(e) => update("opmerkingen", e.target.value)}
          placeholder="Bijv. extra bagage, kinderzitje, rolstoeltoegankelijkheid..."
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-2">
          Liever direct bellen? {SITE.phone}
        </p>
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Reservering Aanvragen
        </Button>
      </div>
    </form>
  );
}
