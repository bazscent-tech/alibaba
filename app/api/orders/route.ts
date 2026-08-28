import { NextResponse } from "next/server";
import { addServerOrder, getServerNetwork, type NetworkOrder } from "@/lib/server-network";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getServerNetwork().orders, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  try {
    const order = await request.json() as NetworkOrder;
    const state = getServerNetwork();
    const validStatuses = new Set(["new", "processing", "shipped", "completed"]);
    if (!order?.id || order.id.length > 80 || !order?.storeId || !order?.buyer || order.buyer.length > 160 || !Number.isInteger(order.items) || order.items <= 0 || order.items > 1000000 || !Number.isFinite(order.total) || order.total < 0 || order.total > 1000000000 || !validStatuses.has(order.status)) {
      return NextResponse.json({ error: "بيانات الطلب غير صالحة" }, { status: 400 });
    }
    if (!state.stores.some((store) => store.id === order.storeId)) return NextResponse.json({ error: "المتجر غير موجود" }, { status: 404 });
    const existing = state.orders.find((item) => item.id === order.id);
    if (existing) return NextResponse.json(existing, { status: existing.storeId === order.storeId && existing.total === order.total ? 200 : 409 });
    addServerOrder(order);
    return NextResponse.json(order, { status: 201 });
  } catch {
    return NextResponse.json({ error: "تعذر إنشاء الطلب" }, { status: 400 });
  }
}
