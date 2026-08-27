import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { ADMIN_PASSWORD } from "@/lib/admin-config";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (body.password !== ADMIN_PASSWORD) return NextResponse.json({ error: "كلمة المرور غير صحيحة" }, { status: 401 });
  const token = createHash("sha256").update(`${ADMIN_PASSWORD}|shibam-admin-session`).digest("hex");
  return NextResponse.json({ token });
}
