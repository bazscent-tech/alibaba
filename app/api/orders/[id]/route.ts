import { NextResponse } from "next/server";
import { isValidAdminToken, updateServerOrder, type NetworkOrderStatus } from "@/lib/server-network";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isValidAdminToken(request.headers.get("authorization"))) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const { id } = await context.params;
  const body = await request.json().catch(() => ({}));
  const state = updateServerOrder(decodeURIComponent(id), body.status as NetworkOrderStatus);
  return NextResponse.json(state);
}
