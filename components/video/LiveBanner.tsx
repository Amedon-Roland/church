"use client";

import { getLiveStatus, type LiveStatus } from "@/lib/live-client";
import Link from "next/link";
import { useEffect, useState } from "react";

/** Bandeau qui n'apparaît que lorsqu'un culte est diffusé en direct. */
export function LiveBanner() {
  const [status, setStatus] = useState<LiveStatus | null>(null);
  useEffect(() => {
    getLiveStatus().then(setStatus);
  }, []);
  if (!status?.live) return null;
  return (
    <Link href="/direct" className="group mb-8 flex w-fit max-w-full animate-rise items-center gap-3 rounded-full bg-live py-2 pl-3 pr-5 text-sm font-semibold text-white shadow-lg">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white animate-live" />
      <span className="truncate">En direct maintenant{status.title ? ` : ${status.title}` : ""}</span>
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  );
}
