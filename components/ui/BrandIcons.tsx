import type { Socials } from "@/lib/site";
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;

export const FacebookIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9.1 23.7v-8H6.6V12h2.5v-1.6c0-4.1 1.8-6 5.9-6 .8 0 2.1.2 2.6.3v3.3h-1.4c-1.7 0-2.4.7-2.4 2.3V12h3.9l-.7 3.7h-3.2V24C19.4 23.2 24 18.2 24 12 24 5.4 18.6 0 12 0S0 5.4 0 12c0 5.6 3.9 10.4 9.1 11.7Z" />
  </svg>
);

export const YoutubeIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.5 15.6V8.4l6.3 3.6-6.3 3.6Z" />
  </svg>
);

export const TiktokIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12.5 0h3.9c.1 1.5.6 3.1 1.8 4.2 1.1 1.1 2.7 1.6 4.2 1.8V10a10 10 0 0 1-5.8-1.9v8.8c-.1 1.4-.5 2.8-1.4 3.9a7 7 0 0 1-5.9 3.2 7 7 0 0 1-7.7-6.7v-1.5a7 7 0 0 1 8.7-6.7v4.4c-1-.3-2.1-.2-3 .4-.6.4-1.1 1-1.4 1.8-.2.5-.1 1-.1 1.6.2 1.6 1.8 3 3.5 2.9 1.1 0 2.2-.7 2.8-1.6.2-.3.4-.7.4-1.1.1-1.8.1-3.6.1-5.4L12.5 0Z" />
  </svg>
);

export const InstagramIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...p}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const WhatsappIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M.06 24l1.69-6.16A11.87 11.87 0 0 1 .16 11.9C.16 5.34 5.5 0 12.05 0a11.82 11.82 0 0 1 11.89 11.9c0 6.56-5.34 11.9-11.89 11.9a11.9 11.9 0 0 1-5.69-1.45L.06 24Zm6.6-3.8c1.67 1 3.27 1.59 5.39 1.59a9.9 9.9 0 0 0 9.89-9.89A9.88 9.88 0 0 0 12.06 2a9.9 9.9 0 0 0-8.38 15.15l-1 3.65 3.98-1.6Zm11.38-5.47c-.07-.12-.27-.2-.57-.35-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47a8.95 8.95 0 0 1-1.65-2.06c-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41Z" />
  </svg>
);

const META: { key: keyof Socials; label: string; Icon: (p: P) => React.ReactElement }[] = [
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "tiktok", label: "TikTok", Icon: TiktokIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "whatsapp", label: "WhatsApp", Icon: WhatsappIcon },
];

/** Liste des réseaux renseignés (les liens vides sont ignorés). */
export function socialLinks(socials: Socials) {
  return META.filter((m) => socials[m.key]?.trim()).map((m) => ({
    ...m,
    href: m.key === "whatsapp" ? whatsappHref(socials.whatsapp) : socials[m.key],
  }));
}

export function whatsappHref(value: string) {
  if (/^https?:/.test(value)) return value;
  return `https://wa.me/${value.replace(/[^\d]/g, "")}`;
}
