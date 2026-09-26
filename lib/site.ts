// Valeurs par défaut du site. Tout ce qui est ici peut être modifié depuis
// l'administration (/admin/reglages) — ces valeurs servent de point de départ.

export type ServiceTime = {
  day: string; // « Dimanche »
  weekday: number; // 0 = dimanche … 6 = samedi (pour le compte à rebours)
  time: string; // « 10:00 »
  title: string;
  note?: string;
};

export type Leader = {
  name: string;
  role: string;
  photo: string;
  bio?: string;
};

export type Socials = {
  facebook: string;
  youtube: string;
  tiktok: string;
  instagram: string;
  whatsapp: string;
};

export type Settings = {
  churchName: string;
  shortName: string;
  city: string;
  address: string;
  addressHint: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  socials: Socials;
  youtubeHandle: string;
  youtubeChannelId: string;
  services: ServiceTime[];
  leaders: Leader[];
  announcement: string;
};

export const DEFAULT_SETTINGS: Settings = {
  churchName: "Victory Outreach Ministry International",
  shortName: "Terre de Victoire",
  city: "Lomé, Togo",
  address: "Lomé, Togo",
  addressHint: "Demandez « Terre de Victoire » dans le quartier, tout le monde nous connaît.",
  lat: 6.1319,
  lng: 1.2113,
  phone: "",
  email: "",
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=100064183954039",
    youtube: "https://www.youtube.com/@egliseterredevictoiretogo",
    tiktok: "",
    instagram: "",
    whatsapp: "",
  },
  youtubeHandle: "@egliseterredevictoiretogo",
  youtubeChannelId: "",
  services: [
    { day: "Dimanche", weekday: 0, time: "10:00", title: "Culte de célébration", note: "Louange, Parole et communion. Accueil des enfants." },
    { day: "Mercredi", weekday: 3, time: "19:00", title: "Étude biblique", note: "On ouvre la Bible ensemble, questions bienvenues." },
    { day: "Vendredi", weekday: 5, time: "19:00", title: "Soirée de prière", note: "Intercession pour nos familles, Lomé et le Togo." },
  ],
  leaders: [
    { name: "", role: "Pasteur principal", photo: "/images/pasteur-1.jpg", bio: "" },
    { name: "", role: "Pasteur", photo: "/images/pasteur-2.jpg", bio: "" },
  ],
  announcement: "",
};

export const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/eglise", label: "L'église" },
  { href: "/direct", label: "Direct & replays" },
  { href: "/bible", label: "Bible" },
  { href: "/blog", label: "Blog" },
  { href: "/nous-trouver", label: "Nous trouver" },
] as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
