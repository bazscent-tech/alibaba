import { NextResponse } from "next/server";
import { GOOGLE_SESSION_COOKIE, secureCookieOptions } from "@/lib/google-auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(GOOGLE_SESSION_COOKIE, "", { ...secureCookieOptions(), maxAge: 0 });
  return response;
}
