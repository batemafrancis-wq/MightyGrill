import Image from "next/image";
import type { GalleryImage } from "@/db/schema";

export function VisualAmbienceGallery({ images }: { images: GalleryImage[] }) {
  return (
    <section className="bg-grill-cream px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-grill-orange">The room, the fire, the plates</p>
        <h2 className="mt-2 font-display text-4xl text-grill-ink sm:text-5xl">A green garden grill on Bukoto–Ntinda</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-grill-forest/80">
          String lights, tropical greenery and a charcoal pit that runs until late. This is the Mighty look — the same
          energy as the plates on Instagram, TikTok and X.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {images.slice(0, 8).map((image, index) => (
            <figure
              key={image.id}
              className={`relative overflow-hidden rounded-3xl ${index === 0 || index === 5 ? "md:col-span-2 md:row-span-2 min-h-64" : "min-h-40"}`}
              style={{ aspectRatio: index === 0 || index === 5 ? "4 / 3" : "1 / 1" }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
