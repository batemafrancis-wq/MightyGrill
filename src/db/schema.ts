import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  priceUgx: integer("price_ugx").notNull(),
  imageUrl: text("image_url").notNull(),
  tags: text("tags").notNull().default(""),
  ingredients: text("ingredients").notNull(),
  allergens: text("allergens").notNull(),
  featured: boolean("featured").notNull().default(false),
  available: boolean("available").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  rating: integer("rating").notNull(),
  quote: text("quote").notNull(),
  source: text("source").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  src: text("src").notNull(),
  alt: text("alt").notNull(),
  category: text("category").notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  guestName: text("guest_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  headcount: integer("headcount").notNull(),
  date: text("date").notNull(),
  timeWindow: text("time_window").notNull(),
  dietary: text("dietary").notNull().default(""),
  notes: text("notes").notNull().default(""),
  sourcePage: text("source_page"),
  whatsappUrl: text("whatsapp_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type MenuItem = typeof menuItems.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type GalleryImage = typeof galleryImages.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
