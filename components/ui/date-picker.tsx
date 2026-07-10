"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { nl } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

export function DatePicker({
  value,
  onChange,
  minDate,
  placeholder = "Kies een datum",
  invalid,
}: {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  minDate: Date;
  placeholder?: string;
  invalid?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-invalid={invalid}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-sm border border-white/15 bg-surface px-4 text-left text-sm text-foreground transition-colors duration-200",
          "focus-visible:outline-none focus-visible:border-navy-light",
          invalid && "border-red-400/60"
        )}
      >
        <span className={value ? "text-foreground" : "text-muted-2"}>
          {value ? format(value, "EEEE d MMMM yyyy", { locale: nl }) : placeholder}
        </span>
        <CalendarDays className="h-4 w-4 shrink-0 text-muted-2" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-full z-50 mt-2 rounded-sm border border-white/10 bg-surface-2 p-4 shadow-premium">
            <DayPicker
              mode="single"
              locale={nl}
              selected={value}
              onSelect={(date) => {
                onChange(date);
                setOpen(false);
              }}
              disabled={{ before: minDate }}
              defaultMonth={value ?? minDate}
              showOutsideDays
              className="rdp-noorder-taxi"
            />
          </div>
        </>
      )}
    </div>
  );
}
