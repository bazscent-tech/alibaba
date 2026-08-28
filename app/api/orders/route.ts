import { NextResponse } from "next/server";
import { addServerOrder, getServerNetwork, type NetworkOrder } from "@/lib/server-network";

export const dynamic = "force-dynamic";

export async function GET() { return NextResponse.json(getServerNetwork().orders, { headers: { "Cache-Control": "no-store" } }); }

export async function POST(request: Request) {
  const order = await request.json() as NetworkOrder;
  if (!order?.id || !order?.storeId || !order?.buyer || !Number.isFinite(order.items) || !Number.isFinite(order.total)) return NextResponse.json({ error: "بيانات الطلب ناقصة" }, { status: 400 });
  const existing = getServerNetwork().orders.find((item) => item.id === order.id);
  if (existing) return NextResponse.json(existing, { status: existing.storeId === order.storeId && existing.total === order.total ? 200 : 409 });
  addServerOrder(order);
  return NextResponse.json(order, { status: 201 });
}
