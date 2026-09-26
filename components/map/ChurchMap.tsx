"use client";

import { Copy, Crosshair, Loader2, MapPinned, Navigation } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { UserPosition } from "./MapCanvas";

// Leaflet (~40 Ko) n'est téléchargé que lorsque la carte arrive à l'écran.
const MapCanvas = dynamic(() => import("./MapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center text-ink-mute">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  ),
});

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function ChurchMap({ lat, lng, address, hint }: { lat: number; lng: number; address: string; hint?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState<UserPosition>(null);
  const [status, setStatus] = useState<"idle" | "locating" | "denied">("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setVisible(true), io.disconnect()), { rootMargin: "200px" });
    if (box.current) io.observe(box.current);
    return () => io.disconnect();
  }, []);

  function locate() {
    if (!navigator.geolocation) return setStatus("denied");
    setStatus("locating");
    setVisible(true);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setUser({ lat: p.coords.latitude, lng: p.coords.longitude });
        setStatus("idle");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  const dest = `${lat},${lng}`;
  const km = user ? distanceKm(user, { lat, lng }) : null;

  return (
    <div className="card overflow-hidden">
      <div ref={box} className="relative h-[22rem] bg-linen sm:h-[28rem] lg:h-[32rem]">
        {visible ? (
          <MapCanvas lat={lat} lng={lng} label={address} user={user} />
        ) : (
          <div className="grid h-full place-items-center text-ink-mute">
            <MapPinned className="h-8 w-8" />
          </div>
        )}
        <button
          type="button"
          onClick={locate}
          className="absolute left-3 top-3 z-[500] inline-flex items-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm font-semibold text-ink shadow-[var(--shadow-lift)] hover:text-royal"
        >
          {status === "locating" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Crosshair className="h-4 w-4" />}
          {km !== null ? `Vous êtes à ${km < 1 ? `${Math.round(km * 1000)} m` : `${km.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} km`}` : "Où suis-je par rapport à l'église ?"}
        </button>
      </div>

      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="font-serif text-2xl text-ink">{address}</p>
          {hint && <p className="mt-1 text-ink-soft">{hint}</p>}
          {status === "denied" && <p className="mt-2 text-sm text-live">Position indisponible. Vérifiez que la localisation est autorisée pour ce site.</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${dest}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary !min-h-11 text-sm">
            <Navigation className="h-4 w-4" /> Itinéraire
          </a>
          <a href={`https://waze.com/ul?ll=${dest}&navigate=yes`} target="_blank" rel="noopener noreferrer" className="btn btn-line !min-h-11 text-sm text-ink">
            Waze
          </a>
          <a href={`https://maps.apple.com/?daddr=${dest}`} target="_blank" rel="noopener noreferrer" className="btn btn-line !min-h-11 text-sm text-ink">
            Plans
          </a>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(`${address} — https://maps.google.com/?q=${dest}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              } catch {}
            }}
            className="btn btn-line !min-h-11 text-sm text-ink"
          >
            <Copy className="h-4 w-4" /> {copied ? "Copié !" : "Copier"}
          </button>
        </div>
      </div>
    </div>
  );
}
