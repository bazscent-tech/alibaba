import { NextResponse } from "next/server";
import { isValidAdminToken, updateServerOrder, type NetworkOrderStatus } from "@/lib/server-network";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isValidAdminToken(request.headers.get("authorization"))) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const { id } = await context.params;
  const body = await request.json().catch(() => ({}));
  const statuses: NetworkOrderStatus[] = ["new", "processing", "shipped", "completed"];
  if (!statuses.includes(body.status)) return NextResponse.json({ error: "حالة الطلب غير صحيحة" }, { status: 400 });
  const state = updateServerOrder(decodeURIComponent(id), body.status);
  return NextResponse.json(state);
}
