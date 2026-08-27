import type { Metadata } from "next";
import { MenuCatalog } from "@/components/MenuCatalog";
import { menuItemSeeds } from "@/data/menu";
import { db } from "@/db";
import { menuItems } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { seoTargets, site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: seoTargets.menu.title,
  description: seoTargets.menu.description,
  openGraph: {
    title: seoTargets.menu.title,
    description: seoTargets.menu.description,
    images: ["/images/mixed-grill.jpg"],
  },
};

export default async function MenuPage() {
  await ensureSeeded();
  const items = await db.select().from(menuItems).orderBy(menuItems.sortOrder);
  const catalog =
    items.length > 0
      ? items
      : menuItemSeeds.map((item, id) => ({
          id,
          slug: item.slug,
          name: item.name,
          description: item.description,
          category: item.category,
          priceUgx: item.priceUgx,
          imageUrl: item.imageUrl,
          tags: item.tags.join(","),
          ingredients: item.ingredients,
          allergens: item.allergens,
          featured: item.featured,
          available: true,
          sortOrder: item.sortOrder,
        }));

  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${site.name} Full Menu`,
    hasMenuSection: [...new Set(catalog.map((item) => item.category))].map((category) => ({
      "@type": "MenuSection",
      name: category,
      hasMenuItem: catalog
        .filter((item) => item.category === category)
        .map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.description,
          image: item.imageUrl,
          offers: { "@type": "Offer", price: item.priceUgx, priceCurrency: "UGX" },
        })),
    })),
  };

  return (
    <main id="main" className="pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }} />
      <header className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-grill-orange">Prices in UGX · Kampala</p>
        <h1 className="mt-2 font-display text-5xl text-grill-ink sm:text-6xl">
          The Mighty Grill full menu, prices &amp; dietary options
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-grill-forest/80">
          Burgers, muchomo, crispy chicken, pizza, juices and ice-cream rolls. Tap any plate for ingredients and allergy
          alerts. Vegan, vegetarian and gluten-free tags sit on the card.
        </p>
      </header>
      <MenuCatalog items={catalog} />
    </main>
  );
}
