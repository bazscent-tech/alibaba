import { NextResponse } from "next/server";
import { decodeSession, GOOGLE_SESSION_COOKIE } from "@/lib/google-auth";

export async function GET(request: Request) {
  const value = request.headers.get("cookie")?.match(new RegExp(`${GOOGLE_SESSION_COOKIE}=([^;]+)`))?.[1];
  const user = decodeSession(value);
  if (!user) return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  return NextResponse.json({ user });
}
