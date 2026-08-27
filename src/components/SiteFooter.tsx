import Image from "next/image";
import Link from "next/link";
import { CallButtons } from "@/components/CallButtons";
import { SocialLinks } from "@/components/SocialLinks";
import { formatHoursLine } from "@/lib/hours";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-grill-ink text-white">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
            <div>
              <p className="font-display text-3xl">{site.name}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-grill-flame">Bukoto · Ntinda Road</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/75">{site.description}</p>
          <div className="mt-5">
            <CallButtons />
          </div>
          <SocialLinks className="mt-5" />
        </div>

        <div>
          <p className="font-display text-lg text-grill-flame">Visit</p>
          <address className="mt-3 not-italic text-sm leading-6 text-white/80">
            {site.address.street}
            <br />
            {site.address.line2}
            <br />
            {site.address.landmark}
            <br />
            {site.address.city}, Uganda
          </address>
          <p className="mt-3 text-sm text-white/70">{formatHoursLine()}</p>
        </div>

        <div>
          <p className="font-display text-lg text-grill-flame">Jump</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/menu" className="hover:text-grill-flame">
                Full menu & prices
              </Link>
            </li>
            <li>
              <Link href="/book" className="hover:text-grill-flame">
                Reserve a table
              </Link>
            </li>
            <li>
              <Link href="/location" className="hover:text-grill-flame">
                Map, hours & parking
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10 px-4 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {site.name}. Charcoal, chips & late nights in Bukoto.
      </div>
    </footer>
  );
}
