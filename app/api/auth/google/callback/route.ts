import { NextResponse } from "next/server";
import { encodeSession, GOOGLE_SESSION_COOKIE, GOOGLE_STATE_COOKIE, googleRedirectUri, secureCookieOptions, type GoogleUser } from "@/lib/google-auth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const expectedState = request.headers.get("cookie")?.match(new RegExp(`${GOOGLE_STATE_COOKIE}=([^;]+)`))?.[1];
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!code || !returnedState || !expectedState || returnedState !== expectedState || !clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/login?error=google_failed", request.url));
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: googleRedirectUri(request), grant_type: "authorization_code" }),
      cache: "no-store",
    });
    if (!tokenResponse.ok) throw new Error("Google token exchange failed");
    const token = await tokenResponse.json() as { access_token?: string };
    if (!token.access_token) throw new Error("Google access token missing");

    const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", { headers: { Authorization: `Bearer ${token.access_token}` }, cache: "no-store" });
    if (!profileResponse.ok) throw new Error("Google profile failed");
    const profile = await profileResponse.json() as { sub?: string; name?: string; email?: string; picture?: string };
    if (!profile.sub || !profile.email) throw new Error("Google profile incomplete");

    const user: GoogleUser = { id: `google-${profile.sub}`, name: profile.name || profile.email.split("@")[0], email: profile.email, avatar: profile.picture };
    const response = NextResponse.redirect(new URL("/login?google=success", request.url));
    response.cookies.set(GOOGLE_SESSION_COOKIE, encodeSession(user), { ...secureCookieOptions(), maxAge: 60 * 60 * 24 * 7 });
    response.cookies.set(GOOGLE_STATE_COOKIE, "", { ...secureCookieOptions(), maxAge: 0 });
    return response;
  } catch {
    return NextResponse.redirect(new URL("/login?error=google_failed", request.url));
  }
}

