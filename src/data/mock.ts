import type { GalleryImage, MenuItem, Review } from "@/db/schema";
import { gallerySeeds } from "@/data/gallery";
import { menuItemSeeds } from "@/data/menu";
import { reviewSeeds } from "@/data/reviews";

export const mockMenuItems: MenuItem[] = menuItemSeeds.map((item, id) => ({
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

export const mockGalleryImages: GalleryImage[] = gallerySeeds.map((item, id) => ({ id, ...item }));

export const mockReviews: Review[] = reviewSeeds.map((item, id) => ({
  id,
  ...item,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
}));