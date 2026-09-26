import { logout } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/admin";
import { listMessages } from "@/lib/messages";
import { storeIsEphemeral } from "@/lib/store";
import { ExternalLink, LogOut, TriangleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const unread = (await listMessages()).filter((m) => !m.read).length;
  return (
    <div className="lg:grid lg:min-h-dvh lg:grid-cols-[16rem_1fr]">
      <aside className="border-b border-line bg-card lg:sticky lg:top-0 lg:h-dvh lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-3 p-4 lg:block lg:p-6">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/images/logo.webp" alt="" width={40} height={40} className="h-10 w-10 rounded-full" />
            <span className="leading-tight">
              <span className="block font-serif text-lg text-ink">Terre de Victoire</span>
              <span className="text-xs text-ink-mute">Espace équipe</span>
            </span>
          </Link>
          <div className="flex items-center gap-1 lg:mt-6">
            <Link href="/" target="_blank" className="grid h-9 w-9 place-items-center rounded-full text-ink-mute hover:bg-linen hover:text-ink lg:hidden" aria-label="Voir le site">
              <ExternalLink className="h-4 w-4" />
            </Link>
            <form action={logout} className="lg:hidden">
              <button className="grid h-9 w-9 place-items-center rounded-full text-ink-mute hover:bg-linen hover:text-ink" aria-label="Se déconnecter">
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
        <AdminNav unread={unread} />
        <div className="hidden space-y-1 p-4 lg:absolute lg:inset-x-0 lg:bottom-0 lg:block">
          <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-ink-soft hover:bg-linen">
            <ExternalLink className="h-4 w-4" /> Voir le site
          </Link>
          <form action={logout}>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-ink-soft hover:bg-linen">
              <LogOut className="h-4 w-4" /> Se déconnecter
            </button>
          </form>
        </div>
      </aside>
      <div className="min-w-0">
        {storeIsEphemeral && (
          <div className="flex items-start gap-3 border-b border-gold/40 bg-gold-soft/60 px-4 py-3 text-sm text-ink lg:px-8">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" />
            <p>
              Stockage temporaire : vos modifications risquent d&apos;être perdues. Connectez une base Upstash Redis (gratuite) et renseignez
              <code className="mx-1 rounded bg-card px-1">UPSTASH_REDIS_REST_URL</code> et <code className="mx-1 rounded bg-card px-1">UPSTASH_REDIS_REST_TOKEN</code>.
            </p>
          </div>
        )}
        <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8 lg:py-12">{children}</div>
      </div>
    </div>
  );
}
