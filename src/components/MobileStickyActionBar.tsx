"use client";

import Link from "next/link";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export function MobileStickyActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-grill-ink/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/menu"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-grill-ink"
        >
          <span aria-hidden>📖</span> Menu
        </Link>
        <a
          href={generalWhatsAppUrl()}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-wa px-4 py-3 text-sm font-bold text-white"
        >
          <span aria-hidden>🟢</span> WhatsApp Booking
        </a>
      </div>
    </div>
  );
}
