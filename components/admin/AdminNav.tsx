"use client";

import { Inbox, LayoutDashboard, Newspaper, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/admin", label: "Tableau de bord", Icon: LayoutDashboard },
  { href: "/admin/articles", label: "Articles", Icon: Newspaper },
  { href: "/admin/messages", label: "Messages", Icon: Inbox },
  { href: "/admin/reglages", label: "Réglages du site", Icon: Settings },
];

export function AdminNav({ unread }: { unread: number }) {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-4" aria-label="Administration">
      {ITEMS.map(({ href, label, Icon }) => {
        const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-royal text-white" : "text-ink-soft hover:bg-linen hover:text-ink"}`}
          >
            <Icon className="h-4 w-4" />
            {label}
            {href === "/admin/messages" && unread > 0 && (
              <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-bold ${active ? "bg-white text-royal" : "bg-live text-white"}`}>{unread}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
