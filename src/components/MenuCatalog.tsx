"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { menuCategories } from "@/data/menu";
import { formatUgx } from "@/lib/format";
import type { MenuItem } from "@/db/schema";

function parseTags(tags: string) {
  return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
}

const tagStyles: Record<string, string> = {
  vegan: "bg-grill-green text-white",
  vegetarian: "bg-grill-leaf text-white",
  "gluten-free": "bg-white text-grill-forest border border-grill-green/30",
  spicy: "bg-grill-orange text-white",
  popular: "bg-grill-ink text-grill-flame",
};

export function MenuCatalog({ items }: { items: MenuItem[] }) {
  const [active, setActive] = useState<string>(menuCategories[0].id);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const visible = useMemo(() => {
    if (!filter) return items;
    return items.filter((item) => parseTags(item.tags).includes(filter));
  }, [filter, items]);

  useEffect(() => {
    const sections = menuCategories
      .map((category) => document.getElementById(category.id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleEntry?.target.id) setActive(visibleEntry.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.15, 0.4, 0.7] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const match = items.find((item) => item.slug === hash);
    if (match) setSelected(match);
  }, [items]);

  return (
    <div>
      <div className="sticky top-20 z-30 -mx-4 border-y border-grill-sand bg-grill-cream/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto hide-scrollbar">
          {menuCategories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              onClick={() => setActive(category.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === category.id ? "bg-grill-green text-white" : "bg-white text-grill-forest"
              }`}
            >
              {category.short}
            </a>
          ))}
        </div>
        <div className="mx-auto mt-3 flex max-w-6xl gap-2 overflow-x-auto hide-scrollbar">
          {[null, "vegan", "gluten-free", "spicy", "popular"].map((tag) => (
            <button
              key={tag ?? "all"}
              type="button"
              onClick={() => setFilter(tag)}
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                filter === tag ? "bg-grill-orange text-white" : "bg-white text-grill-forest"
              }`}
            >
              {tag ?? "All"}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12">
        {menuCategories.map((category) => {
          const group = visible.filter((item) => item.category === category.id);
          if (group.length === 0) return null;
          return (
            <section key={category.id} id={category.id}>
              <h2 className="font-display text-4xl text-grill-ink">{category.label}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {group.map((item) => (
                  <article
                    key={item.id}
                    id={item.slug}
                    itemScope
                    itemType="https://schema.org/MenuItem"
                    className="overflow-hidden rounded-3xl border border-grill-sand bg-white shadow-sm"
                  >
                    <button type="button" className="w-full text-left" onClick={() => setSelected(item)}>
                      <div className="relative h-48">
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 itemProp="name" className="font-display text-2xl text-grill-ink">
                            {item.name}
                          </h3>
                          <p
                            itemProp="offers"
                            itemScope
                            itemType="https://schema.org/Offer"
                            className="shrink-0 font-bold text-grill-orange"
                          >
                            <meta itemProp="priceCurrency" content="UGX" />
                            <meta itemProp="price" content={String(item.priceUgx)} />
                            {formatUgx(item.priceUgx)}
                          </p>
                        </div>
                        <p itemProp="description" className="mt-2 text-sm leading-6 text-grill-forest/80">
                          {item.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {parseTags(item.tags).map((tag) => (
                            <span
                              key={tag}
                              className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${tagStyles[tag] ?? "bg-grill-sand"}`}
                            >
                              {tag.replace("-", " ")}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/50 p-0 sm:place-items-center sm:p-6" role="dialog" aria-modal>
          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white sm:rounded-3xl">
            <div className="relative h-56">
              <Image src={selected.imageUrl} alt={selected.name} fill className="object-cover" />
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-sm font-bold"
              >
                Close
              </button>
            </div>
            <div className="p-6">
              <h3 className="font-display text-3xl">{selected.name}</h3>
              <p className="mt-1 font-bold text-grill-orange">{formatUgx(selected.priceUgx)}</p>
              <p className="mt-3 text-sm leading-6 text-grill-forest/80">{selected.description}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-grill-orange">Ingredients</p>
              <p className="mt-1 text-sm">{selected.ingredients}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-grill-orange">Allergy alerts</p>
              <p className="mt-1 text-sm">{selected.allergens}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
