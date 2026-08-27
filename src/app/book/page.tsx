import type { Metadata } from "next";
import { InteractiveBookingEngine } from "@/components/InteractiveBookingEngine";
import { CallButtons } from "@/components/CallButtons";
import { seoTargets, site } from "@/lib/site";

export const metadata: Metadata = {
  title: seoTargets.book.title,
  description: seoTargets.book.description,
};

export default function BookPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 pb-16 pt-28">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-grill-orange">WhatsApp handoff · 3 steps</p>
      <h1 className="mt-2 font-display text-5xl text-grill-ink sm:text-6xl">
        Reserve a table or book private events at {site.name}
      </h1>
      <p className="mt-4 text-sm leading-6 text-grill-forest/80">
        Pick your cover, date and time on this page — we store the booking for our kitchen analytics, fire a conversion
        event, then open WhatsApp so the Bukoto team can confirm.
      </p>
      <div className="mt-6">
        <CallButtons />
      </div>
      <div className="mt-10">
        <InteractiveBookingEngine />
      </div>
    </main>
  );
}
