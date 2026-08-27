import { NextResponse } from "next/server";
import { GOOGLE_STATE_COOKIE, googleRedirectUri, secureCookieOptions } from "@/lib/google-auth";
import { randomBytes } from "node:crypto";

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.redirect(new URL("/login?error=google_not_configured", request.url));
  }

  const state = randomBytes(32).toString("base64url");
  const redirectUri = googleRedirectUri(request);
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });
  const response = NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  response.cookies.set(GOOGLE_STATE_COOKIE, state, { ...secureCookieOptions(), maxAge: 600 });
  return response;
}
