const STATS = [
  { value: "15+", label: "Jaar ervaring" },
  { value: "24/7", label: "Bereikbaar" },
  { value: "100%", label: "Telefonisch bevestigd" },
  { value: "4,9", label: "Gemiddelde beoordeling" },
];

export function TrustBar() {
  return (
    <section className="border-y border-white/5 bg-surface">
      <div className="container-luxe grid grid-cols-2 gap-8 py-12 sm:grid-cols-4 sm:py-14">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <p className="font-display text-3xl text-foreground">
              {stat.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest2 text-muted-2">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
