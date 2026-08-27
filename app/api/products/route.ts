import { NextResponse } from "next/server";
import { addServerProduct, getServerNetwork, isValidAdminToken, type NetworkProduct } from "@/lib/server-network";

export const dynamic = "force-dynamic";

export async function GET() { return NextResponse.json(getServerNetwork().products, { headers: { "Cache-Control": "no-store" } }); }

export async function POST(request: Request) {
  if (!isValidAdminToken(request.headers.get("authorization"))) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const product = await request.json() as NetworkProduct;
  if (!product?.name || !product?.storeId) return NextResponse.json({ error: "بيانات المنتج ناقصة" }, { status: 400 });
  addServerProduct(product);
  return NextResponse.json(product, { status: 201 });
}
