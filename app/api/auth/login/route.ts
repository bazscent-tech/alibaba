import { NextResponse } from 'next/server';

// Simulated user database
const users = [
  { id: '1', email: 'demo@shabam.com', password: 'Demo1234', name: 'مستخدم تجريبي', type: 'buyer' },
  { id: '2', email: 'seller@shabam.com', password: 'Seller1234', name: 'بائع تجريبي', type: 'seller' },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'البريد الإلكتروني وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    // In production, generate a real JWT token
    const token = `token_${user.id}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      data: {
        user: { id: user.id, email: user.email, name: user.name, type: user.type },
        token,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'خطأ في الخادم' },
      { status: 500 }
    );
  }
}
