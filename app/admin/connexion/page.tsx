import { LoginForm } from "@/components/admin/LoginForm";
import { adminConfigured } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Connexion" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ suite?: string }> }) {
  const { suite } = await searchParams;
  return (
    <div className="grid min-h-dvh place-items-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <Image src="/images/logo.webp" alt="" width={72} height={72} className="mx-auto h-18 w-18 rounded-full ring-1 ring-gold/40" />
          <h1 className="mt-5 text-4xl text-ink">Espace équipe</h1>
          <p className="mt-2 text-ink-soft">Articles, réglages et messages du site.</p>
        </div>
        <div className="card mt-8 p-6">
          {adminConfigured() ? (
            <LoginForm next={suite} />
          ) : (
            <div className="text-[0.95rem] text-ink-soft">
              <p className="font-semibold text-ink">Presque prêt !</p>
              <p className="mt-2">
                Définissez la variable d&apos;environnement <code className="rounded bg-linen px-1">ADMIN_PASSWORD</code> sur votre hébergement (et en local dans{" "}
                <code className="rounded bg-linen px-1">.env.local</code>), puis redémarrez le site. Le fichier <code className="rounded bg-linen px-1">.env.example</code> explique tout.
              </p>
            </div>
          )}
        </div>
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-ink-mute hover:text-ink">
            ← Retour au site
          </Link>
        </p>
      </div>
    </div>
  );
}
