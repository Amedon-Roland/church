// Session d'administration : un cookie signé (HMAC-SHA256) contenant la date d'expiration.
// Fonctionne aussi bien dans proxy.ts que dans les actions serveur (Web Crypto).

export const SESSION_COOKIE = "tdv_admin";
export const SESSION_DAYS = 14;

function secret() {
  const s = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  return s ? `tdv:${s}` : null;
}

async function hmac(value: string, key: string) {
  const k = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken() {
  const key = secret();
  if (!key) throw new Error("ADMIN_PASSWORD n'est pas configuré");
  const exp = String(Date.now() + SESSION_DAYS * 86400_000);
  return `${exp}.${await hmac(exp, key)}`;
}

export async function verifySessionToken(token: string | undefined) {
  const key = secret();
  if (!token || !key) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, await hmac(exp, key));
}

export async function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Compare des empreintes pour ne pas révéler la longueur du mot de passe.
  const [a, b] = await Promise.all([hmac(input, "pw"), hmac(expected, "pw")]);
  return safeEqual(a, b);
}

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);
