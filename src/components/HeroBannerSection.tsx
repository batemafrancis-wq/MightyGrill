import Image from "next/image";
import Link from "next/link";
import { CallButtons } from "@/components/CallButtons";
import { LiveStatusBadge } from "@/components/LiveStatusBadge";
import { site } from "@/lib/site";

export function HeroBannerSection() {
  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden bg-grill-ink text-white">
      <Image
        src="/images/hero.jpg"
        alt="Charcoal grill flames and night dining at The Mighty Grill Bukoto"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-grill-ink via-grill-ink/80 to-grill-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-grill-ink via-transparent to-grill-ink/40" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-4 pb-20 pt-32">
        <LiveStatusBadge />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-grill-flame">
          Bukoto · Ntinda Road · Kampala
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] sm:text-7xl">
          Best grill &amp; fast food restaurant in Bukoto, Kampala
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
          Charcoal muchomo, mighty burgers, crispy chicken, pizza and ice-cream rolls — served from noon till late
          opposite Middle East Restaurant on Bukoto–Ntinda Road.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/book"
            className="rounded-full bg-grill-orange px-6 py-3 text-sm font-bold uppercase tracking-wide shadow-[0_12px_30px_rgba(242,92,5,0.4)]"
          >
            Reserve a table
          </Link>
          <Link
            href="/menu"
            className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-wide backdrop-blur"
          >
            See the menu
          </Link>
        </div>
        <div className="mt-6">
          <CallButtons />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/50">{site.tagline}</p>
      </div>
    </section>
  );
}
