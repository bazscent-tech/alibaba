import { NextResponse } from "next/server";
import { addServerStore, getServerNetwork, isValidAdminToken, type NetworkStore } from "@/lib/server-network";

export const dynamic = "force-dynamic";

function authorized(request: Request) { return isValidAdminToken(request.headers.get("authorization")); }

export async function GET() { return NextResponse.json(getServerNetwork().stores, { headers: { "Cache-Control": "no-store" } }); }

export async function POST(request: Request) {
  const store = await request.json() as NetworkStore;
  if (!store?.name || !store?.email) return NextResponse.json({ error: "بيانات المتجر ناقصة" }, { status: 400 });
  addServerStore(store);
  return NextResponse.json(store, { status: 201 });
}
