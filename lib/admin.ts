import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "./auth";

/** À appeler en tête de chaque action d'administration (le proxy ne protège pas les actions). */
export async function requireAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) redirect("/admin/connexion");
}
