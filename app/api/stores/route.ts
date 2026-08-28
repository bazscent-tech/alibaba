import { NextResponse } from "next/server";
import { addServerStore, getServerNetwork, type NetworkStore } from "@/lib/server-network";

export const dynamic = "force-dynamic";


export async function GET() { return NextResponse.json(getServerNetwork().stores, { headers: { "Cache-Control": "no-store" } }); }

export async function POST(request: Request) {
  const store = await request.json() as NetworkStore;
  if (!store?.name || !store?.email || !store?.owner || !store?.city) return NextResponse.json({ error: "بيانات المتجر ناقصة" }, { status: 400 });
  addServerStore(store);
  return NextResponse.json(store, { status: 201 });
}
