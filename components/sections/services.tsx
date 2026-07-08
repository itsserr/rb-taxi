import { Plane, Briefcase, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const ICONS = [Plane, Briefcase, Sparkles];

export function Services() {
  return (
    <section className="section-y">
      <div className="container-luxe">
        <div className="mb-16 max-w-xl sm:mb-20">
          <p className="eyebrow mb-4">Diensten</p>
          <h2 className="font-display text-3xl italic text-foreground sm:text-4xl">
            Voor elk moment dat aandacht verdient
          </h2>
        </div>

        <div className="grid gap-14 sm:grid-cols-3 sm:gap-10 lg:gap-16">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i];
            return (
              <div key={service.title} className="group">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-navy-light/25 bg-navy-dim/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-navy-light/60 group-hover:bg-navy-dim/50 group-hover:shadow-navy-glow">
                  <Icon className="h-6 w-6 text-navy-light" />
                </div>
                <h3 className="mt-6 font-display text-xl text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
