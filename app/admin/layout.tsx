import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Administration", template: "%s · Administration" },
  robots: { index: false, follow: false },
};

export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-linen/60">{children}</div>;
}
