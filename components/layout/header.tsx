"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "bg-background/90 backdrop-blur-md border-b border-white/5"
          : "bg-gradient-to-b from-black/50 to-transparent"
      )}
    >
      <div className="container-luxe flex h-24 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-wide text-foreground">
            RB
          </span>
          <span className="text-xs uppercase tracking-widest2 text-muted">
            Taxi
          </span>
        </Link>

        <nav className="hidden items-center gap-14 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs font-medium uppercase tracking-widest2 text-muted transition-colors hover:text-foreground",
                pathname === link.href && "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
          <Link href="/reserveren">
            <Button size="sm">Boek nu</Button>
          </Link>
        </div>

        <button
          className="text-foreground md:hidden"
          aria-label={open ? "Sluit menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-background md:hidden">
          <nav className="container-luxe flex flex-col gap-2 py-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-sm px-2 py-4 text-sm uppercase tracking-widest2 text-muted transition-colors hover:bg-white/5 hover:text-foreground",
                  pathname === link.href && "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2 px-2 py-3 text-base text-muted"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
            <Link href="/reserveren" className="mt-2">
              <Button className="w-full">Boek nu</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
