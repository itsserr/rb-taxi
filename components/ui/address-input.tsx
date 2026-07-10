"use client";

import * as React from "react";
import { Input, type InputProps } from "@/components/ui/input";

type Suggestion = { display_name: string };

type AddressInputProps = Omit<InputProps, "value" | "onChange"> & {
  value: string;
  onChange: (value: string) => void;
};

/**
 * Tekstinvoer met adres-suggesties via OpenStreetMap Nominatim (gratis,
 * geen API-key nodig). Respecteert Nominatim's fair-use beleid: request
 * pas na 450ms stilstand, vorige aanvraag wordt geannuleerd.
 */
export function AddressInput({ value, onChange, className, ...props }: AddressInputProps) {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const [open, setOpen] = React.useState(false);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const abortRef = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, []);

  function handleChange(next: string) {
    onChange(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (next.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(() => search(next), 450);
  }

  async function search(query: string) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=0&limit=5&countrycodes=nl&q=${encodeURIComponent(query)}`;
      const res = await fetch(url, { signal: controller.signal });
      const data: Suggestion[] = await res.json();
      setSuggestions(data);
      setOpen(data.length > 0);
    } catch (err) {
      if ((err as Error).name !== "AbortError") setSuggestions([]);
    }
  }

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        autoComplete="off"
        className={className}
        {...props}
      />

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-sm border border-white/10 bg-surface-2 shadow-premium">
            <ul>
              {suggestions.map((s, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(s.display_name);
                      setOpen(false);
                      setSuggestions([]);
                    }}
                    className="block w-full px-4 py-3 text-left text-sm leading-snug text-foreground transition-colors hover:bg-white/5"
                  >
                    {s.display_name}
                  </button>
                </li>
              ))}
            </ul>
            <p className="border-t border-white/5 px-4 py-2 text-[10px] text-muted-2">
              Adressen via OpenStreetMap
            </p>
          </div>
        </>
      )}
    </div>
  );
}
