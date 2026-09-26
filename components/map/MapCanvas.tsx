"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";

export type UserPosition = { lat: number; lng: number } | null;

const churchIcon = L.divIcon({
  className: "",
  html: `<div class="church-pin"><img src="/images/logo.webp" alt="" width="44" height="44"/></div>`,
  iconSize: [56, 68],
  iconAnchor: [28, 66],
  popupAnchor: [0, -60],
});

const meIcon = L.divIcon({ className: "", html: `<div class="me-pin"></div>`, iconSize: [20, 20], iconAnchor: [10, 10] });

export default function MapCanvas({ lat, lng, label, user }: { lat: number; lng: number; label: string; user: UserPosition }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layer = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!el.current || map.current) return;
    const m = L.map(el.current, { center: [lat, lng], zoom: 15, scrollWheelZoom: false, zoomControl: false, attributionControl: true });
    L.control.zoom({ position: "bottomright" }).addTo(m);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(m);
    L.marker([lat, lng], { icon: churchIcon, title: label }).addTo(m).bindPopup(`<strong>Terre de Victoire</strong><br/>${label}`);
    // La molette ne zoome qu'après un clic : on ne « piège » pas le défilement de la page.
    m.once("focus click", () => m.scrollWheelZoom.enable());
    layer.current = L.layerGroup().addTo(m);
    map.current = m;
    return () => {
      m.remove();
      map.current = null;
    };
  }, [lat, lng, label]);

  useEffect(() => {
    const m = map.current;
    if (!m || !layer.current) return;
    layer.current.clearLayers();
    if (!user) return;
    L.marker([user.lat, user.lng], { icon: meIcon, title: "Vous êtes ici" }).addTo(layer.current);
    L.polyline(
      [
        [user.lat, user.lng],
        [lat, lng],
      ],
      { color: "#2e4b97", weight: 3, dashArray: "6 8", opacity: 0.8 },
    ).addTo(layer.current);
    m.fitBounds(
      L.latLngBounds([
        [user.lat, user.lng],
        [lat, lng],
      ]),
      { padding: [60, 60], maxZoom: 16 },
    );
  }, [user, lat, lng]);

  return <div ref={el} className="h-full w-full" role="application" aria-label={`Carte : ${label}`} />;
}
