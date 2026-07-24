export const FEATURES_STATS = [
  { value: "10,000+", label: "Campaigns Launched" },
  { value: "3.2x", label: "Avg Reply Rate Lift" },
  { value: "92%", label: "Inbox Delivery Rate" },
  { value: "<10 min", label: "Time to First Reply" },
];

export function FeaturesStatsBar() {
  return (
    <section className="py-12 lg:py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
          {FEATURES_STATS.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-primary-foreground/80 mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
