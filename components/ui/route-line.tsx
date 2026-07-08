import { cn } from "@/lib/utils";

/**
 * Signature visual motif: a route from pickup to destination.
 * Two nodes connected by a dashed line — echoes the "ophaaladres" →
 * "bestemming" logic of every taxi ride, reused across hero, form and footer.
 */
export function RouteLine({
  className,
  vertical = false,
}: {
  className?: string;
  vertical?: boolean;
}) {
  return (
    <svg
      viewBox={vertical ? "0 0 24 160" : "0 0 160 24"}
      className={cn("overflow-visible", className)}
      aria-hidden="true"
    >
      {vertical ? (
        <>
          <circle cx="12" cy="8" r="4" className="fill-navy-light" />
          <line
            x1="12"
            y1="14"
            x2="12"
            y2="146"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 6"
            strokeLinecap="round"
            className="text-white/25"
          />
          <circle cx="12" cy="152" r="4" className="fill-transparent stroke-navy-light" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <circle cx="8" cy="12" r="4" className="fill-navy-light" />
          <line
            x1="14"
            y1="12"
            x2="146"
            y2="12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 6"
            strokeLinecap="round"
            className="text-white/25"
          />
          <circle cx="152" cy="12" r="4" className="fill-transparent stroke-navy-light" strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}
