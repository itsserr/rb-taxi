import { Clock, Car, CalendarClock, ShieldCheck } from "lucide-react";
import { WHY_US } from "@/lib/constants";

const ICONS = [Clock, Car, CalendarClock, ShieldCheck];

export function WhyUs() {
  return (
    <section className="section-y border-t border-white/5 bg-surface">
      <div className="container-luxe">
        <div className="mb-16 max-w-xl sm:mb-20">
          <p className="eyebrow mb-4">Waarom Noorder Taxi</p>
          <h2 className="font-display text-3xl italic text-foreground sm:text-4xl">
            Waarom kiezen voor Noorder Taxi?
          </h2>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
          {WHY_US.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div key={item.title} className="group">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-navy-light/25 bg-navy-dim/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-navy-light/60 group-hover:bg-navy-dim/50 group-hover:shadow-navy-glow">
                  <Icon className="h-6 w-6 text-navy-light" />
                </div>
                <h3 className="mt-6 font-display text-lg text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
