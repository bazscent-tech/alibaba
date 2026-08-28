import { NextResponse } from "next/server";
import { addServerStore, getServerNetwork, type NetworkStore } from "@/lib/server-network";

export const dynamic = "force-dynamic";


export async function GET() {
  return NextResponse.json(getServerNetwork().stores, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  try {
    const store = await request.json() as NetworkStore;
    const name = typeof store?.name === "string" ? store.name.trim() : "";
    const email = typeof store?.email === "string" ? store.email.trim().toLowerCase() : "";
    const owner = typeof store?.owner === "string" ? store.owner.trim() : "";
    const city = typeof store?.city === "string" ? store.city.trim() : "";
    if (name.length < 2 || name.length > 120 || !/^\S+@\S+\.\S+$/.test(email) || owner.length < 2 || owner.length > 120 || city.length < 2 || city.length > 80) {
      return NextResponse.json({ error: "بيانات المتجر غير صالحة" }, { status: 400 });
    }
    const state = getServerNetwork();
    if (state.stores.some((item) => item.email.toLowerCase() === email)) {
      return NextResponse.json({ error: "يوجد متجر مسجل بهذا البريد" }, { status: 409 });
    }
    const normalizedStore: NetworkStore = { ...store, name, email, owner, city, status: "pending" };
    addServerStore(normalizedStore);
    return NextResponse.json(normalizedStore, { status: 201 });
  } catch {
    return NextResponse.json({ error: "تعذر تسجيل المتجر" }, { status: 400 });
  }
}
