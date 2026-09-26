import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "./lib/auth";

// Protège tout l'espace d'administration, sauf la page de connexion.
export async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin/connexion")) return NextResponse.next();
  if (await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value)) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = "/admin/connexion";
  url.search = `?suite=${encodeURIComponent(req.nextUrl.pathname)}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/admin", "/admin/:path*"] };
