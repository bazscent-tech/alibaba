import { createHmac, timingSafeEqual } from "node:crypto";

export const GOOGLE_STATE_COOKIE = "shibam-google-state";
export const GOOGLE_SESSION_COOKIE = "shibam-google-session";

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

function sessionSecret() {
  return process.env.GOOGLE_SESSION_SECRET || process.env.JWT_SECRET || "shibam-development-session-secret";
}

function signature(value: string) {
  return createHmac("sha256", sessionSecret()).update(value).digest("base64url");
}

export function encodeSession(user: GoogleUser) {
  const payload = Buffer.from(JSON.stringify({ user, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 })).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function decodeSession(value: string | undefined): GoogleUser | null {
  if (!value) return null;
  const [payload, providedSignature] = value.split(".");
  if (!payload || !providedSignature) return null;
  const expectedSignature = signature(payload);
  try {
    if (!timingSafeEqual(Buffer.from(providedSignature), Buffer.from(expectedSignature))) return null;
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { user?: GoogleUser; exp?: number };
    if (!parsed.user || !parsed.exp || parsed.exp < Date.now()) return null;
    return parsed.user;
  } catch {
    return null;
  }
}

export function googleRedirectUri(request: Request) {
  return new URL("/api/auth/google/callback", request.url).toString();
}

export function secureCookieOptions() {
  return { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/" };
}
