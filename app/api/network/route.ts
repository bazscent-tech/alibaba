import { NextResponse } from "next/server";
import { getServerNetwork } from "@/lib/server-network";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getServerNetwork(), { headers: { "Cache-Control": "no-store" } });
}
