import type { Metadata } from "next";
import { CallButtons } from "@/components/CallButtons";
import { InteractiveMapCanvas } from "@/components/InteractiveMapCanvas";
import { LiveStatusBadge } from "@/components/LiveStatusBadge";
import { SocialLinks } from "@/components/SocialLinks";
import { site, seoTargets } from "@/lib/site";

export const metadata: Metadata = {
  title: seoTargets.location.title,
  description: seoTargets.location.description,
};

export default function LocationPage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 pb-16 pt-28">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-grill-orange">Bukoto · Ntinda Road</p>
      <h1 className="mt-2 max-w-3xl font-display text-5xl text-grill-ink sm:text-6xl">
        {site.name} address, operating hours &amp; parking info
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-grill-forest/80">
        Find us at Frobel Stage on Bukoto–Ntinda Road, opposite Middle East Restaurant. Two phones, three socials, and a
        grill that runs from noon.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <LiveStatusBadge />
        <CallButtons />
      </div>

      <div className="mt-10">
        <InteractiveMapCanvas />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="rounded-[2rem] bg-grill-ink p-8 text-white">
          <h2 className="font-display text-3xl">Operating hours</h2>
          <ul className="mt-5 space-y-4 text-sm">
            {site.hours.map((row) => (
              <li key={row.days} className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <span>{row.days}</span>
                <span className="text-grill-flame">
                  {row.opens} – {row.closes}
                  <span className="mt-1 block text-xs text-white/60">{row.note}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-white/60">Times shown in Africa/Kampala. Kitchen last-call ~45 minutes before close.</p>
        </section>
        <section className="rounded-[2rem] border border-grill-sand bg-white p-8">
          <h2 className="font-display text-3xl text-grill-ink">Parking</h2>
          <p className="mt-4 text-sm leading-7 text-grill-forest/80">{site.parking}</p>
          <h3 className="mt-6 font-display text-2xl">Follow the grill</h3>
          <div className="mt-4 rounded-3xl bg-grill-ink p-4">
            <SocialLinks />
          </div>
        </section>
      </div>
    </main>
  );
}
