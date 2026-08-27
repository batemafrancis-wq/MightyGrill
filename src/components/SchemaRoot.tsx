import { site } from "@/lib/site";

export function SchemaRoot() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${site.url}#restaurant`,
    name: site.name,
    alternateName: ["Mighty City Grill", "Mighty City Grill Bukoto", "The Mighty Grill Bukoto"],
    image: [`${site.url}/images/og-share.jpg`, `${site.url}/images/hero.jpg`, `${site.url}/images/mixed-grill.jpg`],
    url: site.url,
    telephone: site.phones.map((phone) => phone.e164),
    email: site.email,
    priceRange: site.priceRange,
    servesCuisine: ["Ugandan", "Grill", "Fast Food", "Barbecue"],
    acceptsReservations: true,
    menu: `${site.url}/menu`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: "UG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.latitude,
      longitude: site.address.longitude,
    },
    hasMap: `https://www.google.com/maps?q=${site.address.latitude},${site.address.longitude}`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "12:00",
        closes: "24:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday", "Sunday"],
        opens: "12:00",
        closes: "02:00",
      },
    ],
    sameAs: [site.social.instagram, site.social.twitter, site.social.tiktok],
    areaServed: {
      "@type": "Place",
      name: "Bukoto, Kampala",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      reviewCount: "191",
      bestRating: "5",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
