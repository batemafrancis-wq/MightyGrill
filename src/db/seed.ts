import { gallerySeeds } from "@/data/gallery";
import { menuItemSeeds } from "@/data/menu";
import { reviewSeeds } from "@/data/reviews";
import { getDb } from "@/db";
import { galleryImages, menuItems, reviews } from "@/db/schema";

let seeded = false;
let seeding: Promise<void> | null = null;

export async function ensureSeeded() {
  const db = getDb();
  if (seeded) return;
  if (seeding) {
    await seeding;
    return;
  }
  seeding = (async () => {
    const existing = await db.select({ id: menuItems.id }).from(menuItems).limit(1);
    if (existing.length === 0) {
      await db.insert(menuItems).values(
        menuItemSeeds.map((item) => ({
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
        })),
      );
      await db.insert(reviews).values(reviewSeeds);
      await db.insert(galleryImages).values(gallerySeeds);
    }
    seeded = true;
  })();
  await seeding;
}
