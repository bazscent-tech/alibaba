import { NextResponse } from "next/server";
import { isValidAdminToken, updateServerStore, type NetworkStoreStatus } from "@/lib/server-network";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isValidAdminToken(request.headers.get("authorization"))) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const { id } = await context.params;
  const body = await request.json().catch(() => ({}));
  const state = updateServerStore(decodeURIComponent(id), body.status as NetworkStoreStatus);
  return NextResponse.json(state);
}
