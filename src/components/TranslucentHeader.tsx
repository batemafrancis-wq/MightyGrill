"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CallButtons } from "@/components/CallButtons";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/book", label: "Book" },
  { href: "/location", label: "Location" },
];

export function TranslucentHeader() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > last && y > 90);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <div
        className={`mx-auto mt-3 flex max-w-6xl items-center justify-between gap-4 rounded-full border px-3 py-2 backdrop-blur-xl transition md:px-4 ${
          scrolled || open
            ? "border-white/15 bg-grill-ink/80 shadow-[0_18px_50px_rgba(7,25,16,0.45)]"
            : "border-white/10 bg-grill-ink/45"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 text-white">
          <Image
            src="/images/logo.png"
            alt={`${site.name} logo`}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
            priority
          />
          <span className="leading-none">
            <span className="font-display text-lg tracking-wide">THE MIGHTY GRILL</span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-grill-flame">
              Bukoto · Kampala
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active ? "bg-white text-grill-ink" : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <CallButtons compact />
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {open ? (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-white/10 bg-grill-ink/95 p-4 text-white backdrop-blur-xl md:hidden">
          <nav className="grid gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-lg font-display tracking-wide hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4">
            <CallButtons />
          </div>
        </div>
      ) : null}
    </header>
  );
}
