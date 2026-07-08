"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled || open
            ? "bg-background/90 backdrop-blur-md border-b border-white/5"
            : "bg-gradient-to-b from-black/60 via-black/20 to-transparent"
        )}
      >
        <div className="container-luxe flex h-20 items-center justify-between sm:h-24">
          <Link
            href="/"
            className="group flex items-baseline gap-2.5 transition-opacity duration-200 hover:opacity-90"
          >
            <span className="font-display text-xl tracking-wide text-foreground sm:text-2xl">
              Noorder
            </span>
            <span className="h-3 w-px bg-navy-light/60" aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-widest2 text-muted sm:text-xs">
              Taxi
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative py-2 text-xs font-medium uppercase tracking-widest2 text-muted transition-colors hover:text-foreground",
                  pathname === link.href && "text-foreground"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-navy-light transition-transform duration-300 ease-out group-hover:scale-x-100",
                    pathname === link.href && "scale-x-100"
                  )}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2 whitespace-nowrap text-sm text-muted transition-colors hover:text-foreground"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
            <Link href="/reserveren">
              <Button size="sm">Reserveer nu</Button>
            </Link>
          </div>

          <button
            className="relative z-10 flex h-10 w-10 items-center justify-center text-foreground lg:hidden"
            aria-label={open ? "Sluit menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Menu
              className={cn(
                "absolute h-6 w-6 transition-all duration-300",
                open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              )}
            />
            <X
              className={cn(
                "absolute h-6 w-6 transition-all duration-300",
                open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              )}
            />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-40 flex animate-fade-up flex-col justify-between overflow-y-auto bg-background/98 backdrop-blur-xl duration-300 sm:top-24 lg:hidden">
          <nav className="container-luxe flex flex-col divide-y divide-white/5 pt-4">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ animationDelay: `${0.08 + i * 0.05}s` }}
                className={cn(
                  "animate-fade-up py-5 font-display text-2xl italic text-muted opacity-0 transition-colors hover:text-foreground",
                  pathname === link.href && "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="container-luxe flex flex-col gap-4 border-t border-white/5 py-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={SITE.phoneHref} className="w-full">
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4" />
                  Bel Ons
                </Button>
              </a>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="outline"
                  className="w-full border-[#25D366]/40 text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
            </div>
            <Link href="/reserveren">
              <Button className="w-full" size="lg">
                Reserveer nu
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
