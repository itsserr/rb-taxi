import { HOW_IT_WORKS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section className="section-y border-t border-white/5 bg-surface">
      <div className="container-luxe">
        <div className="mb-16 max-w-xl sm:mb-20">
          <p className="eyebrow mb-4">Hoe werkt het</p>
          <h2 className="font-display text-3xl italic text-foreground sm:text-4xl">
            In vijf stappen onderweg
          </h2>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.title} className="relative pl-14 lg:pl-0">
              <span className="absolute left-0 top-0 font-display text-4xl italic text-navy-light/40 lg:static lg:block lg:mb-5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
