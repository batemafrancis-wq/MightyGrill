"use client";

import { useEffect, useState } from "react";
import { getLiveStatus, type LiveStatus } from "@/lib/hours";

export function LiveStatusBadge({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<LiveStatus>(() => getLiveStatus());

  useEffect(() => {
    const tick = () => setStatus(getLiveStatus());
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  const color =
    status.state === "open"
      ? "bg-grill-leaf"
      : status.state === "closing-soon"
        ? "bg-grill-orange"
        : "bg-zinc-500";

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-white backdrop-blur ${className}`}
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${color}`} />
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
      </span>
      <span className="text-sm font-semibold">{status.label}</span>
      <span className="hidden text-xs text-white/70 sm:inline">{status.detail}</span>
    </div>
  );
}
