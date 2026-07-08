# RB Taxi — website

Premium, minimalistische website voor RB Taxi, gebouwd met Next.js 15 (App
Router), TypeScript en Tailwind CSS.

## Aan de slag

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structuur

- `app/` — pagina's (Home, Reserveren, Over ons, Contact) en globale
  layout/metadata.
- `components/layout/` — header, footer, floating WhatsApp-knop.
- `components/sections/` — herbruikbare secties voor de homepage.
- `components/ui/` — lichte, zelfgeschreven UI-primitieven in shadcn/ui-stijl
  (Button, Input, Select, Textarea, Card, Label).
- `components/booking-form.tsx` — het reserveringsformulier (voornaam,
  achternaam, telefoon, ophaaladres, bestemming, datum, tijd, aantal
  personen, opmerkingen) met validatie en een 24-uurs-minimum op de
  datumkeuze, plus directe Bel/WhatsApp-knoppen voor spoed.
- `lib/constants.ts` — bedrijfsgegevens, navigatie en dienstendata op
  één plek, eenvoudig aan te passen.

## Aanpassen aan uw bedrijf

Open `lib/constants.ts` en pas aan:

- Telefoonnummer, WhatsApp-nummer, e-mail en adres
- KvK- en btw-nummer (footer)
- Vlootgegevens en diensten

Pas het adres in de kaart op de contactpagina aan in
`app/contact/page.tsx` (Google Maps embed-URL).

De afbeeldingen komen momenteel van Unsplash als tijdelijke placeholders.
Vervang de URL's in `lib/constants.ts` en de hero/over-ons-pagina's door
eigen, professionele foto's van uw vloot en chauffeurs voor het beste
resultaat.

## Deployen op Vercel

1. Push deze map naar een GitHub-repository.
2. Importeer het project op [vercel.com/new](https://vercel.com/new).
3. Vercel herkent Next.js automatisch — geen extra configuratie nodig.
4. Klaar. Koppel eventueel een eigen domein via Vercel's dashboard.

## Techniek

- Next.js 15 App Router, React Server Components waar mogelijk
- Tailwind CSS met een eigen donker/navy design-tokensysteem
- `next/font` voor Playfair Display (display) en Inter (body), zelf gehost — geen
  externe font-requests tijdens runtime
- `next/image` met remote patterns voor Unsplash
- Metadata, `sitemap.ts` en `robots.ts` voor SEO
