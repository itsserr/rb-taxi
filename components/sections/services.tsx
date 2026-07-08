import { SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section className="section-y">
      <div className="container-luxe">
        <div className="mb-16 max-w-xl">
          <p className="eyebrow mb-4">Diensten</p>
          <h2 className="font-display text-3xl italic text-foreground sm:text-4xl">
            Voor elk moment dat aandacht verdient
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-3">
          {SERVICES.map((service) => (
            <div key={service.title} className="bg-background p-8 sm:p-10">
              <h3 className="font-display text-xl text-foreground">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
