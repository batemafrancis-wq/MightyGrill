import { desc, eq } from "drizzle-orm";
import { CuratedSpecialsCarousel } from "@/components/CuratedSpecialsCarousel";
import { HeroBannerSection } from "@/components/HeroBannerSection";
import { SocialProofReviewTicker } from "@/components/SocialProofReviewTicker";
import { VisualAmbienceGallery } from "@/components/VisualAmbienceGallery";
import { db } from "@/db";
import { galleryImages, menuItems, reviews } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { gallerySeeds } from "@/data/gallery";
import { menuItemSeeds } from "@/data/menu";
import { reviewSeeds } from "@/data/reviews";
import Link from "next/link";
import { CallButtons } from "@/components/CallButtons";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await ensureSeeded();
  const [specials, gallery, guestReviews] = await Promise.all([
    db.select().from(menuItems).where(eq(menuItems.featured, true)).orderBy(menuItems.sortOrder),
    db.select().from(galleryImages),
    db.select().from(reviews).orderBy(desc(reviews.id)),
  ]);

  const specialItems =
    specials.length > 0
      ? specials
      : menuItemSeeds
          .filter((item) => item.featured)
          .map((item, id) => ({
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

  const galleryItems =
    gallery.length > 0
      ? gallery
      : gallerySeeds.map((item, id) => ({ id, ...item }));

  const reviewItems =
    guestReviews.length > 0
      ? guestReviews
      : reviewSeeds.map((item, id) => ({
          id,
          ...item,
          createdAt: new Date(),
        }));

  return (
    <main id="main">
      <HeroBannerSection />
      <VisualAmbienceGallery images={galleryItems} />
      <CuratedSpecialsCarousel items={specialItems} />
      <SocialProofReviewTicker reviews={reviewItems} />
      <section className="flame-wash px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.3em] text-grill-flame">Ready when you are</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl sm:text-6xl">
            Book the garden table. Call the grill. WhatsApp the order.
          </h2>
          <p className="mt-4 max-w-xl text-white/75">
            {site.address.street}, {site.address.line2}. {site.address.landmark}. Two lines that always pick up.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/book" className="rounded-full bg-grill-orange px-6 py-3 text-sm font-bold uppercase">
              Reserve a table
            </Link>
            <Link href="/location" className="rounded-full border border-white/25 px-6 py-3 text-sm font-bold uppercase">
              Hours & parking
            </Link>
          </div>
          <div className="mt-6">
            <CallButtons />
          </div>
        </div>
      </section>
    </main>
  );
}
