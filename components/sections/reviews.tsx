import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/constants";

// Placeholder testimonials — zie lib/constants.ts. Vervang met echte
// klantbeoordelingen zodra die beschikbaar zijn.
export function Reviews() {
  return (
    <section className="section-y">
      <div className="container-luxe">
        <div className="mb-16 max-w-xl sm:mb-20">
          <p className="eyebrow mb-4">Ervaringen</p>
          <h2 className="font-display text-3xl italic text-foreground sm:text-4xl">
            Wat klanten over ons zeggen
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="flex flex-col rounded-sm border border-white/8 bg-surface p-8"
            >
              <div className="flex gap-1">
                {Array.from({ length: review.rating }, (_, i) => (
                  <Star key={i} className="h-4 w-4 fill-navy-light text-navy-light" />
                ))}
              </div>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{review.quote}&rdquo;
              </p>
              <p className="mt-6 text-xs uppercase tracking-widest2 text-muted-2">
                {review.name} &middot; {review.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
