export const site = {
  name: "The Mighty Grill",
  legalName: "The Mighty Grill Bukoto",
  tagline: "Fire, flavour, and late nights on Bukoto–Ntinda Road.",
  cuisine: "Grill & Ugandan Fast Food",
  city: "Kampala",
  neighborhood: "Bukoto",
  area: "Bukoto–Ntinda",
  description:
    "The Mighty Grill is Bukoto’s charcoal-fired grill and fast-food house — burgers, muchomo, crispy chicken, pizza, and ice-cream rolls served from noon until late on Bukoto–Ntinda Road.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://themightygrill.ug",
  phones: [
    { label: "Call 0770 894 012", display: "0770 894 012", e164: "+256770894012", tel: "tel:+256770894012" },
    { label: "Call 0756 251 341", display: "0756 251 341", e164: "+256756251341", tel: "tel:+256756251341" },
  ],
  whatsapp: {
    e164: "256770894012",
    display: "+256 770 894 012",
  },
  email: "bookings@themightygrill.ug",
  social: {
    instagram: "https://www.instagram.com/themightycitygrill/",
    twitter: "https://x.com/mighty_grill",
    tiktok: "https://www.tiktok.com/@mightycitygrillbukoto",
  },
  address: {
    street: "15b Froebel Rd",
    line2: "Bukoto–Ntinda Road, Frobel Stage",
    landmark: "Opposite Middle East Restaurant",
    city: "Kampala",
    region: "Central Region",
    country: "Uganda",
    postalCode: "",
    latitude: 0.352376,
    longitude: 32.6056814,
  },
  hours: [
    { days: "Monday – Thursday", opens: "12:00", closes: "24:00", note: "Noon to midnight" },
    { days: "Friday – Sunday", opens: "12:00", closes: "02:00", note: "Noon till late" },
  ],
  parking:
    "Street parking along Bukoto–Ntinda Road and Froebel Rd. Bays fill fast on Friday and Saturday nights — arrive a little early or come by boda.",
  priceRange: "UGX 8,000 – 55,000",
} as const;

export const seoTargets = {
  home: {
    title: "Best Grill & Fast Food Restaurant in Bukoto, Kampala",
    description:
      "The Mighty Grill is the best grill and Ugandan fast-food restaurant in Bukoto, Kampala. Charcoal muchomo, burgers & fries, crispy chicken, pizza and ice-cream rolls on Bukoto–Ntinda Road.",
  },
  menu: {
    title: "The Mighty Grill Full Menu, Prices & Dietary Options",
    description:
      "Browse The Mighty Grill Bukoto full menu with prices in UGX — starters, muchomo, burgers, pizza, juices, ice-cream rolls, vegan and gluten-free tags, plus allergy notes.",
  },
  book: {
    title: "Reserve a Table or Book Private Events at The Mighty Grill",
    description:
      "Reserve a table or book a private event at The Mighty Grill Bukoto. Pick your cover, date and time, then confirm instantly on WhatsApp.",
  },
  location: {
    title: "The Mighty Grill Address, Operating Hours & Parking Info",
    description:
      "Find The Mighty Grill at 15b Froebel Rd, Bukoto–Ntinda Road, Kampala — hours, live open status, parking tips, map and call buttons.",
  },
} as const;
