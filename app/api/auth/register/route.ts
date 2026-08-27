import { NextResponse } from "next/server";

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim().replace(/[<>]/g, "") : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const name = normalize(body.name);
    const email = normalize(body.email).toLowerCase();
    const phone = normalize(body.phone);
    const company = normalize(body.company);
    const type = body.type === "seller" ? "seller" : "buyer";

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ success: false, error: "يرجى إدخال اسم صحيح." }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ success: false, error: "يرجى إدخال بريد إلكتروني صحيح." }, { status: 400 });
    }
    if (phone.length < 7 || phone.length > 30) {
      return NextResponse.json({ success: false, error: "يرجى إدخال رقم هاتف صحيح." }, { status: 400 });
    }
    if (typeof body.password !== "string" || body.password.length < 8) {
      return NextResponse.json({ success: false, error: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل." }, { status: 400 });
    }

    // This repository currently uses a browser-persisted demo identity. Do not store passwords.
    const user = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      companyName: company || undefined,
      country: "اليمن",
    };

    return NextResponse.json({ success: true, data: { user } }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "تعذر إنشاء الحساب. حاول مرة أخرى." }, { status: 400 });
  }
}
