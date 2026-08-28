import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { ADMIN_PASSWORD_HASH } from "@/lib/admin-config";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (typeof body.password !== "string" || body.password.length < 1) return NextResponse.json({ error: "أدخل كلمة مرور الأدمن" }, { status: 400 });
  const suppliedHash = createHash("sha256").update(String(body.password || "")).digest("hex");
  if (suppliedHash !== ADMIN_PASSWORD_HASH) return NextResponse.json({ error: "كلمة المرور غير صحيحة" }, { status: 401 });
  const token = createHash("sha256").update(`${ADMIN_PASSWORD_HASH}|shibam-admin-session`).digest("hex");
  return NextResponse.json({ token });
}
