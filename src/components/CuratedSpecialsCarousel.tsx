"use client";

import Image from "next/image";
import Link from "next/link";
import { formatUgx } from "@/lib/format";
import type { MenuItem } from "@/db/schema";

export function CuratedSpecialsCarousel({ items }: { items: MenuItem[] }) {
  return (
    <section className="bg-grill-forest py-16 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-grill-flame">Tonight on the coals</p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl">Curated Mighty specials</h2>
          </div>
          <Link href="/menu" className="hidden rounded-full border border-white/20 px-4 py-2 text-sm md:inline">
            Full menu
          </Link>
        </div>
      </div>
      <div className="mt-8 flex gap-4 overflow-x-auto px-4 pb-4 hide-scrollbar snap-x snap-mandatory">
        {items.map((item) => (
          <article
            key={item.id}
            className="w-[78vw] max-w-sm shrink-0 snap-start overflow-hidden rounded-3xl bg-grill-ink shadow-xl sm:w-80"
          >
            <div className="relative h-52">
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="320px" />
              <span className="absolute left-3 top-3 rounded-full bg-grill-orange px-3 py-1 text-[11px] font-bold uppercase">
                Special
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-2xl">{item.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-white/70">{item.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="font-bold text-grill-flame">{formatUgx(item.priceUgx)}</p>
                <Link href={`/menu#${item.slug}`} className="text-xs uppercase tracking-wide text-white/70 hover:text-white">
                  Quick look
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
