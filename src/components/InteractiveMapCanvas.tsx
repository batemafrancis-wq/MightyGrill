import { site } from "@/lib/site";

export function InteractiveMapCanvas() {
  const { latitude, longitude } = site.address;
  const src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;

  return (
    <section className="overflow-hidden rounded-[2rem] border border-grill-sand bg-white shadow-sm">
      <div className="grid md:grid-cols-2">
        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-grill-orange">Find the fire</p>
          <h2 className="mt-2 font-display text-4xl">{site.name} address</h2>
          <address className="mt-4 not-italic text-sm leading-7 text-grill-forest">
            <strong>{site.name}</strong>
            <br />
            {site.address.street}
            <br />
            {site.address.line2}
            <br />
            {site.address.landmark}
            <br />
            {site.address.city}, Uganda
          </address>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
            className="mt-5 inline-flex rounded-full bg-grill-green px-5 py-2.5 text-sm font-bold text-white"
            target="_blank"
            rel="noreferrer"
          >
            Get directions
          </a>
        </div>
        <div className="min-h-72 bg-grill-sand">
          <iframe
            title="Map of The Mighty Grill Bukoto"
            src={src}
            className="h-full min-h-72 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
