import { CuratedSpecialsCarousel } from "@/components/CuratedSpecialsCarousel";
import { HeroBannerSection } from "@/components/HeroBannerSection";
import { SocialProofReviewTicker } from "@/components/SocialProofReviewTicker";
import { VisualAmbienceGallery } from "@/components/VisualAmbienceGallery";
import { mockGalleryImages, mockMenuItems, mockReviews } from "@/data/mock";
import Link from "next/link";
import { CallButtons } from "@/components/CallButtons";
import { site } from "@/lib/site";

export default function HomePage() {
  const specialItems = mockMenuItems.filter((item) => item.featured);
  return (
    <main id="main">
      <HeroBannerSection />
      <VisualAmbienceGallery images={mockGalleryImages} />
      <CuratedSpecialsCarousel items={specialItems} />
      <SocialProofReviewTicker reviews={mockReviews} />
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
